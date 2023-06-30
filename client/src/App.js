import "./App.css";
import Navbar from "./components/navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homescreen from "./screens/Homescreen";
import Bookingscreen from "./screens/Bookingscreen";
import Register from "./screens/Register";
import Login from "./screens/Login";
import Profilescreen from "./screens/Profilescreen";
import Adminscreen from "./screens/Adminscreen";
import Landingscreen from "./screens/Landingscreen";

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route exact path="/home" element={<Homescreen />} />
          <Route
            exact
            path="/book/:roomid/:fromdate/:todate"
            element={<Bookingscreen />}
          />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/profile" element={<Profilescreen />} />
          <Route exact path="/admin" element={<Adminscreen />} />
          <Route exact path="/" element={<Landingscreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
