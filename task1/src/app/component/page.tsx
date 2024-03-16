"use client";

import { useEffect, useState } from 'react';

const AnalyticsData = () => {
    const [data, setData] = useState({totalVisitors:0,days:0});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/analytics');
                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }
                const json = await res.json();
                setData(json);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <h2>Total Visitors: {data.totalVisitors}</h2>
            <p>Days: {data.days}</p>
        </div>
    );
};

export default AnalyticsData;
