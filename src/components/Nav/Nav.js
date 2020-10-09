import React from 'react';
import '../../App.css'
import {connect} from 'react-redux'

import NavLogin from './NavLogin'
import NavConfig from './NavConfig'
import NavLogo from './NavLogo'




function Nav(){

    return (
        <header className="App-header">
        <nav className="navbar navbar-dark bg-danger">
            <NavConfig />
            
            <NavLogo />

            <NavLogin/>
        </nav>
      </header>
    )

}

function mapState({user: {fetching, loggedIn}}){           
  return {                                                
      fetching,
      loggedIn
  }
}          

export default connect(mapState)(Nav)                                                             