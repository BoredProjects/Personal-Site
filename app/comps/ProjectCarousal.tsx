"use client";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import '../stylesheets/ProjectCarousal.css'

interface Project {
  title: string;
  desc: string;
  image: string;   // URL or imported image src
  link: string;
}

// ── Edit your projects here ──────────────────────────────────────────────────
const PROJECTS: Project[] = [
  {
    title: "Hotel Analysis",
    desc: "Internal RESTful web app serving as a central data hub built with PostgreSQL, Express.js, and React. Built from a kaggle dataset of 200k records.",
    image: "/hotel-analysis.png",   // ← paste an image URL, or import and use the variable name
    link: "https://fe-hotel-technical-analysis-production.up.railway.app/",
  },{
    title: "Market Place",
    desc: "A full stack marketplace MVP built with Next.js and Express. Features a customer facing shop with cart and multi-step checkout, and an admin back-office with inventory management, vendor CRM, order tracking, and a guided tooltip tour. ",
    image: '/market-place.png',
    link: 'https://marketplace-production-7e33.up.railway.app/dashboard'
  }
];
// ────────────────────────────────────────────────────────────────────────────

const VISIBLE = 3; // cards visible at once

export default function ProjectCarousel() {
  const [center, setCenter] = useState(0);
  const total = PROJECTS.length;

  const prev = () => setCenter((c) => (c - 1 + total) % total);
  const next = () => setCenter((c) => (c + 1) % total);

  // Determine which indices are visible and their positions
  const getSlots = () => {
    const slots: { index: number; pos: number }[] = [];
    const half = Math.floor(VISIBLE / 2);
    for (let offset = -half; offset <= half; offset++) {
      slots.push({
        index: (center + offset + total) % total,
        pos: offset,           // -1 = left, 0 = center, 1 = right
      });
    }
    return slots;
  };

  return (
    <div className="carousel-wrapper">
      <h2 className="carousel-heading">Stuff I've Been Working On</h2>

      <div className="carousel-stage">
        {/* Left arrow */}
        <button className="carousel-arrow carousel-arrow--left" onClick={prev} aria-label="Previous project">
          &#8592;
        </button>

        {/* Cards */}
        <div className="carousel-track">
          <AnimatePresence mode="popLayout">
            {getSlots().map(({ index, pos }) => {
              const project = PROJECTS[index];
              const isCenter = pos === 0;

              return (
                <motion.a
                  key={index}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`project-card ${isCenter ? "project-card--active" : "project-card--side"}`}
                  layout
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{
                    opacity: isCenter ? 1 : 0.45,
                    scale: isCenter ? 1 : 0.82,
                    filter: isCenter ? "none" : "blur(1.5px)",
                  }}
                  exit={{ opacity: 0, scale: 0.75 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  onClick={(e) => {
                    if (!isCenter) {
                      e.preventDefault();
                      pos < 0 ? prev() : next();
                    }
                  }}
                >
                  {/* Top half — image */}
                  <div className="card-image-wrapper">
                    {project.image ? (
                      <img src={project.image} alt={project.title} className="card-image" />
                    ) : (
                      <div className="card-image-placeholder">
                        <span className="placeholder-icon">&#128247;</span>
                        <span className="placeholder-text">Add image URL</span>
                      </div>
                    )}
                    <div className="card-image-overlay" />
                  </div>

                  {/* Bottom half — text */}
                  <div className="card-body">
                    <h3 className="card-title">{project.title}</h3>
                    <p className="card-desc">{project.desc}</p>
                    <span className="card-cta">View Project →</span>
                  </div>
                </motion.a>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Right arrow */}
        <button className="carousel-arrow carousel-arrow--right" onClick={next} aria-label="Next project">
          &#8594;
        </button>
      </div>

      {/* Dot indicators */}
      <div className="carousel-dots">
        {PROJECTS.map((_, i) => (
          <button
            key={i}
            className={`carousel-dot ${i === center ? "carousel-dot--active" : ""}`}
            onClick={() => setCenter(i)}
            aria-label={`Go to project ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
