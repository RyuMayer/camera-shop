import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { APIRoute, NameSpace } from '../../const';
import { TReview, TReviewPostData } from '../../types/review';
import { TCamera } from '../../types/camera';

type TExtra = {
  extra: AxiosInstance;
};

export const fetchReview = createAsyncThunk<TReview[], TCamera['id'], TExtra>(
  `${NameSpace.Review}/fetchReview`,
  async (id, { extra: api }) => {
    const { data } = await api.get<TReview[]>(
      `${APIRoute.Cameras}/${id}${APIRoute.Reviews}`,
    );
    return data;
  },
);

export const fetchPostReview = createAsyncThunk<
  void,
  {
    reviewData: TReviewPostData;
  },
  TExtra
>(
  `${NameSpace.Review}/fetchPostReview`,
  async ({ reviewData }, { extra: api }) => {
    await api.post(APIRoute.Reviews, reviewData);
  },
);
