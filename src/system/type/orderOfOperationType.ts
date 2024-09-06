export interface Form {
  id: number | null
  code: string | undefined
  weight_per_piece: number | undefined
  customer: JSON | undefined
  article: JSON | undefined
  wires: JSON | undefined
  total_weight: number | undefined
  status: string | undefined
  label_item: boolean | undefined
}