import React from 'react';
import '../../App.css'
import {connect} from 'react-redux'





 function NavLogo({loggedIn}){


    if(!loggedIn){
        return (
            <div className="pokeball">
                <img src={require('../../assets/icons/pokeball.png')} className="rotate" height="30"  alt="Logo"/>
            </div>
        )
    }
    else{
        return (
            <div>
              <a href="/">
                <img src={require('../../assets/icons/pokenetv.png')} height="35"  alt="Logo"/>
              </a>
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

export default connect(mapState)(NavLogo)  