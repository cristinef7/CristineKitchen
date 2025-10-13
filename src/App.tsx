import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import About from "./pages/About";
import RecipeDetails from "./pages/RecipeDetails"; 
import './index.css';
import AddRecipe from "./pages/AddRecipe";
import EditRecipe from "./pages/EditRecipe";


function App() {
  return (
    <Router>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/about" element={<About />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} /> 
          <Route path="/add-recipe" element={<AddRecipe />} />
          <Route path="/edit-recipe/:id" element={<EditRecipe />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
