import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Polls from "../components/Polls";
import "../Styles/AllPollsStyle.css";

function AllPolls() {
  const [allPollData, setAllPollData] = useState<any>([]);
  useEffect(() => {
    AllPollData();
  }, []);

  const AllPollData = async () => {
    const data = await axios.get(
      "https://secure-refuge-14993.herokuapp.com/list_polls"
    );
    setAllPollData(data?.data?.data);
  };

  return (
    <>
      <Navbar />
      <div className="MainContainer">
        {allPollData.map(
          (item: {
            _id: string;
            title: string;
            options: {
              option: string;
            }[];
          }) => {
            return <Polls item={item} AllPollData={AllPollData} />;
          }
        )}
      </div>
    </>
  );
}

export default AllPolls;
