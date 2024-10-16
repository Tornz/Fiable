import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";

type GridProps = {
  position: string;
};

const GridComponent: React.FC<GridProps> = ({ position }) => {
  const parseInput = (input: string) => {
    const regex = /^(\d),(\d) (NORTH|EAST|SOUTH|WEST)$/;
    const match = input.match(regex);
    if (match) {
      const x = parseInt(match[1]);
      const y = parseInt(match[2]);
      const direction = match[3];
      return { x, y, direction };
    }
    throw new Error("Invalid input format");
  };

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
          backgroundColor: "red",
          transform: `rotate(${rotation}deg)`,
          position: "absolute",
          top: `${y * 8 + 20}px`, // Adjust as needed for centering
          left: `${x * 8 + 50}px`,
        }}
      />
    );
  };

  const { x, y, direction } = parseInput(position);

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
                  {rowIndex === y &&
                    colIndex === x &&
                    renderObject(x, y, direction)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GridComponent;
