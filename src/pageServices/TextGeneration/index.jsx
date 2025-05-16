import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Airplay, LoaderCircle, User, User2Icon } from "lucide-react";
import React, { useState } from "react";
import AIModal from "../../../services/AIModal";

function TextGeneration() {
  const [textData, setTextData] = useState("");
  const [queryTxt, setQueryTxt] = useState([]);

  const dataSubmit = (e) => {
    e.preventDefault();
    let queryObj = {
      id: uuidv4(),
      question: textData,
      answer: <LoaderCircle className="animate-spin" />,
    };
    queryTxt.push(queryObj);
    setQueryTxt([...queryTxt]);
    setTextData("");
    AIModal(textData).then((response) => {
      const filterData = queryTxt.find((data) => data.id === queryObj.id);
      filterData.answer = response;
      setQueryTxt([...queryTxt]);
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // Action to perform when Enter key is pressed
      dataSubmit();
    }
  };

  return (
    <div className="p-10 md:px-20 lg:px-32 text-gray-700">
      <h2 className="font-bold text-3xl">Your AI Chat Bot</h2>
      <p>
        An AI chatbot is a smart virtual buddy you can chat with to get answers,
        ideas, or just have a conversation.
      </p>
      <div className="flex gap-10 flex-col mt-10 p-10 bg-gradient-to-b from-pink-100 via-purple-200 to-blue-200 h-[500px] rounded-lg overflow-y-auto">
        {queryTxt.map((query) => (
          <>
            <div className="flex h-auto items-center gap-2">
              <span className="basis-3">
                <User2Icon />
              </span>
              :{" "}
              <span className="border p-5 shadow-lg rounded-lg bg-amber-50 justify-center items-center">
                {query.question}
              </span>
            </div>
            <div className="flex h-auto items-center gap-2 flex-row-reverse float-end">
              <span className="basis-3">
                <Airplay />
              </span>
              :{" "}
              <span className="border p-5 shadow-lg rounded-lg bg-amber-50 justify-center items-center">
                {query.answer}
              </span>
            </div>
          </>
        ))}
      </div>

      <form onSubmit={dataSubmit}>
        <div className="grid grid-cols-8 md:grid-cols-8 pt-10 gap-10">
          <div className="col-span-7 flex justify-between items-center">
            <Textarea
              value={textData}
              onChange={(e) => setTextData(e.target.value)}
            />
          </div>
          <div className="flex justify-between items-center">
            <Button
              type="submit"
              size="lg"
              className="px-9"
              onKeyDown={handleKeyDown}
            >
              Enter
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default TextGeneration;
