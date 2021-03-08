import "../styles/globals.css";
import { UserProvider } from "@auth0/nextjs-auth0";
import { createClient, Provider } from "urql";

const client = createClient({
  url: "/api/graphql",
});

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Provider value={client}>
        <Component {...pageProps} />
      </Provider>
    </UserProvider>
  );
}

export default MyApp;
