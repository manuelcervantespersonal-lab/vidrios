import { NextResponse } from "next/server";
import { Resend } from "resend";

import { contactInfo } from "@/data/site";

interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(payload: Partial<ContactPayload>) {
  if (!payload.name || payload.name.trim().length < 2) {
    return "El nombre es obligatorio.";
  }
  if (!payload.email || !EMAIL_REGEX.test(payload.email)) {
    return "Ingresa un correo electrónico válido.";
  }
  if (!payload.message || payload.message.trim().length < 10) {
    return "El mensaje debe tener al menos 10 caracteres.";
  }
  return null;
}

export async function POST(request: Request) {
  let payload: Partial<ContactPayload>;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  const validationError = validate(payload);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const { name, email, phone, message } = payload as ContactPayload;

  if (!process.env.RESEND_API_KEY) {
    console.error(
      "RESEND_API_KEY no está configurada. Define la variable de entorno para habilitar el envío de correos."
    );
    return NextResponse.json(
      { error: "El servicio de contacto no está disponible en este momento." },
      { status: 500 }
    );
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? "Sitio Web <onboarding@resend.dev>",
      to: contactInfo.email,
      replyTo: email,
      subject: `Nuevo contacto de ${name} — sitio web`,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Correo:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phone || "No proporcionado"}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message.replace(/\n/g, "<br />")}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error al enviar correo con Resend:", error);
    return NextResponse.json(
      { error: "No se pudo enviar el mensaje. Intenta de nuevo más tarde." },
      { status: 500 }
    );
  }
}
