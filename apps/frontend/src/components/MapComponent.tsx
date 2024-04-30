import React, { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const center = {
  lat: 32.0853,
  lng: 34.7818,
};

// eslint-disable-next-line react-refresh/only-export-components
function MapComponent({ hotels, zoom = 3 }) {
  const [markers, setMarkers] = useState([]);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyC5XuSK5pTKzzATo2ek1StKSwhG-Nmi4V0",
  });

  useEffect(() => {
    const fetchGeocode = async () => {
      if (!window.google) {
        return;
      }
      const geocoder = new window.google.maps.Geocoder();

      const markersData = await Promise.all(
        hotels.map(async (hotel) => {
          try {
            const response = await geocoder.geocode({ address: hotel.address });

            const { lat, lng } = response.results[0].geometry.location;

            return { lat: lat(), lng: lng() };
          } catch (error) {
            console.error("Error geocoding address:", error);
            return null;
          }
        })
      );

      setMarkers(markersData.filter((marker) => marker !== null));
    };

    fetchGeocode();
  }, [hotels]);

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!

    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(
      bounds
        .extend({ lat: 37.772, lng: -122.214 })
        .extend({ lat: 37.89, lng: -122.214 })
        .extend({ lat: 37.772, lng: -122.514 })
        .extend({ lat: 37.89, lng: -122.514 })
    );

    // setMap(map);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onUnmount = React.useCallback(function callback(map) {
    // setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={zoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <>
        {markers.map((marker, index) => (
          <Marker key={index} position={marker} />
        ))}
      </>
    </GoogleMap>
  ) : (
    <></>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export default React.memo(MapComponent);
