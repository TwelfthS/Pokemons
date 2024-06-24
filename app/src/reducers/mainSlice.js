import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    list: [],
    mode: true,
    isLoading: false,
    noData: false
}

export const firstLoad = createAsyncThunk(
    'main/firstLoad',
    async () => {
        if (!localStorage.getItem("default")) {
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
            return list
        } else {
            const list = JSON.parse(localStorage.getItem("default"))
            return list
        }
    }
)

export const addElem = createAsyncThunk(
    'main/addElem',
    async (name) => {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + name)
        const result = await response.json()
        const data = {
            key: result.name + Math.random(),
            name: result.name,
            numForms: result.forms.length,
            forms: result.forms,
            img: result.sprites.front_default
        }
        return data
    }
)

const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        loading(state, action) {
            state.isLoading = action.payload
            state.noData = false
        },
        noData(state) {
            state.noData = true
            state.isLoading = false
        },
        removedElem(state, action) {
            state.list = state.list.filter((elem) => elem.key !== action.payload)
        },
        changedMode(state) {
            state.mode = !state.mode
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(firstLoad.pending, (state) => {
                state.isLoading = true
            })
            .addCase(firstLoad.fulfilled, (state, action) => {
                state.list = action.payload
                state.isLoading = false
            })
            .addCase(firstLoad.rejected, (state) => {
                state.isLoading = false
            })
            .addCase(addElem.pending, (state) => {
                state.isLoading = true
                state.noData = false
            })
            .addCase(addElem.fulfilled, (state, action) => {
                state.list.unshift(action.payload)
                state.isLoading = false
                state.noData = false
            })
            .addCase(addElem.rejected, (state) => {
                state.isLoading = false
                state.noData = true
            })
    }
})

export const { removedElem, changedMode } = mainSlice.actions

export default mainSlice.reducer