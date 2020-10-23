import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
  Operation,
} from "@apollo/client";
import * as ActionCable from "actioncable";
import { ActionCableLink } from "graphql-ruby-client";

const GRAPHQL_URL = "http://localhost:3000/graphql";
const cable = ActionCable.createConsumer("ws://localhost:3000/cable");

const hasSubscriptionOperation = ({ query: { definitions } }: Operation) => {
  return definitions.some(
    //@ts-ignore
    ({ kind, operation }) =>
      kind === "OperationDefinition" && operation === "subscription"
  );
};

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  credentials: "include",
  link: ApolloLink.split(
    hasSubscriptionOperation,
    //@ts-ignore
    new ActionCableLink({ cable }),
    new HttpLink({ uri: GRAPHQL_URL })
  ),
});
