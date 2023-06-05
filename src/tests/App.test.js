import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import StarProvider from '../context/StarProvider';
import App from '../App';
import testData from '../../cypress/mocks/testData';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';


describe('Teste Aplicação 30%', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData),
    });

    render(
      <StarProvider> 
      <App />
    </StarProvider>
    );
    });

    afterEach(() => {
      jest.restoreAllMocks();
  });
  it('teste se renderiza os input e buttons na tela', async () => {

    await waitFor(()=>  screen.getByRole('button', {name: /filtrar/i}), {timeout: 4000})
    expect(fetch).toHaveBeenCalled();
    screen.getByRole('textbox');
    screen.getAllByRole('combobox')[0];
    screen.getAllByRole('combobox')[1];
    screen.getByRole('spinbutton');
    screen.getByRole('button', {name: /remover filtros/i})


  })
  it('teste renderização da tabela', async () => {
    
    await waitFor(()=>  screen.getByText(/Hoth/i),{timeout:4000});
/*     delete testData.results[0].residents;
    const table = screen.getByRole('table');
    const header = screen.getAllByRole('columnheader', { container: table });
    
    expect(header).toHaveLength(13);
    
    Object.keys(testData.results[0]).forEach((key, index) => {
      expect(header[index].textContent).toBe(key);
      esse é outro modo de fazer o mesmo que o de baixo, só que de forma dinamica.
    }) */
    
    screen.getByRole('columnheader', { name: /name/i });
    screen.getByRole('columnheader', { name: /rotation_period/i });
    screen.getByRole('columnheader', { name: /orbital_period/i });
    screen.getByRole('columnheader', { name: /diameter/i });
    screen.getByRole('columnheader', { name: /climate/i });
    screen.getByRole('columnheader', { name: /gravity/i });
    screen.getByRole('columnheader', { name: /terrain/i });
    screen.getByRole('columnheader', { name: /surface_water/i });
    screen.getByRole('columnheader', { name: /population/i });
    screen.getByRole('columnheader', { name: /films/i });
    screen.getByRole('columnheader', { name: /created/i });
    screen.getByRole('columnheader', { name: /edited/i });

    const rows = screen.getAllByRole('row')
    expect(rows).toHaveLength(11);
    screen.getByText(/Tatooine/i);
    screen.getByText(/Yavin IV/i);
    screen.getByText(/Naboo/i);
    screen.getByText(/26/i);
    screen.getByText(/118000/i);
    screen.getByText(/frozen/i);
    screen.getByText(/gas giant/i);
    

  });
  it('teste de filtros', async () => {
    await waitFor(() => screen.getByText(/Hoth/i),{timeout:5000});
  
    
    screen.getByText(/Hoth/i);
    screen.getByText(/Bespin/i);
    screen.getByText(/Endor/i);
    const inputText = screen.getByRole('textbox');
    
    act(() => {
      userEvent.type(inputText, 'Endor')
    });
    screen.getByText(/Endor/i)
  expect(screen.queryByText(/hoth/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/bespin/i)).not.toBeInTheDocument();
    act(() => {
      userEvent.clear(inputText);
    })
    const rows = screen.getAllByRole('row')
    expect(rows).toHaveLength(11);

  const filterColumn = screen.getAllByRole('combobox')[0];
  const comparison = screen.getAllByRole('combobox')[1];
  const spinValue = screen.getByRole('spinbutton');
  const btn = screen.getByRole('button', {name: /filtrar/i})

  act(() => {
    userEvent.selectOptions(filterColumn, 'population');
  })
  act(() => {
    userEvent.selectOptions(comparison, 'maior que');
  })
  act(() => {
    userEvent.type(spinValue, '200000');
  })
  act(() => {
    userEvent.click(btn);
  })

  screen.getByText(/Endor/i)
  screen.getByText(/Bespin/i)
  expect(screen.queryByText(/hoth/i)).not.toBeInTheDocument();

  act(() => {
    userEvent.selectOptions(filterColumn, 'orbital_period');
  })
  act(() => {
    userEvent.selectOptions(comparison, 'menor que');
  })
  act(() => {
    userEvent.type(spinValue, '500');
  })
  act(() => {
    userEvent.click(btn);
  })
  screen.getByText(/Endor/i)
  expect(screen.queryByText(/Bespin/i)).not.toBeInTheDocument();

  act(() => {
    userEvent.selectOptions(filterColumn, 'diameter');
  })
  act(() => {
    userEvent.selectOptions(comparison, 'igual a');
  })
  act(() => {
    userEvent.type(spinValue, '4900');
  })
  act(() => {
    userEvent.click(btn);
  })

  screen.getByText(/Endor/i)
  expect(screen.queryByText(/Bespin/i)).not.toBeInTheDocument();

  const [,,btnX] = screen.getAllByRole('button', {name: /x/i})

  act(() => {
    userEvent.click(btnX);
  })
  screen.getByText(/Endor/i)
  screen.getByText(/Coruscant/i)
  screen.getByText(/Kamino/i)
  expect(screen.queryByText(/Bespin/i)).not.toBeInTheDocument();

  const removeAllFilter = screen.getByRole('button', {name: /remover filtros/i})

  act(() => {
    userEvent.click(removeAllFilter);
  })

  const rows2 = screen.getAllByRole('row')
  expect(rows2).toHaveLength(11);
  screen.getByText(/Endor/i)
  screen.getByText(/Coruscant/i)
  screen.getByText(/Kamino/i)
  })


})
