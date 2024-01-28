import api from 'shared/api';

import { VINDataForSerialNumber } from '../VINModel';

import { createRequest } from 'shared/api/actions';


export type Data = VINDataForSerialNumber;

export type Response = number;

export const getAvailableSerialNumber = createRequest(async (data: Data, config) => {
    return await api.post<Response>('serial', data, config);
});
