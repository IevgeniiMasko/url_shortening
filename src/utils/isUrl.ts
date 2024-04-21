export const isUrl = (url: string) => {
  return url.match(
    /^(?:http(s)?:\/\/)([\w.-])+(?:[\w\.-]+)+([\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.])+$/,
  );
};
