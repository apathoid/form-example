import api from 'shared/api';

import { IVIN } from '../VINModel';

import { createRequest } from 'shared/api/actions';


export type Data = IVIN;

export type Response = IVIN;

export const createVIN = createRequest(async (data: Data, config) => {
    return await api.post<Response>('vin', data, config);
});
