import React, { useContext, useEffect, useState } from "react";
import humanizeDuration from "humanize-duration";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import { useParams } from "react-router-dom";
import Footer from "../../components/student/Footer";
import Rating from "../../components/student/Rating";

const Player = () => {
  const { enrolledCourses, calculateChapterTime } = useContext(AppContext);
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [playerData, setPlayerData] = useState(null);

  useEffect(() => {
    const course = enrolledCourses.find((course) => course._id === courseId);
    setCourseData(course || null);
  }, [enrolledCourses, courseId]);

  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content */}
      <div className="p-4 sm:p-8 flex flex-col md:grid md:grid-cols-2 gap-8 md:px-36 flex-grow">
        {/* Left Column - Course Structure */}
        <div className="text-gray-800">
          <h2 className="text-xl font-semibold mb-3">Course Structure</h2>
          <div className="pt-3">
            {courseData?.courseContent?.map((chapter, index) => (
              <div key={index} className="border border-gray-300 bg-white mb-2 rounded-md shadow-sm">
                <div
                  className="flex items-center justify-between px-4 py-3 cursor-pointer select-none hover:bg-gray-100"
                  onClick={() => toggleSection(index)}
                >
                  <div className="flex items-center gap-3">
                    <img
                      className={`w-4 h-4 transform transition-transform ${
                        openSections[index] ? "rotate-180" : ""
                      }`}
                      src={assets.down_arrow_icon}
                      alt="arrow icon"
                    />
                    <p className="font-medium md:text-base text-sm">{chapter.chapterTitle}</p>
                  </div>
                  <p className="text-sm md:text-default text-gray-600">
                    {chapter.chapterContent.length} lectures - {calculateChapterTime(chapter)}
                  </p>
                </div>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openSections[index] ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <ul className="list-disc md:pl-8 pl-4 pr-4 py-2 text-gray-700 border-t border-gray-300">
                    {chapter.chapterContent.map((lecture, i) => (
                      <li key={i} className="flex items-start gap-2 py-2">
                        <img src={assets.play_icon} alt="play icon" className="w-4 h-4 mt-1" />
                        <div className="flex items-center justify-between w-full text-gray-800 text-xs md:text-sm">
                          <p>{lecture.lectureTitle}</p>
                          <div className="flex gap-3">
                            {lecture.lectureUrl && (
                              <p
                                onClick={() =>
                                  setPlayerData({ videoId: lecture.lectureUrl.split("/").pop() })
                                }
                                className="text-blue-500 cursor-pointer hover:underline"
                              >
                                Watch
                              </p>
                            )}
                            <p className="text-gray-600">
                              {humanizeDuration(lecture.lectureDuration * 60 * 1000, { units: ["h", "m"] })}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center  gap-2 py-3 mt-10">
            <h1 className="text-xl font-bold">Rate this Course</h1>
            <Rating initialRating={0}/>
          </div>
        </div>

        {/* Right Column - Video Player */}
        <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-center min-h-[250px]">
          {playerData ? (
            <iframe
              className="w-full h-56 md:h-80 rounded-lg shadow-md"
              src={`https://www.youtube.com/embed/${playerData.videoId}`}
              title="Lecture Video"
              allowFullScreen
            ></iframe>
          ) : (
            <p className="text-gray-600 text-center">Select a lecture to watch</p>
          )}
        </div>
      </div>

      {/* Fixed Footer */}
      <footer className="bg-gray-900 text-white py-4 text-center mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default Player;
