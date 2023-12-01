import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { deleteReview, getMiscReviews, getReviews } from "../../Utils/Api/Api";
import { CustomerIcon, StarIcon, UserIcon } from "../../Components/Icons";
import Loader from "../../Components/Loader";

export default function Reviews() {
  const [data, setData] = useState([]);
  const [miscData, setMiscData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handelDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        const response = await deleteReview(id);
        alert("Review deleted successfully");
        fetchData();
      } catch (error) {
        console.log(error);
        alert("Something went wrong");
      }
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getReviews();
      const miscData = await getMiscReviews();
      setData(data);
      setMiscData(miscData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    return () => {
      setData([]);
      setMiscData({});
      setLoading(false);
      setError(null);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col gap-8 w-full h-full relative"
    >
      {/* Cards for information */}
      <div className="w-full flex gap-8">
        {/* Total Reviews */}
        <div className="p-8 w-[20rem] min-h-[10rem] rounded-lg shadow-md flex justify-center items-center bg-white-og text-charcoal">
          <div className="flex flex-col gap-4 w-full h-full">
            <h1 className="text-[18px] font-medium">Total Reivews</h1>
            <div className="flex flex-col gap-">
              <h2 className="text-4xl font-semibold">
                {" "}
                {miscData.totalReviews ? miscData.totalReviews : "--"}
              </h2>
              <p className="font-medium text-zinc-400 text-[15px]">
                Growth in reviews
              </p>
            </div>
          </div>
        </div>

        <div className="border-l border-zinc-200"></div>

        <div className="p-8 w-[20rem] min-h-[10rem] rounded-lg shadow-md flex justify-center items-center bg-white-og text-charcoal">
          <div className="flex flex-col gap-4 w-full h-full">
            <h1 className="text-[18px] font-medium">Average Reivews</h1>
            <div className="flex flex-col gap-">
              <h2 className="text-4xl font-semibold">
                {miscData.avgRating ? miscData.avgRating : "--"}
              </h2>
              <p className="font-medium text-zinc-400 text-[15px]">
                Average rating of all reviews
              </p>
            </div>
          </div>
        </div>

        <div className="border-l border-zinc-200"></div>

        <div className="p-8 w-[20rem] min-h-[10rem] rounded-lg shadow-md flex justify-center items-center bg-white-og text-charcoal">
          <div className="flex flex-col gap-4 w-full h-full">
            <h1 className="text-[18px] font-medium">Total Stars</h1>
            <div className="flex flex-col gap-">
              <h2 className="text-4xl font-semibold">
                {miscData.totalStars ? miscData.totalStars : "--"}
              </h2>
              <p className="font-medium text-zinc-400 text-[15px]">
                Total no. of stars
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full border-t border-zinc-200"></div>

      {/* Listing */}
      <div className="flex flex-col gap-8">
        {loading ? (
          <Loader />
        ) : (
          data &&
          data.map((item, index) => {
            let date = new Date(item.createdAt);
            const final = date.toISOString().split("T")[0];
            return (
              <div className="w-full flex flex-col gap-8" key={item._id}>
                <div className="flex gap-3">
                  {/* User INfo */}
                  <div className="flex gap-3 w-[25rem] ">
                    <div className="w-16 h-16 rounded-md bg-slate-200 flex justify-center items-center">
                      <div>
                        <CustomerIcon className="w-7 h-7" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <h1 className="text-xl font-semibold">{item.name}</h1>
                      <p className="text-zinc-500 text-[15px]">
                        Posting as{" "}
                        <span className="font-semibold">Customer</span>
                      </p>
                    </div>
                  </div>

                  {/* User Review */}
                  <div className=" flex flex-col gap-3 w-[45rem]">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-3">
                        <div className="flex gap">
                          {[...Array(5)].map((_, index) => {
                            return (
                              <StarIcon
                                index={index}
                                className={`w-6 h-6 ${
                                  index < item.stars
                                    ? "fill-yellow-400"
                                    : "fill-[#cccccc]"
                                }`}
                                stroke={
                                  index < item.stars ? "#FFC107" : "#cccccc"
                                }
                              />
                            );
                          })}
                        </div>
                        <p className="text-[15px] text-zinc-500">{final}</p>
                      </div>
                      {/* Review */}
                      <div>
                        <p className="text-zinc-600">{item.review}</p>
                      </div>
                    </div>
                    {/* Actions */}
                    <div>
                      <button
                        type="button"
                        onClick={() => handelDelete(item._id)}
                        className="text-[14px] font-medium text-red-500 px-3 py-[3px] border border-red-500 hover:bg-red-500 hover:text-white rounded-[4px]"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>

                <div className="border-t border-zinc-200"></div>
              </div>
            );
          })
        )}
        {error && (
          <div className="w-full flex justify-center items-center">
            <p className="text-red-500 text-[15px]">{error}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
