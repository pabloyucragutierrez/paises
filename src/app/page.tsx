// src/app/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import client from '../../lib/graphql';
import { GET_COUNTRIES } from '../../lib/queries';
import { Country, CountriesResponse } from '../../lib/types';
import MapComponent from '../components/Map';

interface CountryWithCoords extends Country {
  latitude: number | null;
  longitude: number | null;
}

const fetchCountriesWithCoords = async (): Promise<CountryWithCoords[]> => {
  try {
    const { countries }: CountriesResponse = await client.request(GET_COUNTRIES);

    const response = await fetch('/countries.json');
    if (!response.ok) throw new Error('Error al obtener coordenadas');
    const coordinates = await response.json();

    return countries.map(country => {
      const coords = coordinates.find((c: any) => c.code === country.code);
      return {
        ...country,
        latitude: coords ? coords.latitude : null,
        longitude: coords ? coords.longitude : null,
      };
    });
  } catch (error) {
    console.error('Error al obtener países con coordenadas:', error);
    throw error;
  }
};

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [countries, setCountries] = useState<CountryWithCoords[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const data = await fetchCountriesWithCoords();
        setCountries(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    loadCountries();
  }, []);

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="mb-6 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Lista de países</h1>
        <input
          type="text"
          placeholder="Buscar por nombre o código ISO"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-3 w-full max-w-md border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </header>

      {loading && <p className="text-center text-blue-600">Cargando...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      {searchTerm && (
        <div className="mt-6">
          {filteredCountries.length > 0 ? (
            <CountryList countries={filteredCountries} />
          ) : (
            <p className="text-center text-gray-600">Países no encontrados</p>
          )}
        </div>
      )}

      {searchTerm && filteredCountries.length > 0 && (
        <div className="mt-6">
          <MapComponent countries={filteredCountries} />
        </div>
      )}
    </div>
  );
};

const CountryList: React.FC<{ countries: CountryWithCoords[] }> = ({ countries }) => (
  <div className="grid grid-cols-3 gap-6">
    {countries.map((country) => (
      <div key={country.code} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          {country.name} {country.emoji}
        </h2>
        <p className="text-gray-700"><strong>Capital:</strong> {country.capital}</p>
        <p className="text-gray-700"><strong>Continente:</strong> {country.continent.name}</p>
        <p className="text-gray-700"><strong>Idioma nativo:</strong> {country.native}</p>
        <p className="text-gray-700"><strong>Código telefónico:</strong> {country.phone}</p>
        <p className="text-gray-700"><strong>Moneda:</strong> {country.currency}</p>
        <p className="text-gray-700"><strong>Idiomas:</strong> {country.languages.map(lang => lang.name).join(', ')}</p>
      </div>
    ))}
  </div>
);

export default Home;
