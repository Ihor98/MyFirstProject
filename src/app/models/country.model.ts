export interface Country {
  name: string;
  topLevelDomain: Array<string>;
  alpha2Code: string;
  alpha3Code: string;
  callingCodes: Array<number>;
  capital: string;
  altSpellings: Array<string>;
  region: string;
  subregion: string;
  population: number;
  latlng: Array<number>;
  demonym: string;
  area: number;
  gini: number;
  timezones: string;
  borders: Array<string>;
  nativeName: string;
  numericCode: number;
  currencies: Array<object>;
  languages: Array<object>;
  translations: Array<string>;
  flag: string;
  regionalBlocs: Array<object>;
  cioc: string;
}
