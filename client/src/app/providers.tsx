'use client';  // This marks it as a Client Component

import { Provider as ReduxProvider } from "react-redux";
import { ApolloProvider } from "@apollo/client";
import { store } from "@/redux/store";
import { client } from "@/lib/apollo-client";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <ApolloProvider client={client}>
        {children}
      </ApolloProvider>
    </ReduxProvider>
  );
}