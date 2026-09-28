import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

import styles from "./Reveal.module.scss";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/*
 * Мягкое появление блока при прокрутке. Без GSAP/ScrollTrigger —
 * достаточно IntersectionObserver и CSS-перехода, а значит нет
 * лишних пересчётов при смене страниц.
 */
const Reveal = ({
  children,
  delay = 0,
  className = "",
}: RevealProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;

    if (!el) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${styles.reveal} ${
        visible ? styles.visible : ""
      } ${className}`}
      style={
        { "--reveal-delay": `${delay}ms` } as CSSProperties
      }
    >
      {children}
    </div>
  );
};

export default Reveal;
