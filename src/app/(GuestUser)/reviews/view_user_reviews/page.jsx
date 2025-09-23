"use client";

import { useState } from "react";
import store, { persistor } from "@/store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Loading from "@/common/Loading/Loading";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ViewUserReviews from "@/components/GuestUser/Container/ViewUserReviews/ViewUserReviews";

export default function ViewReviewDetails() {
    const [queryClient] = useState(() => new QueryClient());
    return (
        <Provider store={store}>
            <PersistGate loading={<Loading />} persistor={persistor}>
                <QueryClientProvider client={queryClient}>
                    <ViewUserReviews />
                </QueryClientProvider>
            </PersistGate>
        </Provider>
    )
};