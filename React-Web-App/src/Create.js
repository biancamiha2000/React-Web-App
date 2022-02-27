import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import useFetch from "./useFetch";
import "./index.css";
import { Progress } from "antd";

import { ProgressBar, Button } from "react-bootstrap";

// npx json-server --watch data/db.json --port 8000

const Create = () => {
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
  const [isShowing, setIsShowing] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(0);
  const [deleted, setDeleted] = useState(0);
  const [progress, setProgress] = useState(0);

  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);

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
    setIsPending(true);
    fetch("http://localhost:8000/blogs/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog),
    }).then(() => {
      // history.go(-1);
      history.push("/");
      setIsPending(false);
    });
    if (current < 9) {
      const newTot = total + 1;
      const newCurr = current + 1;
      fetch("http://localhost:8000/stats/", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          total: newTot,
          current: newCurr,
        }),
      });
    }
  };

  const { data: blog } = useFetch("http://localhost:8000/blogs/");
  const { data: stats, isPending: statsPending } = useFetch(
    "http://localhost:8000/stats/"
  );

  useEffect(() => {
    if (stats) {
      setTotal(stats.total);
      setCurrent(stats.current);
      setDeleted(stats.deleted);
    }
  }, [stats]);

  const handleAdd = () => {
    const first = blog[0];
    if (current > 9) {
      console.log("works");

      fetch("http://localhost:8000/blogs/" + first.id, {
        method: "DELETE",
      }).then(() => {
        history.push("/");
      });
      const Total = total + 1;
      const newDel = deleted + 1;
      fetch("http://localhost:8000/stats/", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deleted: newDel,
          total: Total,
        }),
      });
    }
    console.log(first);
  };

  return (
    <div className="create">
      <h1>New Client</h1>
      {
        <Progress
          className="progress"
          percent={progress}
          strokeColor={{
            "0%": "#108ee9",
            "100%": "#87d068",
          }}
        />
      }
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <label>Last Name</label>
          <input
            id="lastName"
            type="text"
            value={lastName}
            placeholder="Enter your last name..."
            // required
            {...register("lastName", {
              required: "This is required",
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: "This is not a valid name",
              },
              maxLength: { value: 20, message: "This name is too long" },
            })}
            onChange={(e) => setLastName(e.target.value)}
          />
          {errors.lastName && <p>{errors.lastName.message}</p>}
          <label>First Name</label>
          <input
            id="firstName"
            type="text"
            // required
            value={firstName}
            placeholder="Enter your first name..."
            // required
            {...register("firstName", {
              required: "This is required",
              pattern: {
                value: /^[a-z ,.'-]+$/i,
                message: "This is not a valid name",
              },
              maxLength: { value: 25, message: "This name is too long" },
            })}
            onChange={(e) => setFirstName(e.target.value)}
          />
          {errors.firstName && <p>{errors.firstName.message}</p>}
          <label>Street Name</label>
          <input
            id="street-name"
            type="text"
            value={streetName}
            placeholder="Enter your first name..."
            {...register("streetName", {
              pattern: {
                value: /^[A-Za-z-' .]+$/i,
                message: "This is not a valid street name",
              },
              maxLength: { value: 40, message: "Max length exceeded" },
            })}
            onChange={(e) => setStreetName(e.target.value)}
          />
          {errors.streetName && <p>{errors.streetName.message}</p>}
          <label>Street Number</label>
          <input
            id="street-no"
            type="text"
            value={streetNo}
            placeholder="Enter your street no..."
            {...register("streetNo", {
              pattern: {
                value: /^[0-9A-Za-z]+$/i,
                message: "This is not a valid street number...",
              },
              maxLength: { value: 20, message: "Max length exceeded" },
            })}
            onChange={(e) => setStreetNo(e.target.value)}
          />
          {errors.streetNo && <p>{errors.streetNo.message}</p>}
          <label>City</label>
          <input
            id="city"
            type="text"
            // required
            value={city}
            placeholder="Enter your city..."
            // required
            {...register("city", {
              required: "This is required",
              pattern: {
                value: /^[A-Za-z- ']+$/i,
                message: "This is not a city name",
              },
              maxLength: { value: 20, message: "Max length exceeded" },
            })}
            onChange={(e) => setCity(e.target.value)}
          />
          {errors.city && <p>{errors.city.message}</p>}
          <label>State</label>
          <input
            id="state"
            type="text"
            // required
            value={state}
            placeholder="Enter your  state..."
            // required
            {...register("state", {
              required: "This is required",
              pattern: {
                value: /^[A-Za-z-']+$/i,
                message: "This is not a state name",
              },
              maxLength: { value: 20, message: "Max length exceeded" },
            })}
            onChange={(e) => setState(e.target.value)}
          />
          {errors.state && <p>{errors.state.message}</p>}
          <label>Phone Number</label>
          <input
            id="phone-no"
            type="text"
            required
            value={phoneNo}
            placeholder="Enter your phone number..."
            {...register("phoneNo", {
              required: "This is required",
              pattern: {
                value: /^[0-9+-.]+$/i,
                message: "This is not a valid phone number!",
              },
              minLength: { value: 8, message: "Too short" },
              maxLength: { value: 15, message: "Max length exceeded" },
            })}
            onChange={(e) => setPhoneNo(e.target.value)}
          />
          {errors.phoneNo && <p>{errors.phoneNo.message}</p>}
          <label>Social Security Number</label>
          <input
            id="ssn"
            type="text"
            value={ssn}
            placeholder="Enter your  ssn..."
            {...register("ssn", {
              required: "This is required",
              pattern: {
                value: /^[0-9]+$/i,
                message: "This is not a state name",
              },
              minLength: { value: 11, message: "Too short" },
              maxLength: { value: 20, message: "Max length exceeded" },
            })}
            onChange={(e) => setSSN(e.target.value)}
          />
          {errors.ssn && <p>{errors.ssn.message}</p>}
          <label>Own a car?</label>
          <select
            id="question"
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
                id="license-plate"
                type="text"
                value={licensePlate}
                placeholder="Enter your  license plate number..."
                {...register("licensePlate", {
                  pattern: {
                    value: /^[0-9a-zA-Z]+$/i,
                    message: "This is not a license plate number",
                  },
                  minLength: { value: 5, message: "Too short" },
                  maxLength: { value: 10, message: "Max length exceeded" },
                })}
                onChange={(e) => setLicensePlate(e.target.value)}
              />
              {errors.licensePlate && <p>{errors.licensePlate.message}</p>}
            </div>
          )}

          {!isPending && (
            <button className="add-btn" onClick={handleAdd}>
              Add Client
            </button>
          )}
          {isPending && <button>Adding Client</button>}
        </fieldset>
      </form>
    </div>
  );
};

export default Create;
