import React, { useState } from "react";
import useForm from "react-hook-form";
import PolicyService from "../../../api/PolicyService";
import moment from "moment";

const PolicyDisplay = ({ displayProp, displayForm }) => {
  const { handleSubmit } = useForm();
  const [isPolicySubmittedSuccess, setIsPolicySubmittedSuccess] = useState(
    false
  );
  const [isPolicySubmittedError, setIsPolicySubmittedError] = useState(false);
  const newPolicyOnclick = () => {
    displayForm(true);
  };

  const submitPolicy = () => {
    const policy = {
      modelId: displayProp.modelId,
      period: {
        start: displayProp.sdate,
        end: displayProp.endD
      },
      owners: displayProp.owners,
      kilometers: displayProp.kilometers
    };

    PolicyService.executeSendPolicy(policy)
      .then(function(response) {
        setIsPolicySubmittedSuccess(true);
      })
      .catch(function(error) {
        setIsPolicySubmittedError(true);
      });
  };

  return (
    <div onSubmit={handleSubmit(submitPolicy)}>
      {isPolicySubmittedSuccess && (
        <div className="alert alert-success">Policy created successfully!</div>
      )}

      {isPolicySubmittedError && (
        <div className="alert alert-danger">Error while creating policy!</div>
      )}
      <div>Preview of Data </div>

      <p> </p>

      <div className="form-group row">
        <label htmlFor="car" className="col-sm-4 col-form-label">
          <strong>Brand:</strong>
        </label>
        <div className="col-sm-4">
          <input
            type="text"
            readOnly
            className="form-control-plaintext"
            id="car"
            value={displayProp.brand}
          />
        </div>
      </div>

      <div className="form-group row">
        <label htmlFor="model" className="col-sm-4 col-form-label">
          <strong>Model:</strong>
        </label>
        <div className="col-sm-4">
          <input
            type="text"
            readOnly
            className="form-control-plaintext"
            id="model"
            value={displayProp.model}
          />
        </div>
      </div>

      <div className="form-group row">
        <label htmlFor="startDate" className="col-sm-4 col-form-label">
          <strong>Start Date:</strong>
        </label>
        <div className="col-sm-4">
          <input
            type="text"
            readOnly
            className="form-control-plaintext"
            id="startDate"
            value={moment(displayProp.sDate).format("MMM DD YYYY")}
          />
        </div>
      </div>

      <div className="form-group row">
        <label htmlFor="endDate" className="col-sm-4 col-form-label">
          <strong>End Date:</strong>
        </label>
        <div className="col-sm-4">
          <input
            type="text"
            readOnly
            className="form-control-plaintext"
            id="endDate"
            value={moment(displayProp.endD).format("MMM DD YYYY")}
          />
        </div>
      </div>

      <div className="form-group row">
        <label htmlFor="kilometers" className="col-sm-4 col-form-label">
          <strong>Kilometers:</strong>
        </label>
        <div className="col-sm-4">
          <input
            type="text"
            readOnly
            className="form-control-plaintext"
            id="kilometers"
            value={displayProp.kilometers}
          />
        </div>
      </div>

      <div className="form-group row">
        <label htmlFor="owners" className="col-sm-4 col-form-label">
          <strong>Owner:</strong>
        </label>
        <div className="col-sm-4">
          <input
            type="text"
            readOnly
            className="form-control-plaintext"
            id="owners"
            value={displayProp.owners}
          />
        </div>
      </div>

      <div className="form-group row">
        <label htmlFor="owners" className="col-sm-4 col-form-label">
          <strong>Premium Cost:</strong>
        </label>
        <div className="col-sm-4">
          <input
            type="text"
            readOnly
            className="form-control-plaintext"
            id="owners"
            value={displayProp.premium}
          />
        </div>
      </div>
      <div className="form-group row">
        <div className="col-sm-2">
          <input
            type="button"
            className="btn btn-primary"
            onClick={submitPolicy}
            value="Submit Policy"
          />
        </div>
        <div className="col-sm-2">
          <input
            type="button"
            className="btn btn-info"
            onClick={newPolicyOnclick}
            value=" New Policy"
          />
        </div>
      </div>
    </div>
  );
};

export default PolicyDisplay;
