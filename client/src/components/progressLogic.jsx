import React from "react";
import ProgressBar from "./progressBar";

const testData = [
  { bgcolor: "#6a1b9a", completed: 60 },
  { bgcolor: "#00695c", completed: 30 },
  { bgcolor: "#ef6c00", completed: 53 },
];

function progressLogic() {
  return (
    <div className="progressMap">
      {testData.map((item, idx) => (
        <ProgressBar key={idx} bgcolor={item.bgcolor} completed={item.completed} />
      ))}
    </div>
  );
}

export default progressLogic;