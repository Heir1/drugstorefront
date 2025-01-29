"use client"
import { Provider } from 'react-redux';
import store from "./redux/store/store";
import Login from './pages/login/Login';

export default function App() {
  return (
    <Provider store={store}>
      <Login/>
    </Provider>
  )
}



