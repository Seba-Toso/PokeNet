import React from 'react';
import {connect} from 'react-redux'
import Details from '../Details/Details'
import {getOnePokemonAction} from '../../redux/pkDuck'

import '../../App.css';


function Card({info, pokedex, getOnePokemonAction}){

    let defaultStats = {
        defaultName: "MissingNo",
        defaultImg: "../../assets/icons/MissingNo.png",
        defaultInfo: "No information aviable."
    }

    function seeOther(){
        getOnePokemonAction()
    }
    

    // Lectura de información
    let {name, avatar, origen} = info

    //Retorno para origen POKEDEX
    if(origen === 'Pokedex'){
        let {sprites, name} = pokedex
        
        let img = sprites? sprites.front_default : ""

        return (
        <div className="card">
            {img? 
                <img src={img} className="card-img-top" alt=''/> 
                :
                <img src={require('../../assets/icons/MissingNo.png')} className="card-img-top" alt=''/> 
            }
            <div className="card-body">
                <h4 className="card-title"><strong>{name? name : defaultStats.defaultName}</strong></h4>
                <button type="button " className="btn btn-primary " data-toggle="modal" data-target="#exampleModal">
                More
                </button>

                <div className="modal fade" id="exampleModal"  data-keyboard="false" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header pt-1 pb-1">
                            <h4 className="modal-title" id="exampleModalLabel">{name? name : defaultStats.defaultName}</h4>
                        </div>
                        <div className="modal-body bg-dark text-white ">
                            {!name? defaultStats.defaultInfo : <Details/>}
                        </div>
                        <div className="modal-footer pt-1 pb-1">
                            <button type="button" className="btn btn-primary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                    </div>
                </div>

            </div>
        </div>
        )
    }


    //Retorno de origen WORLD
    return (
        <div className="card">
            {avatar? 
                <img src={avatar} className="card-img-top" alt=''/> 
                :
                <div className="card-img-top text-center spinnerContainer">
                    <div className="spinner-grow text-info" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            }
            <div className="card-body text-center">
                {name?
                    <h5 className="card-title">A wild <strong>{name}</strong> appeard!</h5>
                    :
                    <button type="button" className="btn btn-primary" onClick={seeOther}>Start Searching</button>
                }
            </div>
        </div>
    )

}


function mapState(state){  
    return {
        pokedex: state.characters.pokedex  
    }
}                

export default connect(mapState, {getOnePokemonAction})(Card)   
                                                                        



