const disablePreloader = () =>
  window.addEventListener('load', () => {
    setTimeout(() => {
      const loader = document.querySelector('.preloader');
      loader.parentNode.removeChild(loader);
    }, 0);
  });

export default disablePreloader;
