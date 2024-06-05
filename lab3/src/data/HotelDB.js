import { collection, getDocs } from 'firebase/firestore';
import { firestore } from './init';


export const getHotelData = async () => {
    try {
      const hotelsCollection = collection(firestore, 'Hotele');
      const querySnapshot = await getDocs(hotelsCollection);
      const hotelsData = querySnapshot.docs.map(doc => doc.data());
      return hotelsData;
    } catch (error) {
      console.error('Błąd podczas pobierania info o hotelach z bazy:', error);
      throw error;
    }
  };

  export const connectDB = async () => {
    const hotelsCollection = collection(firestore, 'Hotele');
      const querySnapshot = await getDocs(hotelsCollection);
      const hotelsData = querySnapshot.docs.map(doc => doc.data());
      return hotelsData;
  };