// https://github.com/iamdustan/smoothscroll
import smoothscroll from 'smoothscroll-polyfill';

smoothscroll.polyfill();

const smoothScrollToAnchor = () => {
  document.addEventListener('DOMContentLoaded', () => {
    const $anchorList = Array.prototype.slice.call(document.querySelectorAll('a[href^="#"]'), 0);

    $anchorList.forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();

        document.querySelector(anchor.getAttribute('href')).scrollIntoView({
          behavior: 'smooth',
        });
      });
    });
  });
};

export default smoothScrollToAnchor;
