import React from "react";

type Props = {
  value: Array<number>;
  swapPair: [number, number] | null;
  horizontal: boolean;
};

const ArrayDisplay = ({ swapPair, horizontal, value }: Props) => {
  return (
    <div
      className={`flex ${
        horizontal ? "flex-col" : "flex-row"
      } gap-[4px] flex-shrink-0 `}
    >
      {value.map((num, idx) => (
        <div
          key={idx}
          className={`${
            swapPair?.includes(idx) ? "bg-fuchsia-400" : "bg-blue-600"
          }`}
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
