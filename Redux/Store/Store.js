import { configureStore } from '@reduxjs/toolkit';
import dialogOpenReducer from "../Reducer/DialogOpenReducer";

const store = configureStore(
  {
    reducer   : {
      isDialogOpen: dialogOpenReducer,
    }
  }
);

export default store;