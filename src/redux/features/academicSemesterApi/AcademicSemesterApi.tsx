import { baseApi } from "../../Api/baseApi";
const academicSemesterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAcademicSemister: builder.query({
      query: () => ({
        url: "/academic-semesters",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAcademicSemisterQuery } = academicSemesterApi;
