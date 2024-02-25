import axios from "axios";
import { useState, useEffect } from "react";
import { BASE_URL } from "../constant";

const useGroups = () => {
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchGroups = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/group/view`);
        setGroups(response.data);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
      setIsLoading(false);
    };

    fetchGroups();
  }, []);

  return { groups, isLoading };
};

export default useGroups;
