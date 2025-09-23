"use client";
import StarRatingAddition from "@/common/StarRating/StarRatingAddition";
import reviewStyle from "./review.module.scss";
import InputEvidenceUpload from "../Input/InputEvidenceUpload";
import InputCategory from "@/common/Input/InputCategory";
import InputName from "../Input/InputName";
import InputTextArea from "../Input/InputTextArea";
import InputDate from "../Input/InputDate";

const ReviewAddition = ({
  reviewType, experienceRate, handleChange, handleFileChange, handleSubmit, formData, setExperienceRate, rating, setRating, solutionRate,
  setSolutionRate, communicationRate, setCommunicationRate, userInfo, handleSelectCategory, categoryList, onClose, categoryError,
}) => {
  const categoriesOptions = [
    {
      label: `${categoryList?.additionalCategoryDetails?.length} ${userInfo?.name} Categories`,
      options: categoryList && categoryList?.additionalCategoryDetails?.map((item) => {
        return { value: item._id, label: item.name };
      }),
    },
    {
      label: `${categoryList?.remainingCategories?.length} OTHER SUGGESTION CATEGORIES`,
      options: categoryList && categoryList?.remainingCategories?.map((item) => {
        return { value: item._id, label: item.name };
      }),
    },
  ];

  return (
    <section className="bg_white rounded-xl p-4">
      <div className="flex flex-col items-start sm:items-center gap-2">
        <h2 className="subheading text_primary font-bold text-start sm:text-center">
          Write a Review about{" "}
          <span className="capitalize">{reviewType === "individual" ? userInfo?.firstName : userInfo?.name}</span>
        </h2>
        <div className="bg_background py-3 px-2 w-full lg:w-1/2 rounded-full">
          <p className="text-center text_secondary font-bold capitalize">
            <span>{reviewType === "individual" ? userInfo?.firstName : userInfo?.name}</span>{" "}|{" "}
            <span>{userInfo?.phoneCode} {userInfo?.phone}</span>
          </p>
        </div>
      </div>
      <div className="mt-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <InputCategory
              name="category"
              label="Select Category"
              value={formData?.reviewCategory && formData?.reviewCategoryName ? {
                value: formData.reviewCategory, label: formData.reviewCategoryName
              } : null}
              onChange={handleSelectCategory}
              options={categoriesOptions}
              required={true}
              placeholder="Enter Categorie here"
              categoryError={categoryError}
            />
          </div>
          <div className={reviewStyle.widthcontainer}>
            <div className={`${reviewStyle.inputflex} w-full lg:w-[calc(50%-10px)]`}>
              <InputName
                label="Service Provided"
                id="service"
                name="service"
                placeholder="Enter the Service"
                className={reviewStyle.inputstyle}
                value={formData.service || ""}
                onChange={(e) => handleChange(e)}
                required={true}
              />
            </div>
            <div className={`${reviewStyle["inputflex"]} w-full lg:w-[calc(50%-10px)]`}>
              <InputDate
                autoComplete="off"
                label="Date of Experience"
                id="date"
                name="date"
                placeholder="Enter Date of Experience"
                className={reviewStyle["inputstyle"]}
                required={true}
                value={formData.date || ""}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div className={`${reviewStyle["inputflex"]}`}>
            <InputTextArea
              label="Tell Us More About Your Experience"
              id="description"
              name="description"
              placeholder="Write Your Experience"
              className={reviewStyle["inputstyle"]}
              onChange={(e) => handleChange(e)}
              required={true}
              value={formData.description || ""}
            />
          </div>
          <InputEvidenceUpload
            onChange={(e) => handleFileChange(e)}
            initialFiles={formData.evidence}
            required={true}
          />
          <div className={reviewStyle.widthcontainer}>
            {reviewType === "individual" && (
              <div className={`${reviewStyle.inputflex} w-full lg:w-[calc(50%-10px)]`}>
                <label>Payment <span className="text-[red]">*</span></label>
                <div className={reviewStyle.inputstyle}>
                  <StarRatingAddition
                    rating={rating}
                    setRating={setRating}
                    name="payment"
                  />
                </div>
              </div>
            )}
            {reviewType === "individual" && (
              <div className={`${reviewStyle.inputflex} w-full lg:w-[calc(50%-10px)]`}>
                <label>Solution / Resolution <span className="text-[red]">*</span></label>
                <div className={reviewStyle.inputstyle}>
                  <StarRatingAddition
                    rating={solutionRate}
                    setRating={setSolutionRate}
                    name="solutionResolution"
                  />
                </div>
              </div>
            )}
          </div>
          <div className={reviewStyle.widthcontainer}>
            {reviewType === "individual" && (
              <div className={`${reviewStyle.inputflex} w-full lg:w-[calc(50%-10px)]`}>
                <label>Communication <span className="text-[red]">*</span></label>
                <div className={reviewStyle.inputstyle}>
                  <StarRatingAddition
                    rating={communicationRate}
                    setRating={setCommunicationRate}
                    name="communication"
                  />
                </div>
              </div>
            )}
            <div className={`${reviewStyle.inputflex} w-full ${reviewType === "individual" && "lg:w-[calc(50%-10px)]"}`}>
              <label>Rate Your Experience <span className="text-[red]">*</span></label>
              <div className={reviewStyle.inputstyle}>
                <StarRatingAddition
                  rating={experienceRate}
                  setRating={setExperienceRate}
                  name="rateYourExperience"
                />
              </div>
            </div>
          </div>
          <div className={reviewStyle.buttonstyle}>
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ReviewAddition;