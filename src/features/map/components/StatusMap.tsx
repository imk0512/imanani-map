import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { collection, query, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';
import { db } from '../../../lib/firebase';

export type Post = {
  id: string;
  preset: string;
  message?: string;
  timestamp: Date;
  location: {
    lat?: number;
    lng?: number;
    prefecture?: string;
    city?: string;
  };
};

export default function StatusMap() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const THIRTY_MINUTES = 30 * 60 * 1000;

    const q = query(
      collection(db, 'posts'),
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const now = new Date();

      const data: Post[] = snapshot.docs
        .map((doc) => {
          const d = doc.data();
          return {
            id: doc.id,
            preset: d.preset,
            message: d.message ?? undefined,
            timestamp: d.timestamp instanceof Timestamp ? d.timestamp.toDate() : new Date(),
            location: d.location ?? {},
          } as Post;
        })
        .filter((post) => now.getTime() - post.timestamp.getTime() <= THIRTY_MINUTES);

      setPosts(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <MapContainer center={[36.2048, 138.2529]} zoom={5} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
      />
      {posts
        .filter((p) => typeof p.location?.lat === 'number' && typeof p.location?.lng === 'number')
        .map((p) => (
          <Marker key={p.id} position={[p.location.lat as number, p.location.lng as number]}>
            <Popup>
              <div className="space-y-1 text-sm">
                <div>{p.preset}</div>
                {p.message && <div>{p.message}</div>}
                {p.location.city && (
                  <div>
                    {p.location.prefecture} {p.location.city}
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
}
