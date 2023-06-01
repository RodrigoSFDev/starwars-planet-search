import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { StarContext } from '../context/StarContext'; 
import StarProvider from '../context/StarProvider';
import Table from '../pages/Table';
import App from '../App';
import testData from '../../cypress/mocks/testData';
import userEvent from '@testing-library/user-event';

describe('Teste Aplicação 30%', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => (testData),
    });
  });
  it('Teste se a page faz uma requisição a API e renderiza uma tabela', async () => {
    render(
      <StarProvider> 
      <App />
    </StarProvider>
    )
    // teste de requisisão a API
    expect(fetch).toBeCalledTimes(1);
    const loading = screen.getByText(/Carregando.../i)
    expect(loading).toBeInTheDocument()
    await waitForElementToBeRemoved(() => screen.queryByText(/Carregando.../i));
    //inputs e button  
    screen.getByRole('textbox')

    const columnSelect = screen.getByTestId('column-filter');
    const column = columnSelect.value;
    expect(column).toBe('population');
  
    const comparisonSelect = screen.getByTestId('comparison-filter');
    const value = comparisonSelect.value;
    expect(value).toBe('maior que');

    screen.getByRole('spinbutton')
    screen.getByRole('button', {  name: /filter/i})
    // reader da table
    screen.getByRole('columnheader', {  name: /name/i})
    screen.getByRole('columnheader', {  name: /rotation_period/i})
    screen.getByRole('columnheader', {  name: /orbital_period/i})
    screen.getByRole('columnheader', {  name: /diameter/i})
    screen.getByRole('columnheader', {  name: /climate/i})
    screen.getByRole('columnheader', {  name: /gravity/i})
    screen.getByRole('columnheader', {  name: /terrain/i})
    screen.getByRole('columnheader', {  name: /surface_water/i})
    screen.getByRole('columnheader', {  name: /population/i})
    screen.getByRole('columnheader', {  name: /films/i})
    screen.getByRole('columnheader', {  name: /created/i})
    screen.getByRole('columnheader', {  name: /edited/i})
    // celulas da table
    screen.getByRole('cell', {  name: /tatooine/i})
    screen.getByRole('columnheader', {  name: /rotation_period/i})
    
  });
  it('teste se é possivel filtar a tabela', async () => {
    render(
      <StarProvider> 
      <App />
    </StarProvider>
    )
    const loading = screen.getByText(/Carregando.../i)
    expect(loading).toBeInTheDocument()
    await waitForElementToBeRemoved(() => screen.queryByText(/Carregando.../i));

        //inputs 
        const filterByName = screen.getByRole('textbox')

        userEvent.type(filterByName, 'h');
        screen.getByRole('cell', {  name: /hoth/i})
        screen.getByRole('cell', {  name: /549/i})
        screen.getByRole('cell', {  name: /7200/i})
        screen.getByRole('cell', {  name: /frozen/i})
        screen.getByRole('cell', {  name: /1\.1 standard/i})

        screen.getByRole('cell', {  name: /dagobah/i})
        screen.getByRole('cell', {  name: /341/i})
        screen.getByRole('cell', {  name: /8900/i})
        screen.getByRole('cell', {  name: /murky/i})
        screen.getByRole('cell', {  name: /n\/a/i})
  })
  it('teste se é possivel aplicar um filtro na tabela menor que', async () => {
    render(
      <StarProvider> 
      <App />
    </StarProvider>
    )
    const loading = screen.getByText(/Carregando.../i)
    expect(loading).toBeInTheDocument()
    await waitForElementToBeRemoved(() => screen.queryByText(/Carregando.../i));
    //inputs e button
    const columnSelect = screen.getByTestId('column-filter');
        const column = columnSelect.value;
        expect(column).toBe('population');
      
        const comparisonSelect = screen.getByTestId('comparison-filter');
        const value = comparisonSelect.value;
        expect(value).toBe('maior que');
    
        const size = screen.getByRole('spinbutton');
        const btn = screen.getByRole('button', {  name: /filter/i});
        userEvent.selectOptions(columnSelect, 'population');
        userEvent.selectOptions(comparisonSelect, 'menor que');
        userEvent.type(size, '8000');
        userEvent.click(btn)
        screen.getByRole('cell', {  name: /yavin iv/i})
        screen.getByRole('cell', {  name: /24/i})
        screen.getByRole('cell', {  name: /4818/i})
        screen.getByRole('cell', {  name: /10200/i})
        screen.getByRole('cell', {  name: /temperate, tropical/i})
  })
  it('teste se é possivel aplicar um filtro na tabela, maior que', async () => {
    render(
      <StarProvider> 
      <App />
    </StarProvider>
    )
    const loading = screen.getByText(/Carregando.../i)
    expect(loading).toBeInTheDocument()
    await waitForElementToBeRemoved(() => screen.queryByText(/Carregando.../i));
    //inputs e button
    const columnSelect = screen.getByTestId('column-filter');
        const column = columnSelect.value;
        expect(column).toBe('population');
      
        const comparisonSelect = screen.getByTestId('comparison-filter');
        const value = comparisonSelect.value;
        expect(value).toBe('maior que');
    
        const size = screen.getByRole('spinbutton');
        const btn = screen.getByRole('button', {  name: /filter/i});
        userEvent.selectOptions(columnSelect, 'diameter');
        userEvent.selectOptions(comparisonSelect, 'maior que');
        userEvent.type(size, '12500');
        userEvent.click(btn)
        screen.getByRole('cell', {  name: /bespin/i})
        screen.getByRole('cell', {  name: /118000/i})

        screen.getByRole('cell', {  name: /kamino/i})
        screen.getByRole('cell', {  name: /19720/i})
  })
  it('teste se é possivel aplicar um filtro na tabela de diametro e removelo no botão remover todos os filtros', async () => {
    render(
      <StarProvider> 
      <App />
    </StarProvider>
    )
    const loading = screen.getByText(/Carregando.../i)
    expect(loading).toBeInTheDocument()
    await waitForElementToBeRemoved(() => screen.queryByText(/Carregando.../i));
    //inputs e button
    const columnSelect = screen.getByTestId('column-filter');
        const column = columnSelect.value;
        expect(column).toBe('population');
      
        const comparisonSelect = screen.getByTestId('comparison-filter');
        const value = comparisonSelect.value;
        expect(value).toBe('maior que');
    
        const size = screen.getByRole('spinbutton');
        const btn = screen.getByRole('button', {  name: /filter/i});
        userEvent.selectOptions(columnSelect, 'diameter');
        userEvent.selectOptions(comparisonSelect, 'maior que');
        userEvent.type(size, '12500');
        userEvent.click(btn)
        screen.getByRole('cell', {  name: /bespin/i})
        screen.getByRole('cell', {  name: /118000/i})
      //lista de filtro
        const filter = screen.getByRole('button', {  name: /x/i})
        const btnRemoreAllFilter = screen.getByRole('button', {  name: /remover filtros/i})
        expect(filter).toBeInTheDocument();
        userEvent.click(btnRemoreAllFilter);
        expect(filter).not.toBeInTheDocument();
        screen.getByRole('cell', {  name: /tatooine/i})
  })
})
