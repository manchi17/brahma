// Actions
const PERSON_START = 'ducks/person/PERSON_START';
const PERSON_SUCCESS = 'ducks/person/PERSON_SUCCESS';
const PERSON_FAIL = 'ducks/person/PERSON_FAIL';

// Reducer
export default function reducer(state = { loading: false, tokens: null, error: null, person: [] }, action = {}) {
    switch (action.type) {
        case PERSON_START:
            return {
                ...state,
                loading: true
            };
        case PERSON_SUCCESS:
            return {
                ...state,
                loading: false,
                person: action.payload
            };
        case PERSON_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        default:
            return state;
    }
}

// Action Creators
export function personStart() {
    return { type: PERSON_START };
}

export function personSuccess(data) {
    return { type: PERSON_SUCCESS, payload: data };
}

export function personFail(error) {
    return { type: PERSON_FAIL, payload: error };
}

export function person(country) {
    return async dispatch => {
        dispatch(personStart());
        //Do CITY and dispatch accordingly

        try {
            let response = await fetch(`http://api.airvisual.com/v2/states?country=${country}&key=9khJrt9933QxZdk9e`);
            let json = await response.json();
            dispatch(personSuccess(json.data));
        } catch (error) {
            dispatch(personFail());
        }
    };
}
