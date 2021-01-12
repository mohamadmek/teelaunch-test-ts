import { createSlice } from "@reduxjs/toolkit";

interface stateInterface {
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

export const selectImage = (state: any) => state.image.image;

export default imageSlice.reducer;
