import React from 'react'

//importamos la autentificacion
import { auth } from '../firebase'

//importamos el whitRouter que empuja al user  a diferentes rutas
import {withRouter} from 'react-router-dom'

const Admin = (props) => {

    //Estados-----------------

    //1)guarda los usuarios
    const [usuarios, setUsuarios] =React.useState(null)

    React.useEffect(()=>{

        if(auth.currentUser){
            console.log('existe un usuario');
        }else{
            console.log('no existe el usurio');
            props.history.push('/login')
            setUsuarios(auth.currentUser)
        }

    },[props.history])
  return (
    <div>
        <h2>Ruta Protegida</h2>
        {
            usuarios && (
                <h3>{ usuarios.correo}</h3>
            )
        }
    </div>
  )
}

export default withRouter (Admin)