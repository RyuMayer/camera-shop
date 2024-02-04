export const getAllSearchParams = (params: URLSearchParams) => {
  let allParams = {};

  for (const [key, value] of params.entries()) {
    allParams = { ...allParams, [key]: value };
  }

  return allParams;
};
