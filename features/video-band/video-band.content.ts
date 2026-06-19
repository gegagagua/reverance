export const VIDEO = {
  youtubeId: 'C6rf51uHWJg',
  image: '/theme/images/background/2.webp',
} as const

/** Privacy-friendly embed that autoplays once the facade is clicked. */
export const embedUrl = (id: string) => `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`
