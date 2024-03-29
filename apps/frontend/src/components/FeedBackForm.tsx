import { useState } from "react";
import { FeedBack } from "common/src/Feedback.ts";
import axios from "axios";

export function FeedBackForm() {
  const [name, setName] = useState("");
  const [feedBack, setFeedBack] = useState("");

  async function submit() {
    console.log(`${name} gave the feedback of ${feedBack}`);
    const feedBackData: FeedBack = {
      name: name,
      feedback: feedBack,
    };
    const res = await axios.post("/api/feedback", feedBackData, {
      headers: {
        "content-type": "Application/json",
      },
    });
    if (res.status == 200) {
      console.log(res.data);
    }
  }

  function clear() {
    setFeedBack("");
    setName("");
  }

  return (
    <div
      className={
        "justify-items-center text-2xl border-2 border-gray-400 rounded-2xl p-10 flex flex-col gap-5 rounded-2"
      }
    >
      <div className={"px-10  gap-5 py-5 flex flex-col rounded-2 border-white"}>
        <h1>Name</h1>
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          type={"text"}
          className={"border-2 p-2 border-black rounded-2xl grow"}
        />
      </div>
      <div className={"px-10 gap-5 py-5 flex flex-col rounded-2 border-white"}>
        <h1>Feedback</h1>
        <textarea
          value={feedBack}
          onChange={(e) => {
            setFeedBack(e.target.value);
          }}
          className={"border-2 border-black p-2 rounded-2xl"}
        />
      </div>
      <div className={"grid grid-cols-2 justify-items-center"}>
        <button
          className={
            "border-2 w-32 px-5 py-2 rounded-3xl border-gray-400 drop-shadow-xl"
          }
          onClick={submit}
        >
          Submit
        </button>
        <button
          className={
            "border-2 w-32 px-5 py-2 rounded-3xl border-gray-400 drop-shadow-xl"
          }
          onClick={clear}
        >
          Clear
        </button>
      </div>
    </div>
  );
}
