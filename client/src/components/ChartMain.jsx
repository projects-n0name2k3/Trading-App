import React, { useEffect, useState } from "react";
import { Sparkline } from "@mantine/charts";
import { LineChart } from "@mantine/charts";
import { Skeleton } from "@mantine/core";
const ChartMain = () => {
  const [chartData, setChartData] = useState(null);
  const [profitData, setProfitData] = useState(
    JSON.parse(localStorage.getItem("dayData")) || []
  );

  useEffect(() => {
    const formattedData = profitData.map((data, index) => {
      const date = new Date();
      date.setDate(date.getDate() - (profitData.length - index));
      const formattedDate = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      const balance =
        index === 0 ? 1000 : formattedData[index - 1].balance + data.value;

      return { formattedDate, balance };
    });
    console.log(formattedData);

    setChartData(formattedData);
  }, []);

  return (
    <div className="col-span-9  grid grid-cols-12 grid-rows-12 gap-x-5 p-4">
      <div className="col-span-12 row-span-2 flex items-center">
        <h1 className="text-3xl font-bold text-white">Chart</h1>
      </div>
      <div className="col-span-12 row-span-5 justify-between grid grid-cols-12 gap-x-5">
        <div className="col-span-12">
          <h1 className="text-white font-bold  text-2xl text-center">XAUUSD</h1>

          {chartData ? (
            <LineChart
              h={"80%"}
              w={"100%"}
              data={chartData || []}
              dataKey="date"
              tooltipAnimationDuration={200}
              series={[{ name: "balance", color: "teal.6" }]}
              curveType="natural"
              yAxisDomain={[1500, "auto"]}
            />
          ) : (
            <Skeleton height={200}></Skeleton>
          )}
        </div>
      </div>
      <div className="col-span-12 row-span-8 justify-between  gap-x-5">
        <h1 className="text-white font-bold  text-3xl text-center">Profit</h1>
        {chartData ? (
          <LineChart
            h={"80%"}
            w={"100%"}
            data={profitData || []}
            dataKey="day"
            tooltipAnimationDuration={200}
            series={[{ name: "value", color: "indigo.6" }]}
            curveType="natural"
            yAxisDomain={[1500, "auto"]}
          />
        ) : (
          <Skeleton height={200}></Skeleton>
        )}
      </div>
    </div>
  );
};

export default ChartMain;
