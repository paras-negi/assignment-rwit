"use client";
import React, {useState, useEffect} from "react";
import Button from "./buttons";
import { useUserDetailsService } from "../services/useDetailsInfo";

export default function step2({ show, currStep, onSuccess, goToPreviousStep }) {
  const { userInfo } = useUserDetailsService();
  const [info, setInfo] = useState({
    add_on: {
      name: "add_on",
      error: "",
      label: "Add ons",
      value: "",
    },
  });

  useEffect(() => {
    let copyInfo = { ...info };
    if (userInfo["add_on"]) {
      copyInfo["add_on"] = userInfo["add_on"];
      setInfo(copyInfo);
    }
  }, []);

  const handleChange = (_event) => {
    const { value, name } = _event.target;
    let selectedAddon = availableAddOns.find(d=> d.id === +value);
    let copyInfo = { ...info };
    copyInfo[name]["value"] = value;
    copyInfo[name]["error"] = "";
    copyInfo[name]["displayValue"]= selectedAddon.label
    setInfo(copyInfo);
  };

  if (!show) return null;

  return (
    <div className="info"> 
      <h3>Select Add ons</h3>

      <select onChange={handleChange} name="add_on" className="mY4">
        <option key={"n"} selected={!info["add_on"]["value"]} disabled>
          {" "}
          Choose Add ons{" "}
        </option>

        {availableAddOns?.map((data, index) => {
          return (
            <option
              key={index}
              value={data.id}
              selected={data.id === info["add_on"]["value"]}
            >
              {data.label}
            </option>
          );
        })}
        <option></option>
      </select>
      <p className="error">{info["add_on"]["error"]}</p>

      <div className="flex justify-between" style={{marginTop: "1rem"}}>
        <Button onClickBtn={() => goToPreviousStep(currStep - 1)} text="Previous step">
          Previous step
        </Button>

        <Button
          onClickBtn={() => {
            if (!info["add_on"]["value"]) {
              let copy = { ...info };
              copy["add_on"]["error"] = "Please select plan";
              setInfo(copy);
              return;
            }

            onSuccess(info);
          }}
        >
          Next step
        </Button>
      </div>
    </div>
  );
}

const availableAddOns = [
  { name: "add_on1", label: "Add on 1", id: 501 },
  { name: "add_on2", label: "Add on 1", id: 502 },
  { name: "add_on3", label: "Add on 1", id: 503 },
  { name: "add_on4", label: "Add on 1", id: 504 },
];
