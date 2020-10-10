import React from 'react';
import {getPokemonAction, getOnePokemonAction, addToFavoritesAction, getPokedexInfoAction} from '../../redux/pkDuck'
import {doGoogleLoginAction, closeSessionAction} from '../../redux/userDuck'
import {connect} from 'react-redux'
import {useHistory} from 'react-router-dom'
import './Reusabes.css'




function Info({info, getOnePokemonAction, addToFavoritesAction, getPokedexInfoAction, doGoogleLoginAction, closeSessionAction, favorites}){

    const history = useHistory()

    let {types, title, perfil, origen, subtitle, totalCatch} = info 


    let user = {}
    let storage = localStorage.getItem('storage')
    if (storage){
    user = JSON.parse(storage).user
    }
    

    //Get Types of pokemons
    let pokeTypes = []
    if (types) {
       types.map((slot)=>{return pokeTypes.push(slot.type.name)})
    }

    function getTypes(list) {
        const listTypes = list.map((typeItem) =>
          <li key={typeItem} id={typeItem} className="typeContainerWorld text-center">{typeItem}</li>
        );
        return (
          <ul className="PokemonType">{listTypes}</ul>
        );
      }
    //end of Getting Types



    //Get List of Catched Pokemons (favorites)
    let catchedPokemons = []
    if (favorites) {
       favorites.map((favorite)=>{return catchedPokemons.push(favorite.name)})
    }

    function getPokedex(list) {
        const catchList = list.map((catchPoke) =>
            <li key={catchPoke} className="mr-5">
                <button className="pokedexButton" id={catchPoke} onClick={readPokemon}>{catchPoke}</button>
                <hr className="my-2"/>
            </li>
        );
        return (
          <ul className="PokemonTypeList">{catchList}</ul>
        );
      }
    //end of Catched Pokemons


    
    //-------ACTIONS------
    function doLogin(){
        doGoogleLoginAction()
        .then(()=>{
            history.push("/Pokenet");
        })
    }

    function logOut(){
        history.push("/Pokenet/login");
        closeSessionAction()
    }

    function catchIt(){
        addToFavoritesAction()
        seeOther()
    }

    function seeOther(){
        getOnePokemonAction()
    }

    function readPokemon(e){
        let name = e.target.id
        getPokedexInfoAction(name)
    }
    //end of actions




    //RETORNOS
    
    //Retorno de origen LOGIN
        if(origen === "Login"){
            return (
            <div className="jumbotron text-dark pb-4 pt-4 jumbotronLogin text-center">
                
                <h2 className="logoContainer">
                    <img  src={require('../../assets/icons/pokenetv.png')} height="55"  alt="Logo"/> 
                </h2>
                
                <hr className="my-2"/>
                <div className="container loginInfoContainer pt-5 pb-3">

                        <div className="col">
                            <br/>
                            <h5 className="loginTitle font-weight-light">Login with</h5> 
                            <button type="button" className="btn btn-danger loginnbtn" onClick={doLogin}>Google</button> <br/>
                            <button type="button" className="btn btn-primary loginnbtn" disabled>Facebook</button> <br/>
                            <button type="button" className="btn btn-success loginnbtn" disabled>Github</button> <br/>
                            <h5 className="bottomMessage">{subtitle}</h5>
                        </div>

                </div>

            </div>
            )
        }




    //Retorno de origen HOME
    if(origen === "Home"){
        return (
        <div className="jumbotron text-dark pb-4 pt-4">
            <h1 className="display-4"><strong>{title}</strong></h1>
            <p>{subtitle}</p>
            <hr className="my-2"/>
            <div className="container homeInfoContainer pt-3 pb-3">
                <div className="row">
                    <div className="col">
                        <br/>
                        <h3>Trainer Stats</h3>
                        <ul>
                            <br/>
                            <p><strong>Total catched: </strong>{totalCatch}</p>
                            <p><strong>Friends: </strong>0</p>
                            <p><strong>Money: </strong>$ 0</p>
                            <p><strong>Badges: </strong>Empty.</p>
                        </ul>
                    </div>
                    <div className="col text-center">
                        <br/>
                        <img className="avatarHome" src={user.photoURL}width="100" height="100" alt="User avatar" loading="lazy"/>
                        <br/>
                        <h3>{user.displayName.split(" ")[0]}</h3>
                        <br/>
                        <button type="button" className="btn btn-outline-danger btn-sm" onClick={logOut}>Log Out</button>
                    </div>
                    <div className="col text-center border-left">
                        <img src={require('../../assets/icons/Oak.png')} height="300"  alt="Proffesor Oak" />
                    </div>
                </div>
            </div>
        </div>
        )
    }



    //Retorno de origen WORLD
    if(origen === "World"){
        return (
        <div className="jumbotron text-dark pb-4 pt-4">
            <h1 className="display-4"><strong>{title}</strong></h1>
            <p className="lead ">{subtitle}</p>
            <hr className="my-2"/>
            {   types? <h5>Pokemon detail's:</h5> : <h6>Pokemon data empty</h6>}
            {   types? 
                getTypes(pokeTypes)
                :
                <ul className="PokemonTypeList" >
                    <li>&nbsp;</li>
                    <li>&nbsp;</li>
                </ul>
            }
            <hr className="my-2"/>
            <p>What will you do?</p>
            <div>
                <button className="reactionButton catch" onClick={catchIt}>
                    <img className="reactionImg " src={require('../../assets/icons/gotcha.png')} height="50" alt="catch button" />
                </button> 
                <button className="reactionButton" onClick={seeOther}>
                    <img className="reactionImg" src={require('../../assets/icons/leavemod.png')} height="50" alt="leave button" />
                </button>
            </div> 
            
        </div>
        )
    }
    
    //Retorno de origen POKEDEX
    if(origen === "Pokedex"){
        return (
            <div className="jumbotron bg-danger text-white pb-4 pt-4">
            <h1 className="display-4"><strong>{title}</strong></h1>
            <p>{subtitle}</p>
            <hr className="my-2"/>
            <h6 className="lead">Pokemons:</h6>
            <div className="pokedexContainer overflow-auto w-100 p-2 d-inline-block text-dark">
            {   
                favorites? 
                getPokedex(catchedPokemons)
                :
                <ul className="PokemonTypeList">
                    <li>Empty</li>
                </ul>
            }
            </div>
        </div>
        )
    }

    //Retorno de origen FRIENDS
    if(origen === "Friends"){
        return (
        <div className="jumbotron bg-success text-white pb-4 pt-4">
            <h1 className="display-4"><strong>{title}</strong></h1>
            <p>{subtitle}</p>
            <p>{perfil}</p>
            <hr className="my-2"/>
        </div>
        )
    }
    
    //Retorno de origen MAPS
    if(origen === "Maps"){
        return (
        <div className="jumbotron bg-info text-white pb-4 pt-4">
            <h1 className="display-4"><strong>{title}</strong></h1>
            <p>{subtitle}</p>
            <p>{perfil}</p>
            <hr className="my-2"/>
        </div>
        )
    }


}   //fin de Returns

function mapState(state){  
    return {
        pokemons: state.characters.array,
        current: state.characters.current,
        pokedex: state.characters.pokedex  
    }
}                

export default connect(
    mapState, 
    {doGoogleLoginAction, closeSessionAction, getPokemonAction, getOnePokemonAction, addToFavoritesAction, getPokedexInfoAction}
    )(Info)   
                                                                        
                                                                        