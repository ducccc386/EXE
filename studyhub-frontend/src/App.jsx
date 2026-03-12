import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import News from "./pages/News";

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/news" element={<News />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;