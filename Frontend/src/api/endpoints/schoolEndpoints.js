import { BASE_URL } from "../config";

const title = "school/";

export const schoolEndpoints = {
  getDepartments: () => `${BASE_URL}${title}departments`,
  getFaculties: () => `${BASE_URL}${title}faculties`,

};
