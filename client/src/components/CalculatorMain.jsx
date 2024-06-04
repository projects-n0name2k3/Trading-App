import React, { useState } from "react";
import { Button, Input, NativeSelect, NumberInput, Text } from "@mantine/core";
import { LuTrash } from "react-icons/lu";
import { modals } from "@mantine/modals";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
const CalculatorMain = () => {
  const [orders, setOrders] = useState(
    JSON.parse(localStorage.getItem("orders")) || []
  );
  const [totalResult, setTotalResult] = useState({
    profit: 0,
    loss: 0,
  });
  const allTPSL = {
    tp: 0,
    sl: 0,
  };
  const newOrder = {
    id: uuidv4(),
    type: "Buy",
    lot: 0,
    openPrice: 0,
    tp: null,
    sl: null,
  };
  const openDeleteModal = (id) =>
    modals.openConfirmModal({
      title: "Delete your order",
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete this order? This action is destructive
          and you will have to contact support to restore your data.
        </Text>
      ),
      labels: { confirm: "Delete", cancel: "No don't delete it" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => {
        const updatedOrders = orders.filter((order) => order.id !== id);
        setOrders(updatedOrders);
        localStorage.setItem("orders", JSON.stringify(updatedOrders));
      },
    });

  const openModal = () =>
    modals.openConfirmModal({
      title: "Add new order",
      size: "70%",
      children: (
        <div className="flex gap-4 items-center justify-center">
          <NativeSelect
            label="Type"
            withAsterisk
            data={["Buy", "Sell"]}
            w={200}
            defaultValue={"Buy"}
            onChange={(e) => (newOrder.type = e.target.value)}
          />

          <Input.Wrapper label="Lot size" withAsterisk>
            <NumberInput
              defaultValue={0}
              min={0.01}
              step={0.01}
              className="col-span-1  rounded-lg flex items-center justify-center text-white font-semibold"
              onChange={(e) => {
                newOrder.lot = e;
              }}
            />
          </Input.Wrapper>
          <Input.Wrapper label="Open Price" withAsterisk>
            <NumberInput
              defaultValue={0}
              min={0}
              className="col-span-1  rounded-lg flex items-center justify-center text-white font-semibold"
              onChange={(e) => {
                newOrder.openPrice = e;
              }}
            />
          </Input.Wrapper>
          <Input.Wrapper label="Take Profit">
            <NumberInput
              defaultValue={0}
              min={0}
              className="col-span-1  rounded-lg flex items-center justify-center text-white font-semibold"
              onChange={(e) => {
                newOrder.tp = e;
              }}
            />
          </Input.Wrapper>
          <Input.Wrapper label="Stop loss">
            <NumberInput
              defaultValue={0}
              min={0}
              className="col-span-1  rounded-lg flex items-center justify-center text-white font-semibold"
              onChange={(e) => {
                newOrder.sl = e;
              }}
            />
          </Input.Wrapper>
        </div>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => {
        console.log(newOrder);
        const updatedOrders = [...orders, newOrder];
        setOrders(updatedOrders);
        localStorage.setItem("orders", JSON.stringify(updatedOrders));
      },
    });
  const calculateTotal = () => {
    const profitElements = document.querySelectorAll(".profit");
    const losslements = document.querySelectorAll(".loss");
    let result = {
      profit: 0,
      loss: 0,
    };
    profitElements.forEach((element) => {
      result.profit += parseFloat(element.textContent);
    });
    losslements.forEach((element) => {
      result.loss += parseFloat(element.textContent);
    });
    setTotalResult({
      profit: result.profit.toFixed(2),
      loss: result.loss.toFixed(2),
    });
  };
  useEffect(() => {
    if (orders) {
      calculateTotal();
    }
  }, [orders]);

  return (
    <div className="col-span-9  grid grid-cols-12 grid-rows-12 gap-x-5 p-4 h-[800px]">
      <div className="col-span-12 row-span-2 flex items-center">
        <h1 className="text-3xl font-bold text-white">Calculator</h1>
      </div>
      <div className="col-span-12 row-span-6 gap-4 grid grid-cols-12 grid-rows-7 border-b border-neutral-400 pb-4">
        <div className="col-span-2 border border-neutral-400 select-none rounded-lg flex items-center justify-center text-white font-semibold">
          Type
        </div>
        <div className="col-span-1 border border-neutral-400 select-none rounded-lg flex items-center justify-center text-white font-semibold">
          Lot
        </div>
        <div className="col-span-2 border border-neutral-400 select-none rounded-lg flex items-center justify-center text-white font-semibold">
          Open Price
        </div>
        <div className="col-span-1 border border-neutral-400 select-none rounded-lg flex items-center justify-center text-green-300 font-semibold">
          TP
        </div>
        <div className="col-span-1 border border-neutral-400 select-none rounded-lg flex items-center justify-center text-red-300 font-semibold">
          SL
        </div>
        <div className="col-span-4 border border-neutral-400 select-none rounded-lg flex items-center justify-around text-green-300 font-semibold">
          <p className="border-r border-white w-[50%] text-center">Profit</p>
          <p className=" w-[50%] text-center text-red-300">Loss</p>
        </div>
        <div className="col-span-1 border border-neutral-400 select-none rounded-lg flex items-center justify-center text-red-300 font-semibold">
          <LuTrash size={20} />
        </div>
        {orders &&
          orders.length > 0 &&
          orders.map((order, index) => (
            <React.Fragment key={order.id}>
              <div className="col-span-2 border border-neutral-400 select-none rounded-lg flex items-center justify-center text-white font-semibold">
                {order.type}
              </div>
              <NumberInput
                defaultValue={order.lot}
                min={0.01}
                step={0.1}
                className="col-span-1  rounded-lg flex items-center justify-center text-white font-semibold"
                onChange={(e) => {
                  const updatedOrders = [...orders];
                  updatedOrders[index].lot = e;
                  setOrders(updatedOrders);
                  localStorage.setItem("orders", JSON.stringify(updatedOrders));
                }}
              />
              <NumberInput
                defaultValue={order.openPrice}
                max={order.tp !== null ? order.tp : 0}
                min={order.sl !== null ? order.sl : 0}
                className="col-span-2  rounded-lg flex items-center justify-center text-white font-semibold"
                onChange={(e) => {
                  const updatedOrders = [...orders];
                  updatedOrders[index].openPrice = e;
                  setOrders(updatedOrders);
                  localStorage.setItem("orders", JSON.stringify(updatedOrders));
                }}
              />
              <NumberInput
                min={0}
                value={order.tp}
                className="col-span-1  rounded-lg flex items-center justify-center text-white font-semibold"
                onChange={(e) => {
                  const updatedOrders = [...orders];
                  updatedOrders[index].tp = e;
                  setOrders(updatedOrders);
                  localStorage.setItem("orders", JSON.stringify(updatedOrders));
                }}
              />

              <NumberInput
                min={0}
                value={order.sl}
                className="col-span-1  rounded-lg flex items-center justify-center text-white font-semibold"
                onChange={(e) => {
                  const updatedOrders = [...orders];
                  updatedOrders[index].sl = e;
                  setOrders(updatedOrders);
                  localStorage.setItem("orders", JSON.stringify(updatedOrders));
                }}
              />

              <div className="col-span-4 border border-neutral-400 select-none rounded-lg flex items-center justify-around text-green-300 font-semibold">
                <p className="border-r border-white w-[50%] text-center profit">
                  {order.tp &&
                    (((order.tp - order.openPrice) * order.lot) / 0.01).toFixed(
                      2
                    )}
                </p>
                <p className=" w-[50%] text-center text-red-300 loss">
                  {order.sl &&
                    (((order.sl - order.openPrice) * order.lot) / 0.01).toFixed(
                      2
                    )}
                </p>
              </div>
              <div
                className="col-span-1 border border-neutral-400 cursor-pointer
               rounded-lg flex items-center justify-center text-red-300 font-semibold hover:opacity-60"
                onClick={() => openDeleteModal(order.id)}
              >
                <LuTrash size={20} />
              </div>
            </React.Fragment>
          ))}
      </div>
      <div className="col-span-12 row-span-1 grid grid-cols-12 grid-rows-1 gap-4 h-[70%] mt-4">
        <div className="col-span-2  select-none rounded-lg flex items-center justify-center text-white font-semibold"></div>
        <div className="col-span-1 border border-neutral-400 select-none rounded-lg flex items-center justify-center text-white font-semibold">
          {orders &&
            orders
              .reduce((total, order) => total + order.lot, 0)
              .toFixed(2)
              .toString()}
        </div>
        <div className="col-span-2 border border-neutral-400 select-none rounded-lg flex items-center justify-center text-white font-semibold">
          {orders &&
            (
              orders.reduce(
                (total, order) => total + order.openPrice * order.lot,
                0
              ) /
              orders.reduce((total, order) => total + order.lot, 0).toString()
            ).toFixed(2)}
        </div>
        <div className="col-span-1 border border-neutral-400 select-none rounded-lg flex items-center justify-center text-green-300 font-semibold">
          {orders && orders.every((order) => order.tp === orders[0].tp)
            ? orders[0]?.tp
            : null}
        </div>
        <div className="col-span-1 border border-neutral-400 select-none rounded-lg flex items-center justify-center text-red-300 font-semibold">
          {orders && orders.every((order) => order.sl === orders[0].sl)
            ? orders[0]?.sl
            : null}
        </div>
        <div className="col-span-4 border border-neutral-400 select-none rounded-lg flex items-center justify-around text-green-300 font-semibold">
          <p className="border-r border-white w-[50%] text-center">
            {totalResult.profit}
          </p>
          <p className="w-[50%] text-center text-red-300">{totalResult.loss}</p>
        </div>
      </div>
      <div className="col-span-12 row-span-2 mt-4 flex items-center justify-center gap-4">
        <Button className="col-span-2" variant="outline" onClick={openModal}>
          Add Order
        </Button>
        <Button
          className="col-span-2"
          color="green"
          onClick={() => {
            const updatedOrders = orders.map((order) => {
              return { ...order, tp: allTPSL.tp };
            });
            localStorage.setItem("orders", JSON.stringify(updatedOrders));

            setOrders(updatedOrders);
          }}
        >
          Set TP
        </Button>
        <NumberInput
          min={0}
          placeholder="TP for All"
          onChange={(e) => {
            allTPSL.tp = e;
          }}
        />

        <NumberInput
          min={0}
          placeholder="SL for All"
          onChange={(e) => (allTPSL.sl = e)}
        />
        <Button
          className="col-span-2"
          color="red"
          onClick={() => {
            const updatedOrders = orders.map((order) => {
              return { ...order, sl: allTPSL.sl };
            });
            localStorage.setItem("orders", JSON.stringify(updatedOrders));

            setOrders(updatedOrders);
          }}
        >
          Set SL
        </Button>
        <Button
          className="col-span-2"
          color="green"
          onClick={() => localStorage.setItem("orders", JSON.stringify(orders))}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default CalculatorMain;
