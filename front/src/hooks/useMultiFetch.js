import React, { useEffect, useState } from 'react';

const useMultifetch = (services = [
    {
        name: '',
        request: async () => {},
        adapter: (data) => data,
        endpoint: '',
        endpoint_params: {}
    }
]) => {
    const [list, setList] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const getAdapter = (adapter) => adapter || ((data) => data);
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const promises = await Promise.all(services.map(async (service) => {
                    return {
                        name: service.name,
                        results: getAdapter(service.adapter)((await service.request(service.endpoint, service.endpoint_params)))
                    };
                }));
                setList(promises);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    return {
        list,
        isLoading,
        error
    }
}

export { useMultifetch };