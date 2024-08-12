import { GenericObject } from "../interfaces";

type SchoolInfo = {
  name: string;
  yearAttended: string;
  locationOfSchool: string;
  qualification: string;
};

export const schoolObjectToArray = (data: GenericObject) => {
  return [
    {
      name: "",
      yearAttended: "",
      locationOfSchool: "",
      qualification: "",
    },
    {
      name: "",
      yearAttended: "",
      locationOfSchool: "",
      qualification: "",
    },
    {
      name: "",
      yearAttended: "",
      locationOfSchool: "",
      qualification: "",
    },
  ]
    .map((eachSchool, i) => {
      return {
        ...eachSchool,
        name: data?.[`nameOfSchoolAttended${i + 1}`] ?? "",
        yearAttended: data?.[`yearAttended${i + 1}`] ?? "",
        locationOfSchool: data?.[`locationOfSchoolAttended${i + 1}`] ?? "",
        qualification: data?.[`qualification${i + 1}`] ?? "",
      };
    })
    .filter((eachSchool, i) => {
      return (
        i === 0 || (i > 0 && eachSchool?.name && eachSchool?.locationOfSchool)
      );
    });
};

export const schoolArrayToObject = (data: SchoolInfo[]) => {
  const retValue: GenericObject = {};

  data.forEach((schoolInfo, index) => {
    retValue[`nameOfSchoolAttended${index + 1}`] = schoolInfo.name;
    retValue[`locationOfSchoolAttended${index + 1}`] =
      schoolInfo.locationOfSchool;
    retValue[`yearAttended${index + 1}`] = schoolInfo.yearAttended;
    retValue[`qualification${index + 1}`] = schoolInfo.qualification;
  });

  return retValue;
};
