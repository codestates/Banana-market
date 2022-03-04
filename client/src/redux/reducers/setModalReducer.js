import { initialOnOffBtn } from './initialState';
import { SET_ON, SET_OFF } from '../actions/actions';

const setModalReducer = (state = initialOnOffBtn, action) => {
  switch (action.type) {
    case SET_S:
      let off = action.payload;
      return {
        status: off.status,
      };

    default:
      return state;
  }
};

export default setModalReducer;
