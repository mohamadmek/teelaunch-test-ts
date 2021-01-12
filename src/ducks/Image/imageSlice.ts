import { createSlice } from "@reduxjs/toolkit";

interface stateInterface {
  imageSlice?: any;
  image: string;
}

const initialState: stateInterface = {
  image: "",
};

export const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    setImageRed: (state, action) => {
      state.image = action.payload.image;
    },
  },
});

export const { setImageRed } = imageSlice.actions;

export const selectImage = (state: stateInterface) => state.imageSlice.image;

export default imageSlice.reducer;
