import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
// import reducer from './reducers/anecdoteReducer'
import rootReducer from './reducers/combiner'

const store = createStore(rootReducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)