import express, { Express, Request } from 'express';
import bodyParser from 'body-parser';
import compress from 'compression';
import cors, { CorsOptions } from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

export type ServerInfo = { instance: Express, listen: (port: number, url: string) => Promise<void> };

export default function createServer(): ServerInfo {
    const corsOptions: CorsOptions = {
        exposedHeaders: 'authorization, x-refresh-token, x-token-expiry-time x-forwarded-for',
        origin: true,
        // origin: (origin, callback) => {
        //     if (!origin || config.whitelist.includes(origin)) {
        //         callback(null, true);
        //     } else {
        //         callback(new Error(`${ origin } not allowed by CORS`));
        //     }
        // },
        credentials: true,
    };

    const server = express();

    server.use(express.static('public'));

    server.disable('x-powered-by');
    server.set('trust proxy', true);

    // enable request logger
    configureMorganAndAttach(server);

    // parse body params and attache them to req.body
    server.use(bodyParser.json());

    // gzip compression
    server.use(compress());

    // secure servers by setting various HTTP headers
    server.use(helmet());

    // enable CORS - Cross Origin Resource Sharing
    // @ts-expect-error type definitions are not great for cors package.
    server.use(cors(corsOptions));

    return {
        instance: server,
        listen(port: number, url: string) {
            return new Promise((resolve) => {
                server.listen(port, url, () => resolve());
            });
        },
    };
}

function configureMorganAndAttach(server: Express) {
    morgan.token('body', (req: Request) => req.method === 'POST' ? '- \x1b[32m' + JSON.stringify(req.body) + '\x1b[0m' : ' ');
    morgan.token('ip', (req: Request) => req.ips.pop());

    const logFormat = '\x1b[2m:date[iso] :method :status\x1b[0m\t\x1b[1m:url\x1b[0m \x1b[2m- :ip :response-time ms \x1b[0m:body';

    const skipOptionsRequests = (req: Request) => req.method === 'OPTIONS';
    server.use(morgan(logFormat, { skip: skipOptionsRequests }));
}
