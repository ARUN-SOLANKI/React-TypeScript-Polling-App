import React from "react";
import "../Styles/HomeStyle.css";
type BoxProps = {
  title: string;
  onclick: (value: string) => void;
  screen: string;
};
function ListBoxes({ title, onclick, screen }: BoxProps) {
  return (
    <div className="main">
      <button className="Homebox" onClick={() => onclick(screen)}>
        <p>{title}</p>
      </button>
    </div>
  );
}

export default ListBoxes;
