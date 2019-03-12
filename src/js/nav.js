const navigatorStyling = () =>
  document.addEventListener('DOMContentLoaded', () => {
    const loc = window.location.pathname;
    const navList = document.getElementsByClassName('nav-item');

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < navList.length; i++) {
      const attrHref = navList[i].getElementsByClassName('nav-link')[0].getAttribute('href');
      if (loc === attrHref) {
        navList[i].classList.add('active');
      } else {
        navList[i].classList.remove('active');
      }
    }
  });

export default navigatorStyling;
