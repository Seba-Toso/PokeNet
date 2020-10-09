import React from 'react';
import { Link  } from 'react-router-dom'




function Pages(){


return (
    <div className="col-3 float-right " >
        <div className="nav flex-column nav-pills border-left" id="v-pills-tab" role="tablist" aria-orientation="vertical">

            <Link 
            to="/world"
            className="nav-link link" 
            id="v-pills-home-tab" 
            role="tab" 
            aria-controls="v-pills-home" 
            aria-selected="true" >World</Link>

            <Link 
            to="/pokedex"
            className="nav-link link" 
            id="v-pills-pokedex-tab" 
            role="tab" 
            aria-controls="v-pills-home" 
            aria-selected="true">Pokedex</Link>

            <Link 
            to="/friends"
            className="nav-link link" 
            id="v-pills-home-tab" 
            role="tab" 
            aria-controls="v-pills-home" 
            aria-selected="true">Friends</Link>
   
            <Link 
            to="/maps"
            className="nav-link link" 
            id="v-pills-home-tab" 
            role="tab" 
            aria-controls="v-pills-home" 
            aria-selected="true">Maps</Link>

        </div>
    </div>
    )
}


        
export default Pages
                                                                        