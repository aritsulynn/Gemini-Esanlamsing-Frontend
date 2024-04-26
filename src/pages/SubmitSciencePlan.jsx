import React, { useEffect, useState } from "react";
import axios from "axios";

export default function SubmitSciencePlan() {
  const [data, setData] = useState([]);
  const [id, setId] = useState(null);
  const [modalText, setModalText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios
        .get("http://localhost:3030/scienceplans")
        .then((response) => {
          // console.log(response.data);
          setData(response.data);
        });
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!id) {
      return;
    }
    const handleStatus = async () => {
      await axios
        .post(`http://localhost:3030/getscienceplan`, null, {
          params: { id: id },
        })
        .then((response) => {
          console.log(response.data);
          setStatus(response.data.status);
        });
    };
    handleStatus();
  }, [id]);

  const handleStatus = async () => {
    await axios
      .post(`http://localhost:3030/getscienceplan`, null, {
        params: { id: id },
      })
      .then((response) => {
        console.log(response.data);
        setStatus(response.data.status);
      });
  };

  const handleTest = async (e) => {
    e.preventDefault();
    if (!id) {
      alert("Select a science plan to submit");
      return;
    }
    handleStatus();
    await axios
      .post("http://localhost:3030/testscienceplan", null, {
        params: { id: id },
      })
      .then((response) => {
        console.log(response.data);
        setModalText(() => response.data);
        handleStatus();
        setShowModal(true);
      })
      .catch((err) => {
        setModalText(() => err.response.data);
        setShowModal(true);
      });
  };

  const handleSubmit = async () => {
    if (!id) {
      alert("Select a science plan to submit");
      return;
    }
    await axios
      .post("http://localhost:3030/submitscienceplan", null, {
        params: { id: id },
      })
      .then((reponse) => {
        setModalText(() => reponse.data);
        handleStatus();
        setShowModal(true);
      })
      .catch((err) => {
        setModalText(() => err.response.data);
        setShowModal(true);
      });
  };

  const handleValidation = async () => {
    if (!id) {
      alert("Select a science plan to validate");
      return;
    }
    await axios
      .post("http://localhost:3030/validate", null, {
        params: { id: id },
      })
      .then((response) => {
        if (response.status == 200) {
          setModalText(() => response.data);
          handleStatus();
          setShowModal(true);
        }
      });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-md shadow-lg bg-white rounded-lg">
      <h1 className="text-center text-2xl font-bold text-gray-700 mb-6">
        Select Science Plan to Submit
      </h1>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Science Plan
          </label>
          <select
            onChange={(e) => setId(e.target.value)}
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          >
            <option value="">Select a plan</option>
            {data.map((item, index) => (
              <option key={index} value={item.planNo}>
                {item.planNo} - {item.starSystem} - {item.creator} -{" "}
                {item.status}
              </option>
            ))}
          </select>
        </div>
        <div className="flex space-x-4 mb-4">
          <button
            type="button"
            onClick={handleTest}
            disabled={
              status === "TESTED" ||
              status === "VALIDATED" ||
              status === "SUBMITTED"
                ? true
                : false
            }
            className={`${
              status === "TESTED" ||
              status === "VALIDATED" ||
              status === "SUBMITTED"
                ? "bg-slate-700"
                : "bg-blue-500 hover:bg-blue-700"
            } flex-1  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
          >
            Test
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={
              status === "SAVED" ||
              status === "VALIDATED" ||
              status === "SUBMITTED"
                ? true
                : false
            }
            className={`${
              status === "SAVED" ||
              status === "VALIDATED" ||
              status === "SUBMITTED"
                ? "bg-slate-700"
                : "bg-green-500 hover:bg-green-700"
            } flex-1  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleValidation}
            disabled={
              status === "SAVED" ||
              status === "TESTED" ||
              status === "VALIDATED"
                ? true
                : false
            }
            className={`${
              status === "SAVED" ||
              status === "TESTED" ||
              status === "VALIDATED"
                ? "bg-slate-700"
                : "bg-pink-700 hover:bg-pink-700"
            } flex-1  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
          >
            Validation
          </button>
        </div>
        {showModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full px-4">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3 text-center">
                {/* Conditionally render icons and backgrounds based on testStatus and submitStatus */}
                <div
                  className="mx-auto flex items-center justify-center h-12 w-12 rounded-full"
                  style={{
                    backgroundColor:
                      status === "TESTED" || status === "SUBMITTED"
                        ? "bg-green-100"
                        : "bg-red-100",
                  }}
                >
                  {status === "TESTED" ||
                  status === "SUBMITTED" ||
                  status === "VALIDATED" ? (
                    <svg
                      className="h-6 w-6 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-6 w-6 text-red-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                </div>
                {/* Title of Modal */}
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {status === "TESTED" ||
                  status === "SUBMITTED" ||
                  status === "VALIDATED"
                    ? "Success"
                    : "Error"}
                </h3>
                <div className="mt-2 px-7 py-3">
                  <p className="text-sm text-gray-500">
                    {modalText || "Operation failed. Please try again."}
                  </p>
                  {/* <p className="text-sm text-gray-500 mt-2">{testData}</p> */}
                </div>
                <div className="items-center px-4 py-3">
                  <button
                    onClick={handleCloseModal}
                    className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
