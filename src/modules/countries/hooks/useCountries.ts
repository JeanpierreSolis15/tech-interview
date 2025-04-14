import { useQuery, gql } from '@apollo/client'
import { useCountriesStore } from '../../shared/store/countriesStore'
import { Country } from '../../shared/types/CountryType'

const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      code
      name
      continent {
        name
      }
      currency
    }
  }
`

interface CountriesData {
  countries: Country[]
}

export const useCountries = () => {
  const { setCountriesData } = useCountriesStore()
  const { loading, error } = useQuery<CountriesData>(GET_COUNTRIES, {
    onCompleted: data => {
      setCountriesData(data.countries)
    },
  })

  return { loading, error }
}
