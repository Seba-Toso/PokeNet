import axios from 'axios'                        //herramientas para hacer peticiones en React
import {updateDB, getCatched} from './firebase'     //importo la funcion de update Data Base y de toma de favs


// constantes 
let initialData = {             //creo una constante para el estado inicial
    fetching : false,           //esto es para saber si estan cargando los pj o si ya cargaron
    array: [],                  //esto contendrá la lista de pj completa
    current: {},                //esto contendrá al pj actual
    favorites: [],              //esto contendrá los pj a los que les de favs
    pokedex: {},                //esto contendrá al pj mostrado en el pokedex
    nextPage:1                  //esto contendrá el dato de la página siguiente a la que me encuentro (esto lo uso cuando uso graphql)
}

let URL = "https://pokeapi.co/api/v2/pokemon?limit=893"   //URL de la API del proyecto (cliente para axios)


let GET_CHARACTERS = "GET_CHARACTERS"                   //constante que representa la acción actual
let GET_CHARACTERS_SUCCES = "GET_CHARACTERS_SUCCES"     //constante que representa la acción exitosa
let GET_CHARACTERS_ERROR = "GET_CHARACTERS_ERROR"       //constante que representa la acción errónea (sea cual sea el error)

let GET_SINGLE_POKEMON = "GET_SINGLE_POKEMON"                   //constante que representa la acción actual
let GET_SINGLE_POKEMON_SUCCES = "GET_SINGLE_POKEMON_SUCCES"     //constante que representa la acción exitosa
let GET_SINGLE_POKEMON_ERROR = "GET_SINGLE_POKEMON_ERROR"       //constante que representa la acción errónea (sea cual sea el error)

let REMOVE_CHARACTER = "REMOVE_CHARACTER"               //constante que representa el eliminar pjs
let ADD_TO_FAVORITES = " ADD_TO_FAVORITES"              //constante que representa favear pjs

let GET_FAVS = "GET_FAVS"                               //constante que representa el estado de la recuperación de favs de la sesion
let GET_FAVS_SUCCES = "GET_FAVS_SUCCES"                 //constante que representa la recuperación de favs de la sesion exitosa
let GET_FAVS_ERROR = "GET_FAVS_ERROR"                   //constante que representa la recuperación de favs de la sesion erronea

let UPDATE_PAGE = "UPDATE_PAGE"                         //constante que representa la actualización de página

let GET_POKEMON = "GET_POKEMON"
let GET_POKEMON_ERROR = "GET_POKEMON_ERROR"
let GET_POKEMON_SUCCES = "GET_POKEMON_SUCCES"

// reducer          
export default function reducer(state=initialData, action){     //creo un switch y le coloco al estado, el valor de initialData
    switch(action.type){
        case UPDATE_PAGE:
            return {...state, nextPage:action.payload}


        case REMOVE_CHARACTER:
            return {...state, array:action.payload}

        case ADD_TO_FAVORITES:
            return {...state, ...action.payload}


        case GET_FAVS:
            return {...state, fetching:true}

        case GET_FAVS_SUCCES:
            return {...state, favorites: action.payload, fetching:false}

        case GET_FAVS_ERROR:
            return {...state, error: action.payload, fetching:false}


        case GET_CHARACTERS:
            return {...state, fetching:true}

        case GET_CHARACTERS_ERROR:
            return {...state, fetching: false, error:action.payload}
            
        case GET_CHARACTERS_SUCCES:                                 //en caso de exito, devuelve lo que haya en state,
            return {...state, array:action.payload, fetching:false} //más lo que hay en array que será lo que devuelve action.payload


        case GET_SINGLE_POKEMON:
            return {...state, fetching:true}

        case GET_SINGLE_POKEMON_ERROR:
            return {...state, fetching: false, error:action.payload}
            
        case GET_SINGLE_POKEMON_SUCCES:                                 //en caso de exito, devuelve lo que haya en state,
            return {...state, current:action.payload, fetching:false} //más lo que hay en array que será lo que devuelve action.payload


        case GET_POKEMON:
            return {...state, fetching:true}

        case GET_POKEMON_ERROR:
            return {...state, fetching: false, error:action.payload}
            
        case GET_POKEMON_SUCCES:                                 
            return {...state, pokedex:action.payload, fetching:false}


        default:
            return state
    }
}



//aux functions
function saveStorage(storage){                              //esto me ayuda a guardar respaldos en el localstorage
    localStorage.storage = JSON.stringify(storage)          //la llamo desde getBackFavs
}


// ACTIONS (action creators) o thunks

//Si hay una sesión activa recupera los pokemones capturados y los guarda en el state
export let restoreFavsAction = () => dispatch => {         
    let storage = localStorage.getItem('storage')
    storage = JSON.parse(storage)   
    if(storage && storage.characters.favorites){
        dispatch({
            type: GET_FAVS_SUCCES,
            payload: storage.characters.favorites
        })
    }
}

//Si hay una sesión activa recupera los pokemones capturados de la DB 
export let getBackFavs = () => async (dispatch, getState) =>{     
    dispatch({
        type: GET_FAVS
    })
    let {uid} = getState().user                             //tomo el usuario para luego buscar sus favoritos en la DB
    try {
        const array = await getCatched(uid) //uso la función getFavs (definida en firebase) para buscar la DB de mi user
            
        dispatch({
            type: GET_FAVS_SUCCES,
            payload: [...array]
        })
        saveStorage(getState())
    } catch (e) {
        //console.log(e);
        dispatch({
            type: GET_FAVS_ERROR,
            payload: e.message
        })
    }
}

//Cuando se clickea en capturar, quita el pokemon de la lista y lo pasa a favoritos
export let addToFavoritesAction = () => (dispatch, getState) => {
    let {current, array, favorites} = getState().characters  
    let actual = current.name
    let char = array.filter(                            
        pokemon => {return pokemon.name === actual}                 
      )                      
    array.shift()                        
    favorites.push(char[0])                         
    let {uid} = getState().user
    updateDB(favorites, uid)
    dispatch({
        type: ADD_TO_FAVORITES,
        payload: {array:[...array], favorites:[...favorites]}                                                
    })
    saveStorage(getState())
}

/*
export let removeCharacterAction = () => (dispatch, getState) =>{
    let {array}=getState().characters //tomo el {array} que contiene los pj y que está en el state y en characters
    array.shift()                     //elimino el pj del array
    if(!array.length){
        getCharactersAction()(dispatch, getState)
        return
    }
    dispatch({
        type: REMOVE_CHARACTER,
        payload: [...array]
    })
}
*/


//Realizo el pedido a la API y guardo su respuesta, que son los 893 Pokemones          
export function getPokemonAction(){      
    return async (dispatch)=>{                
        dispatch({                                    
            type: GET_CHARACTERS                             
        })                            
        try {
            const res = await axios.get(URL)
            dispatch({
                type: GET_CHARACTERS_SUCCES,
                payload: res.data.results
            })
        } catch (err) {
            console.log(err)
            dispatch({
                type: GET_CHARACTERS_ERROR,
                payload: err.response.message
            })
        }
    }
}


//Realizo el pedido a la API y retorno la información de un pokemon al azar
export function getOnePokemonAction(){
    let randomNumber = Math.round(Math.random()*893)
    let SINGLE_POKEMON_URL = "https://pokeapi.co/api/v2/pokemon/"+randomNumber;

    return async (dispatch)=>{                   
        dispatch({                                    
            type: GET_SINGLE_POKEMON                             
        })                            
        try {
            const res = await axios.get(SINGLE_POKEMON_URL)
            dispatch({
                type: GET_SINGLE_POKEMON_SUCCES,
                payload: res.data
            })
        } catch (err) {
            console.log(err)
            dispatch({
                type: GET_SINGLE_POKEMON_ERROR,
                payload: err.response
            })
        }
    }
}



//Realizo el pedido a la API y retorno la información de un pokemon al azar
export function getPokedexInfoAction(name){
    let POKEMON_URL = "https://pokeapi.co/api/v2/pokemon/"+name;

    return async (dispatch)=>{                   
        dispatch({                                    
            type: GET_POKEMON                             
        })                            
        try {
            const res = await axios.get(POKEMON_URL)
            dispatch({
                type: GET_POKEMON_SUCCES,
                payload: res.data
            })
        } catch (err) {
            console.log(err)
            dispatch({
                type: GET_POKEMON_ERROR,
                payload: err.response
            })
        }
    }
}







/** 
Imports: 
Importo axios para poder hacer promesas en mis acciones.

Constantes: 
Cree una initialData para darle un valor al state, una constante con la url de la API con los personajes y 3 constantes
con los posibles casos para el switch del reducer.

Export: 
Exporto una función reducer que recibe el state(con valor de initialData) y la action realizada(de la cual extraeré el tipo),
dentro de esta función, creo un switch para los distintos casos de mi acción y como parámetro le paso el action.type(tipo de acción realizada)
Cada caso se llama como las constantes que definí previamente y devuelve lo que necesite, aquí puedo usar el action.payload que es donde
tengo la respuesta de la action.
Creo también el caso default que devolverá el state como se encuentre.

Action:
Exporto una función con -nombredeacción-Action, que retornará otra función (flecha) que recibirá los parámetros 
dispatch(ejecutador de acciones) y getState(el store). Esta función flecha realiza un llamado a la URL (API) y una promesa que recibirá
una res (respuesta), y a su vez, esto ejecutará (en forma de función flecha) el dispatch que tendrá un type(con el tipo de acción realizada)
y un payload donde estará lo que devuelve la respuesta*/