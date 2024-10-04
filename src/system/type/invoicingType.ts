export interface Form {
  records: JSON | null
  weight_per_wire: JSON | null
  total_weight: number | null
  customer: string | undefined
  article: string | undefined
  op: string | undefined
}