export interface Form {
  id: number | null
  code_per_piece: number | undefined
  weight: number | undefined
  tear: string | undefined
  op: string | undefined
  date: Date | undefined
  operator: string | undefined
  total_weight: number | undefined
  review: string | undefined
  second_quality: string | undefined
}