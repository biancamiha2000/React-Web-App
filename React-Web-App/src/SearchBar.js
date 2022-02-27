import React, { useState } from "react";
import BlogList from "./BlogList";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";

function SearchBar({ placeholder, data }) {
  const [filteredData, setFilteredData] = useState([]);

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    const newFilter =
      searchWord.length !== 0 &&
      data &&
      data.filter((value) => {
        return (
          value.lastName.toLowerCase().includes(searchWord.toLowerCase()) ||
          value.firstName.toLowerCase().includes(searchWord.toLowerCase()) ||
          value.streetName.toLowerCase().includes(searchWord.toLowerCase()) ||
          value.streetNo.toLowerCase().includes(searchWord.toLowerCase()) ||
          value.city.toLowerCase().includes(searchWord.toLowerCase()) ||
          value.state.toLowerCase().includes(searchWord.toLowerCase()) ||
          value.phoneNo.toLowerCase().includes(searchWord.toLowerCase()) ||
          value.ssn.toLowerCase().includes(searchWord.toLowerCase()) ||
          value.licensePlate.toLowerCase().includes(searchWord.toLowerCase())
        );
      });
    setFilteredData(newFilter);
  };

  return (
    <div className="search">
      <div classname="searchInputs">
        <input type="text" placeholder={placeholder} onChange={handleFilter} />
        <div className="searchIcon">
          {filteredData.length === 0 ? (
            <SearchIcon />
          ) : (
            <SearchIcon id="searchBtn" />
          )}
        </div>
      </div>
      {filteredData.length !== 0 && (
        <div className="dataResult">
          {filteredData &&
            filteredData.map((blog, key) => {
              return (
                <div class>
                  <BlogList blogs={filteredData} />
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
export default SearchBar;
