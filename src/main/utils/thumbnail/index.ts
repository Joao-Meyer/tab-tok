export const thumbnail = (user: string, slug: string): string =>
  `${import.meta.env.VITE_API_URL}/contents/${user}/${slug}/thumbnail`;
