import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PanelPage from "./pages/PanelPage"
import ConfigPage from "./pages/ConfigPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='panel' element={<PanelPage />}/>
        <Route path="config" element={<ConfigPage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
