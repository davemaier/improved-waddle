// pages/index.js
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useEffect } from "react";
import useSWR from "swr";
import { useQuery } from 'urql';

const query = `query findManyUsers{
  users{
    id
  }
}`

const Home = () => {
  const { user, error: authError, isLoading } = useUser();

  const [result, reexecuteQuery] = useQuery({query: query});
  const { data, fetching, error } = result;

  useEffect(() => console.log(data), [data])

  if (isLoading || fetching) return <div>Loading...</div>;
  if (authError) return <div>AuthError: {authError.message}</div>;
  

  if (user) {
    return (
      <div>
        <div>
          Welcome {user.name}! <a href="/api/auth/logout">Logout</a>
        </div>

      </div>
    );
  }

  return <a href="/api/auth/login">Login</a>;
  if (error) return <div>FetchError: {error.message} <a href="/api/auth/logout">Logout</a> </div>
};

export default Home;