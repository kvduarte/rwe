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

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": process.env.CORS_ORIGIN || "https://www.realworldenglish.com.br",
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
        { success: false, error: "🚫 Muitas mensagens enviadas. Tente novamente mais tarde." },
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

    const { nome, email, mensagem, recaptchaToken } = parsed.data;

    const recaptchaRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${process.env.RECAPTCHA_SECRET}&response=${recaptchaToken}`,
    });

    const recaptchaData = await recaptchaRes.json();

    if (!recaptchaData.success) {
      return NextResponse.json(
        { success: false, error: "Falha na verificação de segurança." },
        { status: 400, headers: corsHeaders() }
      );
    }

    const nomeSafe = sanitizeHtml(nome);
    const emailSafe = sanitizeHtml(email);
    const mensagemSafe = sanitizeHtml(mensagem);

    try {
      await rateLimiterEmail.consume(emailSafe.toLowerCase());
    } catch {
      return NextResponse.json(
        { success: false, error: "⚠️ Limite de envios atingido para este e-mail." },
        { status: 429, headers: corsHeaders() }
      );
    }

    const result = await resend.emails.send({
      from: "Real World English <contato@realworldenglish.com.br>",
      to: process.env.EMAIL_TO!,
      subject: `🇬🇧 NOVO CONTATO: ${nomeSafe.toUpperCase()}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              .body-wrap { background-color: #f0f4f8; padding: 40px 0; }
              .container { font-family: 'Arial Black', sans-serif; max-width: 600px; margin: 0 auto; border-radius: 4px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.1); border-top: 8px solid #cc0000; }
              .header { background-color: #002147; padding: 30px; text-align: center; }
              .logo { color: #ffffff; font-size: 24px; font-weight: bold; letter-spacing: 1px; text-transform: uppercase; margin: 0; }
              .logo-red { color: #cc0000; }
              .content { padding: 40px 30px; background-color: #ffffff; font-family: 'Segoe UI', Arial, sans-serif; }
              .badge { display: inline-block; padding: 4px 12px; background-color: #e6f0ff; color: #002147; border-radius: 20px; font-size: 12px; font-weight: bold; margin-bottom: 20px; text-transform: uppercase; border: 1px solid #002147; }
              .title { font-size: 22px; font-weight: 800; color: #002147; margin-bottom: 30px; line-height: 1.2; }
              .info-block { margin-bottom: 25px; border-bottom: 1px solid #edf2f7; padding-bottom: 15px; }
              .label { font-size: 11px; font-weight: bold; color: #cc0000; text-transform: uppercase; margin-bottom: 5px; }
              .value { font-size: 16px; color: #1a202c; font-weight: 500; }
              .message-box { background-color: #f9fafb; padding: 20px; border-radius: 4px; border: 1px dashed #cbd5e0; color: #4a5568; line-height: 1.6; margin-top: 10px; }
              .btn-wrap { text-align: center; margin-top: 35px; }
              .btn { background-color: #cc0000; color: #ffffff !important; padding: 15px 35px; text-decoration: none; border-radius: 4px; font-weight: bold; text-transform: uppercase; font-size: 14px; letter-spacing: 1px; display: inline-block; }
              .footer { background-color: #002147; padding: 20px; text-align: center; font-size: 11px; color: #cbd5e0; }
            </style>
          </head>
          <body>
            <div class="body-wrap">
              <div class="container">
                <div class="header">
                  <h1 class="logo">REAL WORLD <span class="logo-red">ENGLISH</span></h1>
                </div>
                
                <div class="content">
                  <div class="badge">Novo Lead</div>
                  <h2 class="title">Você recebeu uma nova mensagem pelo site!</h2>
                  
                  <div class="info-block">
                    <div class="label">Nome</div>
                    <div class="value">${nomeSafe}</div>
                  </div>

                  <div class="info-block">
                    <div class="label">E-mail</div>
                    <div class="value">${emailSafe}</div>
                  </div>

                  <div class="info-block" style="border-bottom: none;">
                    <div class="label">Mensagem</div>
                    <div class="message-box">
                      ${mensagemSafe.replace(/\n/g, "<br/>")}
                    </div>
                  </div>

                  <div class="btn-wrap">
                    <a href="mailto:${emailSafe}" class="btn">Responder Agora</a>
                  </div>
                </div>

                <div class="footer">
                  © ${new Date().getFullYear()} Real World English - contato@realworldenglish.com.br<br/>
                  Este é um envio automático. Não responda a este endereço.
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
    console.error("ERRO:", error);
    return NextResponse.json(
      { success: false, error: "Erro interno no servidor" },
      { status: 500, headers: corsHeaders() }
    );
  }
}