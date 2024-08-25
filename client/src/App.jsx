import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  useEffect(() => {
    document.title = "21BCE10286";
  }, []);

  const [input, setInput] = useState('{"data":["M","1","334","4","B"]}');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState(['Numbers']);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSubmit = async () => {
    setError('');
    try {
      const jsonInput = JSON.parse(input);
      const result = await axios.post('https://bajaj-taskround21bce10286.onrender.com/bfhl', jsonInput, {
        headers: { 'Content-Type': 'application/json' }
      });
      setResponse(result.data);
    } catch (err) {
      setError('Invalid JSON or API error');
      console.error(err);
    }
  };

  const filterResponse = () => {
    if (!response) return '';
    let filtered = '';
    if (filters.includes('Numbers') && response.numbers && response.numbers.length > 0)
      filtered += `Numbers: ${response.numbers.join(',')}\n`;
    if (filters.includes('Alphabets') && response.alphabets && response.alphabets.length > 0)
      filtered += `Alphabets: ${response.alphabets.join(',')}\n`;
    if (filters.includes('Highest alphabet') && response.highest_alphabet)
      filtered += `Highest alphabet: ${response.highest_alphabet}\n`;
    return filtered || 'No data available for the selected filter';
  };

  const toggleFilter = (filter) => {
    setFilters(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
    setIsDropdownOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='API Input'
        />
      </div>
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800"
      >
        Submit
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {response && (
        <div className="mt-4">
          <div className="relative inline-block w-64">
            <div
              className="flex items-center justify-between w-full p-2 border border-gray-300 rounded cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>Multi Filter</span>
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
            {isDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg">
                {['Numbers', 'Alphabets', 'Highest alphabet'].map(filter => (
                  <div
                    key={filter}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => toggleFilter(filter) && !isDropdownOpen}

                  >
                    {filter}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {filters.map(filter => (
              <div key={filter} className="flex items-center bg-gray-200 rounded-full px-3 py-1 text-sm">
                {filter}
                <button
                  onClick={() => toggleFilter(filter)}
                  className="ml-2 focus:outline-none"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <h2 className="text-lg font-semibold">Filtered Response</h2>
            <pre className="bg-gray-100 p-2 rounded mt-2">{filterResponse()}</pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;