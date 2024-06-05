import { Route, Routes } from "react-router";
import Splash from "./component/Splash";
import About from "./pages/About";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

function App() {
  return (
    <main className="w-3/4 mx-auto">
      <Splash />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/sign-in" element={<Signin />} />
      </Routes>
    </main>
  );
}

export default App;
