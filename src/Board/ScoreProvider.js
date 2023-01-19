import { createContext, useContext, useReducer } from 'react';

const PairsContext = createContext(null);

export const PairsDispatchContext = createContext(null);

export function ScoreProvider({ children }) {
  const [pairs, dispatch] = useReducer(
    pairsReducer,
    initialPairs
  );

  return (
    <PairsContext.Provider value={pairs}>
      <PairsDispatchContext.Provider value={dispatch}>
        {children}
      </PairsDispatchContext.Provider>
    </PairsContext.Provider>
  );
}

export function usePairs() {
  return useContext(PairsContext);
}

export function usePairsDispatch() { 
  return useContext(PairsDispatchContext);
};

function pairsReducer(pairs, action) {
  switch (action.type) {
    case 'add': {
      return [...pairs, {...action.pair}];
    }
    case 'update': {
      const { pair } = action;
      return pairs.map(p => (p.id === pair.id) ? pair : p);
    }
    case 'finish': {
      return pairs.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}


const initialPairs = [
  { 
    id: 1, HomeTeam: {
      name: "Mexico", 
      goals: 0
    },
    AwayTeam: {
      name: "Canada", 
      goals: 5 
    },
    startTime: new Date("2023-01-11T14:48:00.000Z"),
    checked: false
  }, {
    id: 2, 
    HomeTeam: {
      name: "Spain", 
      goals: 10
    },
    AwayTeam: {
      name: "Brazil", 
      goals: 2 
    },
    startTime: new Date("2023-01-11T15:48:00.000Z"),
    checked: false
  }, {
    id: 3, 
    HomeTeam: {
      name: "Germany", 
      goals: 2
    },
    AwayTeam: {
      name: "France", 
      goals: 2 
    },
    startTime: new Date("2023-01-11T16:41:00.000Z"),
    checked: false
  }, {
    id: 4, 
    HomeTeam: {
      name: "Uruguay", 
      goals: 6
    },
    AwayTeam: {
      name: "Italy", 
      goals: 6 
    },
    startTime: new Date("2023-01-11T17:21:00.000Z"),
    checked: false
  }, {
    id: 5, 
    HomeTeam: {
      name: "Argentina", 
      goals: 3
    },
    AwayTeam: {
      name: "Australia", 
      goals: 1 
    },
    startTime: new Date("2023-01-11T17:15:00.000Z"),
    checked: false
  }
];

