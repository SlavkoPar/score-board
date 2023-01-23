import { render, screen } from '@testing-library/react';
import App from './App';

test('renders result', () => {
  render(<App />);
  const linkElement = screen.getByText(/result/i);
  expect(linkElement).toBeInTheDocument();
});
