import { INITSTATE, TRANSLATE_TEXT } from './Utils/Constants'

function Reducer(state, action) {
    switch (action.type) {
        case TRANSLATE_TEXT:
            console.log('state ', state)
            console.log('payload ', action)
            return ({
                ...state,
                translatedData: action.payload !== null ? action.payload : "",
                sourceData: "",
                error: '',
                loading: false,
                alertText: 'Успешно переведено',
                alertStyle: 'alert alert-success',
            })
        default:
            return state
    }
}

export default Reducer