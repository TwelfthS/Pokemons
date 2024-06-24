import { memo } from 'react'
import { useSelector } from 'react-redux'

export const PokemonCard = memo(function PokemonCard({formKey, name, numForms, forms, img}) {
    const mode = useSelector(state => state.mode)
    return (
        <div className="pokemon-card">
            <img src={img} alt={"pokemon " + name} className="pokemon-img"></img>
            <div className={"card-body p-3"}>
                <h5 className={"card-title " + (mode ? null : 'white-text')}>{name}</h5>
                <p className={"card-text "  + (mode ? null : 'white-text')}>Количество форм: {numForms}, а именно:</p>
                <ul>
                    {forms.map(({name}) => (
                        <li key={formKey + '_form' + Math.random()} className={mode ? null : 'white-text'}>{name}</li>
                    ))}
                </ul>
            </div>
            
        </div>
    )
})