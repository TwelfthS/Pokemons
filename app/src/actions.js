function receiveLoad(list) {
    return {
        type: "FirstLoad",
        list
    }
}

function receiveAdd(newElem) {
    return {
        type: "AddToList",
        newElem
    }
}

function loading(load) {
    return {
        type: "Loading",
        load
    }
}

export function firstLoad() {
    return async function(dispatch) {
        if (!localStorage.getItem("default")) {
            try {
                dispatch(loading(true))
                const responseDefault = await fetch('https://pokeapi.co/api/v2/pokemon')
                const resultDefault = await responseDefault.json()
                let list = []
                for (let i = 0; i < 20; i++) {
                const response = await fetch(resultDefault.results[i].url)
                const result = await response.json()
                const data = {
                    key: result.name + Math.random(),
                    name: result.name,
                    numForms: result.forms.length,
                    forms: result.forms,
                    img: result.sprites.front_default
                }
                list = [data, ...list]
                }
                localStorage.setItem("default", JSON.stringify(list))
                dispatch(receiveLoad(list))
            } catch (error) {
                console.log("error: ", error)
                dispatch(loading(false))
            }
        } else {
            const list = JSON.parse(localStorage.getItem("default"))
            dispatch(receiveLoad(list))
        }
    }
}

export function addElem(name) {
    return async function(dispatch) {
        dispatch(loading(true))
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + name)
            if (response.ok) {
                const result = await response.json()
                const data = {
                    key: result.name + Math.random(),
                    name: result.name,
                    numForms: result.forms.length,
                    forms: result.forms,
                    img: result.sprites.front_default
                }
                dispatch(receiveAdd(data))
            } else {
                dispatch({type: "NoData"})
            }
        } catch (error) {
            console.log("error: ", error)
            dispatch(loading(false))
        }
    }
}