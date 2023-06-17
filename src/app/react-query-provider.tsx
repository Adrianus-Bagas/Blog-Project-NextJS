"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useHydrateAtoms } from "jotai/react/utils";
import { queryClientAtom } from "jotai-tanstack-query";
import { useState } from "react";
import { Provider } from "jotai";
import { DevTools } from "jotai-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const HydrateAtoms = ({
  children,
  client,
}: {
  children: JSX.Element;
  client: QueryClient;
}) => {
  useHydrateAtoms([[queryClientAtom, client]]);
  return children;
};

const QueryProviders = ({ children }: { children: JSX.Element }) => {
  const [client] = useState(
    new QueryClient({ defaultOptions: { queries: { staleTime: 5000 } } })
  );

  return (
    <>
      <QueryClientProvider client={client}>
        <Provider>
          <DevTools />
          <HydrateAtoms client={client}>{children}</HydrateAtoms>
        </Provider>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </>
  );
};

export default QueryProviders;
