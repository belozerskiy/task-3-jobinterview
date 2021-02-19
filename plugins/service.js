import route from '@/services/route'
import country from '@/services/country'

export default (_, inject) => {
  inject('service', {
    route,
    country,
  })
}
