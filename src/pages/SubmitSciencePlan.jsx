import React, { useEffect, useState } from "react";
import axios from "axios";

export default function SubmitSciencePlan() {
  const [data, setData] = useState([]);
  const [id, setId] = useState(null);
  const [isTesting, setIsTesting] = useState(false);
  const [testData, setTestData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);
  const [testStatus, setTestStatus] = useState('');
  const [canTest, setCanTest] = useState(false);

  useEffect(() => {
    const checkCanTest = async () => {
      if (id) {
        try {
          const response = await axios.post(`http://localhost:3030/getscienceplan`, null, {
            params: { id: id }
          });
          const status = response.data.status;
          setCanTest(status === "SAVED");
        } catch (error) {
          console.error('Error fetching science plan status:', error);
          setCanTest(false); // Assume not testable if there's an error
        }
      }
    };

    checkCanTest();
  }, [id]);

  const handleTest = async (e) => {
    e.preventDefault();
    if (!id) {
      alert("Select a science plan to submit");
      return;
    }
    
    if (!canTest) {
      alert("This science plan has already been tested and cannot be tested again.");
      return;
    }   

    setIsTesting(true);
    await axios.post("http://localhost:3030/testscienceplan", null, {
      params: { id: id },
    }).then((response) => {
      console.log(response.data);
      setTestData(response.data);
      setTestStatus(response.data.status);
      setCanSubmit(response.data.status === "TESTED");
      setIsTesting(false);
      setShowModal(true);
    });
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:3030/scienceplans");
        setData(response.data);
      } catch (error) {
        console.error('Error fetching science plan:', error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async () => {

    const submitSciencePlan = await axios.post("http://localhost:3030/submitscienceplan", null, {
      params: { id: id },
    });
    // console.log(submitSciencePlan.data);
    setShowModal(true); // Optional: Show modal on submission too, with a different message perhaps
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-md shadow-lg bg-white rounded-lg">
      <h1 className="text-center text-2xl font-bold text-gray-700 mb-6">Select Science Plan to Submit</h1>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Science Plan</label>
          <select
            onChange={(e) => setId(e.target.value)}
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          >
            <option value="">Select a plan</option>
            {data.map((item, index) => (
              <option key={index} value={item.planNo}>
                {item.planNo} - {item.starSystem}
              </option>
            ))}
          </select>
        </div>
        <div className="flex space-x-4 mb-4">
          <button
            type="button"
            onClick={handleTest}
            className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Test
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={`flex-1 ${canSubmit ? 'bg-green-500 hover:bg-green-700' : 'bg-gray-500 cursor-not-allowed'} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
          >
            Submit
          </button>
        </div>
        {isTesting && (
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "100%" }}></div>
          </div>
        )}
        {showModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full px-4">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3 text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full" style={{ backgroundColor: testStatus === 'TESTED' ? 'bg-green-100' : 'bg-red-100' }}>
                  {testStatus === 'TESTED' ? (
                    <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                    </svg>
                  ) : (
                    <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {testStatus === 'TESTED' ? "Testing Complete" : "Testing Failed"}
                </h3>
                <div className="mt-2 px-7 py-3">
                  <p className="text-sm text-gray-500">
                    {testStatus === 'TESTED' ? "The science plan testing is completed successfully. Here are the details:" : "Testing failed. Please review the errors and retry."}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">{testData}</p>
                </div>
                <div className="items-center px-4 py-3">
                  <button onClick={handleCloseModal} className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300">
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