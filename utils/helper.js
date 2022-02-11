export const getFullYear = (date) => {
  return new Date(date).getFullYear();
};
export const getFullDate = (date) => {
  return new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const getLanguage = (lang) => {
  const languageNames = new Intl.DisplayNames(["en"], { type: "language" });
  return languageNames.of(lang);
};
