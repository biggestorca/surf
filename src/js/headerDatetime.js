const headerDatetime = () =>
  document.addEventListener('DOMContentLoaded', () => {
    function getData() {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const day = now.getDate();

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

    setDataToMarkup('#date', getData());

    setTimeout(() => {
      setDataToMarkup('#date', getData());
    }, 60 * 60 * 24);
  });

export default headerDatetime;
