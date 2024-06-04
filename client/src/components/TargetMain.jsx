import React, { useEffect, useState } from "react";
import { ActionIcon, Checkbox, Input, Table } from "@mantine/core";
import { ScrollArea } from "@mantine/core";
import { MdOutlineEdit } from "react-icons/md";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import { modals } from "@mantine/modals";
const TargetMain = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("data")) || [
      { day: 1, startingBalance: 1000, targetProfit: 100, maxLoss: 50 },
    ]
  );
  const handleUpdateValue = (e, index) => {
    data[index][e.target.name] = e.target.value;
  };
  useEffect(() => {
    setData(JSON.parse(localStorage.getItem("data")));
  }, [data]);
  const openModal = () =>
    modals.openConfirmModal({
      title: "Edit data",
      children: (
        <ScrollArea h={650} scrollbarSize={2}>
          <div className="flex-col space-y-4">
            {data.map((element, index) => (
              <div key={element.name} className="flex gap-4 items-center">
                <Input defaultValue={element.day} disabled />
                <Input
                  defaultValue={element.startingBalance}
                  onChange={(e) => handleUpdateValue(e, index)}
                  name="startingBalance"
                />
                <Input
                  defaultValue={element.targetProfit}
                  onChange={(e) => handleUpdateValue(e, index)}
                  name="targetProfit"
                />
                <Input
                  defaultValue={element.maxLoss}
                  onChange={(e) => handleUpdateValue(e, index)}
                  name="maxLoss"
                />
              </div>
            ))}
          </div>
        </ScrollArea>
      ),
      labels: { confirm: "Save", cancel: "Cancel" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => localStorage.setItem("data", JSON.stringify(data)),
    });

  const rows = data.map((element) => (
    <Table.Tr
      key={element.day}
      bg={
        selectedRows.includes(element.day)
          ? "var(--mantine-color-green-light)"
          : undefined
      }
    >
      <Table.Td>
        <Checkbox
          aria-label="Select row"
          checked={selectedRows.includes(element.day)}
          onChange={(event) =>
            setSelectedRows(
              event.currentTarget.checked
                ? [...selectedRows, element.day]
                : selectedRows.filter((position) => position !== element.day)
            )
          }
        />
      </Table.Td>
      <Table.Td>{element.day}</Table.Td>
      <Table.Td>{element.startingBalance}</Table.Td>
      <Table.Td>{element.targetProfit}</Table.Td>
      <Table.Td>{element.maxLoss}</Table.Td>
    </Table.Tr>
  ));
  return (
    <div className="col-span-9 p-4 h-[800px] grid grid-cols-12 grid-rows-12 gap-x-5">
      <div className="col-span-12 row-span-2 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Target</h1>
        <ActionIcon
          variant="filled"
          color="#3C3F49"
          size="lg"
          aria-label="Edit"
          className="self-end"
          onClick={openModal}
        >
          <MdOutlineEdit size={20} />
        </ActionIcon>
      </div>

      <div className="col-span-12 row-span-10 mt-4">
        <ScrollArea h={500} w={"100%"} scrollbarSize={2}>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th />
                <Table.Th>Day</Table.Th>
                <Table.Th>Starting Balance</Table.Th>
                <Table.Th>Target Profit</Table.Th>
                <Table.Th>Max Loss</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </ScrollArea>
      </div>
      <Modal
        opened={opened}
        onClose={close}
        title="Edit data"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <ScrollArea h={650} scrollbarSize={2}>
          <div className="flex-col space-y-4">
            {data.map((element) => (
              <div key={element.name} className="flex gap-4 items-center">
                <Input defaultValue={element.day} disabled />
                <Input defaultValue={element.startingBalance} />
                <Input defaultValue={element.targetProfit} />
                <Input defaultValue={element.maxLoss} />
              </div>
            ))}
          </div>
        </ScrollArea>
      </Modal>
    </div>
  );
};

export default TargetMain;
