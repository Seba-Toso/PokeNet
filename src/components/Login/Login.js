import React from 'react';
import Info from '../Reusables/info'



export default function Login(){

    let info = {
        title: 'WELCOME TO ',
        subtitle: 'PRESS LOGIN',
        avatar: '../../assets/icons/Oak.png',
        perfil: "Texto de relleno sobre la app y algunas cosas extra más",
        origen: "Login"
    }

    return (
        <React.Fragment>
                    <div className="col-12">
                        <Info info={info} />
                    </div>
        </React.Fragment>
    )
}


