import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ListBoxes from "../components/ListBoxes";

function Home() {
  const [Data, setData] = useState<string | null>("");
  const navigate = useNavigate();
  useEffect(() => {
    const name = localStorage.getItem("user");
    setData(name);
  }, []);

  const onclick = (screen: string) => {
    navigate(screen);
  };

  return (
    <>
      <Button
        onClick={() => {
          localStorage.clear();
          navigate("/");
        }}
      >
        Logout
      </Button>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <ListBoxes title="All Polls" onclick={onclick} screen="AllPolls" />
        <ListBoxes
          title="Create Polls"
          onclick={onclick}
          screen="CreatePolls"
        />
        <ListBoxes title="All User List" onclick={onclick} screen="AllUsers" />
      </div>
    </>
  );
}

export default Home;
