// src/lib/types.ts

// Interfaz para la información de un continente
export interface Continent {
  name: string;
}

// Interfaz para la información de un idioma
export interface Language {
  name: string;
}

// Interfaz para la información de un país
export interface Country {
  code: string;
  name: string;
  continent: {
    name: string;
  };
  capital: string;
  native: string;
  phone: string;
  currency: string;
  languages: {
    name: string;
  }[];
  emoji: string;
  emojiU: string;
}

// Interfaz para los props de la página principal
export interface HomePageProps {
  countries: Country[];
}

export interface CountriesResponse {
  countries: Country[];
}