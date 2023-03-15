import { useState } from "react";
import { useAtomValue } from "jotai";
import { classAtom } from "../state";

export default function Home() {
  const currentClass = useAtomValue(classAtom);
  return (
    <div className="p-10">
      <h1 className="font-semibold text-3xl text-center">RPG TODO</h1>
      <h1>
        {currentClass
          ? `Currently doing tasks for ${currentClass} Class!`
          : "Please select a class to plan some tasks"}
      </h1>
      {/* First bring in dropdowns from curated list */}
      {/* TODO - Create input element here, when input changes, update the state */}
      {/* also needs a dropdown input */}
    </div>
  );
}
