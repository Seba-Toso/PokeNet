import {createStore, combineReducers, compose, applyMiddleware} from 'redux'        //características que traigo de redux
import userReducer, {restoreSessionAction} from './userDuck'                        //duck creado en userDuck con mi reducer
import charsReducer, {getPokemonAction} from './pkDuck'                      //duck creado en charsDuck con el reducer que obtiene pj de la API
import thunk from 'redux-thunk'                                                     //middleware para hacer promesas y peticiones al backend


let rootReducer = combineReducers({         //creo un reducer al que le daremos un valor de objeto y le pasaremos
    user: userReducer,                      //combineReducers para que junte todos los reducers de mi app
    characters: charsReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //Herramientas de desarrollador que traje desde github.com/zalmoxisus/redux-devtools-extension
                                                                                 //pregunta si el navegador soporta las herramientas de desarrollador

            //esta funcion crea un store y lo devuelve para usarlo en otro archivo
export default function generateStore(){
    let store = createStore(
        rootReducer, 
        composeEnhancers(applyMiddleware(thunk))
        )


        getPokemonAction()(store.dispatch, store.getState)


    restoreSessionAction()(store.dispatch)
        return store










        
/*    //llamo a la acción que consigue los personajes que están en el API    
    getCharactersAction()(store.dispatch, store.getState)   //llamo a la función que importo desde charsDuck y a los parámetros de la
                                                            //segunda función le paso los parametros dispatch y getState que me pide
    restoreSessionAction()(store.dispatch)
    return store*/
}