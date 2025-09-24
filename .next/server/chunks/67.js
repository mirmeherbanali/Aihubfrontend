"use strict";
exports.id = 67;
exports.ids = [67];
exports.modules = {

/***/ 661:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ ui_DynamicForm)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(6786);
// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(8038);
var react_default = /*#__PURE__*/__webpack_require__.n(react_);
// EXTERNAL MODULE: ./node_modules/react-dropzone/dist/es/index.js + 1 modules
var es = __webpack_require__(2170);
;// CONCATENATED MODULE: ./src/components/ui/DropzoneComponent.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 


const DropzoneComponent = ({ onDrop, error })=>{
    const handleDrop = (0,react_.useCallback)((acceptedFiles)=>{
        onDrop(acceptedFiles.length ? acceptedFiles : null);
    }, [
        onDrop
    ]);
    const { getRootProps, getInputProps, isDragActive } = (0,es/* useDropzone */.uI)({
        onDrop: handleDrop,
        multiple: false,
        accept: {
            "image/*": []
        },
        maxSize: 5 * 1024 * 1024
    });
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        ...getRootProps(),
        className: `w-full p-4 border-2 border-dashed rounded cursor-pointer text-center ${error ? "border-red-500" : "border-gray-300"}`,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("input", {
                ...getInputProps()
            }),
            isDragActive ? /*#__PURE__*/ jsx_runtime_.jsx("p", {
                children: "Drop the file here ..."
            }) : /*#__PURE__*/ jsx_runtime_.jsx("p", {
                children: "Drag & drop an image here, or click to select"
            }),
            error && /*#__PURE__*/ jsx_runtime_.jsx("p", {
                className: "text-red-500 text-sm mt-1",
                children: error
            })
        ]
    });
};
/* harmony default export */ const ui_DropzoneComponent = (DropzoneComponent);

;// CONCATENATED MODULE: ./src/components/ui/AsyncDropdown.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 

const AsyncDropdown = ({ field, value, onChange, error })=>{
    const [items, setItems] = (0,react_.useState)(field.options || []);
    const [loading, setLoading] = (0,react_.useState)(false);
    (0,react_.useEffect)(()=>{
        if (field.fetchOptions) {
            setLoading(true);
            field.fetchOptions().then((res)=>setItems(res)).finally(()=>setLoading(false));
        }
    }, [
        field
    ]);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("select", {
                value: value || "",
                onChange: (e)=>onChange?.(e.target.value),
                className: `w-full border p-2 rounded ${error ? "border-red-500" : ""}`,
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("option", {
                        value: "",
                        children: [
                            "Select ",
                            field.label
                        ]
                    }),
                    loading ? /*#__PURE__*/ jsx_runtime_.jsx("option", {
                        disabled: true,
                        children: "Loading..."
                    }) : items.map((opt)=>/*#__PURE__*/ jsx_runtime_.jsx("option", {
                            value: opt,
                            children: opt
                        }, opt))
                ]
            }),
            error && /*#__PURE__*/ jsx_runtime_.jsx("p", {
                className: "text-red-500 text-sm",
                children: error
            })
        ]
    });
};
/* harmony default export */ const ui_AsyncDropdown = (AsyncDropdown);

;// CONCATENATED MODULE: ./src/components/ui/DynamicForm.tsx




function DynamicFormInner({ fields, register, handleSubmit, formState, onSubmit, buttonText = "Submit", isLoading = false }) {
    const [imagePreviews, setImagePreviews] = (0,react_.useState)({});
    const [showPassword, setShowPassword] = (0,react_.useState)({});
    const handleImageChange = (name, files)=>{
        if (files && files[0]) {
            setImagePreviews((prev)=>({
                    ...prev,
                    [name]: URL.createObjectURL(files[0])
                }));
        }
    };
    return /*#__PURE__*/ jsx_runtime_.jsx("form", {
        onSubmit: handleSubmit(onSubmit),
        style: {
            background: "white",
            padding: "1.5rem",
            borderRadius: "8px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "1rem"
        },
        children: fields.map((field, idx)=>{
            const errorMsg = "name" in field ? (formState.errors[field.name]?.message) : undefined;
            switch(field.type){
                case "input":
                case "password":
                    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "form-group",
                        children: [
                            field.label && /*#__PURE__*/ jsx_runtime_.jsx("label", {
                                className: "form-group label",
                                children: field.label
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: field.type === "password" ? "password-input" : "",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                        type: field.type === "password" && showPassword[field.name] ? "text" : field.type,
                                        placeholder: field.placeholder,
                                        ...register(field.name),
                                        className: `form-control ${errorMsg ? "error" : ""}`,
                                        style: errorMsg ? {
                                            borderColor: "#d32f2f"
                                        } : {}
                                    }),
                                    field.type === "password" && /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                        type: "button",
                                        onClick: ()=>setShowPassword((prev)=>({
                                                    ...prev,
                                                    [field.name]: !prev[field.name]
                                                })),
                                        className: "password-toggle",
                                        children: showPassword[field.name] ? "Hide" : "Show"
                                    })
                                ]
                            }),
                            errorMsg && /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                className: "error",
                                children: errorMsg
                            })
                        ]
                    }, field.name);
                case "dropdown":
                    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "form-group",
                        children: [
                            field.label && /*#__PURE__*/ jsx_runtime_.jsx("label", {
                                className: "form-group label",
                                children: field.label
                            }),
                            field.fetchOptions ? /*#__PURE__*/ jsx_runtime_.jsx(ui_AsyncDropdown, {
                                field: field,
                                value: field.value,
                                onChange: field.onChange,
                                error: errorMsg
                            }) : /*#__PURE__*/ (0,jsx_runtime_.jsxs)("select", {
                                ...register(field.name),
                                className: "form-control",
                                style: errorMsg ? {
                                    borderColor: "#d32f2f"
                                } : {},
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("option", {
                                        value: "",
                                        children: [
                                            "Select ",
                                            field.label
                                        ]
                                    }),
                                    field.options?.map((opt)=>/*#__PURE__*/ jsx_runtime_.jsx("option", {
                                            value: opt,
                                            children: opt
                                        }, opt))
                                ]
                            }),
                            errorMsg && /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                className: "error",
                                children: errorMsg
                            })
                        ]
                    }, field.name);
                case "image":
                    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "form-group",
                        children: [
                            field.label && /*#__PURE__*/ jsx_runtime_.jsx("label", {
                                className: "form-group label",
                                children: field.label
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(ui_DropzoneComponent, {
                                onDrop: (files)=>handleImageChange(field.name, files),
                                error: errorMsg
                            }),
                            imagePreviews[field.name] && /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                src: imagePreviews[field.name],
                                alt: "preview",
                                style: {
                                    marginTop: "0.5rem",
                                    width: "80px",
                                    height: "80px",
                                    objectFit: "cover",
                                    borderRadius: "4px"
                                }
                            })
                        ]
                    }, field.name);
                case "button":
                    return /*#__PURE__*/ jsx_runtime_.jsx("button", {
                        type: "submit",
                        disabled: isLoading,
                        className: "btn btn-primary",
                        children: isLoading ? "Loading..." : field.label || buttonText
                    }, idx);
                default:
                    return null;
            }
        })
    });
}
const DynamicForm = /*#__PURE__*/ react_default().memo(DynamicFormInner);
/* harmony default export */ const ui_DynamicForm = (DynamicForm);


/***/ }),

/***/ 591:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ loginFields),
/* harmony export */   k: () => (/* binding */ registerFields)
/* harmony export */ });
// Login fields
const loginFields = [
    {
        type: "input",
        name: "email",
        placeholder: "Email",
        label: "Email"
    },
    {
        type: "password",
        name: "password",
        placeholder: "Password",
        label: "Password"
    },
    {
        type: "button",
        label: "Login"
    }
];
// Register fields
const registerFields = [
    {
        type: "input",
        name: "name",
        placeholder: "Name",
        label: "Name"
    },
    {
        type: "input",
        name: "email",
        placeholder: "Email",
        label: "Email"
    },
    {
        type: "password",
        name: "password",
        placeholder: "Password",
        label: "Password"
    },
    {
        type: "button",
        label: "Register"
    }
];


/***/ }),

/***/ 2460:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   b: () => (/* binding */ createLoginHandler),
/* harmony export */   w: () => (/* binding */ createRegisterHandler)
/* harmony export */ });
/* __next_internal_client_entry_do_not_use__ createLoginHandler,createRegisterHandler auto */ // Login handler - now returns a function that accepts router
const createLoginHandler = (loginUser, router)=>{
    return async (data)=>{
        try {
            await loginUser(data).unwrap();
            router.push("/dashboard");
        } catch (err) {
            console.error("Login failed", err);
        }
    };
};
// Register handler - now returns a function that accepts router
const createRegisterHandler = (registerUser, router)=>{
    return async (data)=>{
        try {
            await registerUser(data).unwrap();
            router.push("/auth/login");
        } catch (err) {
            console.error("Registration failed", err);
        }
    };
};


/***/ }),

/***/ 1023:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   I: () => (/* binding */ userSchema)
/* harmony export */ });
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5830);

const userSchema = zod__WEBPACK_IMPORTED_MODULE_0__/* .object */ .Ry({
    name: zod__WEBPACK_IMPORTED_MODULE_0__/* .string */ .Z_().min(2, "Name is too short"),
    email: zod__WEBPACK_IMPORTED_MODULE_0__/* .string */ .Z_().email("Invalid email"),
    password: zod__WEBPACK_IMPORTED_MODULE_0__/* .string */ .Z_().min(6, "Password must be at least 6 characters")
});


/***/ })

};
;