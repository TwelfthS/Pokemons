import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Pokemon} from './PokemonList'
import {firstLoad, addElem} from './actions'
import './App.css'

function App() {
  const [defaultRun, setDefaultRun] = useState(true)

  const selectList = state => state.list
  const list = useSelector(selectList)

  const selectMode = state => state.mode
  const mode = useSelector(selectMode)

  const selectLoading = state => state.isLoading
  const loading = useSelector(selectLoading)

  const selectNoData = state => state.noData
  const noData = useSelector(selectNoData)


  const dispatch = useDispatch()

  if (defaultRun) {
    setDefaultRun(false)
    dispatch(firstLoad())
  }


  const deleteFromList = (event) => {
    const deletedId = event.target.parentElement.parentElement.id
    dispatch({type: "RemoveElem", deletedId: deletedId})
  }


  const addList = (event) => {
    event.preventDefault()
    const name = event.target.name.value
    if (name) {
      dispatch(addElem(name))
    }
  }

  useEffect(() => {
    document.body.className = mode ? 'light-background' : 'dark-background';
  }, [mode]);

    const ChangeMode = () => {
      dispatch({type: "ChangeMode"})
    }
  
  return (
    <div className='App'>
      <div className="container mt-3">
        <form onSubmit={addList} className="mx-auto" style={{width: '400px'}}>
          <label htmlFor="name" className={mode ? null : 'white-text'}>Введите имя или id покемона:</label>
          <input name="name" id="name" style={{width: '75%'}}></input>
          <button type="submit" className="btn m-1" style={{backgroundColor: 'yellow'}}>Add</button>
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={ChangeMode}></input>
            <label className={"form-check-label " + (mode ? null : 'white-text')} htmlFor="flexSwitchCheckDefault">Dark mode</label>
          </div>
        </form>
        <div className="div-message mt-3"> 
          {loading && <h5 className={"message " + (mode ? null : 'white-text')}>Загрузка...</h5>}
          {noData && <h5 className={"message " + (mode ? null : 'white-text')}>Такой покемон не найден</h5>}
        </div>
        <ul className="no-dots mx-auto" style={{width: '60rem'}}>
          {list.map(({key, name, numForms, forms, img}) => (
              <li key={key} id={key} style={{width: '50rem'}} className={mode ? 'list-light' : 'list-dark'}>
                <div className="d-flex justify-content-between border border-dark mt-3">
                  <Pokemon formKey={key} name={name} numForms={numForms} forms={forms} img={img} />
                  <button onClick={deleteFromList} className="btn float-end h-25" style={{backgroundColor: 'yellow'}}>X</button>
                </div>
              </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
