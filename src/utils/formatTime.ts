import { format, formatDistanceToNow } from 'date-fns';
import numeral from 'numeral';
// ----------------------------------------------------------------------

export function fDate(date: string | number | Date) {
  return format(new Date(date), 'dd MMMM yyyy');
}

export function fDateTime(date: string | number | Date) {
  return format(new Date(date), 'dd MMM yyyy HH:mm');
}

export function fDateTimeSuffix(date: string | number | Date) {
  return format(new Date(date), 'dd/MM/yyyy hh:mm p');
}

export function fToNow(date: string | number | Date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true
  });
}

export function fData(number: any) {
  return numeral(number).format('0.0 b');
}