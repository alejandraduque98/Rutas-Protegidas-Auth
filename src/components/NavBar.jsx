import React from 'react'
/*importamos el router dom y llamamos a link que en laza con el route*/ 
import {Link, NavLink} from 'react-router-dom'

/*impotamos al auth para usar la funcion de cerrar sesion*/ 
import {auth} from '../firebase'

/*importamos para mandar a una ruta*/ 
import {withRouter} from "react-router"

const NavBar = (props) => {

    //funcion de cerrar la sesion
    const Salir = ()=>{

        //funsion de cerrar sesion
        auth.signOut()
        //respuesta de existo
            .then(()=>{
                props.history.push('/login')
            })
    }
  return (
    <div className='navbar nabvar-dark bg-dark'>
        {/*creamos el log del navbar*/}
         <Link className='navbar-brand navbar-dark bg-dark'>AUTH</Link>

        {/*creamos los botones del menu */}
        <div>
            <div className="d-flex">
                {/*Clase Activa solo en el inicio */}
                <NavLink className="btn btn-dark mr-2" to="/"exact>
                    Inicio
                </NavLink>

                {/*Ocultar el bton admin */}
                {
                    props.firebaseUser !== null ?(
                        <NavLink className="btn btn-dark mr-2" to="/admin">
                            Admin
                        </NavLink>
                    ):null
                }

                

                {/*pintar boton de cerrar secion y login segun si el usuario existe */}
                {
                    props.firebaseUser !== null ? (
                        //si existe usuario
                        <button 
                        className="btn btn-dark"
                        onClick={()=>Salir()}
                        >
                            cerrar sesión
                        </button>
                    ):(
                        //si no existe
                        <NavLink className="btn btn-dark mr-2" to="/login">
                            Login
                        </NavLink>
                    )
                }

                
            </div>
        </div>

    </div>
  )
}

export default withRouter (NavBar)