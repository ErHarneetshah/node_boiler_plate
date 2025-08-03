import { api_codes } from "../utilities/api_codes.js";
import { failed, success } from "../utilities/helper.js";

export const functionName = async (req, res) => {
  try {
    let data = true;
    if (!data) return failed(res, api_codes.NotFound, "Data Not Found");

    return success(res, api_codes.Success, "Data Fetched Succesfully", data);
  } catch (error) { 
    console.log("Error in functionName: ", error.message);
    return failed(res, api_codes.BadRequest, error.message);
  }
};

