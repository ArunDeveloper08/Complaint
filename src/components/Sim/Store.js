import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectItem } from "../../redux/actions";
import SimTab from "../../products/mainTab/SimTab";
import { ProductList } from "../../constants/ProductList";
import secureLocalStorage from "react-secure-storage";
const Store = () => {
  const [count, setCount] = useState({});
  const dispatch = useDispatch();
  const { selectedItem } = useSelector((state) => state.itemReducer);
  const userInfo = JSON.parse(secureLocalStorage.getItem("info"));
  const isEngineer = userInfo?.data?.Designation === "engineer";
  useEffect(() => {
    if (isEngineer) {
      if (selectItem === "sim") {
        dispatch(selectItem(ProductList[1][1]));
        window.location.reload();
        // return;
      }
    }
    axios
      .get(window.MyApiRoute + "sim/getcount")
      .then((res) => {
        return setCount(res.data), console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <select
        className="w-[250px] font-bold border-2 border-gray-500 p-2 rounded-lg"
        value={selectedItem}
        onChange={(e) => {
          dispatch(selectItem(e.target.value));
          window.location.reload();
        }}
      >
        {ProductList.map((item) => {
          if (isEngineer && item[1] === "sim") {
            return null;
          }
          return <option value={item[1]}>{item[0]}</option>;
        })}
      </select>
      <SimTab />
    </>
  );
};

export default Store;
