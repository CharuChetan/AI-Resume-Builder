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
import AIChatModal from "../../../services/AIChatModal";
import useSpeechToText from "react-hook-speech-to-text";
import { toast } from "sonner";

function TextGeneration() {
  const [textData, setTextData] = useState("");
  const [queryTxt, setQueryTxt] = useState([]);
  const [content, setContent] = useState([]);
  const [recordtxt, setRecordTxt] = useState([]);
  const [loader, setloader] = useState(false);
  const scrollRef = useRef(null); // Add this ref

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

    AIChatModal(content)
      .then((response) => {
        const data = {
          role: "model",
          parts: [
            {
              text: response,
            },
          ],
        };
        content.push(data);
        setContent(content);
        const filterData = queryTxt.find((data) => data.id === queryObj.id);
        filterData.answer = response;
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

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      // Action to perform when Enter key is pressed
      await dataSubmit(e);
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

  useEffect(() => {
    // Scroll to bottom when queryTxt changes (i.e., after new result)
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [queryTxt]);

  return (
    <div className="grid grid-flow-row gap-5 p-10 md:px-20 lg:px-32 text-gray-700">
      <h2 className="font-bold text-3xl">Your AI Chat Bot</h2>
      <p>
        An AI chatbot is a smart virtual buddy you can chat with to get answers,
        ideas, or just have a conversation.
      </p>
      <div
        className="bg-gradient-to-b from-pink-100 via-purple-200 to-blue-200 h-[500px] rounded-lg overflow-y-auto"
        ref={scrollRef}
      >
        <div className="grid grid-cols-1 gap-5 mt-10 p-5 scroll-smooth md:scroll-auto">
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
              <div className="flex items-center gap-2 flex-row-reverse float-end">
                <span className="basis-3">
                  <Airplay />
                </span>
                :{" "}
                <pre className="border text-wrap p-5 shadow-lg rounded-lg bg-amber-50 justify-center items-center">
                  {query.answer}
                </pre>
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
              className={isRecording ? "animate-pulse text-red-400" : ""}
              disabled={loader}
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

export default TextGeneration;
