import express from 'express';
import 'express';

export interface UserData {
  // username?: string
  // groups?: string[]
  id?: string;
}

// export type ParsedQs = {
//   [key: string]: undefined | string | string[] | ParsedQs | ParsedQs[];
// };

// export interface Pagination extends ParsedQs {
//   limit: number;
//   skip: number;
// }

// export interface Query extends ParsedQs {
//   pagination?: Pagination;
//   filters?: any;
//   include?: any;
//   select?: any;
// }

declare module 'express' {
  export interface Request extends express.Request {
    userData?: UserData;
  }
}
