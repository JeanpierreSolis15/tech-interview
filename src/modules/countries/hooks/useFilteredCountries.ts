import { useMemo } from 'react'
import { Country } from '../../shared/types/CountryType'

export const useFilteredCountries = (
  countries: Country[],
  search: string,
  selectedContinent: string | null,
  selectedCurrency: string | null,
  loading: boolean,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any
) => {
  return useMemo(() => {
    if (loading || error) return []

    return countries.filter(country => {
      const matchesSearch = country.name.toLowerCase().includes(search.toLowerCase())
      const matchesContinent =
        !selectedContinent ||
        selectedContinent === 'Todos los Continentes' ||
        country.continent.name === selectedContinent
      const matchesCurrency =
        !selectedCurrency || selectedCurrency === 'Todas las Monedas' || country.currency === selectedCurrency
      return matchesSearch && matchesContinent && matchesCurrency
    })
  }, [countries, search, selectedContinent, selectedCurrency, loading, error])
}
