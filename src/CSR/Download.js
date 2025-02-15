import { useLocation } from "react-router-dom";
import PdfContainer from "./PdfContainer";
import Doc from "./DocService";
import { useState } from "react";
import  secureLocalStorage  from  "react-secure-storage";
const Download = () => {
  const location = useLocation();
  console.log("Location", location.state);
  const [item] = useState(location.state.data);
  const createPdf = (html) => Doc.createPdf(html);
  const name = JSON.parse(secureLocalStorage.getItem("info")).data.name;
  return (
    <>
      <PdfContainer createPdf={createPdf}>
        <div className="aspect-[1/1.41] relative px-5 w-[600px] mx-auto border-2 border-black scroll-x-hidden ">
          <p className="text-center font-semibold text-3xl border-b-[2px] border-black p-1 ">
            Pes Online Services
          </p>
          <h1 className="text-center font-semibold text-lg bg-gray-400 border-b-[2px] border-black p-1 ">
            Customer Meter Replacement Report
          </h1>
          <div className="ml-3 text-gray-1200 text-sm font-semibold">
            {/* <p>PES ONLINE SERVICES </p> */}
            <p>
              106 1<sup>st</sup> floor, SSR Corporate Park , 13/6 Mathura Road,
              NS-2 Faridabad Pin-121003{" "}
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
                <div className="  flex">
                  <p className="font-bold"> Service Report No: </p>
                  <p className="pl-2"> {item.ServiceReportNo}</p>
                </div>
                <div className=" justify-center flex">
                  <p className="font-bold"> Ticket No: </p>
                  <p className="pl-2">{item.TicketNumber}</p>
                </div>
                <div className=" flex ">
                  <label className="!text-black ml-5 font-bold">Date:</label>

                  <p className="pl-2">
                    {new Date(item.createdAt).toLocaleString()}
                    &nbsp;
                  </p>
                </div>
              </div>
              <div className="border-b-[0.5px] text-sm border-black px-3 space-x-2 p-1 grid grid-cols-3">
                <div className="flex col-span-2">
                  <p className="font-bold">Customer Name : </p>
                  <p className="pl-2">{item.Customer_Name}</p>
                </div>
                <div className="flex">
                  <p className="font-bold">Flat No : </p>
                  <p className="pl-2">{item.flatNo}</p>
                </div>
              </div>
              <div className="border-b-[0.5px] border black ">
                <div className="text-sm relative flex py-2">
                  <p className="!text-black px-3 font-bold">Address:</p>
                  <p className="w-full">{item.Address}</p>
                </div>
                <div className="grid grid-cols-4 py-1 px-2 border-y-[0.5px] border-black text-[10px]">
                  <div className="flex">
                    <p className="text-right font-bold pr-1">Old Make: </p>
                    <p className="">{item.OldMake}</p>
                  </div>
                  <div className="flex ">
                    <p className="text-right font-bold pr-1">Old Model: </p>
                    <p className="">{item.OldModel}</p>
                  </div>
                  <div className="flex">
                    <p className="text-right font-bold pr-1">Old SerialNo: </p>
                    <p className="">{item.OldSerialNo}</p>
                  </div>
                  <div className="flex">
                    <p className="text-right font-bold pr-1">
                      Old Digital Id:{" "}
                    </p>
                    <p className="2">{item.OldDigitalId}</p>
                  </div>
                </div>
                <div className="grid grid-cols-4 py-1 px-2 border-b-[0.5px] border-black text-[10px]">
                  <div className="flex">
                    <p className="text-right font-bold pr-1">New Make: </p>
                    <p className="">{item.NewMake}</p>
                  </div>
                  <div className="flex ">
                    <p className="text-right font-bold pr-1">New Model: </p>
                    <p className="">{item.NewModel}</p>
                  </div>
                  <div className="flex">
                    <p className="text-right font-bold pr-1">New SerialNo: </p>
                    <p className="">{item.NewSerialNo}</p>
                  </div>
                  <div className="flex">
                    <p className="text-right font-bold pr-1">
                      New Digital Id:{" "}
                    </p>
                    <p className="2">{item.NewDigitalId}</p>
                  </div>
                </div>
                <div className="grid grid-cols-4 border-b-[0.5px] border-b-black text-[12px]">
                  <div className="border-r-[0.5px] text-center border-black">
                    <p className="font-bold py-1"> Old Meter (KWh) Mains</p>
                    <p className="border-t-[0.5px] py-1 text-md border-black">
                      {item.oldMeterMains}
                    </p>
                  </div>
                  <div className=" border-r-[0.5px] text-center border-black">
                    <p className="font-bold py-1"> Old Meter (KWh) DG </p>
                    <p className="border-t-[0.5px] py-1 text-md border-black">
                      {item.oldMeterDg}
                    </p>
                  </div>
                  <div className="border-r-[0.5px] text-center border-black">
                    <p className="font-bold py-1 ">New Meter (KWh) Mains</p>
                    <p className="border-t-[0.5px]  py-1 text-md border-black">
                      {item.newMeterMains}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold py-1 "> New Meter (KWh) DG</p>
                    <p className="border-t-[0.5px]  py-1 text-md border-black">
                      {item.newMeterDg}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-sm border-b-[0.5px] border p-1 border-b-black">
                  <span className="font-bold ">Server Updated CRM Name:</span>
                  <span className="pl-2">{item.serverUpdatedCRMName}</span>
                </div>
                <div className="text-sm border-b-[0.5px] p-1 border border-b-black">
                  <span className=" font-bold">
                    Problem Detected By Engineer:
                  </span>
                  <span className="pl-2">{item.ProblemDetectedByEngineer}</span>
                </div>
                <div className="text-sm border-b-[0.5px] p-1 border border-b-black">
                  <span className="font-bold">Attented Engineer Report:</span>
                  <span className="pl-2">{item.attentedEngineerReport}</span>
                </div>
                <div className="text-sm border-b-[0.5px] p-1 border border-b-black">
                  <span className=" font-bold">Customer Remarks:</span>
                  <span className="pl-2">{item.CustomerRemarks}</span>
                </div>
              </div>
            </section>
          </div>
          <div className="absolute bottom-10 w-[calc(100%-40px)]">
            <div className="grid pt-10 grid-cols-2 place-items-center text-sm font-bold">
              <div>
                <p className="text-center invisible">{name}</p>
                <p>Customer Name & Signature</p>
              </div>
              <div>
                <p className="text-center">{item.EmployeeName}</p>
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
    </>
  );
};
export default Download;
