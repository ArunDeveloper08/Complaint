import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

const Login = () => {
  const [data, setData] = useState({
    Employee_Id: "",
    Password: "",
  });
  const navigate = useNavigate();
  // const location=useLocation();
  // const {details}=useParams();
  // console.log("details", details);
  // console.log("location", location.search.split("?")[ 1 ]);
  // const a=decodeURIComponent(location.search);
  // const b=JSON.parse(a);
  // console.log(b)

  // console.log("location1", Password);
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    // console.log("data", data);
    if (data.Employee_Id === "" || data.Password === "") {
      return alert("Please Fill All Input");
    }
    axios
      .post(`${window.MyApiRoute}employee/login`, data)
      .then((res) => {
        // console.log("res", res.data);
        secureLocalStorage.setItem("info", JSON.stringify(res.data));
        secureLocalStorage.setItem(
          "Employee_Id",
          JSON.stringify(res.data.data.Employee_Id)
        );
        navigate("/home", { state: res.data });
      })
      .catch((err) => {
        console.log(err);
        alert("Incorrect Credentials");
      });
  };
  useEffect(() => {
    let newData;
    const urlParams = new URLSearchParams(window.location.search);

    // Get the "details" parameter from the URL
    const detailsParam = urlParams.get("details");

    if (detailsParam) {
      // Decode the URL-encoded JSON
      const decodedDetails = decodeURIComponent(detailsParam);

      try {
        // Parse the JSON into a JavaScript object
        newData = JSON.parse(decodedDetails);
        // console.log(detailsObject);
        // Use the detailsObject as needed
      } catch (error) {
        console.error("Invalid JSON format");
      }
    }
    if (newData) {
      axios
        .post(`${window.MyApiRoute}employee/login`, {
          ...newData,
        })
        .then((res) => {
          // console.log("res", res.data);
          secureLocalStorage.setItem("info", JSON.stringify(res.data));
          secureLocalStorage.setItem(
            "Employee_Id",
            JSON.stringify(res.data.data.Employee_Id)
          );
          navigate("/home", { state: res.data });
        })
        .catch((err) => {
          console.log(err);
          alert("Incorrect Credentials");
        });
    }
  }, []);

  return (
    <>
      <section className="gradient-form h-[100vh] bg-neutral-200 dark:bg-neutral-700 flex flex-cil justify-center ">
        <div className="container h-small mx-auto p-5 animate__animated animate__backInDown">
          <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
            <div className="w-full">
              <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
                <div className="g-0 lg:flex lg:flex-wrap">
                  <div className="px-4 md:px-0 lg:w-6/12">
                    <div className="md:mx-6 md:p-12">
                      <div className="text-center">
                        <img
                          className="mx-auto w-48 py-5 md:w-80"
                          src="https://www.peselectricals.com/image/bg.png"
                          alt="logo"
                        />
                        <h4 className=" pb-1 text-center text-[28px] font-bold italic">
                          PES Electrical Pvt.Ltd.
                        </h4>
                      </div>
                      <form className="space-y-3">
                        <p className=" mt-3 text-l font-semibold ">
                          Please login to your account
                        </p>
                        <div
                          className="relative pb-4"
                          data-te-input-wrapper-init>
                          <input
                            name="Employee_Id"
                            onChange={(e) => handleChange(e)}
                            value={data.Employee_Id}
                            type="text"
                            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-1 ring-[1px] focus:ring-[2px] focus:ring-blue-500 ring-gray-500"
                            id="exampleFormControlInput1"
                            placeholder="Employee Id"
                          />
                        </div>
                        <div
                          className="relative pb-4"
                          data-te-input-wrapper-init>
                          <input
                            name="Password"
                            onChange={(e) => handleChange(e)}
                            value={data.Password}
                            type="password"
                            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-1 ring-[1px] focus:ring-[2px] focus:ring-blue-500 ring-gray-500"
                            id="exampleFormControlInput11"
                            placeholder="Password"
                          />
                        </div>
                        <div className="mb-12 text-center pb-3">
                          <button
                            onClick={handleSubmit}
                            className="mb-3 inline-block w-fit px-5 rounded p-3 text-md font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] bg-gradient-to-l from-black  to-red-500 hover:bg-gradient-to-r "
                            type="button"
                            data-te-ripple-init
                            data-te-ripple-color="light">
                            Log in
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg bg-gradient-to-l from-black  to-red-500 lg:rounded-bl-none">
                    <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                      <h4 className="mb-6 text-xl font-bold">
                        BEST PREPAID METERING SOLUTION.
                      </h4>
                      <p className="text-sm font-semibold italic">
                        To contribute towards the economic growth as well as
                        environment protection by replacing power consuming
                        products with energy management products, we, PES
                        Electrical PVT.LTD is working day and night. Our firm is
                        a specialized manufacturer, supplier and trader of Home
                        Display Unit, AMF Relays, Three Phase Energy Meters,
                        Energy Management Communication Hardware, Management
                        Software, etc. These are made by our skilled workers
                        from superior quality spares and materials in sync with
                        the national norms. Our products are simple to install/
                        operate, modern in design, reliable, and durable due to
                        which these are extensively demanding. For meeting the
                        different requirements of the clients, we are making
                        available our products in several models, sizes, and
                        technical specifications. In addition to the impressive
                        gamut, we are growing in the industry leveraging the
                        hard work of our professionals and support of the linked
                        eminent firms.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
