import React from "react";
import "./styles.css";

export default function FadeInSection({ children }) {
  const domRef = React.useRef();

  const [isVisible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisible(true);

        observer.unobserve(domRef.current);
      }
    });

    observer.observe(domRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="fade-in-section"
      ref={domRef}
      className={isVisible ? "is__visible" : ""}
    >
      {children}
    </section>
  );
}
