import { useEffect } from "react";
import Lenis from "lenis";

export const useLenis = () => {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      smoothWheel: true,
    });

    return () => {
      lenis.destroy();
    };
  }, []);
};