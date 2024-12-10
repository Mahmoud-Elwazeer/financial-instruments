import React from 'react';
import { Exchange } from '../types/exchange';
import { Building2, Globe, Coins, Briefcase } from 'lucide-react';

interface ExchangeListProps {
  exchanges: Exchange[];
  onExchangeSelect: (exchange: Exchange) => void;
  selectedExchange?: Exchange;
}

export const ExchangeList: React.FC<ExchangeListProps> = ({
  exchanges,
  onExchangeSelect,
  selectedExchange,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-y-auto max-h-[calc(100vh-12rem)]">
        {exchanges.map((exchange) => (
          <div
            key={exchange._id}
            onClick={() => onExchangeSelect(exchange)}
            className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
              selectedExchange?._id === exchange._id ? 'bg-blue-50' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-gray-900">{exchange.name}</h3>
                  <span className="text-sm text-gray-500">({exchange.symbol})</span>
                </div>
                <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Globe className="h-4 w-4" />
                    {exchange.country}
                  </div>
                  <div className="flex items-center gap-1">
                    <Coins className="h-4 w-4" />
                    {exchange.currency}
                  </div>
                  <div className="flex items-center gap-1">
                    <Building2 className="h-4 w-4" />
                    {exchange.nameExchange}
                  </div>
                  <div className="flex items-center gap-1">
                    <Briefcase className="h-4 w-4" />
                    {exchange.type}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};