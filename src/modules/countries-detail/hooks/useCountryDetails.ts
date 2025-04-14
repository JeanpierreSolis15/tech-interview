import { useQuery, gql } from '@apollo/client'
import { CountryDetailType } from '../types/CountryDetailType'

const GET_COUNTRY_DETAILS = gql`
  query Country($countryCode: ID!) {
    country(code: $countryCode) {
      name
      native
      emoji
      currency
      code
      phone
      languages {
        code
        name
      }
      capital
      continent {
        name
      }
    }
  }
`

interface CountryDetailData {
  country: CountryDetailType
}

interface CountryDetailVars {
  countryCode: string
}

export const useCountryDetails = (countryCode: string) => {
  const { data, loading, error } = useQuery<CountryDetailData, CountryDetailVars>(GET_COUNTRY_DETAILS, {
    variables: { countryCode },
  })

  return { country: data?.country, loading, error }
}
