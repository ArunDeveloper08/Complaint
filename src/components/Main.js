import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Dialog from "./DialogModal";
import { Button } from "@mui/material";
import EmployeeSimDialog from "./EmployeeSimDialog";
import secureLocalStorage from "react-secure-storage";

const Main = () => {
  const [open, setOpen] = useState(false);
  const [openSimDialog, setOpenSimDialog] = useState(false);
  const navigate = useNavigate();
  const a = JSON.parse(secureLocalStorage.getItem("info"));
  const handleAddPerson = () => {
    a.isAdmin && navigate("/addpeople");
  };
  const handleAddWork = () => {
    navigate("/addWork");
  };
  return (
    <>
      <div className="grid place-items-center w-[100vw] h-[80vh]">
        <div className="animate__animated animate__flipInY max-w-sm rounded-lg overflow-hidden shadow-2xl bg-gradient-to-r from-red-500 to-gray-700 min-w-[300px]">
          <img
            className="w-full my-10 md:my-20 image-css px-5"
            src="https://www.peselectricals.com/image/bg.png"
            alt="Pes Electrical Pvt Ltd."
          />
          <div className="grid grid-cols-2 justify-center w-fit mx-auto gap-5 pb-10 items-center font-semibold">
            {a.isAdmin && (
              <button
                className="bg-gray-200 w-[100px] py-2 rounded-md duration-500 hover:bg-black hover:text-white"
                onClick={handleAddPerson}>
                Add Person
              </button>
            )}
            {/* {a.isAdmin && (
              <button
                className="bg-gray-200 w-[100px] py-2 rounded-md duration-500 hover:bg-black hover:text-white"
                onClick={handleAddWork}
              >
                Add Work
              </button>
            )} */}
            <button
              className="bg-gray-200 w-[100px] py-2 rounded-md duration-500 hover:bg-black hover:text-white"
              onClick={() => navigate("/view")}>
              View Work
            </button>
            {!a.isAdmin && (
              <button
                className="bg-gray-200 w-[100px] py-2 rounded-md duration-500 hover:bg-black hover:text-white"
                onClick={() =>
                  a.isAdmin ? navigate("/csrlist") : navigate("/csr")
                }>
                MRR Form
                {/* Customer Service Report */}
              </button>
            )}
            <button
              className="bg-gray-200 w-[100px] py-2 rounded-md duration-500 hover:bg-black hover:text-white"
              onClick={() => navigate("/store ")}>
              Store
            </button>
            {a.data.Designation === "engineer" && (
              <button
                className="bg-gray-200 w-[100px] py-2 rounded-md duration-500 hover:bg-black hover:text-white"
                onClick={() => setOpenSimDialog(true)}>
                Installation
              </button>
            )}
            {/* { (a.data.Designation === "engineer") && (
              <button
                className="bg-gray-200 w-[100px] py-2 rounded-md duration-500 hover:bg-black hover:text-white"
                onClick={ () => navigate("/installsim") }
              >
                Install Sim
              </button>
            ) } */}
            {!a.isAdmin && (
              <button
                onClick={() => navigate("/csrform")}
                className="bg-gray-200 duration-500 hover:bg-black hover:text-white py-2 w-[100px] rounded-md ">
                CSR Report
              </button>
            )}
            {a.data.Designation === "engineer" && (
              <button
                onClick={() => navigate("/activity")}
                className="bg-gray-200 duration-500 hover:bg-black hover:text-white py-2 w-[100px] rounded-md ">
                Activity Log
              </button>
            )}
            {a.isAdmin && (
              <button
                className="bg-gray-200 w-[100px] py-2 rounded-md duration-500 hover:bg-black hover:text-white"
                onClick={() => navigate("/viewemployee")}>
                All Employee
              </button>
            )}
            {(a.data.Designation === "storekeeper" || a.isAdmin) && (
              <button
                className="bg-gray-200 w-[100px] py-2 rounded-md duration-500 hover:bg-black hover:text-white"
                onClick={() => navigate("/dealer")}>
                Dealer
              </button>
            )}
            {(a.data.Designation === "storekeeper" || a.isAdmin) && (
              <button
                className="bg-gray-200 w-[100px] py-2 rounded-md duration-500 hover:bg-black hover:text-white"
                onClick={() => navigate("/Consumables")}>
                Consumables
              </button>
            )}

            {/* {(a.data.Designation === "storekeeper" ||
              a.data.Designation === "production") && (
                <button
                  className="bg-gray-200 w-[100px] py-2 rounded-md duration-500 hover:bg-black hover:text-white"
                  onClick={() => navigate("/challanhistory")}
                >
                  Challan
                </button>
              )} */}
            {(a.data.Designation === "storekeeper" ||
              a.data.Designation === "production") && (
              <button
                className="bg-gray-200 w-[100px] py-2 rounded-md duration-500 hover:bg-black hover:text-white"
                onClick={() => navigate("/challan")}>
                Challan
              </button>
            )}

            <button
              className="bg-gray-200 w-[100px] py-2 rounded-md duration-500 hover:bg-black hover:text-white"
              onClick={() => navigate("/landingpage")}>
              Tools
            </button>

            {a.data.Designation === "engineer" && (
              <button
                onClick={() => navigate("/view-engineer-challan")}
                className="bg-gray-200 duration-500 hover:bg-black hover:text-white py-2 w-[100px] rounded-md ">
                View Challan
              </button>
            )}
          </div>
        </div>
      </div>
      {/* {open && <Dialog open={open} setOpen={setOpen} />} */}
      {openSimDialog && (
        <EmployeeSimDialog
          openSimDialog={openSimDialog}
          setOpenSimDialog={setOpenSimDialog}
        />
      )}
    </>
  );
};

export default Main;
