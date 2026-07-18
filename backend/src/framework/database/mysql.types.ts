import{ PoolConnection } from 'mysql2/promise'
export interface QueryResult<T>{
    rows:T[]
}
export interface TransactionalContext{
    connection:PoolConnection
}

export type SqlValue =
    | string
    | number
    | boolean
    | Date
    | null
    | Buffer;

export type SqlParameters = SqlValue[]