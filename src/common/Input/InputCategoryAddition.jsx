"use client";
import React from "react";
import Select, { components } from "react-select";
import style from "./InputCustomCss/InputCategoryAddition.module.scss";
import { AnimatePresence, motion } from "framer-motion";

const HorizontalMenuList = (props) => {
    return (
        <AnimatePresence>
            {props.selectProps.menuIsOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0.6, y: -10 }}
                    transition={{ duration: 0.7 }}
                >
                    <components.Menu className="flex flex-wrap justify-start items-center gap-2" {...props}>
                        {props.children}
                    </components.Menu>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const InputCategoryAddition = ({
    name,
    label,
    value,
    onChange,
    options,
    required = false,
    placeholder = "Enter Category here",
    className = "",
    labelClassName = "",
    isMulti = true,
}) => {
    return (
        <div>
            <label
                htmlFor={name}
                className={`block text-[14px] lg:text-[17px] font-semibold mb-1 ${labelClassName}`}
            >
                {label} {required && <span className="text-red-500 font-bold">*</span>}
            </label>
            <div className={style.inputCategory}>
                <Select
                    inputId={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    options={options}
                    placeholder={placeholder}
                    isSearchable
                    menuPosition="fixed"
                    menuShouldScrollIntoView={false}
                    closeMenuOnSelect={false}
                    isMulti={isMulti}
                    className={`w-full ${className}`}
                    classNamePrefix="react-select"
                    components={{
                        MenuList: HorizontalMenuList,
                    }}
                    styles={{
                        menu: (base) => ({
                            ...base,
                            position: "relative",
                            boxShadow: "none",
                            border: "none",
                            borderRadius: 0,
                            backgroundColor: "#F5F5F5",
                            marginTop: "16px",
                        }),
                        option: (base, state) => ({
                            ...base,
                            minWidth: "120px",
                            margin: "0 4px",
                            whiteSpace: "nowrap",
                            backgroundColor: state.isSelected
                                ? "#035140"
                                : state.isFocused
                                    ? "#eee"
                                    : "#C7F2E0",
                            color: state.isSelected ? "#035140" : "#000",
                            textAlign: "center",
                            cursor: "pointer",
                            borderRadius: "50%",
                        }),
                        multiValue: (base) => ({
                            ...base,
                            backgroundColor: "#E6F1EE",
                            borderRadius: "9999px",
                            padding: "2px 8px",
                            fontSize: "14px",
                            fontWeight: "500",
                            color: "#065F46",
                            display: "flex",
                        }),
                        multiValueLabel: (base) => ({
                            ...base,
                            color: "#065F46",
                        }),
                        multiValueRemove: (base) => ({
                            ...base,
                            color: "#065F46",
                            ":hover": {
                                backgroundColor: "#C7F2E0",
                                color: "#047857",
                                borderRadius: "50%",
                            },
                        }),
                    }}
                />
            </div>
        </div>
    );
};

export default InputCategoryAddition;
