import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import CustomNav from "./components/CustomNav";
import Error from "./components/Error";
import RestaurantList from "./components/restaurant/RestaurantList";
import Login from "./components/Login";
import ReviewPage from "./components/review/ReviewPage";
function App() {
  return (
    <Router>
      <CustomNav />
      <Routes>
        <Route path="/" element={<RestaurantList />}></Route>
        <Route path="/id/:id" element={<ReviewPage />}></Route>

        <Route path="/login" element={<Login />}></Route>
        <Route path="*" element={<Error />}></Route>

      </Routes>
    </Router>
  );
}

export default App;
