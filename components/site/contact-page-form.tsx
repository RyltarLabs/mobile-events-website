"use client";

import { FormEvent } from "react";

const whatsappNumber = "0000000000000";

export function ContactPageForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const message = [
      "Olá, vim pelo site da Mobile Eventos.",
      `Nome: ${form.get("firstName") || ""} ${form.get("lastName") || ""}`.trim(),
      `WhatsApp: ${form.get("whatsapp") || ""}`,
      `E-mail: ${form.get("email") || ""}`,
      `Tipo de solicitação: ${form.get("requestType") || ""}`,
      `Data do evento: ${form.get("eventDate") || ""}`,
      `Local: ${form.get("location") || ""}`,
    ].join("\n");

    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <form className="contact-page-form" onSubmit={handleSubmit}>
      <label className="half-field">
        <span>Nome</span>
        <input name="firstName" type="text" placeholder="Nome" autoComplete="given-name" required />
      </label>
      <label className="half-field">
        <span>Sobrenome</span>
        <input name="lastName" type="text" placeholder="Sobrenome" autoComplete="family-name" required />
      </label>
      <label>
        <span>WhatsApp</span>
        <input name="whatsapp" type="tel" placeholder="Número com DDD" autoComplete="tel" required />
      </label>
      <label>
        <span>E-mail</span>
        <input name="email" type="email" placeholder="seuemail@exemplo.com" autoComplete="email" required />
      </label>
      <label>
        <span>Tipo de solicitação</span>
        <select name="requestType" defaultValue="" required>
          <option value="" disabled>
            Selecione
          </option>
          <option>Casamento</option>
          <option>Formatura</option>
          <option>Aniversário</option>
          <option>Corporativo</option>
          <option>Locação de mobiliário</option>
          <option>Cenografia sob medida</option>
        </select>
      </label>
      <label>
        <span>Data do evento</span>
        <input name="eventDate" type="date" required />
      </label>
      <label className="contact-location-field">
        <span>Localização</span>
        <textarea name="location" rows={4} placeholder="Cidade, bairro, espaço do evento ou referência." required />
      </label>
      <button type="submit">Enviar</button>
    </form>
  );
}
