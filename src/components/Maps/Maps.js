import React from 'react';
import Info from '../Reusables/info'



export default function Maps(){

    let info = {
        title: 'MAPS PAGE',
        subtitle: 'Under Construction',
        avatar: 'Ninguno',
        perfil: "Coming Soon",
        origen: "Maps"
    }

    
    return (
        //Esto será momentáneo
        <React.Fragment>
                    <div className="col-9">
                        <Info info={info} />
                    </div>
                    <div className="col">
                    </div>
                    
        </React.Fragment>



    /*    <React.Fragment>
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
    */

    )
    
}