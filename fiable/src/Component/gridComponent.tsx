import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { RegEx } from "../Utils/utils";
import {
  ERROR_MESSAGE_INVALID_INPUT,
  ERROR_MESSAGE_INVALID_X_Y_COORDINATES,
} from "../Contants/ErrorMessages/errorMessage";

type GridProps = {
  position: string;
};

const GridComponent: React.FC<GridProps> = ({ position }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [coordinates, setCoordinates] = useState<{
    x: number;
    y: number;
    direction: string;
  } | null>(null);

  const parseInput = (input: string) => {
    if (validateInput(input)) {
      const match = input.match(RegEx.position);
      if (match) {
        const x = parseInt(match[1]);
        const y = parseInt(match[2]);
        const direction = match[3];
        setCoordinates({ x, y, direction });
        setErrorMessage(null);
      }
    }
  };

  const validateInput = (input: string) => {
    if (!RegEx.position.test(input)) {
      setErrorMessage(ERROR_MESSAGE_INVALID_INPUT);
      return false;
    }
    const [, x, y] = input.match(RegEx.position)!.map(Number);
    if (x < 0 || x > 4 || y < 0 || y > 4) {
      setErrorMessage(ERROR_MESSAGE_INVALID_X_Y_COORDINATES);
      return false;
    }

    setErrorMessage("");
    return true;
  };

  React.useEffect(() => {
    parseInput(position);
  }, [position]);

  const renderObject = (x: number, y: number, direction: string) => {
    const rotation = {
      NORTH: 0,
      EAST: 90,
      SOUTH: 180,
      WEST: 270,
    }[direction];

    return (
      <div
        style={{
          width: "30px",
          height: "30px",
          backgroundColor: "orange",
          transform: `rotate(${rotation}deg)`,
          position: "absolute",
          top: `${y * 8 + 20}px`, // Adjust as needed for centering
          left: `${x * 8 + 50}px`,
        }}
      />
    );
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {Array.from({ length: 5 }).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {Array.from({ length: 5 }).map((_, colIndex) => (
                <TableCell
                  key={colIndex}
                  style={{
                    position: "relative",
                    width: "30px",
                    height: "70px",
                    border: "1px solid black",
                    textAlign: "center",
                  }}
                >
                  {coordinates &&
                    rowIndex === coordinates.y &&
                    colIndex === coordinates.x &&
                    renderObject(
                      coordinates.x,
                      coordinates.y,
                      coordinates.direction
                    )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {errorMessage && (
        <Typography
          color="error"
          style={{ padding: "16px", textAlign: "center" }}
        >
          {errorMessage}
        </Typography>
      )}
    </TableContainer>
  );
};

export default GridComponent;
