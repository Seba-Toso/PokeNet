import React from 'react';
import Card from '../Reusables/Card'
import Info from '../Reusables/info'

import {connect} from 'react-redux'


function World({pokemons, current}){

    console.log(pokemons);

    let {name, id, sprites, types} = current
    let img = sprites? sprites.front_default : ""

    let info = {
        id: id,
        name: name,
        types: types,
        avatar: img,
        title: "World",
        subtitle: "Let's go Catch'em All!",
        perfil: "La más completa enciclopedia Pokemon",
        origen: "World",
        buttons: true
    }


  
    return (
        <React.Fragment>
                    <div className="col">
                        <Card info={info} />
                    </div>

                    <div className="col">
                    </div>

                    <div className="col-6">
                        <Info info={info} />
                    </div>

                    <div className="col">
                    </div>
        </React.Fragment>
    )
}



function mapState(state){  
    return {
        pokemons: state.characters.array,
        current: state.characters.current    
    }
}                

export default connect(mapState)(World)   
                                                                        
                                                                        