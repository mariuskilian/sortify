import "./App.css";
import { FeatureBar } from "./components/FeatureBar";
import { Navbar } from "./components/Navbar";
import { DataProvider } from "./contexts/DataContext";
import { LoginProvider } from "./contexts/LoginContext";
import { Routes, Route } from "react-router-dom";
import { Home, Cleanup, ListenLater, Snapshots } from "./pages";

function App() {
  return (
    <div className="App">
      <LoginProvider>
        <Navbar />
      </LoginProvider>
      <FeatureBar />
      <DataProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cleanup" element={<Cleanup />} />
          <Route path="/listenlater" element={<ListenLater />} />
          <Route path="/snapshots" element={<Snapshots />} />
        </Routes>
      </DataProvider>
    </div>
  );
}

export default App;
