import React, { useState, useEffect } from "react";
import useForm from "react-hook-form";
import { format, addDays } from "date-fns";
import PolicyService from "../../../api/PolicyService";

const PolicyForm = ({ parentCallback, displayPreview }) => {
  const { register, handleSubmit, errors } = useForm();
  const [cars, setCars] = useState([]);
  const [models, setModels] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [owners, setOwners] = useState("");
  const [kilometers, setKilometers] = useState(0);
  const [modelId, setModelId] = useState(0);
  useEffect(() => {
    fetchBrands();
  }, [endDate]);

  const fetchBrands = () => {
    PolicyService.fetchBrands().then(response => {
      setCars(response.data);
    });
  };

  const fetchModels = event => {
    let selectedIndex = event.target.options.selectedIndex;
    let brand = event.target.options[selectedIndex].getAttribute("id");
    PolicyService.fetchModels(brand).then(response => setModels(response.data));
  };

  const fetchModelId = event => {
    let selectedIndex = event.target.options.selectedIndex;
    let id = event.target.options[selectedIndex].getAttribute("id");
    setModelId(id);
  };

  const onPreview = data => {
    const params = {
      modelId: modelId,
      start: startDate,
      end: endDate,
      owners: owners,
      kilometers: kilometers
    };
    PolicyService.fetchPremium(params)
      .then(function(response) {
        data.premium = response.data;
        data.modelId = modelId;
        parentCallback(data);
        displayPreview(true);
      })
      .catch(function(error) {});
  };
  return (
    <>
      <div class="page-header">
        <h3>Create Policy</h3>
      </div>
      <form onSubmit={handleSubmit(onPreview)}>
        <div className="form-group">
          <label>Brand</label>
          <select
            name="brand"
            ref={register}
            className="form-control"
            id="brand"
            onChange={e => fetchModels(e)}
          >
            {" "}
            <option>---select---</option>
            {cars.map(cars => (
              <option key={cars.id} id={cars.id}>
                {cars.name}
              </option>
            ))}
          </select>
          {errors.brand && <span>This field is required</span>}
        </div>

        <div className="form-group">
          <label>Model</label>
          <select
            name="model"
            ref={register}
            className="form-control"
            id="model"
            onChange={e => fetchModelId(e)}
          >
            <option>---select---</option>
            {models.map(models => (
              <option key={models.id} id={models.id}>
                {models.name}
              </option>
            ))}
          </select>
          {errors.brand && <span>This field is required</span>}
        </div>
        <div className="row">
          <div className="form-group col-sm-4">
            <label>
              Start Date:
              <input
                type="date"
                className="form-control"
                name="sdate"
                ref={register}
                onChange={e => setStartDate(e.target.value)}
              />
            </label>
            {errors.sdate && <span>This field is required</span>}
          </div>

          <div className="form-group col-sm-4">
            <label>
              End Date:
              <input
                className="form-control"
                ref={register}
                type="date"
                name="endD"
                min={format(addDays(new Date(startDate), 120), "yyyy-MM-dd")}
                max={format(addDays(new Date(startDate), 720), "yyyy-MM-dd")}
                onChange={e => setEndDate(e.target.value)}
              />
            </label>
            {errors.endD && <span>This field is required</span>}
          </div>
        </div>
        <div className="row">
          <div className="form-group col-sm-4">
            <label>
              Owner:
              <input
                name="owners"
                ref={register({
                  required: "Required",
                  max: {
                    value: 10,
                    message: "error number < 10"
                  },
                  min: {
                    value: 1,
                    message: "error number > 1"
                  }
                })}
                type="number"
                className="form-control"
                onChange={e => setOwners(e.target.value)}
                value={owners}
              />
              {errors.owners && <span>{errors.owners.message}</span>}
            </label>
          </div>

          <div className="form-group col-sm-4">
            <label>
              Kilometers:
              <input
                ref={register({
                  required: "Required",
                  max: {
                    value: 50000,
                    message: "error number < 50000"
                  },
                  min: {
                    value: 1000,
                    message: "error number >= 1000"
                  }
                })}
                type="number"
                name="kilometers"
                className="form-control"
                onChange={e => setKilometers(e.target.value)}
              />
              {errors.kilometers && <span>{errors.kilometers.message}</span>}
            </label>
          </div>
        </div>
        <input type="submit" className="btn btn-info" value="Preview" />
      </form>
    </>
  );
};
export default PolicyForm;