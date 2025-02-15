import React, { useEffect, useState } from "react";
import UnapprovedTable from "../UnapprovedTable";
import axios from "axios";
import { useSelector } from "react-redux";
import  secureLocalStorage  from  "react-secure-storage";

const StoreToProduction = ({ canChange, query, downloadUrl }) => {
  const [data, setData] = useState([]);
  const { selectedItem } = useSelector((state) => state.itemReducer);
  const userInfo = JSON.parse(secureLocalStorage.getItem("info"));
  const api = () =>
    axios
      .post(
        window.MyApiRoute +
          `record/get?category=${selectedItem}&location=storeToProduction`,
        { ...userInfo.data }
      )
      .then((res) => setData(res.data.Data));
  useEffect(() => {
    api();
  }, []);
  return (
    <>
      <UnapprovedTable
        userInfo={userInfo}
        data={data}
        query={query}
        downloadUrl={downloadUrl}
        canChange={canChange}
        check="recieveInProduction"
      />
    </>
  );
};

export default StoreToProduction;
