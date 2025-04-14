import { LanguageType } from './LenguageType'

export interface CountryDetailType {
  name: string
  native: string
  emoji: string
  currency: string
  code: string
  phone: string
  languages: LanguageType[]
  capital: string
  continent: { name: string }
}
