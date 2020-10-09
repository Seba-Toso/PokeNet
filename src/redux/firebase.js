import firebase from 'firebase/app'
import 'firebase/auth'              //importo las autenticaciones de firebase (en este caso el login de google)
import 'firebase/firestore'         //importo la base de datos de firebase

 
 // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBXbzmBbqj8f2gf5XojMObHAuaGbX1I_20",
    authDomain: "pokenet-d5e72.firebaseapp.com",
    databaseURL: "https://pokenet-d5e72.firebaseio.com",
    projectId: "pokenet-d5e72",
    storageBucket: "pokenet-d5e72.appspot.com",
    messagingSenderId: "501829102702",
    appId: "1:501829102702:web:59556e013b8f08fb3a8a7f"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);




  //FUNCTIONS------------------------------------------------------------
  let db = firebase.firestore().collection('catched')
  export function updateDB(array, uid){             //esta función guarda los favs en la DB, entonces recibe el array de favs, pero también
    return db.doc(uid).set({array})                 //recibe el uid que traje de iniciar sesión, para saber de quien es los favs
                                                    //cada array lo voy a guardar en un doc distinto por cada sesión
                                                    //la DB de firebase necesita objetos, por eso el array lo mando como objeto {array:array}={array}
  }

  export function getCatched (uid){                 //esta función toma los favoritos de la DB
    return db.doc(uid).get()                        //devuelvo de la DB, del documento de la sesión, un get que es una promesa
    .then(snap=>{                                   //esta promesa, me devuelve un snap, del cual tomo la data y de esa data tomo el array 
      return snap.data().array                      //que había definido en la función de guardar favs
    })
  }






  //SESSION--------------------------------------------------------------

  //Logout Google
  export function signOutGoogle(){
    firebase.auth().signOut()
  }
  //Login Google
  export function loginWithGoogle(){                        
      let provider = new firebase.auth.GoogleAuthProvider() 
      return firebase.auth().signInWithPopup(provider)
      .then(snap=> snap.user)
  }  
  
    
    
           