"use client";
import React, { useEffect, useId, useReducer, useState } from "react";
import {
  Move,
  PuzzleType,
  availableMoves as computeAllowedMoves,
  createPuzzle,
  move,
  randomizePuzzle,
} from "../../utils/puzzle";
import RandomIcon from "../../components/ui/icons/RandomIcon";
import {
  PuzzleSearchNode,
  promisedAstarSearch,
} from "../../utils/algos/search";

const GRID_LENGTH = 3.5;

const puzzleReducer: React.Reducer<
  PuzzleType,
  Move | { type: "shuffle"; iterations: number }
> = (puzzle, action) => {
  if (typeof action === "string") {
    return move(puzzle, action);
  }
  return randomizePuzzle(puzzle, action.iterations);
};

const Page = () => {
  const [puzzle, dispatchPuzzle] = useReducer(puzzleReducer, createPuzzle(3));
  const [loading, setLoading] = useState("Solve");
  const shufflePuzzle = () => {
    dispatchPuzzle({ iterations: 50, type: "shuffle" });
  };
  const solvePuzzle = async () => {
    setLoading("Solving...");

    const result = await promisedAstarSearch(puzzle);

    result && setLoading("Solved [" + result.join(", ") + "]");
    result == null && setLoading("No Solution");
  };
  //useEffect(() => {
  //}, [puzzle]);

  const allowedMoves = computeAllowedMoves(puzzle);
  return (
    <div className="flex flex-col items-center justify-center h-full font-medium gap-2">
      <Controls allowedMoves={allowedMoves} dispatch={dispatchPuzzle} />
      <button
        onClick={solvePuzzle}
        className="text-sm  md:text-md text-slate-950 bg-slate-50 ring-1 ring-slate-950 p-1 md:p-2 rounded-lg flex gap-2 items-center"
      >
        {loading}
      </button>
      <button
        onClick={shufflePuzzle}
        className="text-sm  md:text-md text-slate-950 bg-slate-50 ring-1 ring-slate-950 p-1 md:p-2 rounded-lg flex gap-2 items-center"
      >
        <RandomIcon className={`h-4 w-4  md:h-6 md:w-6 `}></RandomIcon>
        Shuffle
      </button>
      <Puzzle value={puzzle} />
    </div>
  );
};

type PuzzleProperties = {
  value: PuzzleType;
};
const Puzzle = ({ value }: PuzzleProperties) => {
  const square_length = Math.sqrt(value.length);
  return (
    <div
      className="border-t border-l border-blue-400 relative grid "
      style={{
        width: `${GRID_LENGTH * square_length}rem`,
        height: `${GRID_LENGTH * square_length}rem`,
        gridTemplateColumns: `repeat(${square_length}, minmax(0, 1fr))`,
      }}
    >
      {value.map((val) => (
        <div
          key={val.value}
          className="w-14 aspect-square border-r border-b border-blue-400"
        />
      ))}

      {value.map((val) => (
        <Tile key={val.value} val={val} square_length={square_length} />
      ))}
    </div>
  );
};

type ControlsProps = {
  allowedMoves: Array<Move>;
  dispatch: React.Dispatch<Move>;
};

const Controls = ({ allowedMoves, dispatch }: ControlsProps) => {
  const ControlButton = ({ move }: { move: Move }) => {
    return (
      <button
        className="capitalize text-sm md:text-md text-slate-950 bg-slate-50 ring-1 ring-slate-950 p-1 md:p-2 rounded-lg flex w-16 gap-2 items-center justify-center disabled:opacity-20"
        disabled={!allowedMoves.includes(move)}
        onClick={() => dispatch(move)}
      >
        {move}
      </button>
    );
  };

  return (
    <div className="">
      <div className="grid grid-cols-3 gap-1">
        <div className="col-start-2">
          <ControlButton move="up"></ControlButton>
        </div>
        <div className="col-start-1">
          <ControlButton move="left"></ControlButton>
        </div>
        <div>
          <ControlButton move="down"></ControlButton>
        </div>
        <div>
          <ControlButton move="right"></ControlButton>
        </div>
      </div>
    </div>
  );
};

type TileProps = {
  val: PuzzleType[number];
  square_length: number;
};

const Tile = ({ val, square_length }: TileProps) => {
  const style: React.CSSProperties = {
    transform: `translate(
            ${GRID_LENGTH * (val.index % square_length)}rem,
            ${GRID_LENGTH * Math.floor(val.index / square_length)}rem)`,
  };
  return (
    <div
      className={`w-14 aspect-square flex absolute items-center justify-center transition-transform duration-500 ease-linear`}
      style={style}
    >
      {val.value}
    </div>
  );
};

export default Page;
