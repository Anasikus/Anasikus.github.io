/*
 * Простые самодельные иконки-пиктограммы (не логотипы брендов)
 * для футера: конверт, бумажный самолётик и телефонная трубка —
 * узнаваемые универсальные символы. ВК — контурный знак «VK»
 * в том же линейном стиле, без внутреннего круга (круг — сама кнопка).
 */

export const EmailIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="3"
      y="5"
      width="18"
      height="14"
      rx="3"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <path
      d="m4.5 6.5 7.5 6 7.5-6"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const TelegramIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20.5 4.5 3.6 11.1c-.9.35-.9 1.63.02 1.96l4.1 1.46 1.6 5.05c.2.63 1 .8 1.44.31l2.25-2.5 4.23 3.12c.65.48 1.58.13 1.75-.66l3.04-14.02c.19-.87-.7-1.57-1.53-1.32Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M7.72 14.56 17 8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const PhoneIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.6 3.5 9 4.1c.5.13.87.55.93 1.06l.34 3.07a1.3 1.3 0 0 1-.5 1.18l-1.68 1.3a13.4 13.4 0 0 0 5.7 5.7l1.3-1.68a1.3 1.3 0 0 1 1.18-.5l3.07.34c.51.06.93.43 1.06.93l.6 2.4a1.3 1.3 0 0 1-.78 1.53c-.85.35-2.03.7-3.12.6-4.5-.4-9.5-5.4-9.9-9.9-.1-1.1.25-2.27.6-3.12A1.3 1.3 0 0 1 6.6 3.5Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const VkIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g transform="translate(12 12.2) scale(1.3) translate(-12 -12.2)">
      <path
        d="M5.32 8.06H7.61C7.75 11.65 9.05 13.39 10.7 13.84V8.06H12.85V11.36C14.43 11.22 15.65 9.74 16.01 8.06H18.16C17.73 10.09 16.34 11.48 15.23 12.21C16.86 12.95 18.16 14.6 18.67 16.39H16.31C15.65 14.26 14.26 13.56 12.85 13.41V16.39H12.43C7.31 16.39 5.49 12.52 5.32 8.06Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);
