const DAY_TO_LABEL_MAP = {
  'monday': 'Понедельник',
  'thusday': 'Вторник',
  'wensday': 'Среда',
  'thursday': 'Четверг',
  'friday': 'Пятница',
  'saturday': 'Суббота',
  'sunday': 'Воскресенье',
}

export const mapDayToLabel = (day) => {
  const days = day.split('To');
  return days.map(day => DAY_TO_LABEL_MAP[day.toLowerCase()]).join(' - ');
};
