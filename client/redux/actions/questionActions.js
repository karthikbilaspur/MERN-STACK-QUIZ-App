import { FETCH_QUESTIONS } from './types';

export const fetchQuestions = () => async (dispatch) => {
  try {
    const response = await api.get('/questions');
    dispatch({
      type: FETCH_QUESTIONS,
      payload: response.data,
    });
  } catch (error) {
    console.error(error);
  }
};
