import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Test from "./Test";
import { Header } from "./components/header";
import { Home } from "./pages/homepage";

function App() {
  const RoutesSetup = () => {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
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
