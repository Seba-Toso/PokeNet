import React from 'react';
import {connect} from 'react-redux'

import '../../App.css';


function Details({pokedex}){

    console.log('info que llego a Details');
    console.log(pokedex);
    

    // Lectura de información
    let {sprites, id, height, weight, types, game_indices } = pokedex
    
    let front;
    let back;
    if(sprites){
        front = sprites.front_default;
        back = sprites.back_default;
    }


    //Get Types of pokemons
    let pokeTypes = []
    if (types) {
       types.map((slot)=>{
            return pokeTypes.push(slot.type.name)
        })
    }

    function getTypes(list) {
        const listTypes = list.map((typeItem) =>
          <span key={typeItem} id={typeItem} className="typeContainer">{typeItem}</span>
        );
        return (
          <div className="PokemonTypeList text-center" >{listTypes}</div>
        );
      }
    //end of Getting Types

    //Get Games of pokemons
    let pokeGames = []
    if (game_indices) {
        game_indices.map((slot)=>{return pokeGames.push(slot.version.name)})
    }

    function getGames(list) {
        const listGame = list.map((gameItem) =>
            <li key={gameItem} id={gameItem} className="gameLi">{gameItem}<hr/></li>
        );
        return (
            <ul className="text-center gameList" >{listGame}</ul>
        );
    }
    //end of Getting Games


        return (
            <React.Fragment>
            <div className="container">
                <div className="row">
                <div className="col">
                    <img src={front} className="card-img-top detailImg" alt='Pokemons front'/>
                </div>
                <div className="col">
                    {
                        back? 
                        <img src={back} className="card-img-top detailImg" alt='Pokemons back'/> 
                        : 
                        <img src={require('../../assets/icons/PokeNotFound.png')} className="card-img-top detailImg" alt='Pokemons back'/>
                    }
                    
                </div>
                </div>
            </div>
            <br/>
            <h5 className="font-weight-light">Information:</h5>
            <div className="text-center">Pokedex index: {id}  /  Height: {height}  -  Weight: {weight}</div>
            <hr className="my-3"/>
            {
            getTypes(pokeTypes)
            }
            <hr className="my-3"/>
            <div className="text-center pb-3">Appearence in Games</div>
            {
            <div className="gamesContainer overflow-auto pl-2 w-100 d-inline-block text-dark">{getGames(pokeGames)}</div>
            }


            </React.Fragment>
        )



}


function mapState(state){  
    return {
        pokedex: state.characters.pokedex  
    }
}                

export default connect(mapState)(Details)   
                                                                        
                                                                