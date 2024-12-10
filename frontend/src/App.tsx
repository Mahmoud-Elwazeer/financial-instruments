import React, { useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { getExchanges, getCandles } from './services/api';
import { Filters } from './components/Filters';
import { ExchangeList } from './components/ExchangeList';
import { CandleChart } from './components/CandleChart';
// import { CandleData } from './components/CandleData';
import { Exchange } from './types/exchange';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function ExchangePage() {
  const [filters, setFilters] = useState({});
  const [selectedExchange, setSelectedExchange] = useState<Exchange | null>(null);

  const { data: exchanges = [] } = useQuery({
    queryKey: ['exchanges', filters],
    queryFn: () => getExchanges(filters),
  });

  const { 
    data: candles = [], 
    isLoading: isCandlesLoading,
    isError: isCandlesError,
  } = useQuery({
    queryKey: ['candles', selectedExchange?.symbol],
    queryFn: () =>
      selectedExchange
        ? getCandles(selectedExchange.symbol)
        : Promise.resolve([]),
    enabled: !!selectedExchange,
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Financial Exchanges</h1>
        <Filters onFilterChange={setFilters} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <ExchangeList
              exchanges={exchanges}
              onExchangeSelect={setSelectedExchange}
              selectedExchange={selectedExchange || undefined}
            />
          </div>
          
          {selectedExchange && (
            <div className="space-y-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4">
                  {selectedExchange.name} ({selectedExchange.symbol}) - Candle Data
                </h2>
                <CandleChart 
                  data={candles} 
                  isLoading={isCandlesLoading}
                  isError={isCandlesError}
                />
              </div>
              {/* <div className="bg-white p-4 rounded-lg shadow-sm">
                <CandleData 
                  data={candles}
                  isLoading={isCandlesLoading}
                  isError={isCandlesError}
                />
              </div> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ExchangePage />
    </QueryClientProvider>
  );
}

export default App;