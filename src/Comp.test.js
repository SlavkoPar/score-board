import * as React from 'react';
import { render, screen } from '@testing-library/react';

import Comp from './Comp';

describe('Comp', () => {
  it('renders App component', () => {
    render(<Comp />);

    // eslint-disable-next-line testing-library/no-debugging-utils
    screen.debug();
    expect(screen.getByText('Search:')).toBeInTheDocument();

    screen.getByRole('textbox');
  });
});