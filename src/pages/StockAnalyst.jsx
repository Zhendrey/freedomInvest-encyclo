import { useState, useEffect } from 'react';
import '../css/style.css';

export default function StockAnalyst() {
  const [stocks, setStocks] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStocks, setSelectedStocks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // TODO: Fetch stocks and analyst recommendations data
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAnalyze = async () => {
    try {
      // TODO: Implement analysis logic for selected stocks
      console.log('Analyzing stocks:', selectedStocks);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div className="container loading">Loading analyst data...</div>;
  }

  if (error) {
    return <div className="container error">Error: {error}</div>;
  }

  return (
    <div className="stock-analyst-page">
      <div className="page-header">
        <h1>Stock Analyst</h1>
        <p>Compare stocks and get analysis recommendations</p>
      </div>

      <div className="analyst-controls">
        <div className="stock-selector">
          <h2>Select Stocks to Analyze</h2>
          <div className="stock-checkboxes">
            {stocks.map((stock) => (
              <label key={stock.symbol} className="stock-checkbox">
                <input
                  type="checkbox"
                  checked={selectedStocks.includes(stock.symbol)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedStocks([...selectedStocks, stock.symbol]);
                    } else {
                      setSelectedStocks(
                        selectedStocks.filter((s) => s !== stock.symbol)
                      );
                    }
                  }}
                />
                <span>{stock.symbol} - {stock.name}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          className="btn btn-primary analyze-btn"
          onClick={handleAnalyze}
          disabled={selectedStocks.length === 0}
        >
          Analyze Selected Stocks
        </button>
      </div>

      {analysis && (
        <div className="analysis-results">
          <h2>Analysis Results</h2>

          <div className="analysis-summary">
            {/* TODO: Display analysis summary */}
            <div className="summary-card">
              <h3>Top Performer</h3>
              <p>-</p>
            </div>
            <div className="summary-card">
              <h3>Best Value</h3>
              <p>-</p>
            </div>
            <div className="summary-card">
              <h3>Highest Dividend</h3>
              <p>-</p>
            </div>
          </div>

          <div className="detailed-analysis">
            <h3>Detailed Comparison</h3>
            {/* TODO: Add detailed comparison table/chart */}
            <table>
              <thead>
                <tr>
                  <th>Symbol</th>
                  <th>Price</th>
                  <th>Market Cap</th>
                  <th>P/E Ratio</th>
                  <th>Dividend Yield</th>
                  <th>Rating</th>
                </tr>
              </thead>
              <tbody>
                {selectedStocks.map((symbol) => (
                  <tr key={symbol}>
                    <td>{symbol}</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="analyst-recommendations">
            <h3>Recommendations</h3>
            {/* TODO: Add analyst recommendations */}
            <div className="recommendations-list">
              <p>Analysis recommendations will appear here</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
