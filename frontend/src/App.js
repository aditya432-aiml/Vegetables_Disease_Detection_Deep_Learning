import { ImageUpload } from "./home";
import { ImageUpload3 } from "./pepper";
import { ImageUpload2 } from "./tomato";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/" element={<ImageUpload />} />
          <Route path="/tomato" element={<ImageUpload2 />} />
          <Route path="/pepper" element={<ImageUpload3 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
