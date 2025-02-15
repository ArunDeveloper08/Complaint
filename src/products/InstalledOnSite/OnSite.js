import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import secureLocalStorage from "react-secure-storage";

import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import OnSiteModal from "./OnSiteModal";
import { useSelector } from "react-redux";
import { debounce } from "lodash";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#b80f768f",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: "200px",
    },
  },
};
const OnSite = () => {
  const info = JSON.parse(secureLocalStorage.getItem("info"));
  const { selectedItem } = useSelector((state) => state.itemReducer);
  const [data, setData] = useState([]);
  const [val, setVal] = useState([]);

  const [filter, setFilter] = useState({});
  const [siteName, setSiteName] = useState([]);
  const [input, setInput] = useState({
    dealerId: "",
    remark: "",
    // productType: selectedItem,
  });
  // const [site, setSite] = useState([]);
  const [modal, setModal] = useState({
    open: false,
    data: {},
  });

  const api = () =>
    axios
      .post(
        window.MyApiRoute +
        `record/get?category=${selectedItem}&location=installed&dealerName=${input?.dealerName || ""}`,
        {
          ...info.data,
        }
      )
      .then((res) => (setVal(res.data.Data), setData(res.data.Data)))
      .catch((err) => console.log(err));
  useEffect(() => {
    api();
  }, [selectedItem, input, filter]);

  const handleSend = (data) => {
    setModal({
      open: true,
      data: data,
    });
  };

  useEffect(() => {
    api();
    axios
      .get(window.MyApiRoute + "dealer/get")
      .then((res) => {
        return setSiteName(res.data.details), console.log("siteName", res.data.details);
        // setSite(res.data.data)
      })
      .catch((err) => console.log(err));
  }, [selectedItem]);

  const handleFilterChange = (e) => {
    setFilter({ [e.target.name]: e.target.value });
  };
  useEffect(() => {
    const debouncedFilter = debounce(() => {
      if (filter?.Meter_Serial_No?.trim() === "") {
        setData(val);
      } else if (filter?.Meter_Serial_No) {
        const newData = val.filter((item) =>
          String(item.Meter_Serial_No)
            .toUpperCase()
            .includes(filter.Meter_Serial_No.trim().toUpperCase())
        );
        setData(newData);
      } else if (filter?.Category?.trim() === "") {
        setData(val);
      } else if (filter?.Category) {
        const newData = val.filter((item) => {
          return item.Category?.trim()
            .toUpperCase()
            ?.includes(filter.Category.trim().toUpperCase());
        });
        setData(newData);
      } else if (filter?.Site_Name === "") {
        setData(val);
      } else if (filter?.Site_Name) {
        const newData = val.filter((item) =>
          String(item.Site_Name).includes(filter.Site_Name)
        );
        setData(newData);
      }
      // else if (filter?.IMEI_Number === "") {
      //   setData2(val);
      // } else if (filter?.IMEI_Number) {
      //   const newData = val.filter((item) =>
      //     String(item.IMEI).includes(filter.IMEI_Number)
      //   );
      //   setData2(newData);
      // }
      else {
        setData(val);
      }
    }, 50);

    debouncedFilter(); // Invoke the debounced function immediately after defining it
    return () => {
      debouncedFilter.cancel(); // Cleanup function to cancel the debounced function when the effect is cleaned up
    };
  }, [filter, val]);

  const onChange = (a, b) => {
    if (a === "dealerId") {
      setInput((p) => ({ ...p, dealerId: b?.ID, dealerName: b?.name }));
      return;
    }
    setInput((p) => ({ ...p, [a]: b }));
  };


  //  console.log("SiteName",siteName); 
  return (
    <>
      <div className="flex justify-around">
        <div
          className={`pt-3 flex ${info.data.Designation === "storekeeper" ? "" : ""
            } px-8 pb-3 flex justify-between`}
        >
          <input
            name="Meter_Serial_No"
            debounce={300}
            onChange={(e) => handleFilterChange(e)}
            value={filter.Meter_Serial_No ?? ""}
            className="border-2 py-2 px-5 w-[300px] border-gray-500 rounded"
            placeholder="Serial Number"
          />
        </div>
        <div
          className={`pt-3 flex ${info.data.Designation === "storekeeper" ? "" : ""
            } px-8 pb-3 flex justify-between`}
        >
          <select
            name="Category"
            debounce={300}
            onChange={(e) => handleFilterChange(e)}
            value={filter.Category ?? ""}
            className="border-2 py-2 px-5 w-[300px] border-gray-500 rounded"
            placeholder="Serial Number"
          >
            <option value="">Category</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option Value="C">C</option>
            <option value="D">D</option>
          </select>
          <h1 className="ml-1 mr-1"> No. of Products : {data?.length ?? 0}</h1>

          <Autocomplete
            onChange={(e, f) => onChange("dealerId", f)}
            // onClick={(e, f) => console.log(e, f)}
            className="flex-1 w-[300px]"
            // disabled={loading || !siteName.loading}
            name="selectDealer"
            options={siteName?.map((option) => option)}
            getOptionLabel={(option) =>
              `${option?.name.toUpperCase()}, ID: ${option?.ID} , GST-${option?.gstNumber
              }`
            }
            renderInput={(params) => (
              <TextField {...params} label="Select Dealer" />
            )}
          />
        </div>

        {/* <Box className="w-[300px] mt-1">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Site Name</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={ data.Site_Name }
              label="Site Name"
              name="Site_Name"
              onChange={(e) => handleFilterChange(e)}
              value={filter.Site_Name ?? ""}
              MenuProps={MenuProps}
            >
              <MenuItem value="">Site Name</MenuItem>
              {site?.map((a, b) => {
                return (
                  <MenuItem key={b} value={a.SiteName}>
                    {a.SiteName}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box> */}


      </div>
      <TableContainer sx={{ maxHeight: "75vh", paddingY: 0 }} component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              {/* {info.data.Designation == "storekeeper" && (
                <StyledTableCell sx={{ padding: 0 }} align="center">
                  Options
                </StyledTableCell>
              )} */}
              <StyledTableCell sx={{ padding: 0 }} align="center">
                Category
              </StyledTableCell>
              <StyledTableCell sx={{ paddingX: 0 }} align="center">
                Serial Number
              </StyledTableCell>
              <StyledTableCell sx={{ paddingX: 0 }} align="center">
                ID
              </StyledTableCell>
              <StyledTableCell sx={{ paddingX: 0 }} align="center">
                Site Name
              </StyledTableCell>
              <StyledTableCell sx={{ paddingX: 0 }} align="center">
                Customer Unique Id
              </StyledTableCell>
              <StyledTableCell sx={{ paddingX: 0 }} align="center">
                Flat No
              </StyledTableCell>
              <StyledTableCell sx={{ paddingX: 0, width: 100 }} align="center">
                Job Card No
              </StyledTableCell>
              <StyledTableCell sx={{ paddingX: 0 }} align="center">
                Activity Log
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((a, index) => {
              let logs;
              try {
                logs = JSON.parse(a.ActivityLog);
              } catch (error) {
                logs = [{
                  date: "12-12-1212",
                  remark: "Null"
                }];
              }
              return (
                <StyledTableRow>

                  <StyledTableCell align="center">
                    {a.Category ?? "-"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {a.Meter_Serial_No ?? "-"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {a.Meter_Id ?? "-"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {a.Site_Name ?? "-"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {a.Customer_Unique_Id ?? "-"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {a.Flat_No ?? "-"}
                  </StyledTableCell>
                  <StyledTableCell sx={{ paddingY: 1 }} align="center">
                    {a.Job_Card_No ?? "-"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {logs?.map((log) => (
                      <p className="flex space-x-5 justify-center">
                        <span>Date:{log?.date}</span>
                        <span>Remark:{log?.remark}</span>
                      </p>
                    ))}
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <OnSiteModal api={api} setModal={setModal} modal={modal} />
    </>
  );
};

export default OnSite;
