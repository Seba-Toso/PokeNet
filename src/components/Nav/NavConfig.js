import React from 'react';
import '../../App.css'
import {connect} from 'react-redux'


 function NavConfig({loggedIn}){


    if(!loggedIn){
        return <React.Fragment></React.Fragment>
    }
    else{
      return (
        <div className="pokeball">
          <img src={require('../../assets/icons/pokeball.png')} className="rotate" height="30"  alt="Logo"/>
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

export default connect(mapState)(NavConfig)  
                                                                 