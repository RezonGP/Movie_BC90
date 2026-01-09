import { BrowserRouter, Routes, Route } from 'react-router-dom';
import routes from './routes';
import AdminTemplate from './pages/AdminTemplate';
import AdminMovies from './pages/AdminTemplate/pages/Movies';
import AdminUsers from './pages/AdminTemplate/pages/Users';
import AdminTheaters from './pages/AdminTemplate/pages/Theaters';
import AdminBookings from './pages/AdminTemplate/pages/Bookings';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={<route.element />} />
        ))}
        <Route path="/admin" element={<AdminTemplate />}>
          <Route index element={<AdminMovies />} />
          <Route path="movies" element={<AdminMovies />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="theaters" element={<AdminTheaters />} />
          <Route path="bookings" element={<AdminBookings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
