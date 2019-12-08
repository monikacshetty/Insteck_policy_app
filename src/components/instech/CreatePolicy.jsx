import React, { useState } from "react";
import PolicyForm from "./create/PolicyForm";
import PolicyDisplay from "./create/PolicyDisplay";

const CreatePolicy = () => {
  const [data, setData] = useState("");
  const [isDisplayForm, setIsDisplayForm] = useState(true);
  const [isdisplayPreview, setIsDisplayPreview] = useState(false);

  const callback = data => {
    setData(data);
  };

  const displayForm = displaydata => {
    setIsDisplayForm(displaydata);
    setIsDisplayPreview(false);
  };

  const displayPreview = displaydata => {
    setIsDisplayPreview(displaydata);
    setIsDisplayForm(false);
  };

  return (
    <>
      <div className="container">
        {isDisplayForm && (
          <PolicyForm
            parentCallback={callback}
            displayPreview={displayPreview}
          />
        )}
        {isdisplayPreview && (
          <PolicyDisplay displayProp={data} displayForm={displayForm} />
        )}
      </div>
    </>
  );
};
export default CreatePolicy;
