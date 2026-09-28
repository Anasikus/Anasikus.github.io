export interface Certificate {
  title: string;
  issuer?: string;
  year?: string;
  description?: string;
  image: string;
}

/*
 * Пока пусто — секция «Достижения» сама скрывает себя,
 * если массив пуст (см. Certificates.tsx). Чтобы добавить
 * грамоту/сертификат: положите изображение в
 * public/certificates/ и добавьте сюда запись, например:
 *
 * {
 *   title: "Победитель конкурса ...",
 *   issuer: "Название организации",
 *   year: "2025",
 *   description: "Где и как получена — пара предложений о том, за что вручена.",
 *   image: "/certificates/example.webp",
 * }
 */
export const certificates: Certificate[] =
  [];
