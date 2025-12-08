import { createRoot } from 'react-dom/client'
import './css/style.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Login from './pages/Login.jsx'
import NotFound from './pages/NotFound.jsx'
import RootLayout from './layouts/RootLayout.jsx'
import StocksLayout from './layouts/StocksLayout.jsx'
import StocksList from './pages/StocksList.jsx'
import StockDetails from './pages/StockDetails.jsx'
import Charts from './pages/Charts.jsx'
import StockDividends, { getDividends } from './pages/StockDividends.jsx'
import Favorites from './pages/Favorites.jsx'
import Compare from './pages/Compare.jsx'
import StockOverview from './pages/StockOverview.jsx'
import ErrorBoundary from './pages/ErrorBoundary.jsx'
import StocksProvider, { getStocks } from './context/StocksProvider.jsx'
import ChartDataProvider from './context/ChartDataProvider.jsx'
import UserProvider from './context/UserProvider.jsx'
import ProtectedRoute from './pages/ProtectedRoute.jsx'
import Logout from './pages/Logout.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <UserProvider><App/></UserProvider>,
    errorElement: <ErrorBoundary/>,
    children:[
      {
        element: <RootLayout/>,
        errorElement: <ErrorBoundary/>,
        children:[
          {
            index: true,
            element: <Home/>
          },
          {
            path: 'about',
            element: <About/>
          },
          {
            path: "login",
            element: <Login/>
          },
          {
            path: "logout",
            element: <Logout/>
          },
          {
            path: "stocks",
            element: 
                <StocksProvider>
                  <StocksLayout/>
                </StocksProvider>,
            errorElement: <ErrorBoundary/>,
            loader: getStocks,
            children:[
              {
                index: true,
                element: <StocksList/>,
              },
              {
                path: ':symbol',
                element: <StockDetails/>,
                children:[
                  {
                    index: true,
                    element: <StockOverview/>
                  },
                  {
                    path: 'charts',
                    element: <Charts/>,
                  },
                  {
                    path: 'dividends',
                    element: <StockDividends/>,
                    errorElement: <ErrorBoundary/>,
                    loader: getDividends,
                  },
                ]
              },
            ]
          },
          {
            path: 'favorites',
            element: 
              <ProtectedRoute>
                <Favorites/>
              </ProtectedRoute>
            ,
          },
          {
            path: 'compare',
            element: <StocksProvider>
                <ChartDataProvider>
                  <ProtectedRoute>
                    <Compare/>
                  </ProtectedRoute>
                </ChartDataProvider>
              </StocksProvider>,
            errorElement: <ErrorBoundary/>,
            loader: getStocks,
            children:[
                  {
                    index: true,
                    element: <StockOverview/>
                  },
                  {
                    path: 'charts',
                    element: <ChartDataProvider><Charts/></ChartDataProvider>,
                  },
                  {
                    path: 'dividends',
                    element: <StockDividends/>,
                    errorElement: <ErrorBoundary/>,
                    loader: getDividends,
                  },
                ]
          }
        ]
      },
      {
        path: '*',
        element: <NotFound/>
      }
    ],
  }
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
