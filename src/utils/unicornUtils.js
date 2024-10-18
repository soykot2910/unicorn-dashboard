export function getUnicornStatus(age) {
  const ageNum = parseInt(age)
  if (ageNum >= 0 && ageNum <= 8) return 'Baby Unicorn'
  if (ageNum >= 9 && ageNum <= 25) return 'Mature Unicorn'
  if (ageNum >= 26) return 'Old Unicorn'
  return 'Unknown'
}
