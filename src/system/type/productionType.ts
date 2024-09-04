export interface Form {
  id: number | null
  code_per_piece: number | undefined
  weight: number | undefined
  tear: JSON | undefined
  op: JSON | undefined
  date: Date | undefined
  operator: JSON | undefined
  total_weight: number | undefined
  review: string | undefined
  labeled_item: boolean | undefined
}