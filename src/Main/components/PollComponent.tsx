import React from "react";
type itemProps = {
  item: {
    options: {
      option: string;
    }[];
  };
};

function PollComponent({ item }: itemProps) {
  const { options } = item;
  console.log(options);
  return (
    <>
      {options.map((newitem) => {
        return (
          <div className="optionContainer">
            <button className="checkButton"></button>
            <p className="option">{newitem.option}</p>
          </div>
        );
      })}
    </>
  );
}

export default PollComponent;
