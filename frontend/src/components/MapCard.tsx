import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import { useStore } from '../state/store';
import { CloseIcon, ExpandIcon, MapPinIcon } from './icons';
import type { Location } from '../types';

const TILE_URL = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
const TILE_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';
const SINGAPORE: L.LatLngExpression = [1.3521, 103.8198];

function makePinIcon(location: Location, isSelected: boolean): L.DivIcon {
  const temp =
    typeof location.weather?.temperature_c === 'number'
      ? `${Math.round(location.weather.temperature_c)}°`
      : null;
  const cond = location.weather?.condition ?? null;
  const label = temp ?? cond ?? `${location.latitude.toFixed(2)}, ${location.longitude.toFixed(2)}`;

  const bg = isSelected ? 'rgba(255,255,255,0.28)' : 'rgba(255,255,255,0.12)';
  const border = isSelected ? '1.5px solid rgba(255,255,255,0.8)' : '1px solid rgba(255,255,255,0.22)';

  const html = `
    <div style="
      display:flex;flex-direction:column;align-items:center;
      filter:drop-shadow(0 2px 6px rgba(0,0,0,0.5));
    ">
      <div style="
        background:${bg};
        border:${border};
        border-radius:10px;
        padding:4px 9px;
        backdrop-filter:blur(8px);
        -webkit-backdrop-filter:blur(8px);
        color:white;
        font-family:system-ui,sans-serif;
        font-size:12px;
        font-weight:${isSelected ? '600' : '500'};
        white-space:nowrap;
        line-height:1.3;
        text-align:center;
      ">${label}</div>
      <div style="
        width:6px;height:6px;
        background:${isSelected ? 'white' : 'rgba(255,255,255,0.6)'};
        border-radius:50%;
        margin-top:3px;
      "></div>
    </div>`;

  return L.divIcon({ html, className: '', iconAnchor: [0, 0] });
}

interface FitBoundsProps {
  locations: Location[];
}

function FitBounds({ locations }: FitBoundsProps) {
  const map = useMap();
  useEffect(() => {
    if (locations.length === 0) return;
    if (locations.length === 1) {
      map.setView([locations[0].latitude, locations[0].longitude], 13);
      return;
    }
    const bounds = L.latLngBounds(locations.map((l) => [l.latitude, l.longitude]));
    map.fitBounds(bounds.pad(0.4));
  }, [locations, map]);
  return null;
}

interface MapContentProps {
  locations: Location[];
  selectedId: number | null;
  onSelect: (id: number) => void;
}

function MapContent({ locations, selectedId, onSelect }: MapContentProps) {
  return (
    <>
      <TileLayer url={TILE_URL} attribution={TILE_ATTRIBUTION} />
      <FitBounds locations={locations} />
      {locations.map((loc) => (
        <Marker
          key={loc.id}
          position={[loc.latitude, loc.longitude]}
          icon={makePinIcon(loc, loc.id === selectedId)}
          eventHandlers={{ click: () => onSelect(loc.id) }}
        />
      ))}
    </>
  );
}

export function MapCard() {
  const { locations, selectedId, select } = useStore();
  const [isExpanded, setIsExpanded] = useState(false);

  if (locations.length === 0) return null;

  const commonMapProps = {
    center: SINGAPORE as L.LatLngExpression,
    zoom: 11,
    zoomControl: false,
    attributionControl: true,
    scrollWheelZoom: false,
  };

  if (isExpanded) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col" style={{ background: '#0f172a' }}>
        <div className="flex-1" style={{ minHeight: 0 }}>
          <MapContainer
            key="expanded"
            {...commonMapProps}
            scrollWheelZoom={true}
            style={{ height: '100%', width: '100%', background: '#0f172a' }}
          >
            <MapContent locations={locations} selectedId={selectedId} onSelect={select} />
          </MapContainer>
        </div>
        <div className="flex items-center justify-between border-t border-white/10 px-4 py-3">
          <span className="text-xs text-white/55">{locations.length} location{locations.length !== 1 ? 's' : ''}</span>
          <button
            type="button"
            onClick={() => setIsExpanded(false)}
            className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.08] px-3 py-1.5 text-xs font-medium text-white/85 backdrop-blur-xl hover:bg-white/[0.14]"
          >
            <CloseIcon className="h-3 w-3" />
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-white/15 bg-white/[0.08] backdrop-blur-xl">
      <header className="flex items-center justify-between px-4 py-2.5">
        <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60">
          <MapPinIcon className="h-3.5 w-3.5" />
          <span>Map</span>
        </div>
        <button
          type="button"
          onClick={() => setIsExpanded(true)}
          aria-label="Expand map"
          className="rounded-md p-1 text-white/40 hover:text-white/80 transition"
        >
          <ExpandIcon className="h-3.5 w-3.5" />
        </button>
      </header>
      <div style={{ height: 220 }}>
        <MapContainer
          key="card"
          {...commonMapProps}
          style={{ height: '100%', width: '100%', background: '#0f172a' }}
        >
          <MapContent locations={locations} selectedId={selectedId} onSelect={select} />
        </MapContainer>
      </div>
    </section>
  );
}
