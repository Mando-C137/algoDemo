"use client";
import ArrayDisplay from "@components/array/ArrayDisplay";
import { useState } from "react";

const sleep = async (ms: number) =>
  await new Promise((res) => setTimeout(res, ms));

export default function Home() {
  const shuffleArray = (array: Array<number>) => {
    return array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  };

  const [array, setArray] = useState(() =>
    shuffleArray(Array.from({ length: 70 }, (_x, i) => i + 1))
  );
  const [horizontal, setHorizontal] = useState(true);
  const [swapPair, setSwapPair] = useState<[number, number] | null>(null);

  const algos = {
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
          await sleep(20);
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
          await sleep(5);

          j--;
        }

        setSwapPair(null);
        await sleep(20);
        array[j] = einzusortierenderWert;
        setArray([...array]);
        await sleep(20);
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
            await sleep(5);
          }
        }
        setSwapPair(null);
      }
    },
  };
  const [selectedAlgorithm, setselectedAlgorithm] =
    useState<keyof typeof algos>("insertionSort");

  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-16">
      <div className="flex items-center p-4">
        <h1 className="text-xl text-sky-500">Sort Algo Visualization</h1>
      </div>

      <div className="flex flex-col md:flex-row">
        <div className="flex">
          <p>Anordnung der Balken:</p>
          <input
            type="radio"
            id="horizontal"
            name="horizontal"
            value="horizontal"
            checked={horizontal}
            onChange={() => setHorizontal(true)}
          />
            <label htmlFor="horizontal">Horizontal</label>
          <input
            type="radio"
            id="vertical"
            name="vertical"
            value="vertical"
            checked={!horizontal}
            onChange={() => setHorizontal(false)}
          />
            <label htmlFor="vertical">Vertikal</label>
          <button onClick={() => setArray(shuffleArray(array))}>Shuffle</button>
          <button onClick={() => algos[selectedAlgorithm]()}>Sort </button>
          <select
            value={selectedAlgorithm}
            onChange={(e) =>
              setselectedAlgorithm(e.target.value as keyof typeof algos)
            }
          >
            {Object.keys(algos).map((algo) => (
              <option key={algo} value={algo}>
                {algo}
              </option>
            ))}
          </select>
        </div>
        <div>
          <ArrayDisplay
            swapPair={swapPair}
            horizontal={horizontal}
            value={array}
          ></ArrayDisplay>
        </div>
      </div>
    </main>
  );
}
