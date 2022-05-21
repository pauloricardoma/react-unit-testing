import { render, waitFor, screen, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import List from './List'

describe('List Component', () => {
  it('should render list items', () => {
    const { getByText, rerender, queryByText } = render(<List initialItems={['Diego', 'Rodz', 'Mayk']} />);

    expect(getByText('Diego')).toBeInTheDocument();
    expect(getByText('Rodz')).toBeInTheDocument();
    expect(getByText('Mayk')).toBeInTheDocument();
    
    rerender(<List initialItems={['Julia']} />);

    expect(screen.getByText('Julia')).toBeInTheDocument();
    expect(screen.queryByText('Mayk')).not.toBeInTheDocument();
  });

  it('should be able to add new item to the list', async () => {
    const { getByText, getByPlaceholderText, findByText, debug } = render(<List initialItems={[]} />);

    const inputElement = getByPlaceholderText('Novo item');
    const addButton = getByText('Adicionar');

    // debug(); -> mostra o código, o HTML antes do event
    
    await userEvent.type(inputElement, 'Novo')
    await userEvent.click(addButton);
    
    // debug(); -> mostra o código, o HTML depois do event

    // pode ser feito de outra forma
    // expect(await findByText('Novo')).toBeInTheDocument();
    await waitFor(() => {
      expect(getByText('Novo')).toBeInTheDocument();
    });
  });

  it('should be able to add new item to the list', async () => {
    const { queryByText, getAllByText } = render(<List initialItems={['Diego']} />);

    const removeButtons = getAllByText('Remover');
    
    await userEvent.click(removeButtons[0]);
    
    // pode ser feito de outra forma
    // await waitForElementToBeRemoved(() => {
    //   return getByText('Diego');
    // });
    await waitFor(() => {
      expect(queryByText('Diego')).not.toBeInTheDocument();
    });
  })
});