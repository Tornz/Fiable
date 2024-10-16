// src/App.tsx

import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";

import { RegEx } from "../Utils/utils";
import GridComponent from "../Component/gridComponent";

const Home: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [position, setPosition] = useState<string>("1,1 NORTH");
  const [error, setError] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const validateInput = () => {
    if (!RegEx.position.test(input)) {
      setError('Invalid input format. Use "x,y DIRECTION".');
      return false;
    }
    const [, x, y] = input.match(RegEx.position)!.map(Number);
    if (x < 0 || x > 4 || y < 0 || y > 4) {
      setError("x and y coordinates must be between 0 and 4.");
      return false;
    }
    setError("");
    return true;
  };

  const handleButtonClick = () => {
    if (validateInput()) {
      setPosition(input);
      setError("");
    }
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

      {error && <Typography color="error">{error}</Typography>}
      <GridComponent position={position} />
    </div>
  );
};

export default Home;
