"use client";
import { motion } from "framer-motion";
import InputCategoryAddition from "../Input/InputCategoryAddition";

const AddCategory = ({
  handleRemoveCategory,
  categoryList,
  formData,
  setFormData,
  handleAddAditionalCategory,
  handlesetPrimaryCategory,
  userInfo,
}) => {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl p-5 space-y-4 bg_background">
        <h2 className="heading text_primary">Select a Category</h2>
        <p className="text_black content1">
          Stand out on Drgon Customer and in search results by placing your
          business in the right category. You can assign your company up to 6
          Categories (1 Primary and 5 Secondary).
        </p>
        <div>
          <InputCategoryAddition
            name="categories"
            label="Add a Category"
            value={formData}
            onChange={(selectedOptions) => setFormData(selectedOptions || [])}
            options={categoryList?.map((service) => ({
              value: service?._id,
              label: service?.name,
            }))}
            placeholder="Enter Category here"
            required
            isMulti={true}
          />
        </div>
        <div className="space-x-5 flex justify-end">
          <button
            className="w-40 py-2 btn-border rounded-full text_secondary cursor-pointer"
            onClick={() => setFormData([])}
          >
            Cancel
          </button>
          <button
            className="w-40 py-2 bg_secondary rounded-full text-white cursor-pointer"
            onClick={handleAddAditionalCategory}
          >
            Add Category
          </button>
        </div>
      </div>
      <div className="rounded-2xl p-5 space-y-4 bg_background">
        <h2 className="heading text_primary">
          You've added your business to these categories:
        </h2>
        {userInfo?.additionalCategoryDetails?.map((category, index) => (
          <div
            key={index}
            className="w-full bg-white px-4 py-8 rounded-xl flex flex-col md:flex-row space-y-2 md:space-y-0 justify-between"
          >
            <div className="flex items-center justify-between md:space-x-5">
              <h2 className="text_secondary content1">{category?.name}</h2>
              {category?._id === userInfo?.primaryCategoryDetails?._id && (
                <motion.h2
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.7 }}
                  className="w-20 py-1 md:w-40 md:py-2 text-center bg-[#035140]/10 rounded-full text_secondary content1 cursor-pointer"
                >
                  Primary
                </motion.h2>
              )}
            </div>
            <div className="space-x-1 md:space-x-6">
              {category?._id !== userInfo?.primaryCategoryDetails?._id && (
                <motion.button
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.7 }}
                  onClick={() => handlesetPrimaryCategory(category?._id)}
                  className="w-30 md:w-40 py-1 md:py-2 btn-border rounded-full text_secondary content1 cursor-pointer"
                >
                  Set as Primary
                </motion.button>
              )}
              <button
                onClick={() => handleRemoveCategory(category?._id)}
                className="w-30 md:w-40 py-1 md:py-2 bg_secondary rounded-full text-white content1 cursor-pointer"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddCategory;
