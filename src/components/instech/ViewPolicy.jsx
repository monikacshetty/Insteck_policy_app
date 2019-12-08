import React, { useState, useEffect } from "react";
import PolicyService from "../../api/PolicyService";
import moment from "moment";

export default function ViewPolicy() {
  const [page, setPage] = useState(0);
  const [policyDetails, setPolicyDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadMorePolicy = () => {
    setPage(page + 1);
  };

  const loadPreviousPolicy = () => {
    if (page >= 0) {
      setPage(page - 1);
    }
  };

  useEffect(() => {
    PolicyService.fetchPolicy(page)
      .then(response => {
        setPolicyDetails(response.data);
        setIsLoading(false);
      })
      .catch(error => error);
  }, [page]);

  return (
    <div>
      {isLoading && <p>Wait Loading Policy for you</p>}
      <p>
        <br />
        <button
          onClick={loadPreviousPolicy}
          disabled={page === 0}
          className="btn btn-primary col-sm-1"
        >
          Previous
        </button>
        <button
          onClick={loadMorePolicy}
          disabled={policyDetails.length !== 8}
          className="btn btn-success col-sm-1"
        >
          Next
        </button>
        <br />
      </p>
      {policyDetails.length !== 0 && (
        <>
          <div>
            <table className="table table-striped">
              <thead>
                <tr className="tr">
                  <th>Brand id</th>
                  <th>Premium</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Owner</th>
                  <th>Kilometers</th>
                  <th>Car Model</th>
                  <th>Brand</th>
                </tr>
              </thead>
              <tbody>
                {policyDetails.map((c, index) => (
                  <tr key={index}>
                    <td>{c.id}</td>
                    <td>{c.premium}</td>
                    <td>{moment(c.period.start).format("MMM DD YYYY")}</td>
                    <td>{moment(c.period.end).format("MMM DD YYYY")}</td>
                    <td>{c.insuranceDetails.owners}</td>
                    <td>{c.insuranceDetails.kilometers}</td>
                    <td>{c.car.model}</td>
                    <td>{c.car.brand}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <hr />
          <div>
            <button
              onClick={loadPreviousPolicy}
              disabled={page === 0}
              className="btn btn-primary col-sm-1"
            >
              Previous
            </button>
            <button
              onClick={loadMorePolicy}
              disabled={policyDetails.length !== 8}
              className="btn btn-success col-sm-1"
            >
              Next
            </button>
          </div>

          <br />
        </>
      )}
    </div>
  );
}
