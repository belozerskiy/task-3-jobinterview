export default function routesAdapter(companies) {
  if (typeof companies !== 'object') return []
  const result = []

  Object.keys(companies).map((company) => {
    return companies[company].forEach(({ src, des, price }) =>
      result.push({
        company,
        src,
        des,
        price,
      })
    )
  })

  // result.sort((a, b) => a.price - b.price)

  return result
}
