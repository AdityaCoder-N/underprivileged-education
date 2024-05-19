import dynamic from 'next/dynamic';
import { forwardRef } from 'react';

// Dynamic imports with ref forwarding
export const LazyMapContainer = dynamic(() => import('./MapLazyComponents').then((m) => m.MapContainer), { ssr: false });
export const MapContainer = forwardRef((props, ref) => <LazyMapContainer {...props} forwardedRef={ref} />);

export const LazyMarker = dynamic(() => import('./MapLazyComponents').then((m) => m.Marker), { ssr: false });
export const Marker = forwardRef((props, ref) => <LazyMarker {...props} forwardedRef={ref} />);

export const TileLayer = dynamic(() => import('react-leaflet').then((m) => m.TileLayer), { ssr: false });
export const ZoomControl = dynamic(() => import('react-leaflet').then((m) => m.ZoomControl), { ssr: false });

export const MapConsumer = dynamic(() => import('./MapLazyComponents').then((m) => m.MapConsumer), { ssr: false });
