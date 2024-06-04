import React from "react";
import logo from "../../public/logo.png";
import { IoSearchOutline } from "react-icons/io5";
import { IoMdSettings, IoMdNotifications } from "react-icons/io";
import { ActionIcon } from "@mantine/core";
import { Input } from "@mantine/core";
const Header = () => {
  return (
    <div className="w-full h-16 rounded-t-3xl border-b border-neutral-500 flex items-center justify-between px-4 col-span-12">
      <div className="flex items-center space-x-2 ml-[98px] cursor-pointer">
        <img src={logo} alt="avatar" className="w-8 h-8 " />
        <h1 className="text-xl font-bold text-neutral-100">n0name2k3</h1>
      </div>
      <div className="flex items-center space-x-10 mr-8">
        <Input
          placeholder="Search"
          leftSection={<IoSearchOutline className="text-white" />}
          styles={{
            input: {
              backgroundColor: "#3c3f49",
              color: "#ffffff",
              width: "466px",
            },
          }}
        />
        <div className="flex items-center gap-4">
          <ActionIcon
            variant="filled"
            color="#3C3F49"
            size="lg"
            aria-label="Settings"
          >
            <IoMdSettings size={20} />
          </ActionIcon>
          <ActionIcon
            variant="filled"
            color="#3C3F49"
            size="lg"
            aria-label="Notifications"
          >
            <IoMdNotifications size={20} />
          </ActionIcon>
        </div>
      </div>
    </div>
  );
};

export default Header;
