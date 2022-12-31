import { compile } from "path-to-regexp";

export const pathToUrl = (path, params = {}) => compile(path)(params);

export const debounce = (func, delay = 1000) => {
  let timer;
  return (...argument) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      // eslint-disable-next-line no-undef
      func.apply(this, argument);
    }, delay);
  };
};
