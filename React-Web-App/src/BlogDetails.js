import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { useState, useEffect } from "react";

const BlogDetails = () => {
  const { id } = useParams();
  const {
    data: blog,
    error,
    isPending,
  } = useFetch("http://localhost:8000/blogs/" + id);
  const { data: stats, isPending: statsPending } = useFetch(
    "http://localhost:8000/stats/"
  );
  console.log(stats);

  const history = useHistory();
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [streetName, setStreetName] = useState("");
  const [streetNo, setStreetNo] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [ssn, setSSN] = useState("");
  const [question, setQuestion] = useState("NO");
  const [licensePlate, setLicensePlate] = useState("");
  const [save, setSave] = useState(false);
  const [deleted, setDeleted] = useState(0);
  const [current, setCurrent] = useState(0);
  const [edited, setEdited] = useState(0);

  useEffect(() => {
    if (blog) {
      setLastName(blog.lastName);
      setFirstName(blog.firstName);
      setStreetName(blog.streetName);
      setStreetNo(blog.streetNo);
      setCity(blog.city);
      setState(blog.state);
      setPhoneNo(blog.phoneNo);
      setSSN(blog.ssn);
      setLicensePlate(blog.licensePlate);
    }
  }, [blog]);

  useEffect(() => {
    if (stats) {
      setDeleted(stats.deleted);
      setCurrent(stats.current);
      setEdited(stats.edited);
    }
  }, [stats]);

  const handleSave = (e) => {
    setSave(!save);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = {
      lastName,
      firstName,
      streetName,
      streetNo,
      city,
      state,
      phoneNo,
      ssn,
      question,
      licensePlate,
    };

    fetch("http://localhost:8000/blogs/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog),
    }).then(() => {
      // history.go(-1);
      history.push("/");
    });
  };

  const handleClick = () => {
    fetch("http://localhost:8000/blogs/" + blog.id, {
      method: "DELETE",
    }).then(() => {
      history.push("/");
    });
    console.log(blog);
    const newDel = deleted + 1;
    const newCurr = current - 1;
    fetch("http://localhost:8000/stats/", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        deleted: newDel,
        current: newCurr,
      }),
    });
  };
  const handleUpdate = () => {
    fetch("http://localhost:8000/blogs/" + blog.id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: blog.id,
        lastName,
        firstName,
        streetName,
        streetNo,
        city,
        state,
        phoneNo,
        ssn,
        question,
        licensePlate,
      }),
    });
    setSave(false);
    const newEd = edited + 1;
    fetch("http://localhost:8000/stats/", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        edited: newEd,
      }),
    });
  };
  if (current > 5) {
    console.log("merge");
  }

  return (
    <div className="blog-details">
      <fieldset>
        {isPending && <div>Loading...</div>}
        {error && <div>{error}</div>}
        {blog && (
          <article>
            {!save && (
              <div className="blog-details-good">
                <h1>{lastName + " " + firstName}</h1>
                <div>Adress: {streetName + " " + streetNo}</div>
                <div>City/State: {city + ", " + state}</div>
                <div>Phone Number: {phoneNo}</div>
                <div>Social Security Number: {ssn}</div>
                <div>Car owner: {question}</div>
                <div>License Plate: {licensePlate}</div>
              </div>
            )}
            {save && (
              <div>
                <div className="create">
                  <h2>New Client</h2>
                  <form onSubmit={handleSubmit}>
                    <label>Last Name</label>
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                    <label>First Name</label>
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <label>Street Name</label>
                    <input
                      type="text"
                      value={streetName}
                      onChange={(e) => setStreetName(e.target.value)}
                    />
                    <label>Street Number</label>
                    <input
                      type="text"
                      value={streetNo}
                      onChange={(e) => setStreetNo(e.target.value)}
                    />
                    <label>City</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                    <label>State</label>
                    <input
                      type="text"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    />
                    <label>Phone Number</label>
                    <input
                      type="text"
                      required
                      value={phoneNo}
                      onChange={(e) => setPhoneNo(e.target.value)}
                    />
                    <label>Social Security Number</label>
                    <input
                      type="text"
                      required
                      value={ssn}
                      onChange={(e) => setSSN(e.target.value)}
                    />
                    <label>Own a car?</label>
                    <select
                      value={question}
                      onChange={(e) => {
                        setQuestion(e.target.value);
                      }}
                    >
                      <option value="YES">Yes</option>
                      <option value="NO">No</option>
                    </select>

                    {question === "YES" && (
                      <div>
                        <label>License Plate</label>
                        <input
                          type="text"
                          value={licensePlate}
                          onChange={(e) => setLicensePlate(e.target.value)}
                        />
                      </div>
                    )}
                  </form>
                </div>
              </div>
            )}
            <button onClick={handleClick}>Delete</button>
            {!save && <button onClick={handleSave}>Edit</button>}
            {save && <button onClick={handleUpdate}>Save</button>}
          </article>
        )}
      </fieldset>
    </div>
  );
};

export default BlogDetails;
