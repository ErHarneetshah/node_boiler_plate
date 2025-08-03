import Validator from "validatorjs";

// Greater Than Equal To Condition
Validator.registerAsync("gte", function (columnValue, attribute, req, passes) {
  if (parseFloat(attribute) > parseFloat(columnValue)) {
    return passes(false, `The ${req} should be greater than or equal to ${attribute}`);
  } else {
    return passes();
  }
});

// Greater Than Condition
Validator.registerAsync("gt", function (columnValue, attribute, req, passes) {
  if (parseFloat(attribute) >= parseFloat(columnValue)) {
    return passes(false, `The ${req} should be greater than ${attribute}`);
  } else {
    return passes();
  }
});

// Verify Working Wallet Address Condition
Validator.registerAsync("is_wallet_address", function (columnValue, attribute, req, passes) {
  const isAddress = TronWeb.isAddress(columnValue);
  if (isAddress === false) {
    return passes(false, `Invalid Wallet Address`);
  } else {
    return passes();
  }
});

// Verify Certain Column value is unique or not
Validator.registerAsync("unique", function (columnValue, attribute, req, passes) {
  const attr = attribute.split(","); // 0 = tablename , 1 = columnname
  columnValue = columnValue.trim();
  Model.query(`SELECT * FROM ${attr[0]} Where ${attr[1]} = "${columnValue}" LIMIT 1`)
    .then(([results]) => {
      return results.length == 0 ? passes() : passes(false, `The ${req} already exists in company.`);
    })
    .catch((error) => {
      return passes(false, error.message);
    });
});

// Verify Certain Column value exists or not
Validator.registerAsync("exists", function (columnValue, attribute, req, passes) {
  const attr = attribute.split(",");
  Model.query(`SELECT * FROM ${attr[0]} Where ${attr[1]} = "${columnValue}" LIMIT 1`)
    .then(([results]) => {
      return results.length == 0 ? passes(false, `The ${req} is not Exists.`) : passes();
    })
    .catch((error) => {
      return passes(false, error.message);
    });
});

// Verify Certain Column Except a Value exists or not
Validator.registerAsync("exists-except", function (columnValue, attribute, req, passes) {
  const attr = attribute.split(","); // 0 = tablename , 1 = columnname, 2 = expect column, 3 = expect column value
  Model.query(`SELECT * FROM ${attr[0]} Where ${attr[1]} = "${columnValue}" AND ${attr[2]} != ${attr[3]} LIMIT 1`)
    .then(([results]) => {
      return results.length > 0 ? passes(false, `The ${req} is Already Exists.`) : passes();
    })
    .catch((error) => {
      return passes(false, error.message);
    });
});

const validCountryCodes = new Set([
  "AD",
  "AE",
  "AF",
  "AG",
  "AI",
  "AL",
  "AM",
  "AO",
  "AQ",
  "AR",
  "AS",
  "AT",
  "AU",
  "AW",
  "AX",
  "AZ",
  "BA",
  "BB",
  "BD",
  "BE",
  "BF",
  "BG",
  "BH",
  "BI",
  "BJ",
  "BL",
  "BM",
  "BN",
  "BO",
  "BQ",
  "BR",
  "BS",
  "BT",
  "BV",
  "BW",
  "BY",
  "BZ",
  "CA",
  "CC",
  "CD",
  "CF",
  "CG",
  "CH",
  "CI",
  "CK",
  "CL",
  "CM",
  "CN",
  "CO",
  "CR",
  "CU",
  "CV",
  "CW",
  "CX",
  "CY",
  "CZ",
  "DE",
  "DJ",
  "DK",
  "DM",
  "DO",
  "DZ",
  "EC",
  "EE",
  "EG",
  "EH",
  "ER",
  "ES",
  "ET",
  "FI",
  "FJ",
  "FM",
  "FO",
  "FR",
  "GA",
  "GB",
  "GD",
  "GE",
  "GF",
  "GG",
  "GH",
  "GI",
  "GL",
  "GM",
  "GN",
  "GP",
  "GQ",
  "GR",
  "GT",
  "GU",
  "GW",
  "GY",
  "HK",
  "HM",
  "HN",
  "HR",
  "HT",
  "HU",
  "ID",
  "IE",
  "IL",
  "IM",
  "IN",
  "IO",
  "IQ",
  "IR",
  "IS",
  "IT",
  "JE",
  "JM",
  "JO",
  "JP",
  "KE",
  "KG",
  "KH",
  "KI",
  "KM",
  "KN",
  "KP",
  "KR",
  "KW",
  "KY",
  "KZ",
  "LA",
  "LB",
  "LC",
  "LI",
  "LK",
  "LR",
  "LS",
  "LT",
  "LU",
  "LV",
  "LY",
  "MA",
  "MC",
  "MD",
  "ME",
  "MF",
  "MG",
  "MH",
  "MK",
  "ML",
  "MM",
  "MN",
  "MO",
  "MP",
  "MQ",
  "MR",
  "MS",
  "MT",
  "MU",
  "MV",
  "MW",
  "MX",
  "MY",
  "MZ",
  "NA",
  "NC",
  "NE",
  "NF",
  "NG",
  "NI",
  "NL",
  "NO",
  "NP",
  "NR",
  "NU",
  "NZ",
  "OM",
  "PA",
  "PE",
  "PF",
  "PG",
  "PH",
  "PK",
  "PL",
  "PM",
  "PN",
  "PR",
  "PT",
  "PW",
  "PY",
  "QA",
  "RE",
  "RO",
  "RS",
  "RU",
  "RW",
  "SA",
  "SB",
  "SC",
  "SD",
  "SE",
  "SG",
  "SH",
  "SI",
  "SJ",
  "SK",
  "SL",
  "SM",
  "SN",
  "SO",
  "SR",
  "SS",
  "ST",
  "SV",
  "SX",
  "SY",
  "SZ",
  "TC",
  "TD",
  "TF",
  "TG",
  "TH",
  "TJ",
  "TK",
  "TL",
  "TM",
  "TN",
  "TO",
  "TR",
  "TT",
  "TV",
  "TZ",
  "UA",
  "UG",
  "US",
  "UY",
  "UZ",
  "VA",
  "VC",
  "VE",
  "VG",
  "VI",
  "VN",
  "VU",
  "WF",
  "WS",
  "YE",
  "YT",
  "ZA",
  "ZM",
  "ZW",
]);

// Verify Correct Country Code used or not
Validator.register(
  "swift-regex",
  function (value, requirement, attribute) {
    // requirement parameter defaults to null
    if (!value.match(/^[A-Z]{4}[A-Z]{2}[A-Z0-9]{2}([A-Z0-9]{3})?$/)) {
      return false;
    }
    const countryCode = value.slice(4, 6);
    return validCountryCodes.has(countryCode);
  },
  "The SWIFT format is invalid."
);

// Constraint for Certain Way of Password
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/;
Validator.register("password_regex", (value) => passwordRegex.test(value), "Password must contain at least one uppercase letter, one lowercase letter and one number");

// Constraint for Certain Way of Date
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
Validator.register("date_regex", (value) => dateRegex.test(value), `Date Must in Format YYYY-MM-DD`);

// const upiRegex = /^[\w.-]+@[\w.-]+$/;
// Validator.register('upi_regex', value => upiRegex.test(value), "UPI ID Format is Invalid");

// const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
// Validator.register('ifsc_regex', value => ifscRegex.test(value), "IFSC Code Format is Invalid");

const firstError = (validation) => {
  const firstkey = Object.keys(validation.errors.errors)[0];
  return validation.errors.first(firstkey);
};

export const validate = async (request, rules, messages = {}) => {
  if (typeof request != "object" || typeof rules != "object" || typeof messages != "object") {
    return {
      status: 0,
      message: "Invalid Params",
    };
  }
  let validation = new Validator(request, rules, messages);
  return new Promise((resolve, reject) => {
    validation.checkAsync(
      () => resolve({ status: 1, message: "" }),
      () => reject({ status: 0, message: firstError(validation) })
    );
  })
    .then((r) => r)
    .catch((err) => err);
};