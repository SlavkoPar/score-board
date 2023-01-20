import { usePairsDispatch } from './ScoreProvider.js';

export default function PairList({pairs}) {
  return (
    <table className="table table-responsive table-striped table-bordered table-hover table-sm">
      <thead>
        <tr>
          <th></th>
          <th>Id</th>
          <th>Home Team</th>
          <th>Away Team</th>
          <th colSpan={3} className='text-center'>Result</th>
        </tr>
      </thead>
      <tbody>
        {pairs && pairs.map(pair => (
          <Pair key={pair.id} pair={pair} />
        ))}
      </tbody>
    </table>
  );
}

function Pair({pair}) {
  const {id, HomeTeam, AwayTeam} = pair;
  const dispatch = usePairsDispatch();
  return (
    <tr>
      <td>
        <label>
          <input
            type="checkbox"
            checked={pair.checked}
            onChange={e => {
              dispatch({
                type: 'update',
                pair: {
                  ...pair,
                  checked: e.target.checked
                }
              });
            }}
          />
        </label>
      </td>
      <td>{id}</td>
      <td>{HomeTeam.name}</td>
      <td>{AwayTeam.name}</td>
      <td align='right'>{HomeTeam.goals}</td>
      <td align='center' width="20px">:</td> 
      <td align='left'>{AwayTeam.goals}</td>
    </tr>
  );
}
