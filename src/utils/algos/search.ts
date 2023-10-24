import { Move, PuzzleType, availableMoves, move } from "../puzzle";

export type SearchNode<TState, TTransition> = {
  pathToNode: Array<TTransition>;
  value: TState;
  steps: number;
  heuristik: () => number;
  isGoal: () => boolean;
  possibleTransitions: () => TTransition[];
  expandNode: () => SearchNode<TState, TTransition>[];
  equals: (other: SearchNode<TState, TTransition>) => boolean;
};

export class PuzzleSearchNode implements SearchNode<PuzzleType, Move> {
  constructor(
    public value: PuzzleType,
    public pathToNode: Array<Move>,
    public steps: number
  ) {}
  heuristik() {
    return this.steps;
  }
  isGoal() {
    const sortByIndex = this.value.toSorted((a, b) => a.index - b.index);
    const sortByValue = this.value.toSorted((a, b) => {
      if (a.value === null) {
        return 1;
      } else if (b.value === null) {
        return -1;
      } else {
        return a.value - b.value;
      }
    });

    for (let i = 0; i < this.value.length; i++) {
      if (sortByIndex[i].value !== sortByValue[i].value) {
        return false;
      }
    }
    return true;
  }

  transition(stateTransition: Move) {
    return move(this.value, stateTransition);
  }

  possibleTransitions() {
    return availableMoves(this.value);
  }

  expandNode() {
    return this.possibleTransitions().map(
      (move) =>
        new PuzzleSearchNode(
          this.transition(move),
          [...this.pathToNode, move],
          this.steps + 1
        )
    );
  }

  equals(other: SearchNode<PuzzleType, Move>) {
    const thisSorted = this.value.toSorted((o) => o.index);
    const otherSorted = other.value.toSorted((o) => o.index);

    for (let index = 0; index < thisSorted.length; index++) {
      if (thisSorted[index] != otherSorted[index]) {
        return false;
      }
    }
    return true;
  }
}

const astarsearch = <TState, TTransition>(
  initialState: SearchNode<TState, TTransition>
) => {
  let queue = [initialState];
  let visited: SearchNode<TState, TTransition>[] = [];
  do {
    // Knoten mit dem geringsten f-Wert aus der Open List entfernen

    const currentNode = queue.reduce((prev, current) => {
      if (current.heuristik() < prev.heuristik()) {
        return current;
      }
      return prev;
    }, queue[0]);

    const index = queue.indexOf(currentNode);
    queue = queue.filter((val, i) => i !== index);

    // Wurde das Ziel gefunden?
    if (currentNode.isGoal()) {
      return currentNode.pathToNode;
    }
    // Der aktuelle Knoten soll durch nachfolgende Funktionen
    // nicht weiter untersucht werden, damit keine Zyklen entstehen
    visited = [...visited, currentNode];
    // Wenn das Ziel noch nicht gefunden wurde: Nachfolgeknote(node)n
    // des aktuellen Knotens auf die Open List setzen

    const expandedNodes = currentNode
      .expandNode()
      .filter((node) => visited.every((v) => !v.equals(node)));
    queue = [...queue, ...expandedNodes];
    // die Open List ist leer, es existiert kein Pfad zum Ziel
  } while (queue.length > 0);
  return null;
};

export const promisedAstarSearch = async (value: PuzzleType) => {
  return new Promise<ReturnType<typeof astarsearch<PuzzleType, Move>>>(
    (res, rej) => {
      try {
        setTimeout(() => {
          const result = astarsearch(new PuzzleSearchNode(value, [], 0));
          res(result);
        }, 1);
      } catch (e) {
        rej(e);
      }
    }
  );
};
