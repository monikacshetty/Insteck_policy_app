import React from "react";
import Header from "./partial/Header";
import CreatePolicy from "./CreatePolicy";
import ViewPolicy from "./ViewPolicy";
import Footer from "./partial/Footer";
import { BrowserRouter as Router, Switch } from "react-router-dom";

export default function PolicyApp() {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <CreatePolicy path="/create" />
          <ViewPolicy path="/" />
        </Switch>
        <Footer />
      </Router>
    </>
  );
}
