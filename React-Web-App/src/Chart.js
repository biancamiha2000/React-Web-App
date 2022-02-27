import { useEffect, useState } from "react";
import useFetch from "./useFetch";
import { useHistory, useParams } from "react-router-dom";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Chart = () => {
  // const { data: stats, isPending: statsPending } = useFetch(
  //   "http://localhost:8000/stats/"
  // );

  const { data: stats, isPending: statsPending } = useFetch(
    "http://localhost:8000/stats/"
  );

  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(0);
  const [edited, setEdited] = useState(0);
  const [deleted, setDeleted] = useState(0);

  useEffect(() => {
    if (stats) {
      setTotal(stats.total);
      setCurrent(stats.current);
      setEdited(stats.edited);
      setDeleted(stats.deleted);
    }
  }, [stats]);

  const added = parseInt(total);
  const currentt = parseInt(current);
  const editedd = parseInt(edited);
  const deletedd = parseInt(deleted);

  const data = [
    {
      name: "Total Clients",
      current_number: added,
    },
    {
      name: "Current # of Clients",
      current_number: current,
    },
    {
      name: "Deleted Clients",
      current_number: deleted,
    },
    {
      name: "Modified Clients",
      current_number: edited,
    },
  ];
  return (
    <ResponsiveContainer width="100%" aspect={3}>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="current_number" fill="#34cdeb" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;
