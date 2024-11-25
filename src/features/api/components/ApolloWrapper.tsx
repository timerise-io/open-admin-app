import React, { PropsWithChildren } from "react";
import { ApolloProvider } from "@apollo/client";
import { apolloClient as defaultApolloClient } from "../apolloClient";

export const ApolloWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return <ApolloProvider client={defaultApolloClient}>{children}</ApolloProvider>;
};
