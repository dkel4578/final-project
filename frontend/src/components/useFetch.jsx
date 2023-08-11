import { useState, useEffect, useCallback } from "react";
import axios from "axios";

function useFetch(query, page) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [list, setList] = useState([]);

    const sendQuery = useCallback(async (lastBoardId = 99999, size, page) => {
        try {
            setLoading(true);
            setError(false);
            const res = await axios.get(`/api/boardss?lastBoardId=${lastBoardId}&size=${size}&page=${page}`);
            setList((prev) => [...prev, ...res.data]);
            setLoading(false);
        } catch (err) {
            setError(err);
        }
    }, []);

    useEffect(() => {
        sendQuery(query, 3, page);
    }, [query, sendQuery, page]);

    return { loading, error, list, sendQuery };
}

export default useFetch;
