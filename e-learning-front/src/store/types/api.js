import { createAction } from '@reduxjs/toolkit';


export const apiRequest = createAction("api/Request");
export const apiRequestSuccess = createAction("api/RequestSuccess");
export const apiRequestFailed = createAction("api/RequestFailed");