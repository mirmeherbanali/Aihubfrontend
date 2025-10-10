import RatingPage from "./components/RatingPage";
import { tools } from "./constant/data";

export default function RatingWrapper() {
  return <RatingPage toolsList={tools} />;
}
