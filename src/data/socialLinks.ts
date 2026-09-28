export interface SocialLink {
  name: string;
  url: string;
}

/*
 * Иконки этих ссылок показаны в затемнённом футере (см.
 * Contact.tsx) — Email туда добавляется отдельно, он не
 * "внешняя" ссылка, а mailto:, собранный из data/contactInfo.
 */
export const socialLinks: SocialLink[] = [
  {
    name: "VK",
    url: "https://vk.ru/anasikus",
  },

  {
    name: "Telegram",
    url: "https://t.me/Anasikus",
  },
];
