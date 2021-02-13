import React from 'react';
import { NavLink  } from 'react-router-dom'
import * as ReactIcons from 'react-icons/bs'



function Pages(){


return (
    <div className="col-3 float-right " >
        <div className="nav flex-column nav-pills border-left" id="v-pills-tab" role="tablist" aria-orientation="vertical">

            <NavLink 
            to="/world"
            className="nav-link link" 
            id="v-pills-home-tab" 
            role="tab" 
            aria-controls="v-pills-home" 
            aria-selected="true"><ReactIcons.BsHouse /> World</NavLink>

            <NavLink 
            to="/pokedex"
            className="nav-link link" 
            id="v-pills-pokedex-tab" 
            role="tab" 
            aria-controls="v-pills-home" 
            aria-selected="true"><ReactIcons.BsTablet /> Pokedex</NavLink>

            <NavLink 
            to="/friends"
            className="nav-link link" 
            id="v-pills-home-tab" 
            role="tab" 
            aria-controls="v-pills-home" 
            aria-selected="true"><ReactIcons.BsPeople /> Friends</NavLink>
   
            <NavLink 
            to="/maps"
            className="nav-link link" 
            id="v-pills-home-tab" 
            role="tab" 
            aria-controls="v-pills-home" 
            aria-selected="true"><ReactIcons.BsMap /> Maps</NavLink>

        </div>
    </div>
    )
}


        
export default Pages
                                                                        