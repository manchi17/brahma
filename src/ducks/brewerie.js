// Actions
const BREWERIE_START = "ducks/brewerie/BREWERIE_START";
const BREWERIE_SUCCESS = "ducks/brewerie/BREWERIE_SUCCESS";
const BREWERIE_FAIL = "ducks/brewerie/BREWERIE_FAIL";

// Reducer
export default function reducer(
  state = { loading: false, tokens: null, error: null, information: [] },
  action = {}
) {
  switch (action.type) {
    case BREWERIE_START:
      return {
        ...state,
        loading: true,
      };
    case BREWERIE_SUCCESS:
      return {
        ...state,
        loading: false,
        information: action.payload,
      };

    case BREWERIE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

// Action Creators
export function brewerieStart() {
  return { type: BREWERIE_START };
}

export function brewerieSuccess(data) {
  return { type: BREWERIE_SUCCESS, payload: data };
}

export function brewerieFail(error) {
  return { type: BREWERIE_FAIL, payload: error };
}

export function getBrewerie() {
  return async (dispatch) => {
    dispatch(brewerieStart());
    //Do CITY and dispatch accordingly

    try {
      let response = await fetch(`https://api.openbrewerydb.org/breweries`);

      let json = await response.json();

      dispatch(brewerieSuccess(json));
    } catch (error) {
      dispatch(brewerieFail());
    }
  };
}
