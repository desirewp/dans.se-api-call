import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import LandingPage from "./pages/landing/landing.page";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <h1>Dansarna.se Arvodesberäknare</h1>
      </div>
      <LandingPage />
    </>
  );
}

export default App;
