import axios from "axios";
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import  secureLocalStorage  from  "react-secure-storage";

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
const MrrList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(false);
  const [text, setText] = useState("");
  const [text2, setText2] = useState("");
  const a = JSON.parse(secureLocalStorage.getItem("info"));

  useEffect(() => {
    axios
      .get(
        `${window.MyApiRoute}metertransfer/getall?Employee_Id=${a.data.Employee_Id}`
      )
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const handleEdit = (row, index) => {
    console.log("MMR", row);
    navigate("/MrrEdit", { state: row });
  };
  const handlePDF = (data, index) => {
    navigate("/csrdownload", { state: { data } });
  };
  const handleFilterChange = (e) => {
    setText(e.target.value);
  };
  const handleFilterChange2 = (e) => {
    setText2(e.target.value);
  };
  return (
    data && (
      <div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div
            className={`pt-3 flex ${
              data.Designation === "storekeeper" ? "w-1/2" : ""
            } px-8 pb-3 flex justify-between`}
          >
            <input
              debounce={300}
              onChange={(e) => handleFilterChange(e)}
              // value={filter.Meter_Serial_No ?? ""}
              className="border-2 py-2 px-5 w-[300px] border-gray-500 rounded"
              placeholder="Old Serial No."
            />
          </div>
          <div
            className={`pt-3 flex ${
              data.Designation === "storekeeper" ? "w-1/2" : ""
            } px-8 pb-3 flex justify-between`}
          >
            <input
              debounce={300}
              onChange={(e) => handleFilterChange2(e)}
              // value={filter.Meter_Serial_No ?? ""}
              className="border-2 py-2 px-5 w-[300px] border-gray-500 rounded"
              placeholder="New Serial No."
            />
          </div>
        </div>

        <TableContainer sx={{ height: "62vh" }} component={Paper}>
          <Table
            stickyHeader
            // sx={{ minWidth: "1500px" }}
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell
                  sx={{ paddingY: 1, minWidth: 100 }}
                  align="center"
                  style={{
                    position: "sticky",
                    width: "15px",
                    zIndex: "1500",
                    left: 0,
                    backgroundColor: "#000000",
                  }}
                >
                  S No.
                </StyledTableCell>
                <StyledTableCell
                  sx={{ minWidth: 100, padding: "3px" }}
                  align="center"
                >
                  Old serial No.
                </StyledTableCell>
                <StyledTableCell
                  sx={{ minWidth: 150, padding: "3px" }}
                  align="center"
                >
                  New Serial No.
                </StyledTableCell>
                <StyledTableCell
                  sx={{ minWidth: 120, padding: "3px" }}
                  align="center"
                >
                  Customer Name
                </StyledTableCell>
                <StyledTableCell
                  sx={{ minWidth: 120, padding: "3px" }}
                  align="center"
                >
                  Employee Name
                </StyledTableCell>

                <StyledTableCell
                  sx={{ minWidth: 150, padding: "3px" }}
                  align="center"
                >
                  Address
                </StyledTableCell>
                <StyledTableCell
                  sx={{ minWidth: 100, padding: "3px" }}
                  align="center"
                >
                  Flat No.
                </StyledTableCell>
                <StyledTableCell
                  sx={{ minWidth: 100, padding: "3px" }}
                  align="center"
                >
                  Old Make
                </StyledTableCell>
                <StyledTableCell
                  sx={{ minWidth: 100, padding: "3px" }}
                  align="center"
                >
                  Old Model
                </StyledTableCell>

                <StyledTableCell
                  sx={{ minWidth: 100, padding: "3px" }}
                  align="center"
                >
                  Old Digital ID
                </StyledTableCell>
                <StyledTableCell
                  sx={{ minWidth: 170, padding: "3px" }}
                  align="center"
                >
                  Old Meter Mains(KWH)
                </StyledTableCell>
                <StyledTableCell
                  sx={{ minWidth: 150, padding: "3px" }}
                  align="center"
                >
                  Old Meter DG(KWH)
                </StyledTableCell>
                <StyledTableCell
                  sx={{ minWidth: 100, padding: "3px" }}
                  align="center"
                >
                  New Make
                </StyledTableCell>
                <StyledTableCell
                  sx={{ minWidth: 100, padding: "3px" }}
                  align="center"
                >
                  New Model
                </StyledTableCell>

                <StyledTableCell
                  sx={{ minWidth: 100, padding: "3px" }}
                  align="center"
                >
                  New Digital Id
                </StyledTableCell>
                <StyledTableCell
                  sx={{ minWidth: 170, padding: "3px" }}
                  align="center"
                >
                  New Meter Mains(KWH)
                </StyledTableCell>
                <StyledTableCell
                  sx={{ minWidth: 150, padding: "3px" }}
                  align="center"
                >
                  New Meter DG(KWH)
                </StyledTableCell>
                <StyledTableCell
                  sx={{ minWidth: 200, padding: "3px" }}
                  align="center"
                >
                  Server Updated CRM Name
                </StyledTableCell>

                <StyledTableCell
                  sx={{ minWidth: 200, padding: "3px" }}
                  align="center"
                >
                  Problem detected By Engineer
                </StyledTableCell>
                <StyledTableCell
                  sx={{ minWidth: 150, padding: "3px" }}
                  align="center"
                >
                  Attented Engineer Report
                </StyledTableCell>

                <StyledTableCell
                  sx={{ minWidth: 170, padding: "3px" }}
                  align="center"
                >
                  Customer Remarks
                </StyledTableCell>
                <StyledTableCell
                  sx={{ minWidth: 170, padding: "3px" }}
                  align="center"
                >
                  Date & Time
                </StyledTableCell>
                <StyledTableCell
                  sx={{ minWidth: 150, padding: "3px" }}
                  align="center"
                >
                  Edit
                </StyledTableCell>
                <StyledTableCell
                  sx={{ minWidth: 150, padding: "3px" }}
                  align="center"
                >
                  PDF
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.message
                .filter((item) => item.OldSerialNo?.includes(text))
                .filter((item) => item.NewSerialNo?.includes(text2))
                .map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell
                      align="center"
                      sx={{ padding: 1.5 }}
                      scope="row"
                      style={{
                        position: "sticky",
                        width: "15px",
                        zIndex: "1100",
                        left: 0,
                        background: "#dfcaaf ",
                      }}
                    >
                      {row.ServiceReportNo ? row.ServiceReportNo : "-"}
                    </StyledTableCell>
                    <StyledTableCell sx={{ padding: 0 }} align="center">
                      {row.OldSerialNo ? row.OldSerialNo : "-"}
                    </StyledTableCell>
                    <StyledTableCell sx={{ padding: 0 }} align="center">
                      {row.NewSerialNo ? row.NewSerialNo : "-"}
                    </StyledTableCell>
                    <StyledTableCell sx={{ padding: 0 }} align="center">
                      {row.Customer_Name ? row.Customer_Name : "-"}
                    </StyledTableCell>
                    <StyledTableCell sx={{ padding: 0 }} align="center">
                      {row.EmployeeName ? row.EmployeeName : "-"}
                    </StyledTableCell>

                    <StyledTableCell sx={{ padding: 0 }} align="center">
                      {row.Address ? row.Address : "-"}
                    </StyledTableCell>
                    <StyledTableCell sx={{ padding: 0 }} align="center">
                      {row.flatNo ? row.flatNo : "-"}
                    </StyledTableCell>
                    <StyledTableCell sx={{ padding: 0 }} align="center">
                      {row.OldMake ? row.OldMake : "-"}
                    </StyledTableCell>
                    <StyledTableCell sx={{ padding: 0 }} align="center">
                      {row.OldModel ? row.OldModel : "-"}
                    </StyledTableCell>

                    <StyledTableCell sx={{ padding: 0 }} align="center">
                      {row.OldDigitalId ? row.OldDigitalId : "-"}
                    </StyledTableCell>
                    <StyledTableCell sx={{ padding: 0 }} align="center">
                      {row.oldMeterMains ? row.oldMeterMains : "-"}
                    </StyledTableCell>
                    <StyledTableCell sx={{ padding: 0 }} align="center">
                      {row.oldMeterDg ? row.oldMeterDg : "-"}
                    </StyledTableCell>
                    <StyledTableCell sx={{ padding: 0 }} align="center">
                      {row.NewMake ? row.NewMake : "-"}
                    </StyledTableCell>
                    <StyledTableCell sx={{ padding: 0 }} align="center">
                      {row.NewModel ? row.NewModel : "-"}
                    </StyledTableCell>

                    <StyledTableCell sx={{ padding: 0 }} align="center">
                      {row.NewDigitalId ? row.NewDigitalId : "-"}
                    </StyledTableCell>
                    <StyledTableCell sx={{ padding: 0 }} align="center">
                      {row.newMeterMains ? row.newMeterMains : "-"}
                    </StyledTableCell>
                    <StyledTableCell sx={{ padding: 0 }} align="center">
                      {row.newMeterDg ? row.newMeterDg : "-"}
                    </StyledTableCell>
                    <StyledTableCell sx={{ padding: 0 }} align="center">
                      {row.serverUpdatedCRMName
                        ? row.serverUpdatedCRMName
                        : "-"}
                    </StyledTableCell>
                    <StyledTableCell sx={{ padding: 0 }} align="center">
                      {row.ProblemDetectedByEngineer
                        ? row.ProblemDetectedByEngineer
                        : "-"}
                    </StyledTableCell>
                    <StyledTableCell sx={{ padding: 0 }} align="center">
                      {row.attentedEngineerReport
                        ? row.attentedEngineerReport
                        : "-"}
                    </StyledTableCell>
                    <StyledTableCell sx={{ padding: 0 }} align="center">
                      {row.CustomerRemarks ? row.CustomerRemarks : "-"}
                    </StyledTableCell>
                    <StyledTableCell sx={{ padding: 0 }} align="center">
                      {new Date(row.createdAt).toLocaleString()}
                    </StyledTableCell>

                    <StyledTableCell sx={{ padding: 0 }} align="center">
                      <Button
                        variant="contained"
                        onClick={() => handleEdit(row, index)}
                      >
                        Edit
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell sx={{ padding: 0 }} align="center">
                      <Button
                        variant="contained"
                        onClick={() => handlePDF(row, index)}
                      >
                        PDF
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )
  );
};
export default MrrList;
