import {
  useQuery,
} from '@tanstack/react-query'

import Navbar from './NavBar';

import { Spinner } from '../services/Spinner';

export const TanStackExampleCode = () => {
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