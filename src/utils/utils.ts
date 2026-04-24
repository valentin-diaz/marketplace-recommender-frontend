export const truncateNumber = (num: number, decimals: number = 2): string => {
  if (num === null || num === undefined) return 'N/A'
  const factor = Math.pow(10, decimals)
  return (Math.round(num * factor) / factor).toFixed(decimals)
}

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}