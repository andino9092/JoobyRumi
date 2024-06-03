export function formatPrice(number: number, currencyCode: string){
  return Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2,
  }).format(number)
}