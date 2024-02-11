import axios, { AxiosResponse } from 'axios';

export function get_data(): Promise<any> {
  return axios.get('http://127.0.0.1:8000/api/timeline')
    .then((response: AxiosResponse<any>) => response.data);
}

export function post_data(data: any): Promise<any> {
  return axios.post('http://127.0.0.1:8000/api/timeline', data)
    .then((response: AxiosResponse<any>) => response.data);
}