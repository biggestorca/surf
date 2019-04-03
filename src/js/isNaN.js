const isNaN = pretendent =>
  (Number.isNaN ? Number.isNaN(pretendent) : typeof pretendent !== 'number');

export default isNaN;
