import axios from 'axios';
import { Exchange, Candle } from '../types/exchange';
import { ApiResponse, PaginatedResponse } from '../types/api';

const api = axios.create({
  baseURL: 'http://51.20.89.154/api/v1'
});

export const getExchanges = async (filters: {
  type?: string;
  country?: string;
  currency?: string;
}) => {
  const { data } = await api.get<ApiResponse<{ pagination: PaginatedResponse<Exchange> }>>(
    '/exchanges',
    { params: filters }
  );
  return data.exchanges.data;
};

export const getExchangeDetails = async (symbol: string) => {
  const { data } = await api.get<ApiResponse<Exchange>>(`/exchanges/${symbol}`);
  return data.exchange;
};

export const getCandles = async (symbol: string) => {
  const { data } = await api.get<ApiResponse<{ totalItems: number; data: Candle[] }>>(
    `/candles/${symbol}`
  );
  return data.candles.data;
};