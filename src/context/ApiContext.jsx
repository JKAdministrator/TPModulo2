import { createContext, useContext, useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { collection, getFirestore, and ,doc, addDoc, getDocs, query,where  } from "firebase/firestore"; 

const firebaseConfig = {
    apiKey: "AIzaSyCSK6mPA6kUUBF8JWUhoSyElF4t7_Kgbgs",
    authDomain: "tpfinalreact-1a4e4.firebaseapp.com",
    projectId: "tpfinalreact-1a4e4",
    storageBucket: "tpfinalreact-1a4e4.appspot.com",
    messagingSenderId: "76745260127",
    appId: "1:76745260127:web:8840acffa5e42672c22fea"
};
const app = initializeApp(firebaseConfig);

export const ApiContext = createContext(null);


export default function ApiProvider({children}){

    const [API,     setAPI]     = useState(null);
    const [user,    setUser]    = useState(null);
    const [loading, setLoading] = useState(true);
    const [error,   setError]   = useState(null);


    useEffect(() => {
        
        const inicializar = async () => {
            try {
                const API_OBJECT = {
                    login: async (email, password)=>{
                        try {
                            const db = getFirestore(app);
                            const usuarios2 = collection(db, "usuarios");
                            let queryUsuarios = query(usuarios2, and(where("email", "==", email), where("password", "==", password)));
                            const querySnapshot = await getDocs(queryUsuarios);
                            let encontrado = false;
                            querySnapshot.forEach(e=>{
                                setUser(e.data());
                                encontrado = true;
                            });
                            return !encontrado? 'Email o Password inválidos' : null;
                        } catch(e){
                            return 'Error al acceder a la base de datos';
                            console.error(e);
                        }
                    },
                    register: async (nombre, apellido, email, password)=>{
                        try {
                            const db                = getFirestore(app);
                            const usuarios2         = collection(db, "usuarios");
                            let queryUsuarios       = query(usuarios2, and(where("email", "==", email)));
                            const querySnapshot     = await getDocs(queryUsuarios);
                            const encontrado = Array.from(querySnapshot.docs).length > 0? true : false;
                            if(encontrado) return 'Usuario ya registrado';
                            else{
                                const docref = collection(db, 'usuarios');
                                await addDoc(docref, {
                                    nombre:nombre, apellido:apellido, password:password, email:email
                                });
                                return null;    
                            }


/*
                            const usuariosRef = doc(db, 'usuarios');
                            await addDoc(collection(db, "usuarios"),{
                                nombre:nombre, apellido:apellido, password:password, email:email
                            } , { merge: false });*/
                            return null;    
                        } catch(e){
                            console.error(e);
                            return 'Error al acceder a la base de datos';
                        }
                    }
                }                
                setAPI(API_OBJECT);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };
        inicializar();
        
        setLoading(false);
    }, []);

    return <ApiContext.Provider value={{error, loading, API}}>
        {children}
    </ApiContext.Provider>
}

export function useApi(){
    const context = useContext(ApiContext)
    if(context === undefined) throw new Error('useApiContext debe ser usado dentro de ApiProvider')
    return context;
}