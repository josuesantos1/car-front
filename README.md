## Getting Started

crie um arquivo ```.env.local```
com a url da api

exemplo:
```bash
API_URL=http://localhost:8000
```

mude <bucket> para o nome do bucket em ```next.config.js```
```bash
images: {
    domains: ['<bucket>.s3.amazonaws.com'],
},
```

```bash
npm install
# or
yarn install
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
```
