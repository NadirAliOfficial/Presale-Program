

const dictionaries = {
  'en-US': () => import('./dictionaries/en.json').then((module) => module.default),
  'de-ES': () => import('./dictionaries/de.json').then((module) => module.default), // German dictionary
  'de': () => import('./dictionaries/de.json').then((module) => module.default), // Alias for German dictionary
};

export const getDictionary = async (locale: 'en-US' | 'de-ES' | 'de') => 
  dictionaries[locale]()
