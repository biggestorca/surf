export const isIE = () =>
  window.navigator.userAgent.indexOf('MSIE') !== -1 || !!document.documentMode === true;

export const isEDGE = () => /Edge/.test(window.navigator.userAgent);
