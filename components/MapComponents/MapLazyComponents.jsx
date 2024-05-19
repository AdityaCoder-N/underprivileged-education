import { useEffect, useState } from 'react';
import { MapContainer as LMapContainer, Marker as LMarker } from 'react-leaflet';
import { useMapEvents } from 'react-leaflet/hooks';

// Wrapper for MapContainer to forward refs
export const MapContainer = ({ forwardedRef, ...props }) => (
  <LMapContainer {...props} ref={forwardedRef} />
);

// Wrapper for Marker to dynamically load leaflet for custom icons
export const Marker = ({ forwardedRef, icon: iconProps, ...props }) => {
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    const loadIcon = async () => {
      const L = await import('leaflet');
      setIcon(L.icon(iconProps));
    };
    loadIcon();
  }, [iconProps]);

  return (!iconProps || !icon) ? null : (
    <LMarker {...props} icon={icon} ref={forwardedRef} />
  );
};

// Wrapper for handling map events
export const MapConsumer = ({ eventsHandler }) => {
  useMapEvents(eventsHandler);
  return null;
};
