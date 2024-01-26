import React from "react";

import { LectorIndex } from "../../components/LectorIndex/LectorIndex";
import { RelojIndex } from "../../components/RelojIndex/RelojIndex";

import { CompareContextProvider } from "../../context/compare.context";

import "./index.css";

export const Index = () => {

  return (
    <section className="indexPage">
      <RelojIndex />
      <CompareContextProvider>
        <LectorIndex />
      </CompareContextProvider>
    </section>
  );
};
