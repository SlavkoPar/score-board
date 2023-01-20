
import { useContext } from 'React'
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import PairList from './PairList';
import { initialPairs, ScoreProvider, PairsContext } from './ScoreProvider.js';

test('renders result', async () => {

  const PairList2 = () => {
    const pairs = useContext(PairsContext);
    return <PairList pairs={pairs} />
  }

  render(
    <ScoreProvider>
      <PairList pairs={initialPairs} />
      <PairList2 />
    </ScoreProvider>
  );

  const user = userEvent.setup();

  const cb = screen.getAllByTestId('cb3')[0];
  await user.click(cb);
  
  expect(screen.getAllByTestId('cb3')[0]).not.toBeChecked();
  expect(screen.getAllByTestId('cb3')[1]).toBeChecked()
});
