const footerDate = () =>
  document.addEventListener('DOMContentLoaded', () => {
    const year = document.getElementById('footer-year');

    const nowYear = new Date().getFullYear();

    year.innerText = nowYear;
  });

export default footerDate;
