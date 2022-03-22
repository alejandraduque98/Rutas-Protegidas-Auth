import React from 'react';
/*importacion de rutas*/
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

/*IMportaciones de componentes*/
import NavBar from './components/NavBar';
import Login from './components/Login';
import Admin from './components/Admin';

/*Impotamos el auth*/ 
import {auth} from './firebase'

function App() {
  /*Crear Rutas*/

  const[firebaseUser, setFirebaseUser]= React.useState(false)

  React.useEffect(()=>{

    /*funsion que pinta el usuario en consola*/
    auth.onAuthStateChanged(user=>{
      console.log(user);

      //si existe un user lo pasamos al estado
      if(user){
        setFirebaseUser(user)
      }else{
        setFirebaseUser(null)
      }
    })

  },[])
  
  return firebaseUser !== false ?(
    /*CReando rutas*/

    /*dentro del rutoer creamos el navBar*/
    <Router>
      <div className="container">
      <NavBar firebaseUser= {firebaseUser}/>
      {/*---Componentes dinamicos ---*/}
      <Switch>
        {/*Rutas*/}
        <Route path="/login">
          <Login/>
        </Route>

        <Route path="/admin">
          <Admin/> 
        </Route>

        <Route path="/">
          componente Inicio
        </Route>
      </Switch>
      </div>
    </Router>
  ): (
    <p>Loding.......</p>
  )
}

export default App;
