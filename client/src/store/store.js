import { createStore } from 'redux'
import { reducer } from './reducer'

export const initialState = {
    authPageChosenForm: 'login',
}

export const store = createStore(reducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())