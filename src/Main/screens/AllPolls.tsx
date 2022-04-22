import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import PollComponent from "../components/PollComponent";
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
  const deletePoll = async (id: string) => {
    const Url = `https://secure-refuge-14993.herokuapp.com/delete_poll?id=${id}`;
    await axios.delete(Url);
    AllPollData();
  };

  return (
    <>
      <Navbar />
      <div>
        {allPollData?.map(
          (
            item: {
              title: string;
              _id: string;
              options: {
                option: string;
              }[];
            },
            i: number
          ) => {
            return (
              <div className="PollsContainer">
                <div className="QuestionContent">
                  <h4 className="Question">{item.title}</h4>
                  <button
                    className="deleteButton"
                    onClick={() => deletePoll(item._id)}
                  >
                    delete
                  </button>
                </div>
                <PollComponent item={item} />;
              </div>
            );
          }
        )}
      </div>
    </>
  );
}

export default AllPolls;
