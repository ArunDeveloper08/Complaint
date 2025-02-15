import { Button } from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import CeoSopModal from "./sop/CeoSop";

const Details = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const a = JSON.parse(secureLocalStorage.getItem("info"));

  return (
    !(location.pathname === "/") &&
    a && (
      <>
        <div className="flex py-2 justify-around items-center space-x-0">
          <div className="sm:flex">
            <p
            onClick={()=>navigate("/home")}
              className={`py-2 cursor-pointer text-sm px-3 mr-2 text-center font-semibold text-white sm:text-xl ${
                a.isAdmin ? " bg-green-500" : "bg-blue-500"
              } rounded-md`}
            >
              {a.isAdmin ? "Admin" : "Employee"}
            </p>
            <p className="py-2 text-[12px] font-semibold sm:text-xl">
              Name : &nbsp;{a.data.name.toUpperCase()}
            </p>
          </div>
          <div className="sm:flex">
            <p
              className={`sm:py-2 text-sm text-blue-500 font-semibold sm:text-3xl rounded-md`}
            >
              PORTAL:&nbsp;&nbsp;
            </p>
            <p className="py-2 text-sm s font-semibold sm:text-3xl">
              {a.data.Designation.toUpperCase()}
            </p>
          </div>
          <div className="sm:flex">
            <p
              className={`py-2 text-sm px-3 mr-2 text-center font-semibold text-white sm:text-xl cursor-pointer ${
                a.isAdmin ? " bg-green-500" : "bg-blue-500"
              } rounded-md`}
              onClick={() => navigate("/sop")}
            >
              S.O.P
            </p>
            <p
              className={`py-2 text-sm px-3 mr-2 text-center font-semibold text-white sm:text-xl cursor-pointer ${
                a.isAdmin ? " bg-green-500" : "bg-blue-500"
              } rounded-md`}
              onClick={() => navigate("/productsop")}
            >
              Product SOP
            </p>
          </div>

          <Button
            onClick={() => {
              navigate("/");
              secureLocalStorage.clear();
            }}
            color="error"
            sx={{ margin: "0 auto", display: "block" }}
            variant="contained"
          >
            Logout
          </Button>
        </div>
        {open && <CeoSopModal open={open} setOpen={setOpen} />}
      </>
    )
  );
};
export default Details;
