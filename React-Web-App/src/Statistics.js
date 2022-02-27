import getStats from "./getStats";
import Chart from "./Chart";

const Statistics = () => {
  const [stats] = getStats();
  return (
    <div className="ui segment">
      <Chart stats={stats} />
    </div>
  );
};

export default Statistics;
