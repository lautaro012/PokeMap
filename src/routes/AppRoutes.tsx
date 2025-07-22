import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Details from '../pages/Details';
import Mapainteractivo from '../pages/Mapainteractivo';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Mapainteractivo />} />
      <Route path="/pokedex" element={<Home />} />
      <Route path="/details/:id" element={<Details />} />
    </Routes>
  );
}