const headerDatetime = () =>
  document.addEventListener('DOMContentLoaded', () => {
    const dateBlockSelector = '#date';

    function getData() {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1 < 10 ? `0${now.getMonth() + 1}` : now.getMonth() + 1;
      const day = now.getDate() < 10 ? `0${now.getDate()}` : now.getDate();

      return {
        year,
        month,
        day,
      };
    }

    function setDataToMarkup(selector, data) {
      const $dateBlock = document.querySelector(selector);

      $dateBlock.querySelector('.day').innerText = data.day;
      $dateBlock.querySelector('.month').innerText = data.month;
      $dateBlock.querySelector('.year').innerText = data.year;
    }

    setDataToMarkup(dateBlockSelector, getData());

    setTimeout(() => {
      setDataToMarkup(dateBlockSelector, getData());
    }, 60 * 60 * 24);
  });

export default headerDatetime;
