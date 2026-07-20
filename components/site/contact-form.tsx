"use client";

import { FormEvent } from "react";

const whatsappNumber = "5571999999999";

export function ContactForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const message = [
      "Olá, vim pelo site da Mobile Eventos.",
      `Nome: ${form.get("name") || ""}`,
      `Telefone: ${form.get("phone") || ""}`,
      `Tipo de evento: ${form.get("eventType") || ""}`,
      `Mensagem: ${form.get("message") || ""}`,
    ].join("\n");

    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <form className="contact-form reveal" onSubmit={handleSubmit}>
      <label>
        <span>Nome</span>
        <input name="name" type="text" autoComplete="name" required />
      </label>
      <label>
        <span>Telefone</span>
        <input name="phone" type="tel" autoComplete="tel" required />
      </label>
      <label>
        <span>Tipo de evento</span>
        <select name="eventType" defaultValue="Casamento" required>
          <option>Casamento</option>
          <option>Corporativo</option>
          <option>Aniversário</option>
          <option>Infantil</option>
          <option>Pedido de casamento</option>
          <option>Outro</option>
        </select>
      </label>
      <label>
        <span>Mensagem</span>
        <textarea name="message" rows={5} placeholder="Data, local, quantidade de convidados e referências." required />
      </label>
      <button type="submit">Enviar pelo WhatsApp</button>
      <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer">
        Falar direto no WhatsApp
      </a>
    </form>
  );
}
