import { useState, useCallback } from 'react';

const endpoint = 'https://contactify-api.herokuapp.com/api/contacts';

//Custom hook for API calls to fetch data from server

export const useApi = (id) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(() => {
        fetch(endpoint)
            .then((res) => res.json())
            .then((result) => {
                setData(result);
                setError(null);
            })
            .catch((error) => {
                setError(error.message);
                setData(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return {data, error, loading, fetchData};
};