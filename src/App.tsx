import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Test from "./Test";
import { Header } from "./components/header";
import { Home } from "./pages/homepage";
import Challenge from "./components/challenge";

function App() {
  const RoutesSetup = () => {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
        <Route path="/challenge/:slug" element={<Challenge />} />
      </Routes>
    );
  };

  return (
    <>
      <Router>
        <Header />
        <RoutesSetup />
      </Router>
    </>
  );
}

export default App;
