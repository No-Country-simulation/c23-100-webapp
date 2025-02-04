export function formatHourByDate(date: Date) {
  const hours = date.getHours();
  const convertedHours = hours % 12 || 12;
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const suffix = hours >= 12 ? 'PM' : 'AM';

  const formattedHour = `${convertedHours
    .toString()
    .padStart(2, '0')}:${minutes} ${suffix}`;

  return formattedHour;
}
