import { useQuery, gql } from '@apollo/client'

const GET_CONTINENTS = gql`
  query GetContinents {
    continents {
      code
      name
    }
  }
`

interface Continent {
  code: string
  name: string
}

interface ContinentsData {
  continents: Continent[]
}

export const useContinents = () => {
  const { data, loading, error } = useQuery<ContinentsData>(GET_CONTINENTS)
  return {
    continents: data?.continents || [],
    loading,
    error,
  }
}
