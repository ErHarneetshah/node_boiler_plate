import jwt from "jsonwebtoken";
import { user } from "../Modules/common/user_model.js";
import app_config from "../Config/app_config.js";
import { access_token } from "../Modules/common/access_token_model.js";
import { failed } from "../utilities/helper.js";
import { api_codes } from "../utilities/api_codes.js";

const jwtConfig = new app_config().getjwtConfig();

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader)
      return failed(res, api_codes.BadRequest, "Access Denied. No Token Provided");

    const token = authHeader.replace("Bearer ", "");
    const accessToken = await access_token.findOne({ where: {token: token } });
    if (accessToken) {
      if (new Date() > accessToken.expiry_time) {
        await access_token.destroy({ where: { token: token } });
        return failed(res, api_codes.Unauthorized, "Token Expired. Please log in again");
      }
    }else{
      return failed(res, api_codes.Unauthorized, "Token Expired. Please log in again");
    }

    // Verify the token
    const decoded = jwt.verify(token, jwtConfig);

    const user_details = await user.findOne({
      where: { id: decoded.user_id},
      attributes: { exclude: ["password"] },
    });
    if (!user_details) return failed(res, api_codes.NotFound, "User not found in system!");

    if(!user_details.dataValues.status) return failed(res, api_codes.Unauthorized, "Your are not Allowed to Authorize!");

    req.user = user_details;
    req.sessionToken = token;
    next();
  } catch (e) {
    if (e.name === "TokenExpiredError") {
      return failed(res, api_codes.Unauthorized, "Already Logout");
    }
    return failed(res, api_codes.Unauthorized, "Authentication Failed");
  }
};
