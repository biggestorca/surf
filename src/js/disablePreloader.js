const disablePreloader = () =>
  window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      const loader = document.querySelector('.preloader');
      loader.parentNode.removeChild(loader);
    }, 0);
  });

export default disablePreloader;
