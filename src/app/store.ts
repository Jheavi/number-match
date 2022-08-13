import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../components/counter/counterSlice';
import panelReducer from "../components/PanelComponent/panelSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    panel: panelReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ['payload.row', 'payload.cell'],
        ignoredPaths: ['panel'],
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
