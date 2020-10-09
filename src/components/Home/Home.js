import React from 'react';
import Info from '../Reusables/info'
import {connect} from 'react-redux'


function Home({favorites}){

    let pokedexLength = 0
    if(favorites)
    {    
    pokedexLength = {favorites}
    pokedexLength = pokedexLength.favorites
    pokedexLength = pokedexLength.length
    }
    

    let info = {
        title: 'WELCOME HOME',
        subtitle: 'Hello there! Welcome to the World of Pokemon!',
        avatar: '../../assets/icons/Oak.png',
        perfil: "Texto de relleno sobre la app y algunas cosas extra más",
        totalCatch: pokedexLength,
        origen: "Home"
    }

    return (
        <React.Fragment>
                    
                    <div className="col-9">
                        <Info info={info}  />
                    </div>
                    <div className="col">
                    </div>
                    
        </React.Fragment>
    )
}

function mapStateToProps(state){  
    return {
        favorites: state.characters.favorites
    }          
}                

export default connect(mapStateToProps)(Home)  
                                                                        
                                                                        