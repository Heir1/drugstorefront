"use client"
import { Provider } from 'react-redux';
import store from "./redux/store/store";
import Dashboard from "./pages/admin/dashboard/Dashboard";

export default function App() {
  return (
    <Provider store={store}>
      <Dashboard/>
    </Provider>
  )
}



