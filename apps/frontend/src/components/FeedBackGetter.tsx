import React, { useEffect, useState } from "react";
import { FeedBack } from "common/src/Feedback.ts";
import axios from "axios";
import { FeedBackDisplay } from "./FeedBackDisplay.tsx";

export function FeedBackGetter() {
  const [feedBackData, setFeedBackData] = useState<FeedBack[]>();

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("/api/feedback");
      setFeedBackData(res.data);
      console.log("successfully got data from get request");
    }
    fetchData().then();
  }, []);

  return (
    <div className="flex flex-colgap-5">
      {feedBackData != undefined ? (
        feedBackData.map((feedback) => {
          return <FeedBackDisplay feedback={feedback}></FeedBackDisplay>;
        })
      ) : (
        <></>
      )}
    </div>
  );
}
