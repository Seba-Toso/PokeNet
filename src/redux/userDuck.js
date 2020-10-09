import {loginWithGoogle, signOutGoogle} from './firebase'   //importo las funciones de iniciar y cerrar sesion
import {getBackFavs, restoreFavsAction} from './pkDuck'


// constantes 
let initialData = {             //creo una constante para el estado inicial
    loggedIn : false,
    fetching: false
}


let LOGIN = "LOGIN"
let LOGIN_SUCCES = "LOGIN_SUCCES"
let LOGIN_ERROR = "LOGIN_ERROR"
let LOG_OUT = "LOG_OUT"

// reducer          al no ponerle un nombre y exportarlo como reducer, al importarlo puedo ponerle cualquier nombre
export default function reducer(state=initialData, action){     //creo un switch y le coloco al estado, el valor de initialData
    switch(action.type){
        case LOGIN: 
            return {...state, fetching: true}
        case LOGIN_ERROR:
            return {...state, fetching: false, err:action.payload}
        case LOGIN_SUCCES:
            return {...state, fetching: false, loggedIn:true, ...action.payload}
        case LOG_OUT:
            return {...initialData}
        default:
            return state
    }
}

//funciones auxiliares
export function saveStorage(storage){         //esto me ayuda a guardar respaldos en el localstorage
    localStorage.storage = JSON.stringify(storage)
}



// actions (action creators)
export let restoreSessionAction = () => dispatch => {   //esta función restaura la sesión iniciada y guardada en el localstorage
    let storage = localStorage.getItem('storage')       //tomo el localstorage
    storage = JSON.parse(storage)                       //lo convierto a un javascript
    if(storage && storage.user){                        //si hay un user entonces recupero la sesion
        dispatch({
            type: LOGIN_SUCCES,
            payload: storage.user
        })
        restoreFavsAction()(dispatch)                   //si hay una sesion guardada, entonces llamo a la función que recupera los favs
    }
}

export let closeSessionAction = () => (dispatch) =>{
    signOutGoogle()
    localStorage.removeItem('storage')
    dispatch({
        type: LOG_OUT           //como el state que tengo que poner es el initialData, lo hago directamente en el reducer
    })
}

export let doGoogleLoginAction = () => (dispatch, getState) => {
    dispatch({
        type: LOGIN
    })
    return loginWithGoogle()
    .then(user=>{
        dispatch({
            type: LOGIN_SUCCES,
            payload: {
                uid:user.uid,
                displayName:user.displayName,
                email:user.email,
                photoURL:user.photoURL
            }
        })
        saveStorage(getState())
        getBackFavs()(dispatch, getState)
    })                                                  //acá iría un then a browserhistory
    .catch(e=>{
        console.log(e);
        dispatch({
            type: LOGIN_ERROR,
            payload: e.message  //este es el lugar donde firebase manda los errores
        })
    })
}