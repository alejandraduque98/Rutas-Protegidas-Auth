import React from 'react'

//Importamos el app.auth()
import {auth, db} from '../firebase'

//importamos el whitRouter que empuja al user  a diferentes rutas
import {withRouter} from 'react-router-dom'

const Login = (props) => {

    /*Estados---------------*/

    //1) Estado Input Email
    const [correo, setCorreo] = React.useState('')

    //2) Estado Password
    const [contrasena,setContrasena] = React.useState('')

    //3) Estado Errores
    const [error, setError]= React.useState('')

    //4)cambiar  formulario de registro a ingresar
    const[cambioFormu, setCambioFormu]=React.useState(true)

    //Funciones----------------

    //Funcion ValidarDatos ingresados en los inputs
    const validarDatos = e =>{

        //para evitar el get HTML
        e.preventDefault()

        //Validamos el input del email
        if(!correo.trim()){
            //console.log('Ingrese su Email');
            setError('Ingrese Email')
            return
        }

        //validamos el input del password
        if(!contrasena.trim()){
            //console.log('Ingrese su contraseña');
            setError('Ingrese password')
            return
        }

        //Validamos la longitud de la password
        if(contrasena.length <= 6){
            //console.log('Ingrese una Contraseña mayor a 6 caracteres')
            setError('Ingrese una Contraseña 6 carcateres o mas')
            return
        }
        //volvemos a pasar error a null para que el mensaje se elmine de la pantalla
        console.log('pasando todas la validaciones')
        setError(null)
        

        if(cambioFormu){
            crearUser()
        }else{
            login()
        }
    }

    //Fincion de Logueo

    const login = React.useCallback(async () =>{

        try {
           const rta= await auth.signInWithEmailAndPassword(correo,contrasena)
           console.log(rta.user);

           //limpiando 
           setCorreo('')
           setContrasena('')
           setError(null)

           //Vamos a acceder al props push
           props.history.push('/admin')

        } catch (error) {
            console.log(error);

            //validacion si el email no existe
            if(error.code ==='auth/invalid-email'){
                setError('Email no valido')
            }

            //validacion si el usuario no existe
            if(error.code ==='auth/user-not-found'){
                setError('Usuario no resgistrado')
            }

            //validacion de contraseña
            if(error.code === 'auth/wrong-password'){
                setError('La contraseña no es valida, Ingrese de nuevo')
            }
        }

    },[correo, contrasena, props.history])

    //Funcion de Registrar Usuario
    const crearUser = React.useCallback(async () => {
        try {
         //vamos a intentar crear el usuario
         const rta = await auth.createUserWithEmailAndPassword(correo,contrasena)
         console.log(rta.user)
         await db.collection('usuario').doc(rta.user.email).set({
             email:rta.user.email,
             id:rta.user.uid
         })
         setCorreo('')
         setContrasena('')
         setError(null)

         //Vamos a acceder al props push
         props.history.push('/admin')
        } catch (error) {  
            console.log(error);

            //pintamos el error que sale en firebase

            //email no valido
            if(error.code ==='auth/invalid-email'){
                setError('Email no valido')
            }

            //email existente
            if(error.code === 'auth/email-already-in-use'){
                setError('El Email ya existe ')
            }
        }

    },[correo,contrasena,props.history])

  return (
    <div className='mt-5'>
        <h3 className='text-center'>
            {
                cambioFormu ? 'Registro de Usuario' : 'Login'
            }
        </h3>

        <hr/>

        <div className="row justify-content-center">

            {/*Sistema de columnas*/}
            <div className="col-12 col-sm-8 col-md-6 col-xl-4">

                {/*formulario*/}
                <form onSubmit={validarDatos}>

                    {/*Llamda del error*/}
                    {
                        error && (
                            <div className='alert  alert-danger'>
                                {error}
                            </div>
                        )
                    }

                    {/*Input Email */}
                    <input
                     type="email" 
                     className='form-control mb-2'
                     placeholder='Ingrese un Email'
                     onChange={e => setCorreo(e.target.value)}
                     value={correo}
                    />

                    {/* Input Contraseña*/}
                    <input
                     type="password" 
                     className='form-control mb-2'
                     placeholder='Ingrese contraseña'
                     onChange={e => setContrasena(e.target.value)}
                     value={contrasena}
                    />

                    {/*Boton de Registro*/}
                    <button 
                    className="btn btn-dark btn-lg btn-block" 
                    type='submit'
                    >
                        {
                            cambioFormu ? 'Registrarse' : 'Acceder'
                        }
                    </button>

                    {/*Boton de usuarios concuenta*/}
                    <button 
                    className="btn btn-info btn-sm btn-block"
                    onClick={()=>  setCambioFormu(!setCambioFormu)}
                    type='button'
                    >
                        {
                            cambioFormu ? 'Login' : 'Registrate'
                        }
                    </button>

                    
                </form>
            </div>
        </div>

    </div>
  )
}

export default withRouter (Login)