import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes, deleteObject, getMetadata, updateMetadata } from 'firebase/storage';
import { v4 } from "uuid";

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage( app );

export const uploadImagesFirebase = async( folder, imagesArray, item ) => {
  let urlImages = [];
  for (const image of imagesArray) {
    const uid = v4();
    const storageRef = ref( storage, `${ folder }/merka-${ item }-${ uid }` );
    await uploadBytes( storageRef, image );
    await getMetadata( storageRef );
    const metadata = {
      customMetadata: {
        'owner': 'wwww.elmerkadeo.com',
      },
    };
    await updateMetadata( storageRef, metadata );
    const urlImage = await getDownloadURL( storageRef );
    urlImages = [...urlImages, { url: urlImage, ref: storageRef._location.path }];
  }
  return urlImages;    
};

export const deleteImageFirebase = async( imageRef ) => {
  const desertRef = ref( storage, imageRef );
  await deleteObject( desertRef );
};