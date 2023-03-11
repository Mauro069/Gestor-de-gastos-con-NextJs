import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "@/context/authContext";
import type { AppProps } from "next/app";

import "@/styles/globals.scss";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </QueryClientProvider>
  );
}
