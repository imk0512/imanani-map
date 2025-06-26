import { useEffect, useState } from 'react';
import useGeolocation from '../../../hooks/useGeolocation';
import { locationData } from '../../../mockLocations';

export type LocationResult = {
  latitude?: number;
  longitude?: number;
  prefecture?: string;
  city?: string;
};

type Props = {
  onLocationChange: (location: LocationResult) => void;
};

export default function LocationSelector({ onLocationChange }: Props) {
  const { coords, error, loading } = useGeolocation();
  const [prefecture, setPrefecture] = useState('');
  const [city, setCity] = useState('');

  useEffect(() => {
    if (coords) {
      onLocationChange({ latitude: coords.latitude, longitude: coords.longitude });
    }
  }, [coords, onLocationChange]);

  useEffect(() => {
    if (prefecture && city) {
      onLocationChange({ prefecture, city });
    }
  }, [prefecture, city, onLocationChange]);

  const prefectures = Object.keys(locationData);
  const cities = prefecture ? locationData[prefecture as keyof typeof locationData] : [];

  if (loading) {
    return <div className="p-2 text-sm">位置情報を取得中...</div>;
  }

  if (!error && coords) {
    return (
      <div className="p-2 text-sm text-green-700">位置情報を取得しました</div>
    );
  }

  return (
    <div className="flex flex-col space-y-2 p-2 bg-gray-100 rounded">
      <p className="text-sm text-gray-700">位置情報の取得に失敗しました。手動で選択してください。</p>
      <select
        value={prefecture}
        onChange={(e) => {
          setPrefecture(e.target.value);
          setCity('');
        }}
        className="border rounded p-2 text-sm"
      >
        <option value="">都道府県を選択</option>
        {prefectures.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>
      {prefecture && (
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border rounded p-2 text-sm"
        >
          <option value="">市区町村を選択</option>
          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
