import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Users } from "./containers";

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <Users />
    </QueryClientProvider>
  );
};

export default App;
