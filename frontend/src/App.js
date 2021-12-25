import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { EmployeeList, UpsertEmployee } from "./components/employee";
import "./App.css";

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="nav-link">
          <strong className="navbar-brand ps-3 pe-3">CNS Assignment</strong>
        </Link>

        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/upsert"} className="nav-link">
              Add employee
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route exact path="/" element={<EmployeeList />} />
          <Route path="upsert" element={<UpsertEmployee />} />
          <Route path="upsert/:id" element={<UpsertEmployee />} />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
