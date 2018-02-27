import Axios from '../../util/Axios';

export function getData(params) {
  return dispatch => {
    let tab = params.tab || 'all';
    let page = params.page;
    Axios.get('/topics', { params }).then(res => {
      let data = res.data.data;
      console.log('dispatch...home');
      dispatch({ type: 'GETDATA_HOME', data: data });
    });
  };
}
