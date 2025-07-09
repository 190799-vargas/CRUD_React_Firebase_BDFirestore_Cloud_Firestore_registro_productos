// Importar las funciones que necesitas del SDK que necesitas
import { initializeApp } from "firebase/app"; // Importar App, para inicializar Firebase

import { getFirestore } from 'firebase/firestore'; // Importar Firestore, para la base de datos

const firebaseConfig = {
    apiKey: "AIzaSyAv0cqzKizyDS94IJwcgjgtENmfYrem438",
    authDomain: "crud-firestore-react-854a8.firebaseapp.com",
    projectId: "crud-firestore-react-854a8",
    storageBucket: "crud-firestore-react-854a8.firebasestorage.app",
    messagingSenderId: "418531412503",
    appId: "1:418531412503:web:da04053671e7b93738ea52"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app); // Exportar la base de datos para usarla en otros archivos