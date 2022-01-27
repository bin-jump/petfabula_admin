import moment from 'moment';

export const toDate = (mili: number) => {
  const d = moment(mili).toDate();
  return d;
};

export const toDateText = (mili: number) => {
  const d = toDate(mili);
  const year = d.getFullYear();
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  return `${year}/${month}/${day}`;
};

export const getMonthDateText = (mili: number) => {
  let d = toDate(mili),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate();

  return `${month}/${day}`;
};

export const getTimeText = (mili: number) => {
  let d = toDate(mili);
  const hour = d.getHours();
  const minute = d.getMinutes();

  return `${hour}:${minute}`;
};

export const toFullTextDate = (mili: number) => {
  return `${toDateText(mili)} ${getTimeText(mili)}`;
};

type Size = 'LG' | 'MD' | 'SM';

export const sizedUri = (uri: string, sz?: Size) => {
  if (!uri) {
    return uri;
  }

  if (!sz || uri.length <= 3) {
    return uri;
  }
  if (uri.charAt(uri.length - 3) == '!') {
    return uri;
  }

  return `${uri}!${sz.toLowerCase()}`;
};
