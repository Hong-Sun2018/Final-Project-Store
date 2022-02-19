import { configureStore } from '@reduxjs/toolkit';
import dialogOpenReducer from '../Reducer/DialogOpenReducer';
import dialogMessageReducer from '../Reducer/DialogMessageReducer';

const store = configureStore(
  {
    reducer   : {
      isDialogOpen: dialogOpenReducer,
      dialogMessage: dialogMessageReducer,
    }
  }
);

export default store;