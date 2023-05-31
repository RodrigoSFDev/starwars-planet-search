import { useContext } from 'react';
import StarContext from '../context/StarContext';

export default function Table() {
  const { starsData } = useContext(StarContext);

  return (
    <div>
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
          {starsData.map((star, index) => (
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
