import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import CustomNav from "./components/CustomNav";
import Error from "./components/Error";
import RestaurantList from "./components/restaurant/RestaurantList";
import Login from "./components/Login";
import ReviewPage from "./components/review/ReviewPage";
import { useState } from "react";
import AddEditReviewFrom from "./components/review/AddEditReviewFrom";
function App() {
  const [isLogged, setIsLogged] = useState(false);

  return (
    <Router>
      <CustomNav {...{ isLogged, setIsLogged }} />
      <Routes>
        <Route path="/" element={<RestaurantList />}></Route>
        <Route
          path="/id/:id"
          element={<ReviewPage {...{ isLogged }} />}
        ></Route>
        <Route
          path="/id/:id/:reviewId/:reviewText"
          element={<AddEditReviewFrom {...{ isLogged }} />}
        ></Route>

        <Route path="/login" element={<Login {...{ setIsLogged }} />}></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
