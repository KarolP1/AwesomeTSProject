import {getJobRequests} from './Jobs/getJobs.thunk';
import {Action, AnyAction, createSlice} from '@reduxjs/toolkit';
import {useAppSelector} from '../hooks';
import {addAllergy} from './allergies/addAllergy.thunk';
import {IResponseGetMyProfile} from './types';
import {editMyProfileAddress} from './core/profileAddressEditUserData.thunk';
import {getMyProfile} from './core/profileCore.thunk';
import {editMyProfile} from './core/profileEditUserData.thunk';
import {deleteAllergy} from './allergies/deleteAllergy.thunk';
import {addMyProfileImage} from './core/profileAddImageProfile.thunk';
import {addNewJobRequest} from './Jobs/addNewJobRequest';
import {deleteJobRequests} from './Jobs/deleteJob.thunk';

const initialState: IResponseGetMyProfile = {
  error: undefined,
  message: undefined,
  data: null,
  isLoading: false,
  succes: false,
};

const MyProfileSlice = createSlice({
  name: 'myProfile',
  initialState,
  reducers: {
    cleanUpGetMyProfile: state => {
      state.data = initialState.data;
      state.message = initialState.message;
      state.isLoading = initialState.isLoading;
      state.succes = initialState.succes;
      state.error = initialState.error;
    },
  },
  extraReducers: builder => {
    //#region get profile
    builder.addCase(getMyProfile.rejected, (state, {payload}) => {
      state.error = payload;
      state.succes = false;

      state.isLoading = false;
    });
    builder.addCase(getMyProfile.fulfilled, (state, {payload}: AnyAction) => {
      state.error = null;
      state.succes = true;
      state.data = payload.data;
      state.isLoading = false;
      state.message = payload.message;
    });
    builder.addCase(getMyProfile.pending, (state, {payload}) => {
      state.isLoading = true;
    });
    //#endregion
    //#region edit profile
    builder.addCase(editMyProfile.rejected, (state, {payload}) => {
      state.error = payload;
      state.succes = false;

      state.isLoading = false;
    });
    builder.addCase(editMyProfile.fulfilled, (state, {payload}: AnyAction) => {
      state.error = null;
      state.succes = true;
      state.data = payload.data;
      state.isLoading = false;
      state.message = payload.message;
    });
    builder.addCase(editMyProfile.pending, (state, {payload}) => {
      state.isLoading = true;
    });
    //#endregion
    //#region edit my address
    builder.addCase(editMyProfileAddress.rejected, (state, {payload}) => {
      state.error = payload;
      state.succes = false;

      state.isLoading = false;
    });
    builder.addCase(
      editMyProfileAddress.fulfilled,
      (state, {payload}: AnyAction) => {
        state.error = null;
        state.succes = true;
        state.isLoading = false;
        state.message = payload.message;
        if (state.data) {
          state.data.address = payload.data;
        }
      },
    );
    builder.addCase(editMyProfileAddress.pending, (state, {payload}) => {
      state.isLoading = true;
    });
    //#endregion
    //#region add Allergy
    builder.addCase(addAllergy.rejected, (state, {payload}) => {
      state.error = payload;
      state.succes = false;

      state.isLoading = false;
    });
    builder.addCase(addAllergy.fulfilled, (state, {payload}: AnyAction) => {
      state.error = null;
      state.succes = true;
      state.isLoading = false;
      state.message = payload.message;
      if (state.data) {
        state.data.allergies.allergies = [
          ...state.data.allergies.allergies,
          payload.data,
        ];
      }
    });
    builder.addCase(addAllergy.pending, (state, {payload}) => {
      state.isLoading = true;
    });
    //#endregion
    //#region delete allergy
    builder.addCase(deleteAllergy.rejected, (state, {payload}) => {
      state.error = payload;
      state.succes = false;

      state.isLoading = false;
    });
    builder.addCase(deleteAllergy.fulfilled, (state, {payload}: AnyAction) => {
      state.error = null;
      state.succes = true;
      state.isLoading = false;
      state.message = payload.message;
      if (state.data?.allergies) {
        state.data.allergies = payload.data;
      }
    });
    builder.addCase(deleteAllergy.pending, (state, {payload}) => {
      state.isLoading = true;
    });
    //#endregion
    //#region profile image
    builder.addCase(addMyProfileImage.rejected, (state, {payload}) => {
      state.error = payload;
      state.succes = false;

      state.isLoading = false;
    });
    builder.addCase(
      addMyProfileImage.fulfilled,
      (state, {payload}: AnyAction) => {
        state.error = null;
        state.succes = true;
        state.isLoading = false;
        state.message = payload.message;
        if (state.data?.images) {
          state.data.images = payload.data;
        }
      },
    );
    builder.addCase(addMyProfileImage.pending, (state, {payload}) => {
      state.isLoading = true;
    });
    //#endregion

    //#region profile job add
    builder.addCase(addNewJobRequest.rejected, (state, {payload}) => {
      state.error = payload;
      state.succes = false;

      state.isLoading = false;
    });
    builder.addCase(
      addNewJobRequest.fulfilled,
      (state, {payload}: AnyAction) => {
        state.error = null;
        state.succes = true;
        state.isLoading = false;
        state.message = payload.message;
        if (state.data?.jobs) {
          state.data.jobs = payload.data;
        }
      },
    );
    builder.addCase(addNewJobRequest.pending, (state, {payload}) => {
      state.isLoading = true;
    });

    //#endregion
    //#region profile job get
    builder.addCase(getJobRequests.rejected, (state, {payload}) => {
      state.error = payload;
      state.succes = false;

      state.isLoading = false;
    });
    builder.addCase(getJobRequests.fulfilled, (state, {payload}: AnyAction) => {
      state.error = null;
      state.succes = true;
      state.isLoading = false;
      state.message = payload.message;
      if (state.data?.jobs) {
        state.data.jobs = payload.data;
      }
    });
    builder.addCase(getJobRequests.pending, (state, {payload}) => {
      state.isLoading = true;
    });

    //#endregion
    //#region profile job delete
    builder.addCase(deleteJobRequests.rejected, (state, {payload}) => {
      state.error = payload;
      state.succes = false;

      state.isLoading = false;
    });
    builder.addCase(
      deleteJobRequests.fulfilled,
      (state, {payload}: AnyAction) => {
        state.error = null;
        state.succes = true;
        state.isLoading = false;
        state.message = payload.message;
        if (state.data?.jobs) {
          state.data.jobs = payload.data;
        }
      },
    );
    builder.addCase(deleteJobRequests.pending, (state, {payload}) => {
      state.isLoading = true;
    });

    //#endregion
  },
});

export const getMyRecipesError = () =>
  useAppSelector(state => state.profile.error);
export const {cleanUpGetMyProfile} = MyProfileSlice.actions;
export default MyProfileSlice.reducer;
