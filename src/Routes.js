import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'              //importe la funcionalidad Redirect para usarla en mi componente
                   
import Login from './components/Login/Login'
import Home from './components/Home/Home'
import Pokedex from './components/Pokedex/Pokedex'
import Friends from './components/Friends/Friends'
import Maps from './components/Maps/Maps'
import World from './components/World/World'

let storage = localStorage.getItem('storage')                       //chequeo si en el localstorage hay datos de una sesion
    storage = JSON.parse(storage)

export function PrivateRoute({path, component, ...rest}){               //creo un componente nuevo llamado PrivateRoute para filtrar por inicio de sesion
    if(storage && storage.user) {                               
        return <Route path={path} component={component} {...rest} />
    }
    else {
        return <Redirect to="/login" {...rest} />                       //si no la hay vuelvo a login
    }
}



export default function Routes() {
    return (                                                            
        <Switch>
            <PrivateRoute path="/world" component={World} />
            <PrivateRoute path="/maps" component={Maps} />
            <PrivateRoute path="/friends" component={Friends} />
            <PrivateRoute path="/pokedex" component={Pokedex} />
            <PrivateRoute exact path="/" component={Home} />            
            <Route path="/login" component={Login} />
        </Switch>
    )
}

