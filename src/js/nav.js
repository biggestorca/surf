const navigatorStyling = () =>
  document.addEventListener('DOMContentLoaded', () => {
    const loc = window.location.pathname;
    const navList = document.getElementsByClassName('nav__link');

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < navList.length; i++) {
      const attrHref = navList[i].getAttribute('href');
      if (loc === attrHref) {
        navList[i].classList.add('nav__link--active');
      } else {
        navList[i].classList.remove('nav__link--active');
      }
    }
  });

export default navigatorStyling;
