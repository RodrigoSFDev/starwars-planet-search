import { useContext, useState } from 'react';
import StarContext from '../context/StarContext';

export default function Table() {
  const { starsData } = useContext(StarContext);
  const [filterText, setFilterText] = useState('');
  const [optionsColumn, setOptionsColumn] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const [filterColumn, setFilterColumn] = useState(optionsColumn[0]);
  const [filterComparison, setFilterComparison] = useState('maior que');
  const [filterValue, setFilterValue] = useState(0);
  const [listFilter, setListFilter] = useState([]);

  const applyFilters = () => {
    let filteredData = starsData.filter((star) => star.name.toLowerCase()
      .includes(filterText.toLowerCase()));

    listFilter.forEach((filter) => {
      const { column, comparison, value } = filter;

      filteredData = filteredData.filter((star) => {
        switch (comparison) {
        case 'maior que':
          return +star[column] > +value;
        case 'menor que':
          return +star[column] < +value;
        case 'igual a':
          return +star[column] === +value;
        default:
          return true;
        }
      });
    });

    return filteredData;
  };

  const handleFilterClick = () => {
    const newFilter = {
      column: filterColumn,
      comparison: filterComparison,
      value: filterValue,
    };
    setListFilter((prevFilters) => [...prevFilters, newFilter]);
    setOptionsColumn(optionsColumn.filter((option) => option !== filterColumn));
    setFilterColumn(optionsColumn[0]);
    setFilterComparison('maior que');
    setFilterValue(0);
  };

  const handleFilterRemove = (index) => {
    setListFilter((prevFilters) => {
      const newFilters = [...prevFilters];
      newFilters.splice(index, 1);
      return newFilters;
    });
  };
  const handleRemoveAll = () => {
    setListFilter([]);
    setOptionsColumn([
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ]);
  };

  const filteredData = applyFilters();

  return (
    <div>
      <input
        type="text"
        name="filterStar"
        data-testid="name-filter"
        value={ filterText }
        onChange={ (e) => setFilterText(e.target.value) }
        placeholder="Digite o nome do planeta"
      />
      <div>
        <select
          name="filterColumn"
          value={ filterColumn }
          data-testid="column-filter"
          onChange={ (e) => setFilterColumn(e.target.value) }
        >
          {optionsColumn.map((option, index) => (
            <option
              key={ index }
              id={ index }
              value={ option }
            >
              {option}
            </option>
          ))}
        </select>
        <select
          value={ filterComparison }
          name="filterComparison"
          onChange={ (e) => setFilterComparison(e.target.value) }
          data-testid="comparison-filter"
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          type="number"
          value={ filterValue }
          onChange={ (e) => setFilterValue(e.target.value) }
          data-testid="value-filter"
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleFilterClick }
        >
          Filtrar

        </button>
      </div>
      {listFilter.map((filter, index) => (
        <div data-testid="filter" key={ index }>
          <p>
            {filter.column}
            {' '}
            {filter.comparison}
            {' '}
            {filter.value}
          </p>
          <button
            onClick={ () => handleFilterRemove(index) }
          >
            x

          </button>
        </div>
      ))}
      <button
        data-testid="button-remove-filters"
        onClick={ handleRemoveAll }
      >
        Remover

      </button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation_period</th>
            <th>Orbital_period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface_water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((star, index) => (
            <tr key={ index }>
              <td>{star.name}</td>
              <td>{star.rotation_period}</td>
              <td>{star.orbital_period}</td>
              <td>{star.diameter}</td>
              <td>{star.climate}</td>
              <td>{star.gravity}</td>
              <td>{star.terrain}</td>
              <td>{star.surface_water}</td>
              <td>{star.population}</td>
              <td>{star.films}</td>
              <td>{star.created}</td>
              <td>{star.edited}</td>
              <td>{star.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
