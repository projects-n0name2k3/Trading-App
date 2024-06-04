import React, { useEffect, useState } from "react";
import { Sparkline } from "@mantine/charts";
import { LineChart } from "@mantine/charts";
import { Skeleton } from "@mantine/core";
const ChartMain = () => {
  const [result, setResult] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [profitData, setProfitData] = useState(
    JSON.parse(localStorage.getItem("dayData")) || []
  );
  const fetchData = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var today = new Date();
    var january = new Date(2023, 0, 1);
    var timestamps = [];
    var currentDate = january;
    while (currentDate <= today) {
      var lastDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      );
      var timestamp = Math.floor(lastDayOfMonth.getTime() / 1000);
      timestamps.push(timestamp);
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
    var requests = timestamps.map((timestamp) => {
      var raw = JSON.stringify({
        operationName: "MetalQuote",
        query:
          "fragment MetalFragment on Metal { ID symbol currency name results { ...MetalQuoteFragment } } fragment MetalQuoteFragment on Quote { ID ask bid change changePercentage close high low mid open originalTime timestamp unit } query MetalQuote( $symbol: String! $currency: String! $timestamp: Int ) { GetMetalQuoteV3( symbol: $symbol currency: $currency timestamp: $timestamp ) { ...MetalFragment } }",
        variables: {
          currency: "USD",
          symbol: "AU",
          timestamp: timestamp,
        },
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      return fetch("https://kitco-gcdn-prod.stellate.sh/", requestOptions)
        .then((response) => response.json())
        .then((result) => result.data.GetMetalQuoteV3.results[0])
        .catch((error) => console.log("error", error));
    });

    Promise.all(requests)
      .then((results) => setResult(results))
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (result) {
      const formattedData = result.map((item) => ({
        date: item.originalTime.split(" ")[0],
        high: item.high,
        low: item.low,
        mid: item.mid,
      }));
      setChartData(formattedData);
    }
  }, [result]);

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
              series={[
                { name: "high", color: "indigo.6" },
                { name: "low", color: "blue.6" },
                { name: "mid", color: "teal.6" },
              ]}
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
