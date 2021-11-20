import { format } from 'date-fns';
export const getFormattedDate = (data: string) => {
    const currDate = new Date()
    const parseDate = new Date(data);
    const formatDate =
      format(parseDate, 'HH:mm ') + 'i-GMT ' + format(parseDate, 'X');
    const diffTime = Math.abs(parseDate.getTime() - currDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    let prefix = ''
    if (diffDays === 0){
      prefix = 'Сегодня'
    } else if( diffDays === 1){
      prefix = 'Вчера'
    } else if (diffDays < 5){
      prefix = `${diffDays} дня назад`
    } else {
      prefix = `${diffDays} дней назад`
    }
     const result = `${prefix}, ${formatDate}`
    return result;
  };