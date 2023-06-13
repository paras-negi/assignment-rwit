"use client";
import React, { useState, useEffect } from "react";
import Button from "./buttons";
import { useUserDetailsService } from "../services/useDetailsInfo";

export default function step2({ show, currStep, onSuccess, goToPreviousStep }) {
  const { userInfo } = useUserDetailsService();
  const [info, setInfo] = useState({
    plan: {
      name: "plan",
      error: "",
      label: "Your plan",
      value: "",
      displayValue: ""
    },
  });

  useEffect(() => {
    let copyInfo = { ...info };
    if (userInfo["plan"]) {
      copyInfo["plan"] = userInfo["plan"];
      setInfo(copyInfo);
    }
  }, []);

  const handleChange = (_event) => {
    const { value, name } = _event.target;
    let selectedPlan = availablePlans.find(d=> d.id === +value);
    let copyInfo = { ...info };
    copyInfo[name]["value"] = value;
    copyInfo[name]["error"] = "";
    copyInfo[name]["displayValue"]= selectedPlan.label
    setInfo(copyInfo);
  };

  if (!show) return null;

  return (
    <div className="info">
      <h3 >Select plans</h3>

      <select onChange={handleChange} name="plan" className="mY4">
        <option key={"n"} selected={!info["plan"]["value"]} disabled>
          {" "}
          Select plan{" "}
        </option>

        {availablePlans?.map((data, index) => {
          return (
            <option
              key={index}
              value={data.id}
              selected={data.id === info["plan"]["value"]}
            >
              {data.label}
            </option>
          );
        })}
        <option></option>
      </select>

      <p className="error">{info["plan"]["error"]}</p>

      <div className="flex justify-between" style={{marginTop: "1rem"}}>
        <Button onClickBtn={() => goToPreviousStep(currStep - 1)} text="Previous step">
          Previous step
        </Button>

        <Button
          onClickBtn={() => {
            if (!info["plan"]["value"]) {
              let copy = { ...info };
              copy["plan"]["error"] = "Please select plan";
              setInfo(copy);
              return;
            }

            onSuccess(info);
          }}
          text="Next step"
        >
          Next step
        </Button>
      </div>
    </div>
  );
}

const availablePlans = [
  { name: "plan1", label: "Plan 1", id: 201 },
  { name: "plan2", label: "Plan 2", id: 202 },
  { name: "plan1", label: "Plan 3", id: 203 },
  { name: "plan1", label: "Plan 4", id: 204 },
  { name: "plan1", label: "Plan 5", id: 205 },
];
