import { useEffect, useMemo, useState } from 'react';
import L from 'leaflet';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Tooltip,
  useMap,
} from 'react-leaflet';
import { useStore } from '../state/store';
import type { Location } from '../types';
import { CloseIcon, ExpandIcon, LocationIcon } from './icons';
import { formatTemperature } from './format';

const SINGAPORE_CENTER: [number, number] = [1.3521, 103.8198];
const DEFAULT_ZOOM = 11;

function pinIcon(isSelected: boolean) {
  return L.divIcon({
    className: 'weather-map-pin-wrapper',
    html: `<span class="weather-map-pin${isSelected ? ' weather-map-pin-selected' : ''}"></span>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });
}

function locationLabel(location: Location): string {
  return location.weather.area || `${location.latitude.toFixed(3)}, ${location.longitude.toFixed(3)}`;
}

function MapViewport({ locations }: { locations: Location[] }) {
  const map = useMap();
  const bounds = useMemo(
    () => locations.map((location) => [location.latitude, location.longitude] as [number, number]),
    [locations],
  );

  useEffect(() => {
    if (bounds.length === 0) {
      map.setView(SINGAPORE_CENTER, DEFAULT_ZOOM);
      return;
    }

    map.fitBounds(L.latLngBounds(bounds), { padding: [28, 28], maxZoom: 14 });
  }, [bounds, map]);

  return null;
}

function WeatherMap({ locations, selectedId, onSelect }: {
  locations: Location[];
  selectedId: number | null;
  onSelect: (id: number) => void;
}) {
  return (
    <MapContainer
      center={SINGAPORE_CENTER}
      zoom={DEFAULT_ZOOM}
      scrollWheelZoom
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapViewport locations={locations} />
      {locations.map((location) => {
        const area = locationLabel(location);
        const condition = location.weather.condition || 'Unavailable';
        const temperature = formatTemperature(location.weather.temperature_c);
        return (
          <Marker
            key={location.id}
            position={[location.latitude, location.longitude]}
            icon={pinIcon(location.id === selectedId)}
            eventHandlers={{ click: () => onSelect(location.id) }}
          >
            <Tooltip permanent direction="top" offset={[0, -8]} className="weather-map-label">
              <span>{area}</span>
              <strong>{temperature}&deg; · {condition}</strong>
            </Tooltip>
            <Popup>
              <strong>{area}</strong><br />
              {condition} · {temperature}&deg;
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}

interface MapCanvasProps {
  locations: Location[];
  selectedId: number | null;
  onSelect: (id: number) => void;
}

function MapCanvas({ locations, selectedId, onSelect }: MapCanvasProps) {
  return <WeatherMap locations={locations} selectedId={selectedId} onSelect={onSelect} />;
}

export function LocationMapCard() {
  const { locations, selectedId, select } = useStore();
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (!isExpanded) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsExpanded(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isExpanded]);

  const mapProps = { locations, selectedId, onSelect: select };

  return (
    <>
      <section className="overflow-hidden rounded-2xl border border-white/15 bg-white/[0.08] backdrop-blur-xl">
        <header className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60">
            <LocationIcon className="h-3.5 w-3.5" />
            <span>Locations Map</span>
          </div>
          <button
            type="button"
            onClick={() => setIsExpanded(true)}
            className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.08] px-2.5 py-1.5 text-xs text-white/75 hover:bg-white/[0.16] hover:text-white"
            aria-label="Expand locations map"
          >
            <ExpandIcon className="h-3.5 w-3.5" />
            <span>Expand</span>
          </button>
        </header>
        <div className="h-72">
          <MapCanvas {...mapProps} />
        </div>
      </section>

      {isExpanded && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 p-3 backdrop-blur-md sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Fullscreen saved locations map"
        >
          <section className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/20 bg-slate-900/90 shadow-2xl">
            <header className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <LocationIcon className="h-4 w-4 text-white/70" />
                <span>Saved Locations</span>
              </div>
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="rounded-full p-2 text-white/65 hover:bg-white/15 hover:text-white"
                aria-label="Close fullscreen map"
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            </header>
            <div className="min-h-0 flex-1">
              <MapCanvas {...mapProps} />
            </div>
          </section>
        </div>
      )}
    </>
  );
}
