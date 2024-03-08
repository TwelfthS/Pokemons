const initialState = {
    list: [],
    mode: true,
    isLoading: false,
    noData: false
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case "Loading":
            return {...state, isLoading: action.load, noData: false}
        case "NoData":
            return {...state, noData: true, isLoading: false}
        case "FirstLoad":
            return {...state, list: action.list, isLoading: false}
        case "AddToList":
            return {...state, list: [action.newElem, ...state.list], isLoading: false}
        case "RemoveElem":
            const list = state.list.filter((elem) => elem.key !== action.deletedId)
            return {...state, list}
        case "ChangeMode":
            return {...state, mode: !state.mode}
        default:
            return state
    }
}

export default reducer