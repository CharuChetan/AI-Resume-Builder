import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { usePDF } from "react-to-pdf";

function VideoGeneration() {
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });
  return (
    <div className="p-10 md:px-20 lg:px-32 text-gray-700">
      <h2 className="font-bold text-3xl">Turn Ideas into Videos</h2>
      <p>From imagination to screen, AI makes videos from your words.</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-5">
        <Button onClick={() => toPDF()}>Download PDF</Button>
        <div ref={targetRef}>Content to be generated to PDF</div>
      </div>
    </div>
  );
}

export default VideoGeneration;
