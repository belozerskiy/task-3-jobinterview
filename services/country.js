import { response } from '@/services/__mock__'
import countryAdapter from '@/adapters/countryAdapter'

export default {
  async find() {
    const json = await Promise.resolve(response.data.country)
    const country = countryAdapter(json)
    return country
  },
}
