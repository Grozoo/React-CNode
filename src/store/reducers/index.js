import { allData } from './allReducer';
/**
 * 合并 reducer
 *
 */
export default function reducer(state = {}, action) {
  return {
    allData: allData(state.allData, action)
    //  test: test(state.test, action)
  };
}
