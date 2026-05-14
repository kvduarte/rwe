import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formSchema = z.object({
  nome: z
    .string()
    .min(3, "O nome precisa ter pelo menos 3 caracteres."),

  email: z
    .string()
    .email("E-mail inválido."),

  telefone: z
    .string()
    .optional()
    .refine(
      (val) => !val || (val.length >= 10 && val.length <= 15),
      "Telefone inválido."
    ),

  assunto: z
    .string()
    .min(2, "Assunto inválido.")
    .optional(),

  mensagem: z
    .string()
    .min(10, "A mensagem precisa ter pelo menos 10 caracteres."),

  recaptchaToken: z
    .string()
    .min(1, "Falha na verificação do reCAPTCHA"),
});

export type FormSchema = z.infer<typeof formSchema>;
