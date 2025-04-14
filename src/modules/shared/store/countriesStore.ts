import { create } from 'zustand'
import { Country } from '../../shared/types/CountryType'

interface CountriesState {
  countries: Country[]
  continents: string[]
  currencies: string[]
  search: string
  selectedContinent: string | null
  selectedCurrency: string | null
  setCountriesData: (countries: Country[]) => void
  setSearch: (search: string) => void
  setSelectedContinent: (continent: string | null) => void
  setSelectedCurrency: (currency: string | null) => void
}

export const useCountriesStore = create<CountriesState>(set => ({
  countries: [],
  continents: ['Todos los Continentes'],
  currencies: ['Todas las Monedas'],
  search: '',
  selectedContinent: null,
  selectedCurrency: null,
  setCountriesData: countries =>
    set(state => {
      const continents = ['Todos los Continentes', ...Array.from(new Set(countries.map(c => c.continent.name)))]
      const currencies = ['Todas las Monedas', ...Array.from(new Set(countries.map(c => c.currency)))]
      return { ...state, countries, continents, currencies }
    }),
  setSearch: search => set({ search }),
  setSelectedContinent: selectedContinent => set({ selectedContinent }),
  setSelectedCurrency: selectedCurrency => set({ selectedCurrency }),
}))
