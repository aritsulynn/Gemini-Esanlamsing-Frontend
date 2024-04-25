import React, { useEffect, useState } from "react";
import axios from "axios";

// import js-cookie
import Cookies from "js-cookie";

export default function SubmitSciencePlan() {
  const [data, setData] = useState([]);
  const [id, setId] = useState(null);
  const [isTested, setIsTested] = useState(false);
  const [testData, setTestData] = useState([]);

  const handleTest = async (e) => {
    e.preventDefault();
    if (!id) {
      alert("Select a science plan to submit");
      return;
    }
    setIsTested(true);
    const testSciencePlan = await axios
      .post("http://localhost:3030/testscienceplan", null, {
        params: { id: id },
      })
      .then((response) => {
        console.log(response.data);
        setTestData(response.data);
        setIsTested(false);
      });
    testSciencePlan;
  };

  const handleChange = (e) => {
    e.preventDefault();
    setId(e.target.value);
    // console.log(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id) {
      alert("Select a science plan to submit");
      return;
    }
    setIsTested(true);
    const submitSciencePlan = await axios
      .post("http://localhost:3030/submitscienceplan", null, {
        params: { id: id },
      })
      .then((response) => {
        console.log(response.data);
        setTestData(response.data);
        setIsTested(false);
      });
    submitSciencePlan;
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios
        .get("http://localhost:3030/scienceplans")
        .then((response) => {
          console.log(response.data);
          setData(response.data);
        });
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto">
      <h1>Select Science Plan to submit</h1>
      <form>
        <div>
          <select onChange={handleChange}>
            <option value="">Select a plan</option>
            {data.map((item, index) => (
              <option key={index} value={item.planNo}>
                {item.planNo} {item.starSystem}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" onClick={handleTest}>
          Test
        </button>
        <br />
        {isTested && <p>Testing...</p>}
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}
