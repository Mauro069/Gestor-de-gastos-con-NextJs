import { useRouter } from "next/router";
import styles from "../styles/landingPage.module.scss";
import Image from "next/image";
import { routes } from "@/routes";
import { useEffect, useRef } from "react";

export default function LandingPage() {
  const router = useRouter();

  return (
    <main className={styles.main}>
      <AnimatedSection className={styles.firstSection}>
        <div className={styles.firstSection_left}>
          <h1>
            Controla tus <br /> gastos diarios <br /> con esta <br /> Web.
          </h1>
          <p>
            Ahorra más y toma el control de tus finanzas personales con nuestra
            herramienta de gestión de gastos.
          </p>
          <button onClick={() => router.push(routes.register)}>
            Gestiona tus Gastos
          </button>
        </div>
        <div className={styles.firstSection_right}>
          <div className={styles.imageContainer}>
            <Points />
            <Image
              className={styles.image}
              alt="Gestor de gastos"
              src="/img/landing1.jpg"
              width={1200}
              height={600}
            />
          </div>
        </div>
      </AnimatedSection>
      <AnimatedSection className={styles.leftImageSection}>
        <Image
          className={styles.image}
          alt="Gestor de gastos"
          src="/img/landing2.jpg"
          width={1200}
          height={600}
        />
        <div className={styles.text}>
          <h2>
            Mantén el control de tus <br /> finanzas personales.
          </h2>
          <p>
            Podrás agregar, editar y borrar tus gastos diarios de manera fácil y
            sencilla. Nunca pierdas de vista tus gastos y mantén el control de
            tu presupuesto.
          </p>
        </div>
      </AnimatedSection>
      <AnimatedSection className={styles.rightImageSection}>
        <div className={styles.text}>
          <h2>Ahorra más dinero.</h2>
          <p>
            Al tener una clara visión de tus gastos diarios, podrás identificar
            áreas en las que puedes ahorrar más dinero. Esto te ayudará a ser
            más consciente de tus gastos y a tomar decisiones financieras más
            inteligentes.
          </p>
        </div>
        <Image
          className={styles.image}
          alt="Gestor de gastos"
          src="/img/landing3.jpg"
          width={1200}
          height={600}
        />
      </AnimatedSection>
      <AnimatedSection className={styles.leftImageSection}>
        <Image
          className={styles.image}
          alt="Gestor de gastos"
          src="/img/landing4.jpg"
          width={1200}
          height={600}
        />
        <div className={styles.text}>
          <h2>Personaliza tu experiencia.</h2>
          <p>
            Añade categorías de gastos y establece prioridades para asegurarte
            de que tus finanzas se ajusten a tus necesidades y metas.
          </p>
        </div>
      </AnimatedSection>
    </main>
  );
}

const AnimatedSection = ({
  children,
  className,
}: {
  children: JSX.Element[] | JSX.Element;
  className: string;
}) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    });

    // @ts-ignore
    observer.observe(sectionRef.current);

    return () => {
      // @ts-ignore
      observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section
      style={{
        opacity: 0,
        transform: "translateY(50px)",
        transition: "opacity 1.5s ease-out, transform 1.5s ease-out",
        overflowY: "hidden"
      }}
      ref={sectionRef}
      className={className}
    >
      {children}
    </section>
  );
};

export const Points = () => (
  <svg
    width="465"
    height="395"
    viewBox="0 0 465 395"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="10" height="10" fill="#D9D9D9" />
    <rect x="35" width="10" height="10" fill="#D9D9D9" />
    <rect x="70" width="10" height="10" fill="#D9D9D9" />
    <rect x="105" width="10" height="10" fill="#D9D9D9" />
    <rect x="140" width="10" height="10" fill="#D9D9D9" />
    <rect x="175" width="10" height="10" fill="#D9D9D9" />
    <rect x="210" width="10" height="10" fill="#D9D9D9" />
    <rect x="245" width="10" height="10" fill="#D9D9D9" />
    <rect x="280" width="10" height="10" fill="#D9D9D9" />
    <rect x="315" width="10" height="10" fill="#D9D9D9" />
    <rect x="350" width="10" height="10" fill="#D9D9D9" />
    <rect x="385" width="10" height="10" fill="#D9D9D9" />
    <rect x="420" width="10" height="10" fill="#D9D9D9" />
    <rect x="455" width="10" height="10" fill="#D9D9D9" />
    <rect y="35" width="10" height="10" fill="#D9D9D9" />
    <rect x="35" y="35" width="10" height="10" fill="#D9D9D9" />
    <rect x="70" y="35" width="10" height="10" fill="#D9D9D9" />
    <rect x="105" y="35" width="10" height="10" fill="#D9D9D9" />
    <rect x="140" y="35" width="10" height="10" fill="#D9D9D9" />
    <rect x="175" y="35" width="10" height="10" fill="#D9D9D9" />
    <rect x="210" y="35" width="10" height="10" fill="#D9D9D9" />
    <rect x="245" y="35" width="10" height="10" fill="#D9D9D9" />
    <rect x="280" y="35" width="10" height="10" fill="#D9D9D9" />
    <rect x="315" y="35" width="10" height="10" fill="#D9D9D9" />
    <rect x="350" y="35" width="10" height="10" fill="#D9D9D9" />
    <rect x="385" y="35" width="10" height="10" fill="#D9D9D9" />
    <rect x="420" y="35" width="10" height="10" fill="#D9D9D9" />
    <rect x="455" y="35" width="10" height="10" fill="#D9D9D9" />
    <rect y="70" width="10" height="10" fill="#D9D9D9" />
    <rect x="35" y="70" width="10" height="10" fill="#D9D9D9" />
    <rect x="70" y="70" width="10" height="10" fill="#D9D9D9" />
    <rect x="105" y="70" width="10" height="10" fill="#D9D9D9" />
    <rect x="140" y="70" width="10" height="10" fill="#D9D9D9" />
    <rect x="175" y="70" width="10" height="10" fill="#D9D9D9" />
    <rect x="210" y="70" width="10" height="10" fill="#D9D9D9" />
    <rect x="245" y="70" width="10" height="10" fill="#D9D9D9" />
    <rect x="280" y="70" width="10" height="10" fill="#D9D9D9" />
    <rect x="315" y="70" width="10" height="10" fill="#D9D9D9" />
    <rect x="350" y="70" width="10" height="10" fill="#D9D9D9" />
    <rect x="385" y="70" width="10" height="10" fill="#D9D9D9" />
    <rect x="420" y="70" width="10" height="10" fill="#D9D9D9" />
    <rect x="455" y="70" width="10" height="10" fill="#D9D9D9" />
    <rect y="105" width="10" height="10" fill="#D9D9D9" />
    <rect x="35" y="105" width="10" height="10" fill="#D9D9D9" />
    <rect x="70" y="105" width="10" height="10" fill="#D9D9D9" />
    <rect x="105" y="105" width="10" height="10" fill="#D9D9D9" />
    <rect x="140" y="105" width="10" height="10" fill="#D9D9D9" />
    <rect x="175" y="105" width="10" height="10" fill="#D9D9D9" />
    <rect x="210" y="105" width="10" height="10" fill="#D9D9D9" />
    <rect x="245" y="105" width="10" height="10" fill="#D9D9D9" />
    <rect x="280" y="105" width="10" height="10" fill="#D9D9D9" />
    <rect x="315" y="105" width="10" height="10" fill="#D9D9D9" />
    <rect x="350" y="105" width="10" height="10" fill="#D9D9D9" />
    <rect x="385" y="105" width="10" height="10" fill="#D9D9D9" />
    <rect x="420" y="105" width="10" height="10" fill="#D9D9D9" />
    <rect x="455" y="105" width="10" height="10" fill="#D9D9D9" />
    <rect y="140" width="10" height="10" fill="#D9D9D9" />
    <rect x="35" y="140" width="10" height="10" fill="#D9D9D9" />
    <rect x="70" y="140" width="10" height="10" fill="#D9D9D9" />
    <rect x="105" y="140" width="10" height="10" fill="#D9D9D9" />
    <rect x="140" y="140" width="10" height="10" fill="#D9D9D9" />
    <rect x="175" y="140" width="10" height="10" fill="#D9D9D9" />
    <rect x="210" y="140" width="10" height="10" fill="#D9D9D9" />
    <rect x="245" y="140" width="10" height="10" fill="#D9D9D9" />
    <rect x="280" y="140" width="10" height="10" fill="#D9D9D9" />
    <rect x="315" y="140" width="10" height="10" fill="#D9D9D9" />
    <rect x="350" y="140" width="10" height="10" fill="#D9D9D9" />
    <rect x="385" y="140" width="10" height="10" fill="#D9D9D9" />
    <rect x="420" y="140" width="10" height="10" fill="#D9D9D9" />
    <rect x="455" y="140" width="10" height="10" fill="#D9D9D9" />
    <rect y="175" width="10" height="10" fill="#D9D9D9" />
    <rect x="35" y="175" width="10" height="10" fill="#D9D9D9" />
    <rect x="70" y="175" width="10" height="10" fill="#D9D9D9" />
    <rect x="105" y="175" width="10" height="10" fill="#D9D9D9" />
    <rect x="140" y="175" width="10" height="10" fill="#D9D9D9" />
    <rect x="175" y="175" width="10" height="10" fill="#D9D9D9" />
    <rect x="210" y="175" width="10" height="10" fill="#D9D9D9" />
    <rect x="245" y="175" width="10" height="10" fill="#D9D9D9" />
    <rect x="280" y="175" width="10" height="10" fill="#D9D9D9" />
    <rect x="315" y="175" width="10" height="10" fill="#D9D9D9" />
    <rect x="350" y="175" width="10" height="10" fill="#D9D9D9" />
    <rect x="385" y="175" width="10" height="10" fill="#D9D9D9" />
    <rect x="420" y="175" width="10" height="10" fill="#D9D9D9" />
    <rect x="455" y="175" width="10" height="10" fill="#D9D9D9" />
    <rect y="210" width="10" height="10" fill="#D9D9D9" />
    <rect x="35" y="210" width="10" height="10" fill="#D9D9D9" />
    <rect x="70" y="210" width="10" height="10" fill="#D9D9D9" />
    <rect x="105" y="210" width="10" height="10" fill="#D9D9D9" />
    <rect x="140" y="210" width="10" height="10" fill="#D9D9D9" />
    <rect x="175" y="210" width="10" height="10" fill="#D9D9D9" />
    <rect x="210" y="210" width="10" height="10" fill="#D9D9D9" />
    <rect x="245" y="210" width="10" height="10" fill="#D9D9D9" />
    <rect x="280" y="210" width="10" height="10" fill="#D9D9D9" />
    <rect x="315" y="210" width="10" height="10" fill="#D9D9D9" />
    <rect x="350" y="210" width="10" height="10" fill="#D9D9D9" />
    <rect x="385" y="210" width="10" height="10" fill="#D9D9D9" />
    <rect x="420" y="210" width="10" height="10" fill="#D9D9D9" />
    <rect x="455" y="210" width="10" height="10" fill="#D9D9D9" />
    <rect y="245" width="10" height="10" fill="#D9D9D9" />
    <rect x="35" y="245" width="10" height="10" fill="#D9D9D9" />
    <rect x="70" y="245" width="10" height="10" fill="#D9D9D9" />
    <rect x="105" y="245" width="10" height="10" fill="#D9D9D9" />
    <rect x="140" y="245" width="10" height="10" fill="#D9D9D9" />
    <rect x="175" y="245" width="10" height="10" fill="#D9D9D9" />
    <rect x="210" y="245" width="10" height="10" fill="#D9D9D9" />
    <rect x="245" y="245" width="10" height="10" fill="#D9D9D9" />
    <rect x="280" y="245" width="10" height="10" fill="#D9D9D9" />
    <rect x="315" y="245" width="10" height="10" fill="#D9D9D9" />
    <rect x="350" y="245" width="10" height="10" fill="#D9D9D9" />
    <rect x="385" y="245" width="10" height="10" fill="#D9D9D9" />
    <rect x="420" y="245" width="10" height="10" fill="#D9D9D9" />
    <rect x="455" y="245" width="10" height="10" fill="#D9D9D9" />
    <rect y="280" width="10" height="10" fill="#D9D9D9" />
    <rect x="35" y="280" width="10" height="10" fill="#D9D9D9" />
    <rect x="70" y="280" width="10" height="10" fill="#D9D9D9" />
    <rect x="105" y="280" width="10" height="10" fill="#D9D9D9" />
    <rect x="140" y="280" width="10" height="10" fill="#D9D9D9" />
    <rect x="175" y="280" width="10" height="10" fill="#D9D9D9" />
    <rect x="210" y="280" width="10" height="10" fill="#D9D9D9" />
    <rect x="245" y="280" width="10" height="10" fill="#D9D9D9" />
    <rect x="280" y="280" width="10" height="10" fill="#D9D9D9" />
    <rect x="315" y="280" width="10" height="10" fill="#D9D9D9" />
    <rect x="350" y="280" width="10" height="10" fill="#D9D9D9" />
    <rect x="385" y="280" width="10" height="10" fill="#D9D9D9" />
    <rect x="420" y="280" width="10" height="10" fill="#D9D9D9" />
    <rect x="455" y="280" width="10" height="10" fill="#D9D9D9" />
    <rect y="315" width="10" height="10" fill="#D9D9D9" />
    <rect x="35" y="315" width="10" height="10" fill="#D9D9D9" />
    <rect x="70" y="315" width="10" height="10" fill="#D9D9D9" />
    <rect x="105" y="315" width="10" height="10" fill="#D9D9D9" />
    <rect x="140" y="315" width="10" height="10" fill="#D9D9D9" />
    <rect x="175" y="315" width="10" height="10" fill="#D9D9D9" />
    <rect x="210" y="315" width="10" height="10" fill="#D9D9D9" />
    <rect x="245" y="315" width="10" height="10" fill="#D9D9D9" />
    <rect x="280" y="315" width="10" height="10" fill="#D9D9D9" />
    <rect x="315" y="315" width="10" height="10" fill="#D9D9D9" />
    <rect x="350" y="315" width="10" height="10" fill="#D9D9D9" />
    <rect x="385" y="315" width="10" height="10" fill="#D9D9D9" />
    <rect x="420" y="315" width="10" height="10" fill="#D9D9D9" />
    <rect x="455" y="315" width="10" height="10" fill="#D9D9D9" />
    <rect y="350" width="10" height="10" fill="#D9D9D9" />
    <rect x="35" y="350" width="10" height="10" fill="#D9D9D9" />
    <rect x="70" y="350" width="10" height="10" fill="#D9D9D9" />
    <rect x="105" y="350" width="10" height="10" fill="#D9D9D9" />
    <rect x="140" y="350" width="10" height="10" fill="#D9D9D9" />
    <rect x="175" y="350" width="10" height="10" fill="#D9D9D9" />
    <rect x="210" y="350" width="10" height="10" fill="#D9D9D9" />
    <rect x="245" y="350" width="10" height="10" fill="#D9D9D9" />
    <rect x="280" y="350" width="10" height="10" fill="#D9D9D9" />
    <rect x="315" y="350" width="10" height="10" fill="#D9D9D9" />
    <rect x="350" y="350" width="10" height="10" fill="#D9D9D9" />
    <rect x="385" y="350" width="10" height="10" fill="#D9D9D9" />
    <rect x="420" y="350" width="10" height="10" fill="#D9D9D9" />
    <rect x="455" y="350" width="10" height="10" fill="#D9D9D9" />
    <rect y="385" width="10" height="10" fill="#D9D9D9" />
    <rect x="35" y="385" width="10" height="10" fill="#D9D9D9" />
    <rect x="70" y="385" width="10" height="10" fill="#D9D9D9" />
    <rect x="105" y="385" width="10" height="10" fill="#D9D9D9" />
    <rect x="140" y="385" width="10" height="10" fill="#D9D9D9" />
    <rect x="175" y="385" width="10" height="10" fill="#D9D9D9" />
    <rect x="210" y="385" width="10" height="10" fill="#D9D9D9" />
    <rect x="245" y="385" width="10" height="10" fill="#D9D9D9" />
    <rect x="280" y="385" width="10" height="10" fill="#D9D9D9" />
    <rect x="315" y="385" width="10" height="10" fill="#D9D9D9" />
    <rect x="350" y="385" width="10" height="10" fill="#D9D9D9" />
    <rect x="385" y="385" width="10" height="10" fill="#D9D9D9" />
    <rect x="420" y="385" width="10" height="10" fill="#D9D9D9" />
    <rect x="455" y="385" width="10" height="10" fill="#D9D9D9" />
  </svg>
);
