import axios from "axios";
import { useState, useEffect } from "react";
import { BASE_URL } from "../constant";

const useTutors = () => {
  const [tutors, setTutors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/tutor/view`);
        setTutors(response.data);
      } catch (error) {
        console.error("Error fetching tutors:", error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return { tutors, isLoading };
};

export default useTutors;
