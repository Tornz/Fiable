// src/App.tsx

import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";

import GridComponent from "../Component/gridComponent";

const Home: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [position, setPosition] = useState<string>("1,1 NORTH");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleButtonClick = () => {
    setPosition(input);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h5" className="padB20">
        Grid Object Placement
      </Typography>
      <TextField
        className="padB20"
        label="Position (e.g., 1,1 NORTH)"
        value={input}
        onChange={handleInputChange}
        fullWidth
      />
      <div className="padB20">
        <Button onClick={handleButtonClick} variant="contained" color="primary">
          Place Object
        </Button>
      </div>
      <GridComponent position={position} />
    </div>
  );
};

export default Home;
