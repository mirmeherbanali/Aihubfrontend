exports.id = 288;
exports.ids = [288];
exports.modules = {

/***/ 902:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 7056))

/***/ }),

/***/ 7056:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  ClientProviders: () => (/* binding */ ClientProviders)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(6786);
// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(8038);
// EXTERNAL MODULE: ./node_modules/react-redux/lib/index.js
var lib = __webpack_require__(8250);
// EXTERNAL MODULE: ./node_modules/@tanstack/react-query/build/lib/QueryClientProvider.mjs
var QueryClientProvider = __webpack_require__(212);
// EXTERNAL MODULE: ./node_modules/@reduxjs/toolkit/dist/redux-toolkit.cjs.production.min.js
var redux_toolkit_cjs_production_min = __webpack_require__(1388);
// EXTERNAL MODULE: ./node_modules/@reduxjs/toolkit/dist/query/rtk-query.cjs.production.min.js
var rtk_query_cjs_production_min = __webpack_require__(1011);
// EXTERNAL MODULE: ./src/features/auth/authApi.ts + 1 modules
var authApi = __webpack_require__(7096);
;// CONCATENATED MODULE: ./src/store/index.ts



const store = (0,redux_toolkit_cjs_production_min.configureStore)({
    reducer: {
        [authApi/* authApi */.iJ.reducerPath]: authApi/* authApi */.iJ.reducer
    },
    middleware: (getDefaultMiddleware)=>getDefaultMiddleware().concat(authApi/* authApi */.iJ.middleware)
});
(0,rtk_query_cjs_production_min.setupListeners)(store.dispatch);

// EXTERNAL MODULE: ./node_modules/@tanstack/query-core/build/lib/queryClient.mjs + 13 modules
var queryClient = __webpack_require__(2496);
;// CONCATENATED MODULE: ./src/lib/react-query.ts

const react_query_queryClient = new queryClient/* QueryClient */.S({
    defaultOptions: {
        queries: {
            retry: 2,
            refetchOnWindowFocus: false,
            staleTime: 1000 * 60 * 5
        }
    }
});

;// CONCATENATED MODULE: ./src/app/provider/ClientProviders.tsx
/* __next_internal_client_entry_do_not_use__ ClientProviders auto */ 





function ClientProviders({ children }) {
    return /*#__PURE__*/ jsx_runtime_.jsx(lib.Provider, {
        store: store,
        children: /*#__PURE__*/ jsx_runtime_.jsx(QueryClientProvider/* QueryClientProvider */.aH, {
            client: react_query_queryClient,
            children: children
        })
    });
}


/***/ }),

/***/ 7096:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  iJ: () => (/* binding */ authApi),
  YA: () => (/* binding */ useLoginMutation),
  l4: () => (/* binding */ useRegisterMutation)
});

// UNUSED EXPORTS: useGetProfileQuery, useLogoutMutation, useRefreshQuery

// EXTERNAL MODULE: ./node_modules/@reduxjs/toolkit/dist/query/react/rtk-query-react.cjs.production.min.js
var rtk_query_react_cjs_production_min = __webpack_require__(3298);
// EXTERNAL MODULE: ./node_modules/zod/v3/types.js + 6 modules
var types = __webpack_require__(5830);
;// CONCATENATED MODULE: ./src/env.ts

// ======================
// 1️⃣ Server-only environment schema
// ======================
const serverEnvSchema = types/* object */.Ry({
    NODE_ENV: types/* enum */.Km([
        "development",
        "test",
        "production"
    ]),
    NEXT_PUBLIC_SUPABASE_KEY: types/* string */.Z_().min(1)
});
// ======================
// 2️⃣ Client-safe environment schema
// ======================
const clientEnvSchema = types/* object */.Ry({
    NEXT_PUBLIC_API_URL: types/* string */.Z_().url(),
    ANALYZE: types/* string */.Z_().optional()
});
// ======================
// 3️⃣ Parse environment variables safely
// ======================
// Server-side parsing (only on Node.js)
const serverEnv =  true ? serverEnvSchema.parse(process.env) : 0;
// Client-side parsing (only NEXT_PUBLIC_* variables)
const clientEnv = clientEnvSchema.parse({
    NEXT_PUBLIC_API_URL: "https://api.aidirectory.com",
    ANALYZE: process.env.NEXT_PUBLIC_ANALYZE
});
// ======================
// 4️⃣ Export typed ENV object
// ======================
const ENV = {
    // Server-only vars
    NODE_ENV: serverEnv?.NODE_ENV ?? "development",
    SUPABASE_KEY: serverEnv?.NEXT_PUBLIC_SUPABASE_KEY ?? "",
    // Client-safe vars
    API_URL: clientEnv.NEXT_PUBLIC_API_URL,
    ANALYZE: clientEnv.ANALYZE === "true"
};
// ======================
// 5️⃣ Convenience flags
// ======================
const IS_DEV = ENV.NODE_ENV === "development";
const IS_PROD = ENV.NODE_ENV === "production";
const IS_TEST = ENV.NODE_ENV === "test";

;// CONCATENATED MODULE: ./src/features/auth/authApi.ts


const authApi = (0,rtk_query_react_cjs_production_min.createApi)({
    reducerPath: "authApi",
    baseQuery: (0,rtk_query_react_cjs_production_min.fetchBaseQuery)({
        baseUrl: ENV.API_URL,
        credentials: "include"
    }),
    endpoints: (builder)=>({
            login: builder.mutation({
                query: (body)=>({
                        url: "/auth/login",
                        method: "POST",
                        body
                    })
            }),
            register: builder.mutation({
                query: (body)=>({
                        url: "/auth/register",
                        method: "POST",
                        body
                    })
            }),
            refresh: builder.query({
                query: ()=>"/auth/refresh"
            }),
            logout: builder.mutation({
                query: ()=>({
                        url: "/auth/logout",
                        method: "POST"
                    })
            }),
            getProfile: builder.query({
                query: ()=>"/auth/me"
            })
        })
});
const { useLoginMutation, useRegisterMutation, useRefreshQuery, useLogoutMutation, useGetProfileQuery } = authApi;


/***/ }),

/***/ 2457:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ RootLayout),
  metadata: () => (/* binding */ metadata)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(6786);
// EXTERNAL MODULE: ./src/globals.css
var globals = __webpack_require__(8903);
// EXTERNAL MODULE: ./node_modules/next/dist/build/webpack/loaders/next-flight-loader/module-proxy.js
var module_proxy = __webpack_require__(1363);
;// CONCATENATED MODULE: ./src/app/provider/ClientProviders.tsx

const proxy = (0,module_proxy.createProxy)(String.raw`E:\Aihubfrontend\src\app\provider\ClientProviders.tsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule, $$typeof } = proxy;
const __default__ = proxy.default;

const e0 = proxy["ClientProviders"];

;// CONCATENATED MODULE: ./src/app/layout.tsx



const metadata = {
    title: "Aidirectory",
    description: "Your AI-powered directory solution",
    viewport: "width=device-width, initial-scale=1",
    themeColor: "#007acc"
};
function RootLayout({ children }) {
    return /*#__PURE__*/ jsx_runtime_.jsx("html", {
        lang: "en",
        children: /*#__PURE__*/ jsx_runtime_.jsx("body", {
            children: /*#__PURE__*/ jsx_runtime_.jsx(e0, {
                children: children
            })
        })
    });
}


/***/ }),

/***/ 8903:
/***/ (() => {



/***/ })

};
;