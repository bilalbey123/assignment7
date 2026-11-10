import { useEffect, useReducer } from 'react';
const initialState = { loading: true, error: null, data: null };
function reducer(state, action) { switch (action.type) { case 'start': return { loading: true, error: null, data: null }; case 'success': return { loading: false, error: null, data: action.data }; case 'failure': return { loading: false, error: action.error, data: null }; default: return state; } }
export function useFetch(fetcher, inputs) {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => { const controller = new AbortController(); dispatch({ type: 'start' }); Promise.resolve().then(() => fetcher(controller.signal)).then((data) => dispatch({ type: 'success', data }), (error) => { if (error.name !== 'AbortError') dispatch({ type: 'failure', error }); }); return () => controller.abort(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, inputs);
  return state;
}
