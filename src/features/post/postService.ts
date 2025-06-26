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

  const data: Record<string, any> = {
    preset,
    message: message ?? null,
    timestamp: serverTimestamp(),
  };

  const location: Record<string, any> = {};
  if (typeof latitude === 'number') location.lat = latitude;
  if (typeof longitude === 'number') location.lng = longitude;
  if (prefecture) location.prefecture = prefecture;
  if (city) location.city = city;

  if (Object.keys(location).length) {
    data.location = location;
  }

  try {
    await addDoc(collection(db, 'posts'), data);
  } catch (err) {
    throw err;
  }
}
