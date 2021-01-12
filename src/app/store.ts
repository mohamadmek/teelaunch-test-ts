import { configureStore } from "@reduxjs/toolkit";
import imageSlice from "../ducks/Image/imageSlice";

export default configureStore({
  reducer: {
    imageSlice,
  },
});
