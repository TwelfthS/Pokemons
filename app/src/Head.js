import {memo} from "react"
import { useDispatch, useSelector } from "react-redux"
import { addElem, changedMode } from "./reducers/mainSlice"

export const Head = memo(function Head() {
    const dispatch = useDispatch()
    const mode = useSelector(state => state.mode)

    const addList = (event) => {
        event.preventDefault()
        const name = event.target.name.value
        if (name) {
            dispatch(addElem(name))
        }
    }

    const ChangeMode = () => {
        dispatch(changedMode())
    }
    
    return  (
        <form onSubmit={addList} className="search-form">
            <label htmlFor="name" className={mode ? null : 'white-text'}>Введите имя или id покемона:</label>
            <input id="name"></input>
            <button type="submit" className="btn m-1 add-button">Add</button>
            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={ChangeMode}></input>
                <label className={"form-check-label " + (mode ? null : 'white-text')} htmlFor="flexSwitchCheckDefault">Dark mode</label>
            </div>
        </form>
    )
})