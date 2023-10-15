"use client";
import React, { useEffect, useId, useReducer } from "react";
import {
  Move,
  PuzzleType,
  availableMoves as computeAllowedMoves,
  createPuzzle,
  move,
} from "../../utils/puzzle";

const GRID_LENGTH = 3.5;

const puzzleReducer: React.Reducer<PuzzleType, Move> = (puzzle, action) => {
  return move(puzzle, action);
};

const Page = () => {
  const [puzzle, dispatchPuzzle] = useReducer(puzzleReducer, createPuzzle(6));

  //useEffect(() => {
  //}, [puzzle]);

  const allowedMoves = computeAllowedMoves(puzzle);
  return (
    <div className="flex flex-col items-center justify-center h-full font-medium gap-2">
      <Controls allowedMoves={allowedMoves} dispatch={dispatchPuzzle} />
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
  return (
    <div className="">
      <div className="grid grid-cols-3 gap-1">
        <button
          className="text-sm md:text-md text-slate-950 bg-slate-50 ring-1 ring-slate-950 p-1 md:p-2 rounded-lg flex gap-2 items-center justify-center col-start-2 disabled:opacity-20"
          disabled={!allowedMoves.includes("up")}
          onClick={() => dispatch("up")}
        >
          Up
        </button>
        <button
          className="text-sm md:text-md text-slate-950 bg-slate-50 ring-1 ring-slate-950 p-1 md:p-2 rounded-lg flex gap-2 items-center justify-center col-start-1 disabled:opacity-20"
          disabled={!allowedMoves.includes("left")}
          onClick={() => dispatch("left")}
        >
          Left
        </button>
        <button
          className="text-sm md:text-md text-slate-950 bg-slate-50 ring-1 ring-slate-950 p-1 md:p-2 rounded-lg flex gap-2 items-center justify-center disabled:opacity-20"
          disabled={!allowedMoves.includes("down")}
          onClick={() => dispatch("down")}
        >
          Down
        </button>
        <button
          className="text-sm md:text-md text-slate-950 bg-slate-50 ring-1 ring-slate-950 p-1 md:p-2 rounded-lg flex gap-2 items-center justify-center disabled:opacity-20"
          disabled={!allowedMoves.includes("right")}
          onClick={() => dispatch("right")}
        >
          Right
        </button>
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
