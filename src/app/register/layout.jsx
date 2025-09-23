"use client";
import "../../styles/globals.scss";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "@/store/store";
import Loading from '@/common/Loading/Loading';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



export default function RegisterLayout({ children }) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <html lang="en">
            <body className={`antialiased`}>
                <Provider store={store}>
                    <PersistGate loading={<Loading />} persistor={persistor}>
                        <QueryClientProvider client={queryClient}>
                            <main>{children}</main>
                            <ToastContainer stacked />
                        </QueryClientProvider>
                    </PersistGate>
                </Provider>
            </body>
        </html>
    );
};