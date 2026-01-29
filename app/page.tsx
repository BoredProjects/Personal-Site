"use client";
import "./stylesheets/page.css";
import { useEffect, useRef } from "react";
import BodyContent from "./comps/BodyContent";

export default function Home() {
  const bodyRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 50, y: 50 });

  const ripple = useRef({
    active: false,
    size: 0,
    opacity: 0,
  });

  const defaultColor = "rgba(128,94,115, .2)";
  const rippleColor = "128, 94, 115";
  const backgroundColor = "white";

  useEffect(() => {
    const container = bodyRef.current;
    if (!container) return;

    const render = () => {
      const gradients: string[] = [];

      if (ripple.current.active) {
        gradients.push(`
          radial-gradient(
            circle at ${mousePos.current.x}% ${mousePos.current.y}%,
            rgba(${rippleColor}, ${ripple.current.opacity}),
            transparent ${ripple.current.size}%
          )
        `);
      }

      gradients.push(`
        radial-gradient(
          circle at ${mousePos.current.x}% ${mousePos.current.y}%,
          ${defaultColor},
          ${backgroundColor} 10%
        )
      `);

      gradients.push(backgroundColor);
      container.style.background = gradients.join(",");
    };

    const mouseHandler = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mousePos.current = {
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      };
      render();
    };

    const clickHandler = () => {
      ripple.current = {
        active: true,
        size: 2,
        opacity: 0.8,
      };

      const animate = () => {
        ripple.current.size += 1.2;
        ripple.current.opacity -= 0.03;

        if (ripple.current.opacity <= 0) {
          ripple.current.active = false;
          render();
          return;
        }

        render();
        requestAnimationFrame(animate);
      };

      animate();
    };

    render();

    document.addEventListener("mousemove", mouseHandler);
    document.addEventListener("mousedown", clickHandler);

    return () => {
      document.removeEventListener("mousemove", mouseHandler);
      document.removeEventListener("mousedown", clickHandler);
    };
  }, []);

  return (
    <div ref={bodyRef} className="page-container">
      <div className="main-header" />
      <div className="main-body">
        <BodyContent />
      </div>
    </div>
  );
}