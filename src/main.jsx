import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './Root.jsx';
import './index.css';
import Phones from './components/Phones';
import AddPhones from './components/AddPhones';
import PhoneDetails from './components/PhoneDetails.jsx';
import Login from './components/Login';
import AuthProvider from './components/AuthProvider.jsx';
import Orders from './components/Orders';
import Private from './components/Private';
import axios from 'axios';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Phones />,
        loader: () => fetch('https://phone-db-server.vercel.app/phones')
      },
      {
        path: "/add",
        element: <AddPhones />,
      },
      {
        path: "/orders",
        element: <Private><Orders /></Private>,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/details/:id",
        element: <PhoneDetails />,
        loader: ({params}) => axios.get(`https://phone-db-server.vercel.app/phones/${params.id}`)
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
)
