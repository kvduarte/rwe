import { NextResponse } from "next/server";
import { Resend } from "resend";
import { RateLimiterMemory } from "rate-limiter-flexible";
import { formSchema } from "@/lib/utils";
import sanitizeHtml from "sanitize-html";

const resend = new Resend(process.env.RESEND_API_KEY!);

const rateLimiterIP = new RateLimiterMemory({
  points: 3,
  duration: 60 * 60,
});

const rateLimiterEmail = new RateLimiterMemory({
  points: 2,
  duration: 60 * 60 * 24,
});

const rateLimiterTelefone = new RateLimiterMemory({
  points: 2,
  duration: 60 * 60 * 24,
});

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": process.env.CORS_ORIGIN || "http://realworldenglish.com.br/",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: corsHeaders(),
  });
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";

    try {
      await rateLimiterIP.consume(ip);
    } catch {
      return NextResponse.json(
        { success: false, error: "🚫 Muitas mensagens deste IP." },
        { status: 429, headers: corsHeaders() }
      );
    }

    const data = await req.json();
    const parsed = formSchema.safeParse(data);

    if (!parsed.success) {
      const messages = parsed.error.issues.map((e) => e.message);
      return NextResponse.json(
        { success: false, error: messages.join(", ") },
        { status: 400, headers: corsHeaders() }
      );
    }

    const { nome, email, telefone, assunto, mensagem, recaptchaToken } = parsed.data;

    const recaptchaRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${process.env.RECAPTCHA_SECRET}&response=${recaptchaToken}`,
    });

    const recaptchaData = await recaptchaRes.json();
    if (!recaptchaData.success || recaptchaData.score < 0.5) {
      return NextResponse.json(
        { success: false, error: "Falha na verificação de segurança." },
        { status: 400, headers: corsHeaders() }
      );
    }

    const nomeSafe = sanitizeHtml(nome);
    const emailSafe = sanitizeHtml(email);
    const telefoneSafe = sanitizeHtml(telefone || "");
    const assuntoSafe = sanitizeHtml(assunto || "Nova mensagem do site");
    const mensagemSafe = sanitizeHtml(mensagem);
    const telApenasNumeros = telefoneSafe.replace(/\D/g, "");

    if (telApenasNumeros.length < 10 || telApenasNumeros.length > 11) {
      return NextResponse.json(
        { success: false, error: "Telefone inválido." },
        { status: 400, headers: corsHeaders() }
      );
    }

    try {
      await rateLimiterEmail.consume(emailSafe.toLowerCase());
      await rateLimiterTelefone.consume(telApenasNumeros);
    } catch {
      return NextResponse.json(
        { success: false, error: "⚠️ Limite de envios atingido hoje." },
        { status: 429, headers: corsHeaders() }
      );
    }

    const whatsappLink = `https://wa.me/55${telApenasNumeros}`;

    const result = await resend.emails.send({
      from: "KDuarte <onboarding@resend.dev>",
      to: process.env.EMAIL_TO!,
      replyTo: emailSafe,
      subject: ` NOVO CONTATO | ${nomeSafe.toUpperCase()}`,
      html: `
        <!DOCTYPE html>
        <html lang="pt-BR">
          <head>
            <meta charset="UTF-8">
            <style>
              body {
                margin: 0; padding: 0;
                background-color: #000000;
                font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                color: #ffffff;
              }
              .wrapper {
                background: radial-gradient(circle at 100% 100%, #4a0404 0%, #1a0202 50%, #000000 100%);
                padding: 40px 20px;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: rgba(255, 255, 255, 0.03);
                border: 1px solid rgba(212, 175, 55, 0.1);
                border-radius: 24px;
                overflow: hidden;
              }
              .header {
                padding: 50px 40px 20px 40px;
              }
              .tag {
                color: #D4AF37;
                text-transform: uppercase;
                font-size: 10px;
                font-weight: bold;
                letter-spacing: 5px;
                margin-bottom: 15px;
                display: block;
              }
              .title {
                font-size: 36px;
                font-weight: 900;
                text-transform: uppercase;
                letter-spacing: -1px;
                line-height: 1;
                margin: 0;
              }
              .serif {
                font-family: 'Georgia', serif;
                font-style: italic;
                font-weight: 300;
                color: #D4AF37;
                text-transform: capitalize;
              }
              .content {
                padding: 40px;
              }
              .field {
                margin-bottom: 30px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                padding-bottom: 10px;
              }
              .label {
                font-size: 9px;
                text-transform: uppercase;
                letter-spacing: 3px;
                color: rgba(212, 175, 55, 0.8);
                font-weight: bold;
                margin-bottom: 8px;
              }
              .value {
                font-size: 16px;
                color: #ffffff;
              }
              .message-box {
                background-color: rgba(255, 255, 255, 0.02);
                padding: 25px;
                border-radius: 12px;
                border-left: 2px solid #D4AF37;
                font-style: italic;
                color: #e0e0e0;
                line-height: 1.8;
                margin-top: 10px;
              }
              .footer {
                padding: 30px;
                text-align: center;
                background-color: rgba(0, 0, 0, 0.2);
                border-top: 1px solid rgba(212, 175, 55, 0.05);
              }
              .btn {
                display: inline-block;
                background-color: #D4AF37;
                color: #000000 !important;
                padding: 18px 35px;
                border-radius: 8px;
                text-decoration: none;
                font-weight: 900;
                font-size: 11px;
                letter-spacing: 3px;
                text-transform: uppercase;
                margin-top: 10px;
              }
            </style>
          </head>
          <body>
            <div class="wrapper">
              <div class="container">
                <div class="header">
                  <span class="tag">New Message</span>
                  <h1 class="title">Fale <span class="serif">Comigo.</span></h1>
                </div>
                
                <div class="content">
                  <div class="field">
                    <div class="label">Nome</div>
                    <div class="value">${nomeSafe}</div>
                  </div>

                  <div class="field">
                    <div class="label">E-mail</div>
                    <div class="value">${emailSafe}</div>
                  </div>

                  <div class="field">
                    <div class="label">WhatsApp</div>
                    <div class="value">${telefoneSafe}</div>
                    <a href="${whatsappLink}" class="btn">Chamar Agora</a>
                  </div>

                  <div class="field">
                    <div class="label">Mensagem</div>
                    <div class="message-box">
                      ${mensagemSafe.replace(/\n/g, "<br/>")}
                    </div>
                  </div>
                </div>

                <div class="footer">
                  <p style="font-size: 10px; letter-spacing: 2px; color: rgba(255,255,255,0.3); text-transform: uppercase;">
                    Enviado via portfólio oficial • <strong>KDuarte</strong>
                  </p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    return NextResponse.json(
      { success: true, id: result.data?.id },
      { status: 200, headers: corsHeaders() }
    );

  } catch (error) {
    console.error("Erro Final:", error);
    return NextResponse.json(
      { success: false, error: "Erro interno no servidor" },
      { status: 500, headers: corsHeaders() }
    );
  }
}