import React from 'react';
import Routes from './Routes' 

import Nav from './components/Nav/Nav'
import Pages from './components/Reusables/Pages'
import {connect} from 'react-redux'

function App({loggedIn}) {

  

  return (
    <div className="App">
      <Nav/>

      <div className="jumbotron ml-5 mr-5 mt-4 pb-4 pt-5 jumbotronApp" >
              <div className="container">
                <div className="row">
        
                    <Routes />
                    
                  {
                    loggedIn?
                    <div className="col">
                      <Pages />
                    </div>
                    :
                    <React.Fragment />
                  }
              </div>
          </div>
      </div>
    </div>
  );
}


function mapState({user: {fetching, loggedIn}}){           
  return {                                                
      fetching,
      loggedIn
  }
}             

export default connect(mapState)(App)   
                                                                      
                                           
