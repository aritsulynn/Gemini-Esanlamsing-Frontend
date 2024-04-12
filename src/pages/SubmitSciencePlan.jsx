import React, { useEffect, useState } from "react";
import axios from "axios";

export default function SubmitSciencePlan() {
  const [data, setData] = useState([]);
  const [id, setId] = useState(null);
  const [isTested, setIsTested] = useState(false);
  const [testData, setTestData] = useState([]);

  const handleSubmit = async (e) => {
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
    <div>
      <h1>Select Science Plan to submit</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Submit</button>
        {isTested && <p>Testing...</p>}
        {testData.length > 0 && <p>{testData}</p>}
      </form>
    </div>
  );
}
