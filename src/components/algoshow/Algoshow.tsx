"use client";
import React, { useState } from "react";
import SortAlgorithmListbox from "../ui/SortAlgorithmListbox";
import ArrayDisplay from "./array/ArrayDisplay";
import { SortAlgorithmType } from "../../utils/types";
import RandomIcon from "../ui/icons/RandomIcon";
import SortIcon from "../ui/icons/SortIcon";

const sleep = async (ms: number) =>
  await new Promise((res) => setTimeout(res, ms));

const CHANGE_OFFSET_MS = 20;

const Algoshow = () => {
  const shuffleArray = (array: Array<number>) => {
    return array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  };

  const [array, setArray] = useState(() =>
    Array.from({ length: 40 }, (_x, i) => i + 1)
  );
  const [horizontal, setHorizontal] = useState<"horizontal" | "vertical">(
    "vertical"
  );
  const [swapPair, setSwapPair] = useState<[number, number] | null>(null);

  const algos: { [key in SortAlgorithmType]: () => Promise<void> } = {
    selectionSort: async () => {
      for (let i = 0; i < array.length - 1; i++) {
        let minIdx = i;
        for (let j = minIdx; j < array.length; j++) {
          if (array[minIdx] > array[j]) {
            minIdx = j;
          }
        }
        if (i != minIdx) {
          const temp = array[i];
          array[i] = array[minIdx];
          array[minIdx] = temp;
          setSwapPair([i, minIdx]);
          setArray([...array]);
          await sleep(CHANGE_OFFSET_MS);
        }
        setSwapPair(null);
      }
    },
    insertionSort: async () => {
      for (let index = 1; index < array.length; index++) {
        const einzusortierenderWert = array[index];
        let j = index;
        //suche stellen wo einzusortieren
        while (j > 0 && einzusortierenderWert < array[j - 1]) {
          const temp = array[j];
          array[j] = array[j - 1];
          array[j - 1] = temp;
          setSwapPair([j, j - 1]);
          setArray([...array]);
          await sleep(CHANGE_OFFSET_MS);
          j--;
        }

        setSwapPair(null);
        array[j] = einzusortierenderWert;
        setArray([...array]);
        await sleep(CHANGE_OFFSET_MS);
      }

      setSwapPair(null);
    },
    bubbleSort: async () => {
      let swapped = true;
      for (let index = array.length; swapped; index--) {
        swapped = false;
        for (let j = 0; j < index - 1; j++) {
          if (array[j] > array[j + 1]) {
            swapped = true;
            const temp = array[j];
            array[j] = array[j + 1];
            array[j + 1] = temp;
            setArray([...array]);
            setSwapPair([j, j + 1]);
            await sleep(CHANGE_OFFSET_MS);
          }
        }
        setSwapPair(null);
      }
    },
  };
  const [algorithm, setAlgorithm] = useState<SortAlgorithmType>("bubbleSort");

  const [isShuffling, setIsShuffling] = useState(false);
  const [isSorting, setIsSorting] = useState(false);

  const shuffleAnimation = async () => {
    const newArray = shuffleArray(array);
    setIsShuffling(true);
    setArray(newArray);
    await sleep(1000);
    setIsShuffling(false);
  };
  const sortArray = async () => {
    setIsSorting(true);
    await algos[algorithm]();
    setIsSorting(false);
  };

  return (
    <>
      <div className="flex items-center p-4">
        <h1 className="text-xl md:text-4xl text-sky-500">
          Sort Algo Visualization
        </h1>
      </div>

      {/* container of form and display*/}
      <div className="flex flex-col md:flex-row gap-2 max-w-full">
        <div className="ring-1 ring-slate-950 p-4 flex flex-col gap-2 min-w-36">
          <div className="flex gap-4 items-center w-[50%]">
            <p className="text-slate-950 text-sm md:text-lg  ">Balken:</p>
            <SortAlgorithmListbox
              value={horizontal}
              setValue={setHorizontal}
              options={["horizontal", "vertical"]}
            ></SortAlgorithmListbox>
          </div>
          <div className="flex gap-4 items-center w-[50%]">
            <p className=" text-slate-950 text-sm md:text-lg justify-between ">
              Algorithmus:
            </p>
            <SortAlgorithmListbox
              options={["bubbleSort", "selectionSort", "insertionSort"]}
              value={algorithm}
              setValue={setAlgorithm}
            ></SortAlgorithmListbox>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              disabled={isShuffling || isSorting}
              onClick={shuffleAnimation}
              className="text-sm  md:text-md text-slate-950 bg-slate-50 ring-1 ring-slate-950 p-1 md:p-2 rounded-lg flex gap-2 items-center"
            >
              <RandomIcon
                className={`${
                  isShuffling ? "animate-spin" : ""
                } h-4 w-4  md:h-6 md:w-6 `}
              ></RandomIcon>
              Shuffle
            </button>
            <button
              onClick={sortArray}
              disabled={isShuffling || isSorting}
              className="text-sm md:text-md text-slate-950 bg-slate-50 ring-1 ring-slate-950 p-1 md:p-2 rounded-lg flex gap-2 items-center"
            >
              <SortIcon
                className={`${
                  isSorting ? "animate-bounce" : ""
                } h-4 w-4 md:h-6 md:w-6`}
              ></SortIcon>
              Sort
            </button>
          </div>
        </div>
        <ArrayDisplay
          isShuffling={isShuffling}
          swapPair={swapPair}
          horizontal={horizontal === "horizontal"}
          value={array}
        ></ArrayDisplay>
      </div>
    </>
  );
};

export default Algoshow;
