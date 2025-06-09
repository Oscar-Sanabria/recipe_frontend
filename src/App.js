import './App.css';
import RecipeForm from './pages/CreateRecipeForm';
import RecipesPage from './pages/RecipesList';
import RecipeDetail from './pages/RecipeDetail'; 
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/crearReceta" element={<RecipeForm />} />
        <Route path="/" element={<RecipesPage />} />
        <Route path="/detalleReceta/:id" element={<RecipeDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
