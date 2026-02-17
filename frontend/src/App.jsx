import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { AboutUs } from "./pages/AboutUs";
import { Why } from "./pages/Why";
import { RecipeList } from "./pages/RecipeList";
import { Recipe } from "./pages/Recipe";
import { Favorites } from "./pages/Favorites";
import { Footer } from "./components/Footer";

export const App = () => {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Header />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/why" element={<Why />} />
            <Route path="/recipes" element={<RecipeList />} />
            <Route path="/recipes/:id" element={<Recipe />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};
