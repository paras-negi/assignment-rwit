"use client";
import React, { useState, useEffect } from "react";
import Button from "./buttons";

import { useUserDetailsService } from "../services/useDetailsInfo";
import pageCss from "../styles/page.module.scss";
let regex = {
  userName: /^[ A-Za-z ]*$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[+\d]+$/,
};

const formElements = {
  userName: {
    value: "",
    name: "userName",
    error: "",
    label: "Name",
    type: "text",
    placeholder: "e.g.Stephen King",
    capitalise: false,
    returnType: "string",
    accept: "",
    maxLength: 150,
    strict: false,
    isDisabled: false,
  },

  email: {
    value: "",
    name: "email",
    error: "",
    label: "Email address",
    type: "text",
    placeholder: "mailto:e.g.Stephenking@lorem.com",
    capitalise: false,
    returnType: "string",
    accept: "",
    maxLength: 100,
    strict: false,
    isDisabled: false,
  },

  phone: {
    value: "",
    name: "phone",
    error: "",
    label: "Phone number",
    type: "tel",
    placeholder: "e.g + 1234 567 890",
    maxLength: 16,
    accept: "",
    isDisabled: false,
  },
};

export default function step1({ show, onSuccess }) {
  const { userInfo } = useUserDetailsService();
  const [info, setInfo] = useState({});

  useEffect(() => {
    let copyInfo = { ...info };
    let copyFormElements = { ...formElements };

    if (Object.values(userInfo)?.length) {
      for (let key in formElements) {
        if (userInfo[key]) {
          copyInfo[key] = userInfo[key];
        }
      }
    } else {
      copyInfo = copyFormElements;
    }
    setInfo(copyInfo);
  }, []);

  const handleChange = (_event, properties) => {
    let copyInfo = { ...info };
    const { name, value } = _event.target;
    const { maxLength } = properties;

    let err = "";

    let charMatchStatus = regex[name].test(value);
    let valLength = String(value.trim().length);
    if (valLength && valLength > maxLength) return;

    switch (name) {
      case "email":
        err = !charMatchStatus ? "Please enter valid email address" : "";
        break;

      case "phone":
        let totalDigits = value.length;
        if (value?.trim()?.length && !charMatchStatus || totalDigits > maxLength) return;
        err = totalDigits < 8 ? "Please enter valid phone number" : "";
        break;

        default:
          if (value && value.trim().length && !charMatchStatus) return;
          break;
    }

    copyInfo[name]["value"] = value;
    copyInfo[name]["error"] = err;
    setInfo(copyInfo);

    // if (name === "email") {
    //   err = !charMatchStatus ? "Please enter valid email address" : "";
    //   copyInfo[name]["value"] = value;
    //   copyInfo[name]["error"] = err;
    //   setInfo(copyInfo);
    //   return;
    // }
    // if (name === "phone") {
    //   let totalDigits = value.length;
    //   if (!charMatchStatus || totalDigits > maxLength) return;

    //   err = totalDigits < 8 ? "Please enter valid phone number" : "";

    //   copyInfo[name]["value"] = value;
    //   copyInfo[name]["error"] = err;
    //   setInfo(copyInfo);
    //   return;
    // }

    // if (value && value.trim().length && !charMatchStatus) return;

    // copyInfo[name]["value"] = value;
    // copyInfo[name]["error"] = err;
    // setInfo(copyInfo);
  };

  const onSubmit = (_event) => {
    _event.preventDefault();
    const { isProceed } = validateBeforeSubmit();
    if (!isProceed) return;

    onSuccess && onSuccess(info);
  };

  const validateBeforeSubmit = () => {
    let isProceed = true;
    let copyInfo = { ...info };

    for (let key in info) {
      let innerObj = { ...info[key] };
      if (!innerObj?.value?.trim()?.length || innerObj?.error) {
        if (!innerObj?.value?.trim()?.length) {
          innerObj["error"] = "Required";
          copyInfo[key] = innerObj;
        }
        isProceed = false;
      }else{
        if(copyInfo["phone"]){
          if(!validatePhone(copyInfo["phone"]["value"])){
            copyInfo["phone"]["error"] = "Country code missing";
            isProceed = false;
          }
        }
      }
    }

    setInfo(copyInfo);
    return { isProceed };
  };

  const  validatePhone=(phone)=> {
    var pattern = /^\+\d{1,3}\d{3,14}$/;
    return pattern.test(phone);
  }

  if (!show) return null;

  return (
    <div className="info">
      <h3>Personal info</h3>
      <p>Please provide your name,email address,and phone number.</p>

      <form method="post" onSubmit={onSubmit}>
        <div>
          {Object.values(formElements)?.map((properties, index) => (
            <div key={index} className="pt4">
              <label>{properties.label}</label>
              <input
                type={properties.type}
                placeholder={properties.placeholder}
                name={properties.name}
                value={info?.[properties?.name]?.value}
                id={properties.name}
                onChange={(_evt) => handleChange(_evt, properties)}
              />
              <p className="error">{properties.error}</p>
            </div>
          ))}
        </div>
        <div className="text-right pt8">
          <Button text="Next step" type="submit" />
        </div>
      </form>
    </div>
  );
}
