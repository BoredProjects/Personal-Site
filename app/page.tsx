"use client";
import "./stylesheets/page.css";
import { useEffect, useRef, useState } from "react";
import Screen from "./comps/Screen";
import Directory from "./comps/Directory";
import PageContent from "./comps/PageContent";

interface Section {
  title: string;
  desc: string;
}

export default function Home() {
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const innerDivRef = useRef<HTMLDivElement | null>(null);
  const mousePos = useRef({ x: 50, y: 50 });
  const [section, setSection] = useState<Section | null>({
    title: "About Me",
    desc:
      "In my free time, you can often find me either planning my next outdoor adventure or playing games with friends. Some of my recent trips include exploring the Garden of the Gods in Colorado, which was an unforgettable experience. I also like to set aside time to practice new technologies that can make my day-to-day life easier. When I’m relaxing at home, I enjoy diving into games like Kenshi and Hearts of Iron, which let me relax or sometimes mod them for custom adventures.",
  });

  const ripple = useRef({
    active: false,
    size: 0,
    opacity: 0,
  });

  const defaultColor = "rgba(128,94,115,0.2)";
  const edgeColor = "rgb(253,251,212,.2)";

  const updateSelection = (content: Section) => {
    setSection(content);
  };

  // Helper to extract "r,g,b" from rgb or rgba
  const getRGB = (color: string) => {
    const match = color.match(/\d+/g);
    if (!match) return "128,94,115"; // fallback
    return `${match[0]}, ${match[1]}, ${match[2]}`;
  };

  useEffect(() => {
    const container = document.getElementById("under-mouse") as HTMLDivElement;
    if (!container) return;

    const render = () => {
      const bgLayer = container.querySelector<HTMLDivElement>(".mouse-bg");
      if (!bgLayer) return;

      const gradients: string[] = [];

      let activeColor: string;
      if (mousePos.current.x <= 50) {
        activeColor = edgeColor;
      } else {
        activeColor = defaultColor;
      }

      const rippleRGB = getRGB(activeColor);
      const normalRadius = 15;
      const gradientRadius = ripple.current.active ? ripple.current.size : normalRadius;

      if (ripple.current.active) {
        gradients.push(`
          radial-gradient(
            circle at ${mousePos.current.x}% ${mousePos.current.y}%,
            rgba(${rippleRGB}, ${ripple.current.opacity}),
            transparent ${gradientRadius}%
          )
        `);
      }

      gradients.push(`
        radial-gradient(
          circle at ${mousePos.current.x}% ${mousePos.current.y}%,
          ${activeColor} 0%,
          transparent ${gradientRadius}%
        )
      `);

      bgLayer.style.background = gradients.join(",");
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
        size: 1,
        opacity: 0.8,
      };

      const animate = () => {
        ripple.current.size += 0.6;
        ripple.current.opacity -= 0.03;
        render();
        if (ripple.current.opacity > 0) {
          requestAnimationFrame(animate);
        } else {
          ripple.current.active = false;
        }
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
      <div id="under-mouse" className="main-body">
        <div className="mouse-bg" />
        <Screen>
          <Directory
            updateSelection={updateSelection}
            onInnerDivMount={(el) => {
              innerDivRef.current = el;
            }}
          />
        </Screen>
        <Screen>
          {section ? (
            <PageContent title={section.title} desc={section.desc} />
          ) : (
            <PageContent
              title="Select a section"
              desc="Please choose a section from the menu."
            />
          )}
        </Screen>
      </div>
    </div>
  );
}
