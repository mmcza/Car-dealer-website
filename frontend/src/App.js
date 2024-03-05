import React, { useState, useEffect } from 'react';

function App() {
  const [cars, setCars] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [apiQuery, setApiQuery] = useState({});
  const [dropdownData, setDropdownData] = useState({});
  const [selectedValues, setSelectedValues] = useState({});

  // Function to fetch column data from the backend
  const fetchColumns = async () => {
    try {
      const response = await fetch('/api/columns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(apiQuery) // Pass apiQuery as parameters
      });
      const data = await response.json();
      setDropdownData(data);
    } catch (error) {
      console.error('Error fetching column data:', error);
    }
  };

  // Function to fetch cars from the backend
  const fetchCars = async () => {
    try {
      const response = await fetch('/api/cars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(apiQuery) // Pass apiQuery as parameters
      });
      const data = await response.json();
      setCars(data);
    } catch (error) {
      console.error('Error fetching cars data:', error);
    }
  };

  // Fetch columns and cars data when component mounts and when apiQuery changes
  useEffect(() => {
    fetchColumns();
    fetchCars();
  }, [apiQuery]);

  // Function to handle dropdown toggle
  const toggleDropdown = (param) => {
    setOpenDropdown(openDropdown === param ? null : param);
  };

  // Function to handle dropdown item selection and update apiQuery
  const handleDropdownItemSelect = (param, value) => {
    setSelectedValues(prevValues => ({ ...prevValues, [param]: value }));
    setApiQuery(prevQuery => ({ ...prevQuery, [param]: value }));
    setOpenDropdown(null); // Close the dropdown menu
  };

  // Function to handle reset dropdown item and update apiQuery
  const handleResetDropdown = (param) => {
    setSelectedValues(prevValues => ({ ...prevValues, [param]: null }));
    setApiQuery(prevQuery => {
      const updatedQuery = { ...prevQuery };
      delete updatedQuery[param];
      return updatedQuery;
    });
    setOpenDropdown(null); // Close the dropdown menu
  };

  return (
    <div className="container">
      <h1>Cars Data</h1>
      <div className="d-flex flex-wrap">
        {/* Render dropdown buttons for each parameter */}
        {Object.keys(dropdownData).map(param => (
          <div key={param} className="dropdown mr-2">
            <button
              className="btn btn-secondary dropdown-toggle"
              style={{ minWidth: '150px' }} // Set a fixed width for the buttons
              type="button"
              onClick={() => toggleDropdown(param)}
              aria-expanded={openDropdown === param ? "true" : "false"}
            >
              {selectedValues[param] || param}
            </button>
            <div className={`dropdown-menu ${openDropdown === param ? 'show' : ''}`}>
              {dropdownData[param] && Array.isArray(dropdownData[param]) && dropdownData[param].map(({ value, count }, index) => (
                <a key={index} className="dropdown-item d-flex justify-content-between" onClick={() => handleDropdownItemSelect(param, value)}>
                  {value}
                  <span className="badge badge-primary">{count}</span>
                </a>
              ))}
              {/* Add Reset option */}
              <hr className="dropdown-divider" />
              <a className="dropdown-item text-danger" onClick={() => handleResetDropdown(param)}>Reset</a>
            </div>
          </div>
        ))}
      </div>
      {/* Render the table */}
      <h2>Cars Table</h2>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            {/* Render table headers */}
            {cars.length > 0 && Object.keys(cars[0]).map(header => (
              <th key={header} className="red-header">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Render table rows and cells */}
          {cars.map((car, index) => (
            <tr key={index}>
              {Object.values(car).map((value, index) => (
                <td key={index}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
