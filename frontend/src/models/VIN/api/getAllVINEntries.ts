import api from 'shared/api';

import { IVIN } from '../VINModel';

import { createRequestWithoutData } from 'shared/api/actions';


export type Response = IVIN[];

export const getAllVINEntries = createRequestWithoutData(async config => {
    return await api.get<Response>('vin', config);
});
