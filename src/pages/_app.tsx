import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "@/context/authContext";
import { Analytics } from '@vercel/analytics/react';
import type { AppProps } from "next/app";

import "@/styles/globals.scss";

const queryClient = new QueryClient();

queryClient.setDefaultOptions({
  queries: {
    refetchOnWindowFocus: false,
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Component {...pageProps} />
        <Analytics />
      </AuthProvider>
    </QueryClientProvider>
  );
}
