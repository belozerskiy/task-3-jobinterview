export default function countryAdapter(data) {
  return Object.keys(data).map((value) => {
    return {
      text: `${data[value]} (${value})`,
      value,
    }
  })
}
