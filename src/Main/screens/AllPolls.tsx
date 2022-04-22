import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import PollComponent from "../components/PollComponent";
import "../Styles/AllPollsStyle.css";

function AllPolls() {
  const [allPollData, setAllPollData] = useState<any>([]);
  const [token, setToken] = useState<string | null>("");
  useEffect(() => {
    const userToken = localStorage.getItem("token");
    setToken(userToken);
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

  const editPollTitle = async (id: string) => {
    const newTitle = prompt("enter you title here");
    const Url = `https://secure-refuge-14993.herokuapp.com/update_poll_title?id=${id}&title=${newTitle}`;
    await axios.put(Url);
    AllPollData();
  };

  const addNewOption = async (id: string) => {
    const newOption = prompt("plese enter you option text here");
    const Url = `https://secure-refuge-14993.herokuapp.com/add_new_option?id=${id}&option_text=${newOption}`;
    await axios.put(Url);
    AllPollData();
  };
  const deleteOption = async (id: string, text: string) => {
    const Url = `https://secure-refuge-14993.herokuapp.com/delete_poll_option?id=${id}&option_text=${text}`;
    await axios.delete(Url);
    AllPollData();
  };

  return (
    <>
      <Navbar />
      <div>
        <div className="MainContainer">
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
                    <div className="btncontainer">
                      <button
                        className="deleteButton"
                        onClick={() => deletePoll(item._id)}
                      >
                        delete
                      </button>
                      <button
                        className="deleteButton"
                        onClick={() => editPollTitle(item._id)}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                  <PollComponent item={item} deleteOption={deleteOption} />;
                  <button
                    className="NewOptionBtn"
                    onClick={() => addNewOption(item._id)}
                  >
                    Add new options
                  </button>
                  <button className="submitPollBtn">Submit Your Poll</button>
                </div>
              );
            }
          )}
        </div>
      </div>
    </>
  );
}

export default AllPolls;
