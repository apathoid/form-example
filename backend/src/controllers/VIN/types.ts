import { Request, Response } from 'express';

import { IVIN } from '../../models/VIN/VINModel';


export type GetVINEntriesRequest = Request<any, IVIN[], null>;
export type GetVINEntriesResponse = Response<IVIN[]>;

export type CreateVINRequest = Request<any, IVIN, Omit<IVIN, 'id'>>;
export type CreateVINResponse = Response<IVIN>;
