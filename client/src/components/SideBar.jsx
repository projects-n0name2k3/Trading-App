import React from "react";
import { useState } from "react";
import { NavLink } from "@mantine/core";
import { IoHomeOutline, IoHomeSharp } from "react-icons/io5";
import {
  PiTarget,
  PiTargetBold,
  PiChartLine,
  PiChartLineBold,
  PiCalculatorDuotone,
  PiCalculatorFill,
} from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const data = [
    { icon: IoHomeOutline, iconBold: IoHomeSharp, label: "Dashboard", to: "/" },
    { icon: PiTarget, iconBold: PiTargetBold, label: "Target", to: "/target" },
    {
      icon: PiChartLine,
      iconBold: PiChartLineBold,
      label: "Statistic",
      to: "/statistic",
    },
    {
      icon: PiCalculatorDuotone,
      iconBold: PiCalculatorFill,
      label: "Calculator",
      to: "/caculator",
    },
  ];
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  return (
    <div className="col-span-3  px-12 py-4 flex flex-col gap-4 h-[736px]">
      <div className="flex gap-4 items-center my-4">
        <div className="h-12 w-12 rounded-full bg-white"></div>
        <div className="flex flex-col gap-1 items-start ">
          <h1 className="text-white font-semibold text-base ">n0name2k3</h1>
          <p className="text-neutral-400 text-sm">Admin</p>
        </div>
      </div>
      <div className="flex flex-col gap-4 text-neutral-400">
        {data.map((item, index) => (
          <NavLink
            key={item.label}
            active={index === active}
            label={item.label}
            leftSection={
              active === index ? (
                <item.iconBold size={24} />
              ) : (
                <item.icon size={24} />
              )
            }
            onClick={() => {
              setActive(index);
              navigate(item.to);
            }}
            color="#3C3F49"
            variant="filled"
            className="text-neutral-400 font-semibold hover:text-white transition-all duration-200 rounded-lg ease-in-out h-12"
          />
        ))}
      </div>
    </div>
  );
};

export default SideBar;
