import React from 'react';
import Card from '../Reusables/Card'
import Info from '../Reusables/info'

import {connect} from 'react-redux'
import {getPokemonAction} from '../../redux/pkDuck'



function Pokedex({favorites}){

    let info = {
        title: 'Welcome to your Pokedex!',
        subtitle: 'Here you can access to all the Pokemons you have catched. ',
        avatar: 'Ninguno',
        perfil: "La más completa enciclopedia Pokemon",
        origen: 'Pokedex'
    }

    if(!favorites){
        return (
            <React.Fragment>
                        <div className="col">
                        </div>
                        <div className="col-6">
                            <Info info={info} favorites={favorites} />
                        </div>
                        <div className="col">
                        </div>
            </React.Fragment>
        )
    }
    else{
        return (
            <React.Fragment>
                        <div className="col">
                            <Card info={info} />
                        </div>
                        <div className="col">
                        </div>
                        <div className="col-6">
                            <Info info={info} favorites={favorites} />
                        </div>
                        <div className="col">
                        </div>
            </React.Fragment>
        )
    }
}





function mapStateToProps(state){  
    return {
        favorites: state.characters.favorites
    }          
}                

export default connect(mapStateToProps, {getPokemonAction})(Pokedex)   
                                                                        
                                                                        