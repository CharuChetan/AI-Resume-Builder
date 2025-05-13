import React from "react";

function EducationalPreview({ resumeInfo }) {
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
        Education
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor }} />
      {resumeInfo?.education.map((education, index) => (
        <div key={index} className="my-5">
          <h2
            className="text-sm font-bold"
            style={{ color: resumeInfo?.themeColor }}
          >
            {education?.universityName}
          </h2>
          <h2 className="text-xs flex justify-between">
            {education.degree && `${education.degree} in ${education.major}`}
            <span>
              {education.degree &&
                `${getMonthYear(education.startDate)} - ${getMonthYear(
                  education.endDate
                )}`}
            </span>
          </h2>
          <p className="text-xs my-2">{education.description}</p>
        </div>
      ))}
    </div>
  );
}

export default EducationalPreview;
