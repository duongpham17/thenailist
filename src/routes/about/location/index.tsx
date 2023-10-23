import React, { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const GoogleMap = () => {
  const mapContainer = useRef(null);

  useEffect(() => {
    const api = process.env.NEXT_PUBLIC_API_GOOGLE_MAP_API_KEY as string;

    const initializeMap = async () => {
      const loader = new Loader({
        apiKey: api,
        version: 'weekly',
      });

      try {
        const googleApi: any = await loader.load();
        
        const map = new googleApi.maps.Map(mapContainer.current as any, {
          center: { lat: 51.50167594341143, lng: -0.22241806441828063 },
          zoom: 12,
        });

        new googleApi.maps.Marker({
          position: { lat: 51.50167594341143, lng: -0.22241806441828063 },
          map: map,
          title: 'The Nailist',
        });
      } catch (error) {
        console.error('Failed to load Google Maps:', error);
      }
    };

    initializeMap();

  }, []);

  return (
    <div id="location">
      <div ref={mapContainer} style={{ height: '550px', width: '100%' }} />
    </div>
  );
};

export default GoogleMap;