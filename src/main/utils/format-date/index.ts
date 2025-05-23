import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const formatDate = (date: Date | string | null, formatType?: string): string => {
  try {
    if (date === null) return '';

    return format(new Date(date ?? null), formatType ?? 'dd/MM/yyyy', {
      locale: ptBR
    });
  } catch {
    return '';
  }
};

export const formatHour = (date?: string | null): string => {
  if (!date) return '';

  return String(date)?.slice(0, 5);
};
