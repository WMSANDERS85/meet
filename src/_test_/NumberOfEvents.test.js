import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';
import {render, screen} from '@testing-library/react';

const renderWithProps = (props = {}) => {
  const defaultProps = {
    setCurrentNoe: () => {},
  };
  return render(<NumberOfEvents {...defaultProps} {...props} />);
};

describe('<NumberOfEvents /> component', () => {
  test('render text input', () => {
    renderWithProps();
    const input = screen.queryByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  test(`default number of events is 32`, () => {
    renderWithProps();
    const input = screen.queryByRole('textbox');
    expect(input.value).toBe('32');
  });

  test('change number of events', async () => {
    renderWithProps();
    const input = screen.queryByRole('textbox');
    await userEvent.type(input, `{backspace}{backspace} 10`);
    expect(input.value.trim()).toBe('10');
  });
});
