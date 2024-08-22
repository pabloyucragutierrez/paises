import { GraphQLClient } from 'graphql-request';

// Configura la URL de la API GraphQL
const client = new GraphQLClient('https://countries.trevorblades.com/');

export default client;
