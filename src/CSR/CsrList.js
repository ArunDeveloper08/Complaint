import axios from "axios";
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
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
const CsrList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(false);
  const [text, setText] = useState("");
  const a = JSON.parse(secureLocalStorage.getItem("info"));

  useEffect(() => {
    axios
      .get(
        `${window.MyApiRoute}report?Employee_Id=${a.data.Employee_Id}`
      )
      .then((res) => {
        setData(res.data);
        console.log("res", res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleEdit = (row, index) => {
    navigate("/csrEdit", { state: row });

    // console.log("edit data",row)
  };
  const handlePDF = (data) => {
    navigate("/csrformdownload", { state: { data } });
  };
  // console.log("admin", a.isAdmin);
  const handleFilterChange = (e) => {
    setText(e.target.value);
  };

  return (
    data && (
      <div style={{ overflowY: "hidden" }}>
        <div
          className={`pt-3 flex ${
            data.Designation === "storekeeper" ? "w-1/2" : ""
          } px-8 pb-3 flex justify-between`}
        >
          <input
            name="Meter_Serial_No"
            debounce={300}
            onChange={(e) => handleFilterChange(e)}
            // value={filter.Meter_Serial_No ?? ""}
            className="border-2 py-2 px-2 w-[300px] border-gray-500 rounded"
            placeholder="Meter ID"
          />
        </div>
        <TableContainer
          sx={{ height: "62vh", overflowX: "auto", overflowY: "auto" }}
        >
          <Table
            stickyHeader
            sx={{ minWidth: "1500px" }}
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell
                  style={{
                    position: "sticky",
                    width: "15px",
                    zIndex: "1500",
                    left: 0,
                    backgroundColor: "#000000",
                  }}
                  sx={{ paddingY: 1, minWidth: 100 }}
                  align="center"
                >
                  Sr No.
                </StyledTableCell>
                <StyledTableCell
                  sx={{ minWidth: 150, padding: "3px" }}
                  align="center"
                >
                  Meter Id
                </StyledTableCell>
                <StyledTableCell
                  sx={{ minWidth: 170, padding: "3px" }}
                  align="center"
                >
                  Customer Name
                </StyledTableCell>
                <StyledTableCell
                  sx={{ minWidth: 170, padding: "3px" }}
                  align="center"
                >
                  Employee Name
                </StyledTableCell>
                <StyledTableCell
                  sx={{ minWidth: 150, padding: "3px" }}
                  align="center"
                >
                  Customer Mobile No.
                </StyledTableCell>
                <StyledTableCell
                  sx={{ minWidth: 120, padding: "3px" }}
                  align="center"
                >
                  Flat No
                </StyledTableCell>

                <StyledTableCell
                  sx={{ minWidth: 120, padding: "3px" }}
                  align="center"
                >
                  Address
                </StyledTableCell>
                <StyledTableCell
                  sx={{ minWidth: 200, padding: "3px" }}
                  align="center"
                >
                  Complaint Reported By CRM
                </StyledTableCell>
                <StyledTableCell
                  sx={{ minWidth: 270, padding: "3px" }}
                  align="center"
                >
                  Problem Identified By Service Engineer
                </StyledTableCell>
                <StyledTableCell
                  sx={{ minWidth: 270, padding: "3px" }}
                  align="center"
                >
                  Problem Recitified By Service Engineer
                </StyledTableCell>
                <StyledTableCell
                  sx={{ minWidth: 250, padding: "3px" }}
                  align="center"
                >
                  Attented Engineer Remarks
                </StyledTableCell>
                <StyledTableCell
                  sx={{ minWidth: 300, padding: "3px" }}
                  align="center"
                >
                  Customer Remarks
                </StyledTableCell>
                <StyledTableCell
                  sx={{ minWidth: 200, padding: "3px" }}
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
                .filter((product) => product.MeterSerialNo?.includes(text))
                .map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell
                      align="center"
                      sx={{ padding: 1.5 }}
                      style={{
                        position: "sticky",
                        width: "15px",
                        zIndex: "1100",
                        left: 0,
                        background: "#dfcaaf ",
                      }}
                      scope="row"
                    >
                      {row.CSr_NO ? row.CSr_NO : "-"}
                    </StyledTableCell>
                    <StyledTableCell sx={{ padding: 0 }} align="center">
                      {row.MeterSerialNo ? row.MeterSerialNo : "-"}
                    </StyledTableCell>
                    <StyledTableCell sx={{ padding: 0 }} align="center">
                      {row.Customer_Name ? row.Customer_Name : "-"}
                    </StyledTableCell>
                    <StyledTableCell sx={{ padding: 0 }} align="center">
                      {row.EmployeeName ? row.EmployeeName : "-"}
                    </StyledTableCell>

                    <StyledTableCell sx={{ padding: 0 }} align="center">
                      {row.MobileNo ? row.MobileNo : "-"}
                    </StyledTableCell>
                    <StyledTableCell sx={{ padding: 0 }} align="center">
                      {row.FlatNo ? row.FlatNo : "-"}
                    </StyledTableCell>

                    <StyledTableCell sx={{ padding: 0 }} align="center">
                      {row.Address ? row.Address : "-"}
                    </StyledTableCell>
                    <StyledTableCell sx={{ padding: 0 }} align="center">
                      {row.ComplaintReportedBy ? row.ComplaintReportedBy : "-"}
                    </StyledTableCell>
                    <StyledTableCell sx={{ padding: 0 }} align="center">
                      {row.ProblemIdentifiedByServiceEngineer
                        ? row.ProblemIdentifiedByServiceEngineer
                        : "-"}
                    </StyledTableCell>
                    <StyledTableCell sx={{ padding: 0 }} align="center">
                      {row.ProblemRectifiedByServiceEngineer
                        ? row.ProblemRectifiedByServiceEngineer
                        : "-"}
                    </StyledTableCell>
                    <StyledTableCell sx={{ padding: 0 }} align="center">
                      {row.AttendedEngineerRemarks
                        ? row.AttendedEngineerRemarks
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

export default CsrList;
