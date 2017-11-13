import express from 'express';
import graphqlHTTP from 'express-graphql';

import schema from './schema';

const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: () => 'hello world',
    graphiql: true,
  })
);

export default app;
