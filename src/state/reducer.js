export const STATUS_CHANGED = "STATUS_CHANGED";
export const ADD_TOURNAMENT = "ADD_TOURNAMENT";
export const SET_MAIN_BOARD = "SET_MAIN_BOARD"

const initialState = {
  status: 'live',
  tournament: [],
  mainBoard: 0
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STATUS_CHANGED:
      return {
        ...state,
        status: action.payload,
      };
    case SET_MAIN_BOARD:
      return {
        ...state,
        mainBoard: action.payload
      }
    case ADD_TOURNAMENT:
      return {
        ...state,
        status: true,
        tournament: action.payload
      }
  }
  return state;
};