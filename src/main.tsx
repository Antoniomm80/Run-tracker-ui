import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPage from './runtracker/components/errorpage.tsx';
import { TrackListPage } from './runtracker/components/tracklistpage.tsx';
import { TrackPageLoader } from './runtracker/components/trackpageloader.tsx';
import TrackStatsGraphContainer from './runtracker/components/trackstatspathcontainer.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <TrackListPage />,
      },
      {
        path: "tracks/:trackId",
        element: <TrackPageLoader />,
      },
      {
        path: "charts",
        element: <TrackStatsGraphContainer />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
