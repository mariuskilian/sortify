import "./App.css";

import { Cleanup, Home, ListenLater, Snapshots } from "./pages";
import { Route, Routes } from "react-router-dom";

import { DataProvider } from "./contexts/DataContext";
import { FeatureBar } from "./components/FeatureBar";
import { LoginProvider } from "./contexts/LoginContext";
import { Navbar } from "./components/Navbar";

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
