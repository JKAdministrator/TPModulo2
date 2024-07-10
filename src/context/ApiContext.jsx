import { createContext, useContext, useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { collection, getFirestore, and ,doc, addDoc, getDocs, query,where  } from "firebase/firestore"; 

const appData               = {
    apiKey:             import.meta.env.VITE_APP_FIREBASE_API_KEY,
    authDomain:         import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
    projectId:          import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
    storageBucket:      import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId:  import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId:              import.meta.env.VITE_APP_FIREBASE_APP_ID
}
console.log(appData);
const app                   = initializeApp(appData);
const db                    = getFirestore(app);
const coleccionUsuarios     = collection(db, "usuarios");
const coleccionProductos    = collection(db, "productos");

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
                            const queryUsuarios   = query(coleccionUsuarios, and(where("email", "==", email), where("password", "==", password)));
                            const querySnapshot = await getDocs(queryUsuarios);
                            let encontrado      = false;
                            querySnapshot.forEach(e=>{
                                setUser(e.data());
                                encontrado = true;
                            });
                            return !encontrado? 'Email o Password inválidos' : null;
                        } catch(e){
                            console.error(e);
                            console.log(e);
                            return 'Error al acceder a la base de datos';
                        }
                    },
                    register: async (nombre, apellido, email, password)=>{
                        try {
                            const queryUsuarios     = query(coleccionUsuarios, and(where("email", "==", email)));
                            const querySnapshot     = await getDocs(queryUsuarios);
                            const encontrado        = Array.from(querySnapshot.docs).length > 0? true : false;
                            if(encontrado)          return 'Usuario ya registrado';
                            else{
                                await addDoc(coleccionUsuarios, {
                                    nombre:nombre, apellido:apellido, password:password, email:email
                                });
                                return null;    
                            }  
                        } catch(e){
                            console.error(e);
                            console.log(e);
                            return 'Error al acceder a la base de datos';
                        }
                    },
                    getProducts: async()=>{
                        try {
                            const queryProductos    = query(coleccionProductos);
                            const querySnapshot     = await getDocs(queryProductos);
                            const datosProductos    = [];
                            querySnapshot.forEach(e=>{
                                datosProductos.push(e.data());
                            });
                            return datosProductos;
                        } catch(e){
                            console.error(e);
                            console.log(e);
                            return 'Error al acceder a la base de datos';
                        }
                    },
                    getProduct: async(SKU)=>{
                        try {
                            const queryProductos    = query(coleccionProductos, where('SKU','==',SKU));
                            const querySnapshot     = await getDocs(queryProductos);
                            let datosProducto;
                            querySnapshot.forEach(e=>{
                                datosProducto = e.data();
                            });
                            return datosProducto;
                        } catch(e){
                            console.error(e);
                            console.log(e);
                            throw new Error(e.message);
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

    return <ApiContext.Provider value={{error, loading, user, API}}>
        {children}
    </ApiContext.Provider>
}

export function useApi(){
    const context = useContext(ApiContext)
    if(context === undefined) throw new Error('useApiContext debe ser usado dentro de ApiProvider')
    return context;
}