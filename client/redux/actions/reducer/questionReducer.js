import { FETCH_QUESTIONS } from '../actions/types';

const initialState = {
  questions: [],
};

const questionReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_QUESTIONS:
      return { ...state, questions: action.payload };
    default:
      return state;
  }
};

export default questionReducer;