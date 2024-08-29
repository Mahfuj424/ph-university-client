import { useGetAcademicSemisterQuery } from "../../../redux/features/academicSemesterApi/AcademicSemesterApi";

const AcademicSemester = () => {
  const { data } = useGetAcademicSemisterQuery(undefined);
  console.log("academic semester =>",data);
  return <div>this is academic semester</div>;
};

export default AcademicSemester;
