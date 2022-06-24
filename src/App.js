import "./App.css";
import { FeatureBar } from "./components/FeatureBar";
import { Home, Cleanup, ListenLater, Snapshots } from "./pages";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <FeatureBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cleanup" element={<Cleanup />} />
        <Route path="/listenlater" element={<ListenLater />} />
        <Route path="/snapshots" element={<Snapshots />} />
      </Routes>
    </div>
  );
}

export default App;
