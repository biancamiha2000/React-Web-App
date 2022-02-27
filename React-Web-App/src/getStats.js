import { useEffect, useState } from "react";
import useFetch from "./useFetch";
import { useHistory, useParams } from "react-router-dom";

const GetStats = () => {
  const [stats, setStats] = useState([]);
  const [deleted, setDeleted] = useState([]);
  const [current, setCurrent] = useState([]);
  const [total, setTotal] = useState([]);
  const [edited, setEdited] = useState([]);

  useEffect(() => {
    if (stats) {
      setEdited(stats.edited);
      setTotal(stats.total);
      setCurrent(stats.current);
      setDeleted(stats.deleted);
    }
  }, [stats]);

  fetch("http://localhost:8000/stats/", {
    method: "COPY",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(stats),
  }).then(() => {
    // history.go(-1);
    // history.push("/stats");
  });

  return [stats];
};

export default GetStats;
