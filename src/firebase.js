/*importamos el firebase*/
import app from 'firebase/app'
/*importamos el fireStore*/
import 'firebase/firestore'
/*importamos la autentifcacion del correo*/
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyD2fXOptFE0vbSySle4nfVFbiNfeR9GjAE",
    authDomain: "login-auth-rutas-86b47.firebaseapp.com",
    projectId: "login-auth-rutas-86b47",
    storageBucket: "login-auth-rutas-86b47.appspot.com",
    messagingSenderId: "947529531836",
    appId: "1:947529531836:web:b6595081eab85ba46eebb9"
  };
  
  // Initialize Firebase
 app.initializeApp(firebaseConfig);

 //creamos las variables para tener acceso a algunos recursos del firebase

 //db=trae el fireStore(base de datos o coleccion)
 const db= app.firestore()

 //auth=trae los metodos de autentificacion del usuario
 const auth=app.auth()

 //creamos un objeto que nos permita exportar las variables y utlizarlas en otros archivos
export {db,auth}

