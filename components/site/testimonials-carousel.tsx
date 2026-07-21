"use client";

import { useRef, type PointerEvent } from "react";

const testimonials = [
  {
    quote:
      "A Mobile organizou a estrutura e o mobiliário do nosso casamento com cuidado, agilidade e um olhar muito refinado. Cada peça ajudou a valorizar a experiência dos convidados.",
    author: "Cliente de casamento - Salvador, Bahia",
  },
  {
    quote:
      "A composição da formatura ficou elegante e funcional. A equipe entendeu o espaço, sugeriu soluções bonitas e entregou tudo com muita atenção aos detalhes.",
    author: "Cliente de formatura - Lauro de Freitas, Bahia",
  },
  {
    quote:
      "Precisávamos de uma ambientação corporativa sofisticada, sem excesso. O resultado ficou alinhado à marca e o atendimento foi seguro do início ao fim.",
    author: "Evento corporativo - Salvador, Bahia",
  },
  {
    quote:
      "O aniversário ganhou uma atmosfera acolhedora e muito bem resolvida. Os mobiliários trouxeram presença para as fotos e conforto para os convidados.",
    author: "Cliente de aniversário - Camaçari, Bahia",
  },
];

export function TestimonialsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({
    isDragging: false,
    startX: 0,
    scrollLeft: 0,
  });

  function scrollTestimonials(direction: "previous" | "next") {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const distance = track.clientWidth * 0.92;
    track.scrollBy({
      left: direction === "next" ? distance : -distance,
      behavior: "smooth",
    });
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    dragState.current = {
      isDragging: true,
      startX: event.clientX,
      scrollLeft: track.scrollLeft,
    };
    track.setPointerCapture(event.pointerId);
    track.classList.add("is-dragging");
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const track = trackRef.current;

    if (!track || !dragState.current.isDragging) {
      return;
    }

    event.preventDefault();
    const dragDistance = event.clientX - dragState.current.startX;
    track.scrollLeft = dragState.current.scrollLeft - dragDistance * 1.18;
  }

  function stopDragging(event: PointerEvent<HTMLDivElement>) {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    dragState.current.isDragging = false;
    track.classList.remove("is-dragging");

    if (track.hasPointerCapture(event.pointerId)) {
      track.releasePointerCapture(event.pointerId);
    }
  }

  return (
    <section className="testimonial-section reveal" aria-labelledby="clients-title">
      <div className="testimonial-content">
        <h2 id="clients-title">O que nossos clientes dizem</h2>
        <div
          className="testimonial-track"
          ref={trackRef}
          tabIndex={0}
          aria-label="Depoimentos de clientes"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={stopDragging}
          onPointerCancel={stopDragging}
          onPointerLeave={stopDragging}
        >
          {testimonials.map((testimonial) => (
            <article className="testimonial-slide" key={testimonial.author}>
              <blockquote>{testimonial.quote}</blockquote>
              <p className="quote-author">{testimonial.author}</p>
            </article>
          ))}
        </div>
        <div className="testimonial-controls" aria-label="Controles do carrossel de depoimentos">
          <button className="slider-arrow" aria-label="Depoimento anterior" type="button" onClick={() => scrollTestimonials("previous")}>
            {"<-"}
          </button>
          <button className="slider-arrow" aria-label="Próximo depoimento" type="button" onClick={() => scrollTestimonials("next")}>
            {"->"}
          </button>
        </div>
      </div>
    </section>
  );
}
