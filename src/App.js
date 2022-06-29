import "./App.css";
import { FeatureBar } from "./components/FeatureBar";
import { Navbar } from "./components/Navbar";
import { DataHolder } from "./components/DataHolder";

function App() {
  return (
    <div className="App">
      <Navbar />
      <FeatureBar />
      <DataHolder />
    </div>
  );
}

export default App;
