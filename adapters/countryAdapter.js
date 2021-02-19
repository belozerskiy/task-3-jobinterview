export default function countryAdapter(data) {
  // if (typeof companies !== 'array') return []
  return Object.keys(data).map((value) => {
    return {
      text: `${data[value]} (${value})`,
      value,
    }
  })
}
