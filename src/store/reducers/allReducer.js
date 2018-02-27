export function allData(
  state = {
    isReq: true,
    page: 1
  },
  action
) {
  switch (action.type) {
    case 'GETDATA_HOME':
      return { ...state, data: action.data, isReq: false };
    case 'NEXT_PAGE':
      return state;
    default:
      console.log('default');
      return state;
  }
}
