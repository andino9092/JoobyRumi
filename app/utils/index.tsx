export function formatPrice(number: number){
  return Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
  }).format(number)
}