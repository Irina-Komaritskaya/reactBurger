import { format } from 'date-fns';
export const getFormattedDate = (data: string) => {
  const currDate = new Date();
  const parseDate = new Date(data);

  const formatDate =
    format(parseDate, 'HH:mm ') + 'i-GMT ' + format(parseDate, 'X');

  currDate.setHours(0);
  currDate.setMinutes(0);
  currDate.setSeconds(0);
  currDate.setMilliseconds(0);

  parseDate.setHours(0);
  parseDate.setMinutes(0);
  parseDate.setSeconds(0);
  parseDate.setMilliseconds(0);

  const diffTime = Math.abs(parseDate.getTime() - currDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  let prefix = '';
  if (diffDays === 0) {
    prefix = 'Сегодня';
  } else if (diffDays === 1) {
    prefix = 'Вчера';
  } else if (diffDays < 5) {
    prefix = `${diffDays} дня назад`;
  } else {
    prefix = `${diffDays} дней назад`;
  }
  
  const result = `${prefix}, ${formatDate}`;
  return result;
};
