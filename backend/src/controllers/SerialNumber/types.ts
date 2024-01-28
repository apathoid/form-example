import { Request, Response } from 'express';


export type GetNextAvailableSerialNumberRequest = Request<any, number>;
export type GetNextAvailableSerialNumberResponse = Response<number>;
