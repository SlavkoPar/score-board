import { useState } from 'react'
import { usePairs, usePairsDispatch } from './Board/ScoreProvider.js';
import PairList from './Board/PairList'

export default function App() {

  /*
  const ws = new WebSocket("wss://ws.bitstamp.net");

  const apiCall = {
    event: "bts:subscribe",
    data: { channel: "order_book_btcusd" },
  };

  ws.onopen = (event) => {
    ws.send(JSON.stringify(apiCall));
  };

  ws.onmessage = function (event) {
    const json = JSON.parse(event.data);
    try {
      if ((json.event = "data")) {
        setBids(json.data.bids.slice(0, 5));
      }
    } catch (err) {
      console.log(err);
    }
  };
  */

  const pairs = usePairs()
  const dispatch = usePairsDispatch();
  const [id, setId] = useState(pairs.length + 1);
  const [summary, setSummary] = useState([]);
  const [showSummary, setShowSummary] = useState(false);

  function addPair() {
    const pair = {
      id,
      HomeTeam: {
        name: "Morocco",
        goals: 0
      },
      AwayTeam: {
        name: "Katar",
        goals: 0
      },
      startTime: new Date("2023-01-11T14:48:00.000Z"),
      checked: false
    };
    dispatch({ type: 'add', pair });
    setId(id + 1)
  }

  function updateScore() {
    // we assume index randomly
    const index = Math.floor(Math.random() * pairs.length)
    console.log(pairs.length, index)
    const id = pairs[index].id;
    const pair = pairs.find(p => p.id === id);
    if (pair.HomeTeam.goals === 4 && pair.AwayTeam.goals === 1) {
      pair.HomeTeam.goals = 2;
      pair.AwayTeam.goals = 5;
    }
    else {
      pair.HomeTeam.goals = 4;
      pair.AwayTeam.goals = 1;
    }
    dispatch({ type: 'update', pair });
  }

  function finishGame() {
    // we assume index randomly
    const index = Math.floor(Math.random() * pairs.length)
    console.log(pairs.length, index)
    const id = pairs[index].id;
    const pair = pairs.find(p => p.id === id);
    dispatch({ type: 'finish', id: pair.id });
  }

  function getSummary() {
    // we assume index randomly
    setShowSummary(true);
    const res = [...pairs].sort((a, b) => {
      if (a.HomeTeam.goals + a.AwayTeam.goals < b.HomeTeam.goals + b.AwayTeam.goals)
        return 1;
      if (a.HomeTeam.goals + a.AwayTeam.goals > b.HomeTeam.goals + b.AwayTeam.goals)
        return -1;
      if (a.startTime < b.startTime)
        return 1;
      if (a.startTime > b.startTime)
        return -1;
      return 0;
    })
    setSummary(res)
  }

  return (
    <div>
      <h2>Football World Cup Score Board</h2>
      <PairList pairs={pairs} />
      <button onClick={addPair}>Simulate new game</button>
      {pairs.length > 0 &&
        <button className="ms-2" onClick={updateScore}>Simulate Update Score</button>
      }
      {pairs.length > 0 &&
        <button className="ms-2" onClick={finishGame}>Simulate Finish game</button>
      }
      <button className="ms-2" onClick={getSummary}>Summary by total score</button>

      {showSummary &&
        <PairList pairs={summary} />
      }
    </div >
  )
}