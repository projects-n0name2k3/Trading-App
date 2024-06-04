import React, { useEffect, useState } from "react";
import "dayjs/locale/en";
import { DatesProvider, MonthPickerInput } from "@mantine/dates";
import { modals } from "@mantine/modals";
import { NumberInput } from "@mantine/core";
const StatisticMain = () => {
  const [value, setValue] = useState(new Date());
  const [dayData, setDayData] = useState(
    JSON.parse(localStorage.getItem("dayData")) || []
  );
  const [totalDays, setTotalDays] = useState(1);
  const tempData = {
    day: 1,
    value: 0,
  };
  useEffect(() => {
    const convertMonthToNumber = (month) => {
      const monthMap = {
        Jan: 1,
        Feb: 2,
        Mar: 3,
        Apr: 4,
        May: 5,
        Jun: 6,
        Jul: 7,
        Aug: 8,
        Sep: 9,
        Oct: 10,
        Nov: 11,
        Dec: 12,
      };
      return monthMap[month];
    };

    const monthNumber = value?.toString().split(" ")[1];
    const monthAsNumber = convertMonthToNumber(monthNumber);
    const daysInMonth = (month, year) => {
      setTotalDays(
        Array.from(
          { length: new Date(year, month, 0).getDate() },
          (_, i) => i + 1
        ).filter((day) => {
          const date = new Date(year, month - 1, day);
          return date.getDay() !== 0 && date.getDay() !== 6; // Filter out Sundays (0 represents Sunday) and Saturdays (6 represents Saturday)
        }).length
      );
    };
    daysInMonth(monthAsNumber, value?.toString().split(" ")[3]);
  }, [value]);
  const openModal = (day) =>
    modals.openConfirmModal({
      title: "Edit Data",
      children: (
        <div className="flex-col space-y-4">
          <NumberInput
            placeholder="Profit or Loss"
            onChange={(e) => (tempData.value = e)}
          />
        </div>
      ),
      labels: { confirm: "Edit", cancel: "Cancel" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => {
        const existingData = dayData.find(
          (data) =>
            data.day ===
            `${value?.toString().split(" ")[1]} ${day} ${
              value?.toString().split(" ")[3]
            }`
        );
        if (existingData) {
          existingData.value = tempData.value;
          const updatedData = [...dayData];
          localStorage.setItem("dayData", JSON.stringify(updatedData));
          setDayData(updatedData);
        } else {
          tempData.day = `${value?.toString().split(" ")[1]} ${day} ${
            value?.toString().split(" ")[3]
          }`;
          const updatedData = [...dayData, tempData];
          localStorage.setItem("dayData", JSON.stringify(updatedData));
          setDayData(updatedData);
        }
      },
    });
  console.log(dayData);
  return (
    <div className="col-span-9  grid grid-cols-12 grid-rows-12 gap-x-5 p-4 h-[800px]">
      <div className="col-span-12 row-span-2 flex items-center">
        <h1 className="text-3xl font-bold text-white">Statistic</h1>
      </div>
      <div className="col-span-12 row-span-10 justify-between grid grid-cols-12 gap-5 grid-rows-12">
        <div className="col-span-12 row-span-1">
          <DatesProvider
            settings={{
              locale: "en",
              firstDayOfWeek: 0,
              weekendDays: [0],
              timezone: "UTC",
            }}
          >
            <MonthPickerInput
              placeholder="Pick month"
              className="w-[20%]"
              value={value}
              defaultValue={new Date("2000-10-03 02:10:00Z")}
              onChange={setValue}
              minDate={new Date(2024, 5, 1)}
              maxDate={new Date(2024, 6, 1)}
            />
          </DatesProvider>
        </div>
        <div className="col-span-12 row-span-12 justify-between grid grid-cols-12 gap-5 grid-rows-12">
          {Array(totalDays)
            .fill()
            .map((_, index) => (
              <div
                key={index}
                className="col-span-2 row-span-2 flex-col gap-2 border rounded-lg cursor-pointer  hover:bg-[#4B4E5A] transition-all duration-200 ease-in-out flex items-center justify-center"
                onClick={() => openModal(index + 1)}
              >
                <h1 className="text-white font-bold text-md text-center mt-1">
                  {index + 1}
                </h1>

                {dayData.map((day) => {
                  if (
                    Number(day.day.split(" ")[1]) === index + 1 &&
                    value?.toString().split(" ")[1] === day.day.split(" ")[0]
                  ) {
                    return (
                      <h1
                        className={`${
                          day.value >= 0 ? "text-green-300" : "text-red-300"
                        } font-bold text-md text-center mt-1`}
                      >
                        {day.value}
                      </h1>
                    );
                  }
                })}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default StatisticMain;
