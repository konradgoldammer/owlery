export const titleSuffix = " - Owlery";

export const timeSince = (date) => {
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
};

export const isError = (inp) => {
  return inp && inp.stack && inp.message;
};

export const yearsArray = (startYear = 1980) => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = startYear; i <= currentYear; i++) {
    years.push(i);
  }
  years.reverse();
  return years;
};
