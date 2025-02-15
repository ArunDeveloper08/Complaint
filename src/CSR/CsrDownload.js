import React, { useState } from "react";
import PdfContainer from "./PdfContainer";
import Doc from "./DocService";
import { useLocation } from "react-router-dom";
import  secureLocalStorage  from  "react-secure-storage";
const CsrDownload = () => {
  const location = useLocation();
  const [data] = useState(location.state.data);
  console.log("tarun", data);
  const createPdf = (html) => Doc.createPdf(html);

  return (
    <PdfContainer createPdf={createPdf}>
      <div className="aspect-[1/1.41] relative px-5 w-[600px] mx-auto border-2 border-black scroll-x-hidden ">
        <p className="text-center font-semibold text-5xl py-3 border-b-[2px] border-black p-1 ">
          Pes Online Services
        </p>
        <h1 className="text-center font-semibold text-3xl py-2 bg-gray-400 border-b-[2px] border-black p-1 ">
          Customer Service Report
        </h1>
        <div className="ml-3 text-gray-1200 text-sm font-semibold">
          {/* <p>PES ONLINE SERVICES </p> */}
          <p>
            106 1<sup>st</sup> floor, SSR Corporate Park , 13/6 Mathura Road,
            NS-2 Faridabad Pin-121003
          </p>
          <p>Phone : 9650016127 , 9821981112</p>
          <p>Mail Id: support@pesonline.co.in, accounts@pesonline.co.in</p>
          <p>GSTIN - 06ANWPY8563B2Z7</p>
        </div>
        <hr />
        <div className="border-b-[0.5px] border-black border-t-[0.5px]">
          <p className=" text-center border-b-[0.5px] border-black font-semibold text-lg bg-gray-400 ">
            Customer Detail
          </p>
          <section>
            <div className="flex justify-between items-center text-sm bg-gray-300 py-1 px-3 border-b-[0.5px] border-black ">
              <div className="   flex">
                <p className="font-bold text-xs"> CSR No: </p>
                <p className="pl-1 text-xs"> {data.CSr_NO} </p>
              </div>
              <div className="  flex">
                <p className="font-bold text-xs"> Ticket No: </p>
                <p className="pl-1 text-xs">{data.TicketNo}</p>
              </div>
              <div className="  flex">
                <p className="font-bold text-[12px]">Meter Serial No / Id:</p>
                <p className="pl-1 text-[11px]"> {data.MeterSerialNo} </p>
              </div>
              <div className=" flex">
                <label className="!text-black ml-5 font-bold text-xs">
                  Date :
                </label>
                <p className="pl-1 text-xs">
                  {new Date(data.createdAt).toLocaleString()}
                  &nbsp;
                </p>
              </div>
            </div>
            <div className="border-b-[0.5px] border text-sm border-b-black px-3 p-1 grid grid-cols-7">
              <div className="flex col-span-3">
                <p className="font-bold">Customer Name : </p>
                <p className="pl-2"> {data.Customer_Name} </p>
              </div>
              <div className="flex col-span-2">
                <p className="font-bold">Mobile No : </p>
                <p className="pl-2"> {data.MobileNo} </p>
              </div>
              <div className="flex col-span-2">
                <p className="font-bold">Flat No : </p>
                <p className="pl-2"> {data.FlatNo} </p>
              </div>
            </div>
            <div className="border  border-b-[0.5px] border-b-black">
              <div className="text-sm relative flex w-4/5 py-2">
                <p className="!text-black px-3 font-bold">
                  Sitename & Address:
                </p>
                <p className="w-full" rows="3">
                  {data.Address}
                </p>
              </div>
            </div>
            <div>
              <div className="text-sm border-b-[0.5px] border border-b-black p-3">
                <span className="font-bold pr-2">
                  Complaint Reported By CRM:
                </span>
                <span className=""> {data.ComplaintReportedBy} </span>
              </div>
              <div className="text-sm border-b-[0.5px] p-3 border border-b-black">
                <span className="font-bold pr-1 ">
                  Problem Identified By Service Engineer:
                </span>
                <span className="">
                  {data.ProblemIdentifiedByServiceEngineer}
                </span>
              </div>
              <div className="text-sm border-b-[0.5px] p-3 border border-b-black">
                <span className="font-bold pr-1">
                  Problem Recitified By Service Engineer:
                </span>
                <span className="">
                  {data.ProblemRectifiedByServiceEngineer}
                </span>
              </div>
              <div className="text-sm border-b-[0.5px] p-3 border border-b-black">
                <span className="font-bold pr-1">
                  Problem Identified By Lab Engineer
                </span>
                <span className="">{data.CustomerRemarks}</span>
              </div>
              <div className="text-sm border-b-[0.5px] p-3 border border-b-black">
                <span className="font-bold pr-1">
                Problem Recitified by Lab Engineer
                </span>
                <span className="">{data.AttendedEngineerRemarks}</span>
              </div>
             
            </div>
          </section>
        </div>
        <div className="absolute bottom-10 w-[calc(100%-40px)]">
          <div className="grid grid-cols-2 place-items-center text-sm font-bold">
            <div>
              <p className="text-center "></p>
              <p>Customer Name & Signature</p>
            </div>
            <div>
              <p className="text-center">{data.EmployeeName}</p>
              <p>Engineer Name & Signature</p>
            </div>
          </div>
          <p className="text-center font-bold py-3 border-black border-t-[1px]">
            **This is a Computer generated Report. Hence, No Signature
            Required**
          </p>
        </div>
      </div>
    </PdfContainer>
  );
};

export default CsrDownload;
