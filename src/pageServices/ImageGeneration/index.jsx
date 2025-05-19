import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Airplay,
  LoaderCircle,
  Mic,
  Send,
  User,
  User2Icon,
} from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import { GenerateImage } from "../../../services/ImageModal";
import useSpeechToText from "react-hook-speech-to-text";
import { toast } from "sonner";

function ImageGeneration() {
  const [textData, setTextData] = useState("");
  const [queryTxt, setQueryTxt] = useState([]);
  const [content, setContent] = useState([]);
  const [recordtxt, setRecordTxt] = useState([]);
  const [loader, setloader] = useState(false);
  const scrollRef = useRef(null);

  const { error, isRecording, results, startSpeechToText, stopSpeechToText } =
    useSpeechToText({
      continuous: true,
      useLegacyResults: false,
    });

  const dataSubmit = async (e) => {
    e.preventDefault();
    setloader(true);
    let queryObj = {
      id: uuidv4(),
      question: textData,
      answer: <LoaderCircle className="animate-spin" />,
    };
    queryTxt.push(queryObj);
    setQueryTxt([...queryTxt]);
    setTextData("");
    const dataContent = {
      role: "user",
      parts: [
        {
          text: textData,
        },
      ],
    };
    content.push(dataContent);
    await setContent([...content]);
    GenerateImage(content)
      .then(async (response) => {
        const data = {
          role: "model",
          parts: response.data.candidates[0].content.parts,
        };
        content.push(data);
        setContent([...content]);
        const filterData = queryTxt.find((data) => data.id === queryObj.id);
        filterData.answer = response.data.candidates[0].content.parts;
        console.log(queryTxt);
        setQueryTxt([...queryTxt]);
        setRecordTxt([]);
        setloader(false);
        results.length = 0;
        if (isRecording) {
          stopSpeechToText();
        }
      })
      .catch((error) => {
        console.log(error);
        setloader(false);
        toast("Something went wrong. Please refresh.");
      });
  };

  useEffect(() => {
    // Scroll to bottom when queryTxt changes (i.e., after new result)
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [queryTxt]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      // Action to perform when Enter key is pressed
      dataSubmit(e);
      if (isRecording) {
        stopSpeechToText();
      }
    }
  };

  const handleMic = () => {
    if (error) {
      toast("Web Speech API is not available in this browser");
    } else if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  useEffect(() => {
    if (results.length > 0) {
      const { transcript } = results[results.length - 1];
      if (transcript && isRecording) {
        recordtxt.push(results[results.length - 1].transcript);
        setRecordTxt(recordtxt);
        setTextData(recordtxt.join(" "));
      }
    }
  }, [results, recordtxt, isRecording]);

  return (
    <div className="grid grid-flow-row gap-5 p-10 md:px-20 lg:px-32 text-gray-700">
      <h2 className="font-bold text-3xl">Your AI Art Studio</h2>
      <p>Turn your words into awesome visuals with a little help from AI.</p>
      <div
        className="bg-gradient-to-b from-pink-100 via-purple-200 to-blue-200 h-[500px] rounded-lg overflow-y-auto"
        ref={scrollRef}
      >
        <div className="grid grid-cols-1 gap-5 mt-10 p-5 scroll-smooth md:scroll-auto">
          {queryTxt &&
            queryTxt.map((query) => (
              <>
                <div className="flex items-center gap-2">
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
                  <div className="flex flex-col gap-3 items-end">
                    {!Array.isArray(query.answer) && (
                      <div className="border p-5 shadow-lg rounded-lg bg-amber-50 items-center">
                        {query.answer}
                      </div>
                    )}
                    {query.answer.length > 0 &&
                      query.answer.map((value) => {
                        return value.inlineData ? (
                          <div className="flex max-w-fit border p-5 shadow-lg rounded-lg bg-amber-50 float-right items-center">
                            <img
                              src={`data:${value.inlineData.mimeType};base64,${value.inlineData.data}`}
                              height={300}
                              width={300}
                            />
                          </div>
                        ) : query.answer.length === 1 && value?.text ? (
                          <div className="flex border p-5 shadow-lg rounded-lg bg-amber-50 items-center gap-3">
                            <p>{value?.text}</p>
                          </div>
                        ) : null;
                      })}
                  </div>
                </div>
              </>
            ))}
        </div>
      </div>
      <form onSubmit={dataSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="col-span-2 flex justify-between items-center">
            <Textarea
              value={textData}
              onChange={(e) => setTextData(e.target.value)}
              placeholder="Type your message here."
              onKeyDown={handleKeyDown}
              disabled={loader}
            />
          </div>
          <div className="flex justify-items-center items-center gap-2">
            <Button
              size="lg"
              type="button"
              onClick={handleMic}
              disabled={loader}
              className={isRecording ? "animate-pulse text-red-400" : ""}
            >
              <Mic />
            </Button>
            <Button type="submit" size="lg" className="px-9" disabled={loader}>
              <Send />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ImageGeneration;
