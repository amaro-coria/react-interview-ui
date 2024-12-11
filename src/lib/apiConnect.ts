// lib/apiConnect.ts

import axios from 'axios';

const API_BASE_URL = '/v1/widgets';

export interface Widget {
  name: string;
  description: string;
  price: number;
}

export const fetchAllWidgets = async (): Promise<Widget[]> => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

export const createWidget = async (widget: Widget): Promise<Widget> => {
  const response = await axios.post(API_BASE_URL, widget);
  return response.data;
};

export const updateWidget = async (name: string, description: string, price: number): Promise<Widget> => {
  const response = await axios.put(`${API_BASE_URL}/${name}`, null, {
    params: { description, price }
  });
  return response.data;
};

export const deleteWidget = async (name: string): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/${name}`);
};

export const getWidgetByName = async (name: string): Promise<Widget> => {
  const response = await axios.get(`${API_BASE_URL}/${name}`);
  return response.data;
};