import React from 'react'
import { useSelector } from 'react-redux'

function PokemonList({formKey, name, numForms, forms, img}) {
    const selectMode = state => state.mode
    const mode = useSelector(selectMode)
    return (
        <div className={"card border border-dark " + (mode ? "card-light" : "card-dark")} style={{width: '15rem', height: '100%'}}>
            <img src={img} alt={"pokemon" + name} className="card-img-top"></img>
            <div className={"card-body " + (mode ? "card-body-light" : "card-body-dark")}>
                <h5 className={"card-title " + (mode ? null : 'white-text')}>{name}</h5>
                <p className={"card-text "  + (mode ? null : 'white-text')}>Количество форм: {numForms}, а именно:</p>
                <ul>
                    {forms.map(({name}) => (
                        <li key={formKey + '_form' + Math.random()} className={mode ? null : 'white-text'}>{name}</li>
                    ))}
                </ul>
            </div>
            
        </div>
    );
}

export const Pokemon = React.memo(PokemonList)