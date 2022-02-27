import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import useFetch from "./useFetch";
import "./index.css";
import NavbarHome from "./NavbarHome";

const Home = () => {
  const {
    error,
    isPending,
    data: blogs,
  } = useFetch("http://localhost:8000/blogs");
  return (
    <div>
      {/* <NavbarHome /> */}
      <div className="search-input">
        <SearchBar placeholder="Search..." data={blogs} />
      </div>
      <Link to="/view-all" className="home-view-all">
        View All
      </Link>
      <Link
        to="/create"
        style={{
          color: "white",
          backgroundColor: "#f1356d",
          borderRadius: "8px",
        }}
        className="home-add-client"
      >
        Add Client
      </Link>
      <Link to="/statistics" className="home-statistics">
        Statistics
      </Link>
    </div>
  );
};

export default Home;
