import './App.css'
import Chat from './pages/chat/Chat';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Messenger from './pages/messenger/Messenger';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Chat />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/messenger',
    element: <Messenger />
  },
])

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App;
