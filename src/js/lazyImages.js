const lazyImagesLoader = () =>
  document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = Array.prototype.slice.call(document.querySelectorAll('img.lazy'));

    if ('IntersectionObserver' in window) {
      const lazyImageObserver = new window.IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const lazyImage = entry.target;
            if (lazyImage.dataset.src) {
              lazyImage.src = lazyImage.dataset.src;
            }
            if (lazyImage.dataset.srcset) {
              lazyImage.srcset = lazyImage.dataset.srcset;
            }

            lazyImage.classList.remove('lazy');
            lazyImageObserver.unobserve(lazyImage);
          }
        });
      });

      lazyImages.forEach((lazyImage) => {
        lazyImageObserver.observe(lazyImage);
      });
    } else {
      // Possibly fall back to a more compatible method here
    }
  });

export default lazyImagesLoader;
