import styles from './Map.module.scss';
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
          zoom: 15,
        });

        const contentBox = document.createElement('div');
        contentBox.innerHTML = 'The Nailist, 38 Shepherds Bush Road, London, W6 7PJ';
        contentBox.className = styles.customContentBox; // You can define the styles in your CSS module
        // Add the custom content box to the map
        map.controls[googleApi.maps.ControlPosition.TOP_LEFT].push(contentBox);

        const labelElement = document.createElement('div');
        labelElement.innerHTML = 'The Nailist'; // Label content
        labelElement.className = styles.customLabel;

        const marker = new googleApi.maps.Marker({
          position: { lat: 51.50167594341143, lng: -0.22241806441828063 },
          map: map,
          animation: googleApi.maps.Animation.DROP,
          title: 'The Nailist',
        });

        const contentString = `
          <div>
            <h3>The Nailist</h3>
            <p>38 Shepherds Bush Road</p>
            <p>London</p>
            <p>W6 7PJ</p>
          </div>
        `;

        const infoWin = new googleApi.maps.InfoWindow({
          content: contentString
        });

        marker.addListener('click', () => {
          infoWin.open(map, marker);
        });

      } catch (error) {
        console.error('Failed to load Google Maps:', error);
      }
    };

    initializeMap();

  }, []);

  return (
    <div className={styles.container}>
      <div ref={mapContainer} style={{ height: '550px', width: '100%' }} />
    </div>
  );
};

export default GoogleMap;