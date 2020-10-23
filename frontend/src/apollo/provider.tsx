import React from "react";
import { ApolloProvider as Ap } from "@apollo/client";
import { client } from "./client";

export const ApolloProvider: React.FC = ({ children }) => {
  return <Ap client={client}>{children}</Ap>;
};
