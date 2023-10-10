import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import React, { ChangeEvent, useContext, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from './NavBar';

const queryClient = new QueryClient();

export const TanStackExampleCode = () => {
    const [sampleThing, setSampleThing] = useState(false);
    return (
        <>
            <Navbar />
            <div>hi</div>
        </>
    );
};