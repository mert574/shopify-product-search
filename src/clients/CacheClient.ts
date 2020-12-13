import logger from '../util/logger';

// TODO using a remote cache like redis, memcached is a good idea.
class CacheClient<T> {
    private readonly ttlMs: number;
    private expiresAt: number;
    private store: T | null;
    private refreshing: boolean;
    private waitQueue: ((data: T) => void)[];
    private refreshHandler: () => Promise<T>;

    constructor(ttlMs: number, refreshHandler: () => Promise<T>) {
        if (typeof refreshHandler !== 'function') {
            throw new Error('Refresh handler must be a function.');
        }

        this.refreshHandler = refreshHandler;
        this.ttlMs = ttlMs;
        this.expiresAt = 0;
        this.refreshing = false;
        this.store = null;
        this.waitQueue = [];
    }

    invalidate(): void {
        this.expiresAt = 0;
    }

    refresh(data: T): void {
        this.expiresAt = Date.now() + this.ttlMs;
        this.store = data;
        this.refreshing = false;
        logger.debug('cache refreshed', { service: 'CacheClient.refresh' });

        this.waitQueue.forEach(fn => fn.call(null, data));
        this.waitQueue = [];
    }

    getData(): Promise<T> {
        return new Promise((resolve) => {
            if (this.refreshing) {
                logger.debug('cache refreshing. adding request to queue.', { service: 'CacheClient.getData' });
                this.waitQueue.push(resolve);
                return;
            }

            if (this.expiresAt > Date.now()) {
                // @ts-expect-error this.store cannot be null if expiresAt is set greater than 0.
                resolve(this.store);
                return;
            }

            this.refreshing = true;
            this.refreshHandler().then(data => {
                setImmediate(() => this.refresh(data));
                resolve(data);
            });
        });
    }
}

export default CacheClient;
