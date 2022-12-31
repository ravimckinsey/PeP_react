import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Users } from "./containers";
// import classes from "./app.module.css";

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
      <div>Happy new</div>
      <Users />
    </QueryClientProvider>
  );
};

export default App;
