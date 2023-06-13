"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { notFound } from 'next/navigation';

import Step1 from "../../components/step1";
import Step2 from "../../components/step2";
import Step3 from "../../components/step3";
import Summary from "../../components/summary";
import { useUserDetailsService } from "../../services/useDetailsInfo";

import pageCss from "../../styles/page.module.scss";

export default function page() {
  const params = useParams();
  const router = useRouter();

  const { updateUserInfo } = useUserDetailsService();
  const [pageData, setPageData] = useState({
    currStep: null,
    allInfo: {},
    errorMsg: "",
  });

  useEffect(() => {
    const { steps } = params;
    let { id } = allSteps.find((d) => d.id === +steps) || {};
    if (id) {
      setPageData({ ...pageData, currStep: id });
    }else{
      notFound();
    }
  }, []);

  const onUpdateInfo = (info) => {
    let copyAllInfo = { ...pageData.allInfo };
    for (let key in info) {
      copyAllInfo[key] = info[key];
    }
    let step = pageData.currStep + 1;
    updateUserInfo(copyAllInfo);
    router.replace(`/${step}`);
  };

  const handleSteps = (step) => {
    router.replace(`/${step}`);
    setPageData({ ...page, currStep: step });
  };

  return (
    <div className={pageCss["container"]}>
      <div className="main-container">
        <div className="main-left">
          <ul className="list">
            {allSteps.map((steps, index) => (
              <li
                key={index}
                onClick={() => {
                  handleSteps(steps.value);
                }}
              >
                <div
                  className={`list-number ${
                    pageData.currStep === steps.id ? "list-number-active" : ""
                  }`}
                >
                  {steps.id}
                </div>
                <div>
                  <div className="list-step">Step {steps.id}</div>
                  <div className="list-label">{steps.label}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="main-right">
          <Step1
            show={pageData.currStep === 1}
            currStep={pageData.currStep}
            onSuccess={onUpdateInfo}
            // updateSteps={updateCompletedSteps}
          />
          <Step2
            show={pageData.currStep === 2}
            currStep={pageData.currStep}
            onSuccess={onUpdateInfo}
            goToPreviousStep={handleSteps}
            // updateSteps={updateCompletedSteps}
          />
          <Step3
            show={pageData.currStep === 3}
            currStep={pageData.currStep}
            onSuccess={onUpdateInfo}
            goToPreviousStep={handleSteps}
            // updateSteps={updateCompletedSteps}
          />
          <Summary
            show={pageData.currStep === 4}
            currStep={pageData.currStep}
            goToPreviousStep={handleSteps}
            // updateSteps={updateCompletedSteps}
            // data={Object.values(pageData.allInfo)}
          />

          <p className="error">{pageData.errorMsg}</p>
        </div>
      </div>
    </div>
  );
}

const allSteps = [
  {
    label: "YOUR INFO",
    value: 1,
    id: 1,
  },

  {
    label: "SELECT PLAN",
    value: 2,
    id: 2,
  },

  {
    label: "ADD-ONS",
    value: 3,
    id: 3,
  },

  {
    label: "SUMMARY",
    value: 4,
    id: 4,
  },
];
