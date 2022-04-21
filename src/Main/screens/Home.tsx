import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Home() {
  const [Data, setData] = useState<string | null>("");
  const navigate = useNavigate();
  useEffect(() => {
    const name = localStorage.getItem("user");
    setData(name);
  }, []);

  return (
    <>
      <div>{Data}</div>
      <Button
        onClick={() => {
          localStorage.clear();
          navigate("/");
        }}
      >
        Logout
      </Button>
    </>
  );
}

export default Home;
