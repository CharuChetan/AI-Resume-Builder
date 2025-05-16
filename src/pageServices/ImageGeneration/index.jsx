import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Airplay, LoaderCircle, User, User2Icon } from "lucide-react";
import React, { useState } from "react";
import AIModal from "../../../services/AIModal";

function ImageGeneration() {
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
      //   queryObj = {
      //     ...queryObj,
      //     answer: response,
      //   };
      const filterData = queryTxt.find((data) => data.id === queryObj.id);
      filterData.answer = response;
      setQueryTxt([...queryTxt]);
    });
  };
  return (
    <div className="p-10 md:px-20 lg:px-32 text-gray-700">
      <h2 className="font-bold text-3xl">Your AI Art Studio</h2>
      <p>Turn your words into awesome visuals with a little help from AI.</p>
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
        <div className="grid grid-cols-6 md:grid-cols-6 pt-10 gap-10">
          <div className="col-span-5 flex justify-between items-center">
            <Textarea
              value={textData}
              onChange={(e) => setTextData(e.target.value)}
            />
          </div>
          <div className="flex justify-between items-center">
            <Button type="submit" size="lg" className="px-9">
              Enter
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ImageGeneration;
