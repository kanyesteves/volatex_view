export interface Form {
  id: number | null
  name: string | undefined
  tear: number | undefined
  op: number | undefined
  date_start: Date | undefined
  date_end: Date | undefined
  rpm: number | undefined
  efficiency: number | undefined
  weight_daily: number | undefined
  days_for_done: number | undefined
  wires: JSON | undefined
}