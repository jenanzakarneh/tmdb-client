import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Box } from "@chakra-ui/react";
ChartJS.register(ArcElement, Tooltip, Legend);

const RatingChart = ({ x }) => {
  const data = {
    // labels: ["Mon", "Tue", "Wed", "Thurs", "Fri"],
    datasets: [
      {
        data: [x, 10 - x],
        borderColor: ["rgba(255,206,86,0.2)"],
        backgroundColor: ["#01D277", "white"],
        pointBackgroundColor: "rgba(255,206,86,0.2)",
        cutout: "90%",
      },
    ],
  };
  const textCenter = {
    id: "textCenter",
    beforeDatasetsDraw(chart, args, plugins) {
      const { ctx, data } = chart;
      ctx.save();
      ctx.font = "bolder 30px sans-serif";

      ctx.fillText(
        Math.ceil(10 * x),
        chart.getDatasetMeta(0).data[0].x,
        chart.getDatasetMeta(0).data[0].y
      );
    },
  };
  const options = { responsive: true, maintainAspectRatio: false };
  return (
    <div style={{ hight: "400", width: "400" }}>
      <Doughnut
        hight="100"
        width="100"
        data={data}
        opttions={options}
        plugins={[textCenter]}
      ></Doughnut>
    </div>
  );
};

export default RatingChart;
