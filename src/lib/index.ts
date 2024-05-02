function getUnit(time: number): string {
  if (time < 10) {
    return time.toString().padStart(2, '0');
  }

  return time.toString();
}

export function getDate(date: Date): string {
  return getUnit(date.getDate()) + '.' + getUnit(date.getMonth() + 1) + '.' + date.getFullYear();
}