import { format } from 'date-fns'

export const getHumanizedDateFormat = (date) => {
  if (!date) return '-'
  return format(new Date(Number(date)), 'dd/MM/yyyy')
}

export const dateFormat = (date) => format(new Date(date), 'dd/MM/yyyy')
