const parameterBlock = () => {
  window.addEventListener(
    'DOMContentLoaded',
    () => {
      const $parameteresList = Array.prototype.slice.call(
        document.querySelectorAll('.parameter__item'),
        0,
      );
      $parameteresList.forEach((parameterItem) => {
        const parameterName = parameterItem.querySelector('.parameter__name');
        const computedNameStyle = window.getComputedStyle(parameterName, null);

        // eslint-disable-next-line no-param-reassign
        parameterItem.style.minHeight = `${+computedNameStyle
          .getPropertyValue('width')
          .slice(0, -2) + 18}px`;

        parameterName.style.minWidth = `${+computedNameStyle
          .getPropertyValue('width')
          .slice(0, -2) + 18}px`;
      });
    },
    false,
  );
};

export default parameterBlock;
