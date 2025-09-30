import React from "react";
import styles from "../../components/ui/style/featuredTools.module.scss";

const FeaturedTools = () => {
  const tools = [
    {
      id: 1,
      name: "Gemini",
      desc: "Multimodal reasoning across text, images, audio, and video.",
      img: "/gemini.png" // replace with actual image path
    },
    {
      id: 2,
      name: "Gemini",
      desc: "Multimodal reasoning across text, images, audio, and video.",
      img: "/gemini.png"
    },
    {
      id: 3,
      name: "Gemini",
      desc: "Multimodal reasoning across text, images, audio, and video.",
      img: "/gemini.png"
    },
    {
      id: 4,
      name: "Gemini",
      desc: "Multimodal reasoning across text, images, audio, and video.",
      img: "/gemini.png"
    },
    {
      id: 5,
      name: "Gemini",
      desc: "Multimodal reasoning across text, images, audio, and video.",
      img: "/gemini.png"
    },
    {
      id: 6,
      name: "Gemini",
      desc: "Multimodal reasoning across text, images, audio, and video.",
      img: "/gemini.png"
    },
    {
      id: 7,
      name: "Gemini",
      desc: "Multimodal reasoning across text, images, audio, and video.",
      img: "/gemini.png"
    },
    {
      id: 8,
      name: "Gemini",
      desc: "Multimodal reasoning across text, images, audio, and video.",
      img: "/gemini.png"
    },
    {
      id: 9,
      name: "Gemini",
      desc: "Multimodal reasoning across text, images, audio, and video.",
      img: "/gemini.png"
    },
    {
      id: 10,
      name: "Gemini",
      desc: "Multimodal reasoning across text, images, audio, and video.",
      img: "/gemini.png"
    },
    {
      id: 11,
      name: "Gemini",
      desc: "Multimodal reasoning across text, images, audio, and video.",
      img: "/gemini.png"
    },
    {
      id: 12,
      name: "Gemini",
      desc: "Multimodal reasoning across text, images, audio, and video.",
      img: "/gemini.png"
    }
  ];

  return (
    <section className={styles.featuredTools}>
      <h2>Featured Tools</h2>

      <div className={styles.grid}>
        {tools.map((tool) => (
          <div key={tool.id} className={styles.card}>
            <img
              src={
                "data:image/jpeg;base64,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"
              }
              alt={tool.name}
            />
            <h3>{tool.name}</h3>
            <p>{tool.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedTools;
