import { useState, useEffect } from 'react';

export type GeolocationState = {
  coords?: {
    latitude: number;
    longitude: number;
  };
  error?: string;
  loading: boolean;
};

export default function useGeolocation(): GeolocationState {
  const [state, setState] = useState<GeolocationState>({ loading: true });

  useEffect(() => {
    if (!navigator.geolocation) {
      setState({ loading: false, error: 'Geolocation is not supported' });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          loading: false,
          coords: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        });
      },
      (err) => {
        setState({ loading: false, error: err.message });
      }
    );
  }, []);

  return state;
}
