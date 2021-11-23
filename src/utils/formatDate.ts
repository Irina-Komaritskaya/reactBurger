import { format, isToday, isYesterday, formatDistance } from "date-fns";
import { ru } from "date-fns/locale";

export function getFormattedDate(d: Date) {
  if (isToday(d)) {
    return `Сегодня, ${format(d, "kk:mm", { locale: ru })}`;
  }

  if (isYesterday(d)) {
    return `Вчера, ${format(d, "kk:mm", { locale: ru })}`;
  }

  return `${formatDistance(new Date(d), Date.now(), { locale: ru })} назад`;
}


