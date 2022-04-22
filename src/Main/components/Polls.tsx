import axios from "axios";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

type itemProps = {
  item: {
    _id: string;
    title: string;
    options: {
      option: string;
    }[];
  };
  AllPollData: () => void;
};

function Polls({ item, AllPollData }: itemProps) {
  const [token, setToken] = useState<string | null>("");
  const [selectedOption, setSelectedOption] = useState<string | null>("");
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const UserToken = localStorage.getItem("token");
    setToken(UserToken);
  }, []);

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
  const submitPoll = async (id: string) => {
    setIsLoading(true);
    try {
      const url = `https://secure-refuge-14993.herokuapp.com/do_vote?id=${id}&option_text=${selectedOption}`;
      const res = await axios.post(url, null, {
        headers: { access_token: token || "" },
      });
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <>
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
        {item.options.map((newitem: any) => {
          return (
            <div className="MainOptionContainer">
              <div className="optionContainer">
                <button
                  className={
                    selectedOption == newitem.option
                      ? "checkButtonTrue"
                      : "checkButton"
                  }
                  onClick={() => {
                    setSelectedOption(newitem.option);
                    setIsDisabled(false);
                  }}
                ></button>
                <p className="option">{newitem.option}</p>
              </div>
              <button
                className="deleteOptionButton"
                onClick={() => deleteOption(item._id, newitem.option)}
              >
                delete option
              </button>
            </div>
          );
        })}
        ;
        <button className="NewOptionBtn" onClick={() => addNewOption(item._id)}>
          Add new options
        </button>
        <button
          className="submitPollBtn"
          disabled={isDisabled}
          onClick={() => submitPoll(item._id)}
        >
          {isLoading ? (
            <Spinner animation="border" size="sm" />
          ) : (
            "Submit Your Poll"
          )}
        </button>
      </div>
    </>
  );
}

export default Polls;
