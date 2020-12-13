import { query, ValidationChain } from 'express-validator';

export default function ensurePaginatedRequestFactory(): ValidationChain[] {
    return [
        query('page', 'page must be an integer').default(1).toInt(),
        query('pageSize', 'pageSize must be an integer').default(20).toInt(),
    ];
}
