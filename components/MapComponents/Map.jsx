import { useRef, useMemo,useEffect } from 'react';
import { MapContainer, TileLayer, ZoomControl, Marker, MapConsumer } from './MapComponents.jsx';

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import L from 'leaflet';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-routing-machine';

const Map = ({ userCoordinates, selectedTeacher }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current && userCoordinates && selectedTeacher?.location) {
      const userLat = userCoordinates[0];
      const userLng = userCoordinates[1];
      const { latitude: teacherLat, longitude: teacherLng } = selectedTeacher.location;

      const mapInstance = mapRef.current;

      // Remove existing routes and markers
      mapInstance.eachLayer((layer) => {
        if (layer.options && (layer.options.name === 'route' || layer.options.name === 'marker')) {
          mapInstance.removeLayer(layer);
        }
      });

      // Add new route
      L.Routing.control({
        waypoints: [
          L.latLng(userLat, userLng),
          L.latLng(teacherLat, teacherLng),
        ],
        createMarker: () => null,
        routeWhileDragging: true,
        addWaypoints: false,
        draggableWaypoints: false,
        fitSelectedRoutes: true,
      }).addTo(mapInstance);

      // Add user marker
      const userMarker = L.marker([userLat, userLng], { name: 'marker' }).addTo(mapInstance);
      userMarker.bindPopup('You are here').openPopup();

      // Add teacher marker
      const teacherMarker = L.marker([teacherLat, teacherLng], { name: 'marker' }).addTo(mapInstance);
      teacherMarker.bindPopup(`${selectedTeacher.name}'s location`).openPopup();
    }
  }, [userCoordinates, selectedTeacher]);

  const mapHandlers = useMemo(() => ({
    click(e) {
      this.setView([e.latlng.lat, e.latlng.lng]);
    },
  }), []);

  const defaultCenter = userCoordinates || [51.505, -0.09];

  return (
    <MapContainer ref={mapRef} center={defaultCenter} zoom={13} touchZoom={false} zoomControl={false} style={{ height: '400px', zIndex: '0!important' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" style={{ zIndex: '0!important' }} />
      <ZoomControl position="topright" style={{ zIndex: '10!important' }} />
      <MapConsumer eventsHandler={mapHandlers} />
    </MapContainer>
  );
};

export default Map;


