import React, { useEffect } from "react";

type Props = {
  isShuffling: boolean;
  value: Array<number>;
  swapPair: [number, number] | null;
  horizontal: boolean;
};

const ArrayDisplay = ({ isShuffling, swapPair, horizontal, value }: Props) => {
  return (
    <div
      className={`flex ${
        horizontal ? "flex-col  " : "flex-row "
      } gap-[4px] flex-shrink-0 bg-slate-100 ring-1 ring-slate-700 min-w-[9rem]`}
    >
      {value.map((num, idx) => (
        <div
          key={idx}
          className={`ring-1 ring-slate-950  ${
            swapPair?.includes(idx) ? "bg-green-500" : "bg-white"
          }
            ${isShuffling ? "transition-all duration-1000" : "transition-none"}
          `}
          style={{
            height: horizontal ? "6px" : `${num * 3}px`,
            width: horizontal ? `${num * 3}px` : "6px",
          }}
        ></div>
      ))}
    </div>
  );
};

export default ArrayDisplay;
