import React from 'react';
import '../../App.css'
import {connect} from 'react-redux'
import {closeSessionAction, doGoogleLoginAction} from '../../redux/userDuck'
import { Link, useLocation } from 'react-router-dom';



function NavLogin({closeSessionAction, loggedIn, fetching}){

  const location = useLocation()
  console.log(location);

  function logOut(){
    closeSessionAction()
  }


  let storage = localStorage.getItem('storage')
  storage = JSON.parse(storage)

  if ( loggedIn && !fetching && storage && storage.user ){

    let user = storage.user
    
    return (                                                      //Retorno si hay sesión
      <div className="dropdown">
        <button 
          className="btn dropdown-toggle btn-danger text-light" 
          id="dropdownMenuLink" 
          data-toggle="dropdown" 
          aria-haspopup="true" 
          aria-expanded="false">
            {user.displayName.split(" ")[0]} &nbsp;  
            <img className="avatar" src={user.photoURL}width="30" height="30" alt="" loading="lazy"/>
        </button>

        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
          <a className="dropdown-item configLink disabled" href="/" disabled>
            Release Pokemon
          </a>

          <a className="dropdown-item configLink disabled" href="/">Search Friends</a>

          <a className="dropdown-item configLink disabled" href="/">Change Theme</a>

          <Link className="dropdown-item configLink logout " to="/login" href="#" onClick={logOut}>Log Out</Link>
        </div>
      </div>
    )
  } 
  else {        //Retorno si no hay sesión
    return (
      <div>
      &nbsp;
      </div>
    )
  }
  


}



function mapState({user: {fetching, loggedIn}}){          
  return {                                                
      fetching,
      loggedIn
  }
}                

export default connect(mapState, {doGoogleLoginAction, closeSessionAction})(NavLogin)  
                                                                 