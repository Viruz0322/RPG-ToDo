import React from 'react'
import ReactDOM from 'react-dom/client'
import './main.css'

import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import SideBar from './components/navBar';
import ErrorPage from './components/error-page';
import Warrior from './components/warrior';
import Healer from './components/healer';
import Scholar from './components/scholar';


const router = createBrowserRouter([
  {
    path: '/',
    element: <SideBar />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'warrior',
        element: <Warrior />
      },
      { 
        path: 'healer',
        element: <Healer />,
      },
      {
        path: 'scholar',
        element: <Scholar />,
      },
    ],
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>  
    <div></div>
    </RouterProvider>
  </React.StrictMode>
)
