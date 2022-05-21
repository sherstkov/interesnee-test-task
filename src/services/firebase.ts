import { initializeApp, getApp, FirebaseOptions } from '@firebase/app';
import { getFirestore, Firestore } from '@firebase/firestore';
import { firebaseConfig } from './firebaseConfig';

function createFirebaseApp(config: FirebaseOptions) {
  try {
    return getApp();
  } catch {
    return initializeApp(config);
  }
}

const app = createFirebaseApp(firebaseConfig);
export const firestore: Firestore = getFirestore(app);
