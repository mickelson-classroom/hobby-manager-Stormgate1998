import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import React, { ChangeEvent, useContext, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from './NavBar';
import { Spinner } from '../services/Spinner';

const queryClient = new QueryClient();

export const TanStackExampleCode = () => {
    const [sampleThing, setSampleThing] = useState(false);
    const { isLoading, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch('https://api.github.com/repos/TanStack/query').then(
        (res) => res.json(),
      ),
  })

  if (isLoading) return(<Spinner/>)

  if (error) return(<div>'An error has occurred: ' + error.message</div>)

    return (
        <>
            <Navbar />
            <div>
                <h1>{data.name}</h1>
                    <p>{data.description}</p>
                    <strong>👀 {data.subscribers_count}</strong>{' '}
                    <strong>✨ {data.stargazers_count}</strong>{' '}
                    <strong>🍴 {data.forks_count}</strong>
            </div>
        </>
    );
};