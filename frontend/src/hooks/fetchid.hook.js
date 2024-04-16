import axios from "axios";
import { useEffect, useState } from "react";
import { getUsername } from "../helper/helper.js";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

export default function useFetch(query) {
  const [getData, setData] = useState({
    isLoading: false,
    user_id: null, // Initialize user_id as null
    apiData: undefined,
    status: null,
    serverError: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setData((prev) => ({ ...prev, isLoading: true }));

        const { username } = !query ? await getUsername() : "";

        const { data, status } = !query
          ? await axios.get(`/api/user/${username}`)
          : await axios.get(`/api/${query}`);

        // Update apiData with user_id
        const updatedData = { ...data, user_id: data._id };

        if (status === 201) {
          setData((prev) => ({
            ...prev,
            isLoading: false,
            user_id: data._id, // Set user_id
            apiData: updatedData,
            status: status,
          }));
        }

        setData((prev) => ({ ...prev, isLoading: false }));
      } catch (error) {
        setData((prev) => ({ ...prev, isLoading: false, serverError: error }));
      }
    };
    fetchData();
  }, [query]);

  return getData;
}
