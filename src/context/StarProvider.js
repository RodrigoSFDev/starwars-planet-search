import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarContext from './StarContext';

export default function StarProvider({ children }) {
  const [starsData, setStarsData] = useState([]);

  useEffect(() => {
    const fetchStars = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const data = await response.json();
      const { results } = data;
      const newResults = results.filter((result) => delete result.residents);
      setStarsData(newResults);
    };
    fetchStars();
  }, []);
  console.log('====================================');
  console.log(starsData);
  console.log('====================================');
  return (
    <StarContext.Provider value={ { starsData } }>
      <div>
        {children}
      </div>
    </StarContext.Provider>
  );
}

StarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
