// src/components/Map.tsx
import React, { useState } from "react";
import Map, { Marker, Popup, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Country } from "../../lib/types";

const MAPBOX_TOKEN = "pk.eyJ1IjoicGFibG90dHR0dHQiLCJhIjoiY2x2d284ZHZoMHgzNTJrbjZ5aHB4dWtrbiJ9.8uzJY32mcKRK9eJKYcyaUQ";

interface CountryWithCoords extends Country {
  latitude: number | null;
  longitude: number | null;
}

interface MapProps {
  countries: CountryWithCoords[];
}

const MapComponent: React.FC<MapProps> = ({ countries }) => {
  const [viewport, setViewport] = useState({
    latitude: 20,
    longitude: 0,
    zoom: 2,
  });

  const handleViewportChange = (event: { viewState: any }) => {
    setViewport(event.viewState);
  };

  const filteredCountries = countries.filter(
    (country) => country.latitude !== null && country.longitude !== null
  );

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <Map
        initialViewState={viewport}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
        onMove={handleViewportChange}
      >
        {filteredCountries.map((country) => (
          <Marker
            key={country.code}
            latitude={country.latitude!}
            longitude={country.longitude!}
            anchor="bottom"
          >
            <div style={{ cursor: "pointer" }}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-600"
              >
                <circle cx="12" cy="12" r="3" fill="yellow" />
                <path d="M12 2v20M2 12h20" />
              </svg>
            </div>
          </Marker>
        ))}

        <NavigationControl />
      </Map>
    </div>
  );
};

export default MapComponent;
