import React from "react";
type itemProps = {
  item: {
    _id: string;
    options: {
      option: string;
    }[];
  };
  deleteOption: (id: string, text: string) => void;
};

function PollComponent({ item, deleteOption }: itemProps) {
  const { options } = item;
  console.log(options);
  return (
    <>
      {options.map((newitem) => {
        return (
          <div className="MainOptionContainer">
            <div className="optionContainer">
              <button className="checkButton"></button>
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
    </>
  );
}

export default PollComponent;
