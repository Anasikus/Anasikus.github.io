import { getLenisInstance } from "../hooks/useLenis";

const HEADER_OFFSET = 90;

/*
 * Скроллит к элементу по CSS-селектору (обычно "#id"),
 * с отступом на высоту фиксированной шапки. Использует
 * тот же экземпляр Lenis, что и колесо мыши — иначе
 * получаются два независимых источника истины о позиции
 * скролла, которые сбрасывают друг друга.
 */
export const scrollToSection = (
  hash: string
) => {
  const target =
    document.querySelector(hash);

  if (!(target instanceof HTMLElement)) {
    return;
  }

  const lenis = getLenisInstance();

  if (lenis) {
    lenis.scrollTo(target, {
      offset: -HEADER_OFFSET,
    });

    return;
  }

  const top =
    target.getBoundingClientRect().top +
    window.scrollY -
    HEADER_OFFSET;

  window.scrollTo({
    top,
    behavior: "smooth",
  });
};
