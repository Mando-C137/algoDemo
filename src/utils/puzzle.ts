export type PuzzleType = Array<{ value: number | null; index: number }>;
export type Move = "up" | "right" | "left" | "down";

export const availableMoves = function (value: PuzzleType): Array<Move> {
  const result: Array<Move> = [];
  const square_length = Math.sqrt(value.length);
  const idx = value.find((ele) => ele.value === null)!.index;

  const x = idx % square_length;
  const y = Math.floor(idx / square_length);

  if (x != 0) {
    result.push("left");
  }
  if (x != square_length - 1) {
    result.push("right");
  }
  if (y != 0) {
    result.push("up");
  }
  if (y != square_length - 1) {
    result.push("down");
  }

  return result;
};

export const move = (value: PuzzleType, move: Move): PuzzleType => {
  const square_length = Math.sqrt(value.length);
  const idx = value.find((ele) => ele.value === null)!.index;
  switch (move) {
    case "up":
      return swap(value, [idx, idx - square_length]);
    case "right":
      return swap(value, [idx, idx + 1]);
    case "left":
      return swap(value, [idx, idx - 1]);
    case "down":
      return swap(value, [idx, idx + square_length]);
  }
};

const swap = (value: PuzzleType, swapIdxes: [number, number]): PuzzleType => {
  const first = value.find((ele) => ele.index === swapIdxes[0])!;
  const second = value.find((ele) => ele.index === swapIdxes[1])!;

  return value.map((ele) => {
    if (ele.index != first.index && ele.index != second.index) {
      return ele;
    } else if (ele.index === first.index) {
      return {
        ...ele,
        index: second.index,
      };
    } else {
      return {
        ...ele,
        index: first.index,
      };
    }
  });
};

export const createPuzzle = (length: 2 | 3 | 4 | 5 | 6 | 7 | 8): PuzzleType => {
  const size = Math.pow(length, 2);
  return Array.from({ length: size }).map((_val, index) => ({
    index: index,
    value: index + 1 === size ? null : index + 1,
  }));
};

export const randomizePuzzle = (value: PuzzleType, iterations: number = 30) => {
  let temp = value;
  for (let i = 0; i < iterations; i++) {
    const moves = availableMoves(temp);

    temp = move(temp, moves[Math.floor(Math.random() * moves.length)]);
  }
  return temp;
};
