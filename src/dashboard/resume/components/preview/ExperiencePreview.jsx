import React from "react";

function ExperiencePreview({ resumeInfo }) {
  const getMonthYear = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.toLocaleString("default", { month: "short" }); // Full month name
    return `${month} ${year}`;
  };

  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-sm mb-3"
        style={{ color: resumeInfo?.themeColor }}
      >
        Professional Experience
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor }} />
      {resumeInfo?.experience?.map((experience, index) => (
        <div key={index} className="my-5">
          <h2
            className="text-sm font-bold"
            style={{ color: resumeInfo?.themeColor }}
          >
            {experience?.title}
          </h2>
          <h2 className="text-xs flex justify-between">
            {experience?.companyName &&
              `${experience?.companyName}, ${experience?.city}, ${experience?.state}`}
            <span>
              {experience?.startDate && getMonthYear(experience?.startDate)} -{" "}
              {experience?.currentlyWorking
                ? "Present"
                : experience.endDate && getMonthYear(experience.endDate)}
            </span>
          </h2>
          {/* <p className="text-xs my-2">{experience?.workSummery}</p> */}
          <div
            className="text-xs my-2"
            dangerouslySetInnerHTML={{ __html: experience?.workSummery }}
          />
        </div>
      ))}
    </div>
  );
}

export default ExperiencePreview;
