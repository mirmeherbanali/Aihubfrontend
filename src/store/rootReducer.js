import { combineReducers } from "redux";

import adminAuth from "./slices/adminAuth.slice";
import businessAuth from "./slices/businessAuth.slice";
import individualAuth from "./slices/individualAuth.slice";
import categories from "./slices/category.slice";
import review from "./slices/review.slice";
import individual from "./slices/individual.slice";
import business from "./slices/business.slice";
import toggleTabs from "./slices/toggle.slice";
import testimonial from "./slices/testimonial.slice";
import businessRecentSearch from "./slices/businessRecentSearch.slice";
import individualRecentSearch from "./slices/individualRecentSearch.slice";
import admin from "./slices/admin.slice";
import notification from "./slices/notification.slice";
import moduleName from "./slices/moduleName.slice";
import individualReviewsRequest from "./slices/individualReviewsRequest.slice";
import individualActivityLog from "./slices/individualActivityLog.slice";
import businessActivityLog from "./slices/businessActivityLog.slice";
import adminActivityLog from "./slices/adminActivityLog.slice";
import userBrowserEndpoint from "./slices/userBrowserEndpoint.slice";
import businessReviewsRequest from "./slices/businessReviewsRequest.slice";

const rootReducer = combineReducers({
  adminAuth,
  businessAuth,
  individualAuth,
  review,
  individual,
  categories,
  toggleTabs,
  business,
  testimonial,
  businessRecentSearch,
  individualRecentSearch,
  admin,
  notification,
  moduleName,
  individualReviewsRequest,
  individualActivityLog,
  businessActivityLog,
  adminActivityLog,
  userBrowserEndpoint,
  businessReviewsRequest
});

export default rootReducer;
