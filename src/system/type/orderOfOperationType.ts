export interface Form {
  id: number | null
  code: string | undefined
  weight_per_piece: number | undefined
  customer: number | undefined
  article: number | undefined
  wires: number[] | undefined
  total_weight: number | undefined
  status: string | undefined
  label_item: boolean | undefined
  wire_porcentage: JSON | undefined
}