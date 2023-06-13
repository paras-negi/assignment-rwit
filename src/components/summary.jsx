import React from "react";
import Button from "./buttons";
import { useUserDetailsService } from "../services/useDetailsInfo";

export default function summary({ show }) {
  const { userInfo } = useUserDetailsService();
  if (!show) return null;

  return (
    <div className="info">
      <h3>Summary</h3>
      {Object.values(userInfo)?.length ? (
        <React.Fragment>
          <div className="info-content">
            <ul>
              {Object.values(userInfo).map((d, i) => (
                <li key={i}>
                  <div className="info-label">{d.label}:</div>
                  <div className="info-data">{d.displayValue ?? d.value}</div>
                </li>
              ))}
            </ul>
          </div>

          <Button text="Submit" onClick={() => {}}></Button>
        </React.Fragment>
      ) : (
        <p>No data found...</p>
      )}
    </div>
  );
}
