# Shopify Product Search App
Allows consumers to search for products based on `title` field. Also creates a short-lived local cache of all products to speed-up upcoming requests. 

Responses are configured to return only `id` and `title` fields by default. However, you can change it from [ShopifyProductService.ts](src/services/ShopifyProductService.ts)
either by directly changing constructor param or using `setFields` method.

Logs are written to the `/logs` folder. In development, also written to the stdout.

## Endpoints

| Method | URL | Params | Response | Description |
|--------|-----|-----|-----|-----|
| GET | /product | ```page: number``` ```pageSize: number``` |[Paginated\<Product\>](src/models/Paginated.ts)|Lists all products|
| GET | /product/search | ```keyword: string``` ```page: number``` ```pageSize: number``` |[Paginated\<Product\>](src/models/Paginated.ts)|Allows filtering based on title field|

## How to Use

#### Build Image
```shell
docker build . --tag shopify-search
```

#### Run Image
Make sure you have the `.env` file and configured properly (default configuration should be fine).
```shell
docker run --rm -it -p 8080:8080 --init --env-file ./.env shopify-search
```

### An Example Request: 
```shell
curl 'http://localhost:8080/product/search?keyword=awesome&pageSize=3' | jq '.'
```

Response should look like:
```json
{
  "page": 1,
  "pageSize": 3,
  "totalItems": 52,
  "results": [
    {
      "id": 4348091826236,
      "title": "Awesome Wool Plate"
    },
    {
      "id": 4348095791164,
      "title": "Awesome Silk Computer"
    },
    {
      "id": 4348097429564,
      "title": "Awesome Iron Chair"
    }
  ]
}
```

## Development

To start development, install dependencies and start developing! Hot-reload is enabled.
```shell
$ > yarn
$ > yarn dev
```
