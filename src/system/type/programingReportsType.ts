export interface Form {
  id: number | null
  name: string | undefined
  rpm: number | undefined
  op: number | undefined
  tear: number | undefined
  date_start: Date | undefined
  date_end: Date | undefined
  efficiency: number | undefined
  weight_daily: number | undefined
  days_for_done: number | undefined
}