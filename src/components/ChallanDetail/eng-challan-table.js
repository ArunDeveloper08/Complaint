// import React, { useEffect } from "react";
// import { Autocomplete, Button, TextField } from "@mui/material";
// import { useState } from "react";
// import axios from "axios";
// import secureLocalStorage from "react-secure-storage";
// import qs from "query-string";
// import { useLocation, useNavigate } from "react-router-dom";
// import EngChallanActions from "./eng-challan-actions";
// const EngChallanTable = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const queryParams = new URLSearchParams(location.search);
//   const [engineerName, setEngineerName] = useState(
//     queryParams.get("engineer") || ""
//   );
//   const [status, setStatus] = useState(queryParams.get("status") || "");
//   const [data, setData] = useState([]);
//   const userInfo = JSON.parse(secureLocalStorage.getItem("info")).data;
//   const [engineer, setEngineer] = useState([]);
//   useEffect(() => {
//     const newParams = new URLSearchParams();
//     if (engineerName) newParams.set("engineer", engineerName);
//     if (status) newParams.set("status", status);
//     // Replace the current URL with the updated query parameters
//     navigate(`/engineerreturnproduct?${newParams}`, { replace: true });
//   }, [engineerName, status, location.pathname, navigate]);

//   useEffect(() => {
//     if (engineerName && status) {
//       searchChallan();
//     }
//     axios
//       .get(`${window.MyApiRoute}employee/names`)
//       .then((res) => {
//         setEngineer(res.data.data);
//       })
//       .catch((err) => console.log({ err }));
//   }, []);

//   const searchChallan = async () => {
//     const url = qs.stringifyUrl({
//       url: `${window.MyApiRoute}record/get`,
//       query: {
//         createdBy: "storekeeper",
//         engineerName: engineerName,
//         status: status,
//         category: "3-phaseMeter",
//         location: "getChallanDetails",
//         challanType: "external returnable challan",
//       },
//     });
//     try {
//       const { data } = await axios.post(url, userInfo);
//       const statusFormatting = data.Data.filter((item) => {
//         if (status === "" || status === undefined) return true;
//         if ((item.Status === "pending" || item.Status === "open") && status === "open") {
//           return true;
//         }
//         if (item.Status === "close" && status === "close") {
//           return true;
//         }
//       });
//       setData(statusFormatting);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <section>
//       <div className="flex justify-around items-center mt-2">
//         <Autocomplete
//           onChange={(e, f) => setEngineerName(f)}
//           className="w-[300px]"
//           name="Engineer"
//           value={engineerName}
//           options={engineer?.map((option) => option?.Name)}
//           renderInput={(params) => (
//             <TextField
//               key={params}
//               value={engineerName}
//               {...params}
//               label="Select Engineer Name"
//             />
//           )}
//         />
//         <select
//           name="Status"
//           debounce={300}
//           onChange={(e) => setStatus(e.target.value)}
//           className="border-2 py-2 px-5 w-[300px] border-gray-500 rounded"
//           placeholder="Serial Number"
//           value={status}
//         >
//           <option value="">All Status</option>
//           <option value="open">open</option>
//           <option value="close">close</option>
//         </select>
//         <p>No of Challans : {data.length}</p>
//         <Button
//           onClick={searchChallan}
//           variant="contained"
//           sx={{ paddingX: 4 }}
//         >
//           Search
//         </Button>
//       </div>
//       {data?.map((item, index) => (
//         <section key={index} className="grid grid-cols-3">
//           <div className="col-span-3">
//             <EngChallanActions actions={item.Status === "open"} item={item} />
//           </div>
//         </section>
//       ))}
//     </section>
//   );
// };

// export default EngChallanTable;

import React, { useEffect } from "react";
import { Autocomplete, Button, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import qs from "query-string";
import { useLocation, useNavigate } from "react-router-dom";
import EngChallanActions from "./eng-challan-actions";
const EngChallanTable = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const [engineerName, setEngineerName] = useState(
    queryParams.get("engineer") || ""
  );
  const [status, setStatus] = useState(queryParams.get("status") || "");
  const [data, setData] = useState([]);
  const userInfo = JSON.parse(secureLocalStorage.getItem("info")).data;
  const [engineer, setEngineer] = useState([]);
  useEffect(() => {
    const newParams = new URLSearchParams();
    if (engineerName) newParams.set("engineer", engineerName);
    if (status) newParams.set("status", status);
    // Replace the current URL with the updated query parameters
    navigate(`/engineerreturnproduct?${newParams}`, { replace: true });
  }, [engineerName, status, location.pathname, navigate]);

  useEffect(() => {
    if (engineerName && status) {
      searchChallan();
    }
    axios
      .get(`${window.MyApiRoute}employee/names`)
      .then((res) => {
        setEngineer(res.data.data);
      })
      .catch((err) => console.log({ err }));
  }, []);

  const searchChallan = async () => {
    const url = qs.stringifyUrl({
      url: `${window.MyApiRoute}record/get`,
      query: {
        createdBy: "storekeeper",
        engineerName: engineerName,
        status: status,
        category: "3-phaseMeter",
        location: "getChallanDetails",
        challanType: "external returnable challan",
      },
    });
    try {
      const { data } = await axios.post(url, userInfo);
      if (data.Data === null) {
        return setData([]);
      }
      const statusFormatting = data.Data.filter((item) => {
        if (status === "" || status === undefined) return true;
        if (
          (item.Status === "pending" || item.Status === "open") &&
          status === "open"
        ) {
          return true;
        }
        if (item.Status === "close" && status === "close") {
          return true;
        }
      });
      setData(statusFormatting);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <div className="grid grid-cols-2 px-3 gap-4 md:grid-cols-4 place-items-center justify-around items-center mt-2">
        <Autocomplete
          onChange={(e, f) => setEngineerName(f)}
          className="w-full md:w-[300px]"
          name="Engineer"
          value={engineerName}
          options={engineer?.map((option) => option?.Name)}
          renderInput={(params) => (
            <TextField
              key={params}
              value={engineerName}
              {...params}
              label="Select Engineer Name"
            />
          )}
        />
        <select
          name="Status"
          debounce={300}
          onChange={(e) => setStatus(e.target.value)}
          className="border-2 py-2 px-5 w-full md:w-[300px] border-gray-500 rounded"
          placeholder="Serial Number"
          value={status}
        >
          <option value="">All Status</option>
          <option value="open">open</option>
          <option value="close">close</option>
        </select>
        <p>No of Challans : {data.length}</p>
        <Button
          onClick={searchChallan}
          variant="contained"
          sx={{ paddingX: 4 }}
        >
          Search
        </Button>
      </div>
      {data?.map((item, index) => (
        <section key={index} className="grid grid-cols-3">
          <div className="col-span-3">
            <EngChallanActions actions={item.Status === "open"} item={item} />
          </div>
        </section>
      ))}
    </section>
  );
};

export default EngChallanTable;
