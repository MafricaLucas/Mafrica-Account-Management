import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserType {
    name: string;
    id: string;
    email: string;
    currency: "Euro" | "Dollars" | "Sterling" | "Yen";
    balance: number;
}

interface UserState {
  users: UserType[];
}

const initialState: UserState = {
  users: [],
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<UserType[]>) => {
      state.users = action.payload;
    },
    // autres reducers...
  },
});

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;
