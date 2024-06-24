import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { PokemonCard } from './PokemonCard'
import { Head } from './Head'
import {firstLoad, removedElem} from './reducers/mainSlice'
import './App.css'

function App() {
  const [defaultRun, setDefaultRun] = useState(true)

  const list = useSelector(state => state.list)
 
  const mode = useSelector(state => state.mode)

  const loading = useSelector(state => state.isLoading)

  const noData = useSelector(state => state.noData)


  const dispatch = useDispatch()

  if (defaultRun) {
    setDefaultRun(false)
    dispatch(firstLoad())
  }


  const deleteFromList = (event) => {
    const deletedId = event.target.parentElement.id
    dispatch(removedElem(deletedId))
  }

  useEffect(() => {
    document.body.className = mode ? 'light-background' : 'dark-background'
  }, [mode])
  
  return (
    <div className='App container mt-3'>
      <Head />
        <div className="div-message mt-3"> 
          {loading && <h5 className={"message " + (mode ? null : 'white-text')}>Загрузка...</h5>}
          {noData && <h5 className={"message " + (mode ? null : 'white-text')}>Такой покемон не найден</h5>}
        </div>
        <ul className="no-dots mx-auto">
          {list.map(({key, name, numForms, forms, img}) => (
              <li key={key} id={key} className={'list-element ' + (mode ? "card-body-light" : "card-body-dark")}>
                  <PokemonCard formKey={key} name={name} numForms={numForms} forms={forms} img={img} />
                  <button onClick={deleteFromList} className="remove-button">X</button>
              </li>
          ))}
        </ul>
    </div>
  )
}

export default App
