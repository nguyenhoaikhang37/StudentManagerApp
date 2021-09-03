import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ListParams, ListResponse, PaginationParams, Student } from 'models';

export interface StudentState {
  loading: Boolean;
  list: Student[];
  filter: ListParams;
  pagination: PaginationParams;
}

const initialState: StudentState = {
  loading: false,
  list: [],
  filter: {
    _page: 1,
    _limit: 15,
  },
  pagination: {
    _page: 1,
    _limit: 15,
    _totalRows: 15,
  },
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    fetchStudentList(state, action: PayloadAction<ListParams>) {
      state.loading = true;
    },
    fetchStudentListSuccess(state, action: PayloadAction<ListResponse<Student>>) {
      state.loading = false;
      state.pagination = action.payload.pagination;
      state.list = action.payload.data;
    },
    fetchStudentListFailed(state) {
      state.loading = false;
    },

    setFilter(state, action: PayloadAction<ListParams>) {
      state.filter = action.payload;
    },
    setFilterWithDebounce(state, action: PayloadAction<ListParams>) {},
  },
});

//ACTIONS
export const studentActions = studentSlice.actions;
//REDUCER
const studentReducer = studentSlice.reducer;
export default studentReducer;
