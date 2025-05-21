import { useEffect, useState } from 'react';
import Header from './components/Header';
import GainsCard from './components/GainsCard';
import HoldingsTable from './components/HoldingsTable';
import { fetchCapitalGains, fetchHoldings } from './api/mockApi';
import type { CapitalGains, Holding, SelectedHoldings } from './types';
import { calculateSavings, calculateUpdatedGains } from './utils/calculations';
// import { calculateSavings, calculateTotalRealized, calculateUpdatedGains } from './utils/calculations';

function App() {
  // State for data
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [capitalGains, setCapitalGains] = useState<CapitalGains | null>(null);
  const [updatedGains, setUpdatedGains] = useState<CapitalGains | null>(null);
  const [selectedHoldings, setSelectedHoldings] = useState<SelectedHoldings>({});
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch both data sources concurrently
        const [holdingsData, gainsData] = await Promise.all([
          fetchHoldings(),
          fetchCapitalGains()
        ]);
        
        setHoldings(holdingsData);
        setCapitalGains(gainsData.capitalGains);
        setUpdatedGains(gainsData.capitalGains);
        
        // Initialize selected holdings (all unselected)
        const initialSelected: SelectedHoldings = {};
        holdingsData.forEach((holding: Holding) => {
          initialSelected[holding.coin] = false;
        });
        setSelectedHoldings(initialSelected);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Handle holding selection
  const handleSelectHolding = (coin: string, selected: boolean) => {
    setSelectedHoldings(prev => {
      const updated = { ...prev, [coin]: selected };
      
      // Calculate updated gains when selection changes
      if (capitalGains) {
        const newGains = calculateUpdatedGains(capitalGains, holdings, updated);
        setUpdatedGains(newGains);
      }
      
      return updated;
    });
  };

  // Calculate tax savings
  const savings = capitalGains && updatedGains 
    ? calculateSavings(capitalGains, updatedGains)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Header />
        
        {/* Loading skeleton for gains cards */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="bg-gray-200 animate-pulse rounded-xl h-80"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pre-Harvesting Card */}
            {capitalGains && (
              <GainsCard
                title="Before Harvesting"
                gains={capitalGains}
                variant="pre"
              />
            )}
            
            {/* Post-Harvesting Card */}
            {updatedGains && (
              <GainsCard
                title="After Harvesting"
                gains={updatedGains}
                savings={savings}
                variant="post"
              />
            )}
          </div>
        )}
        
        {/* Holdings Table */}
        <HoldingsTable
          holdings={holdings}
          selectedHoldings={selectedHoldings}
          onSelectHolding={handleSelectHolding}
          isLoading={loading}
        />
      </div>
    </div>
  );
}

export default App;