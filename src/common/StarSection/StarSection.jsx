import { FaStar } from "react-icons/fa";
import React from "react";

const sectionTitles = [
  ["Payment", "Solution \\ Resolution", "Communication"],
  ["Payment", "Solution \\ Resolution", "Communication"],
];

const StarRatingFlex = ({ value }) => {
  return (
    <section>
      <div className="flex flex-col md:flex-row gap-6">
        {value.map((block, index) => (
          <div key={index} className="flex-1 min-w-0">
            {index === 0 && (
              <h3 className="text_primary subheading py-2 md:py-5">
                Dispersion of Stars
              </h3>
            )}
            {index === 1 && (
              <h3 className="subheading text_primary py-2 md:py-5">
                Waiting for a response
              </h3>
            )}
            <div className="flex flex-col bg-white p-3 md:p-6 rounded-lg shadow-md justify-between sm:min-h-[250px]">
              <div className="flex flex-col gap-3 md:gap-4">
                {Array.isArray(block.ratings) &&
                  block.ratings.map((item, idx) => (
                    <React.Fragment key={idx}>
                      {block?.isLogin === "Individual" && (
                        <div className="text-base font-normal">
                          {sectionTitles[index]?.[idx]}
                        </div>
                      )}
                      <div className="flex items-center md:gap-4 min-w-0">
                        <div className="flex items-center gap-1 w-[120px] shrink-0 truncate">
                          <FaStar className="w-4 h-4" style={{ color: item.color }} />
                          {block?.isLogin !== "Individual" ? (
                            <span className="text-sm truncate">
                              {item.score} ({item.label})
                            </span>
                          ) : (
                            <span className="text-sm md:text-base font-semibold">
                              {item.score} ({item.label})
                            </span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0 flex items-center h-2 rounded-full overflow-hidden bg-gray-200">
                          <div
                            className="h-2 rounded-full"
                            style={{
                              width: `${item.percent}%`,
                              backgroundColor: item.color,
                            }}
                          />
                        </div>
                        <div className="text-right w-[50px] shrink-0 text-sm">
                          {block.showProgressBar ? `${item.percent}%` : item.value}
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
              </div>
              <p className="text-center md:text-start pt-4 text-sm text-gray-600">
                {block.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StarRatingFlex;
