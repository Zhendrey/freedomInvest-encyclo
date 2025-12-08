import './css/style.css'
import { Outlet } from 'react-router-dom'
import FavoritesProvider from './context/FavoritesProvider.jsx'

export default function App() {
  return (
    <FavoritesProvider>
      <Outlet/>
    </FavoritesProvider>
  )
}