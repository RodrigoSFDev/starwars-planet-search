import { useContext, useState } from 'react';
import StarContext from '../context/StarContext';

export default function Table() {
  const { starsData } = useContext(StarContext);
  const [filterText, setFilterText] = useState('');
  const [filterColumn, setFilterColumn] = useState('population');
  const [filterComparison, setFilterComparison] = useState('maior que');
  const [filterValue, setFilterValue] = useState(0);
  const [aFilter, setAFilter] = useState(false);

  const filterStarName = starsData.filter((star) => star.name.toLowerCase()
    .includes(filterText.toLowerCase())).filter((star) => {
    if (!aFilter) return star;
    if (filterComparison === 'maior que') {
      return star[filterColumn] > Number(filterValue);
    }
    if (filterComparison === 'menor que') {
      return star[filterColumn] < Number(filterValue);
    }
    if (filterComparison === 'igual a') {
      return star[filterColumn] === filterValue;
    }
    return true;
  });

  /*   const outroFilter = filterStarName.filter((star) => {
    if (filterComparison === 'maior que') {
      return star[filterColumn] > Number(filterValue);
    }
    if (filterComparison === 'menor que') {
      return star[filterColumn] < Number(filterValue);
    }
    if (filterComparison === 'igual a') {
      return star[filterColumn] === Number(filterValue);
    }
    return true;
  });

  console.log('====================================');
  console.log(outroFilter);
  console.log('===================================='); */

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
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
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
          onClick={ () => setAFilter(true) }
        >
          Filtrar

        </button>
      </div>
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
          {filterStarName.map((star, index) => (
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
