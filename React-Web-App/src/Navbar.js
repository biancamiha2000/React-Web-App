import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import useFetch from "./useFetch";
import "./index.css";

const Navbar = () => {
  const {
    error,
    isPending,
    data: blogs,
  } = useFetch("http://localhost:8000/blogs");

  return (
    <nav className="navbar">
      <h1>Echipa Formular</h1>
      <div className="navbar-search">
        <SearchBar placeholder="Search..." data={blogs} />
      </div>

      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/view-all">View All</Link>
        <Link
          to="/create"
          style={{
            color: "white",
            backgroundColor: "#f1356d",
            borderRadius: "8px",
          }}
        >
          Add Client
        </Link>
        <Link to="/statistics">Statistics</Link>
      </div>
    </nav>
  );
};

export default Navbar;
