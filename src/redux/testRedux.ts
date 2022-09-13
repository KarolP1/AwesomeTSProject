import {useSelector} from 'react-redux';
import {RootState} from './store';
import {createSlice} from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    incremented: state => {
      state.value += 1;
    },
    decremented: state => {
      state.value -= 1;
    },
  },
});
export const getValueOfCounter = () =>
  useSelector((state: RootState) => state.counter.value);
export default counterSlice.reducer;
