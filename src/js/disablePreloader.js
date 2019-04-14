const disablePreloader = () =>
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      const loader = document.querySelector('.preloader');
      loader.parentNode.removeChild(loader);
    }, 1000);
  });

export default disablePreloader;
