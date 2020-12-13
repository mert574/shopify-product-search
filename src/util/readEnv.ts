import dotEnv from 'dotenv';

dotEnv.config({ path: '.env' });

const requiredEnvVars = [ 'APP_PORT', 'APP_URL', 'SHOPIFY_SHOP', 'SHOPIFY_APIKEY', 'SHOPIFY_PASSWORD' ];
const missingEnvVars = requiredEnvVars.filter(it => !(it in process.env));

if (missingEnvVars.length) {
    console.error('Missing environment variables are: ', missingEnvVars.join(', '));
    process.exit(-1);
}
