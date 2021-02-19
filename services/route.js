import { response } from '@/services/__mock__'
import routesAdapter from '@/adapters/routesAdapter'

const delay = (time) =>
  new Promise((resolve) => {
    setTimeout(resolve, time)
  })

export default {
  async find({ source, destination, filters, meta = { page: 1 } }) {
    if (source && destination) {
      try {
        const json = await Promise.resolve(response.data.company)
        const company = routesAdapter(json)
        let result = []

        if (filters.includes('direct') || filters.includes('all')) {
          result = company
            .filter((c) => c.src === source && c.des === destination)
            .map((res) => [res])
        }

        if (filters.includes('one') || filters.includes('all')) {
          const srcArray = company.filter(
            (c) => c.src === source && c.des !== destination
          )

          const destArray = company.filter(
            (c) => c.src !== source && c.des === destination
          )

          srcArray.forEach((src) => {
            destArray.forEach((dest) => {
              if (src.des === dest.src && dest.des === destination) {
                result.push([src, dest])
              }
            })
          })
        }

        if (filters.includes('two') || filters.includes('all')) {
          const srcArray = company.filter(
            (c) => c.src === source && c.des !== destination
          )

          const destArray = company.filter(
            (c) => c.src !== source && c.des === destination
          )

          const array = company.filter(
            (c) => c.src !== source && c.des !== destination
          )

          array.forEach((middle) => {
            srcArray.forEach((src) => {
              if (middle.src === src.des) {
                destArray.forEach((dest) => {
                  if (middle.des === dest.src) {
                    result.push([src, middle, dest])
                  }
                })
              }
            })
          })
        }

        result = result.sort((a, b) => {
          const sumOfA = a
            .map((v) => v.price)
            .reduce((accumulator, currentValue) => accumulator + currentValue)

          const sumOfB = b
            .map((v) => v.price)
            .reduce((accumulator, currentValue) => accumulator + currentValue)

          return sumOfA - sumOfB
        })

        const limit = 4
        meta.page = meta.page ?? 1
        meta.total = result.length / 4

        const leftOffset = (meta.page - 1) * limit
        const rightOffset = meta.page * limit

        result = result.slice(leftOffset, rightOffset)
        await delay(1000)

        return { routes: result, pagination: meta }
      } catch (error) {
        throw new Error(error)
      }
    }
  },
}
