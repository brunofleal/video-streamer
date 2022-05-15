import React, {useState, useEffect} from "react";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer";
import "./App.css";
import Home from "./pages/Home";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>{!data ? "Loading..." : data}</p>
        <Home></Home>
      </header>
    </div>

  );
}

export default App;
