import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export type PostInput = {
  preset: string;
  message?: string;
  latitude?: number;
  longitude?: number;
  prefecture?: string;
  city?: string;
};

export async function createPost(postInput: PostInput): Promise<void> {
  const { preset, message, latitude, longitude, prefecture, city } = postInput;

  if (!preset) {
    throw new Error('preset is required');
  }

  const location = {
    ...(typeof latitude === 'number' && { lat: latitude }),
    ...(typeof longitude === 'number' && { lng: longitude }),
    ...(prefecture && { prefecture }),
    ...(city && { city }),
  };

  const data: Record<string, any> = {
    preset,
    message: message ?? null,
    timestamp: serverTimestamp(),
    ...(Object.keys(location).length && { location }),
  };

  try {
    await addDoc(collection(db, 'posts'), data);
  } catch (err) {
    throw err;
  }
}
