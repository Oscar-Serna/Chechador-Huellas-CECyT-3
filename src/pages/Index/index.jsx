import React, { useEffect, useState } from "react";

import { LectorIndex } from "../../components/LectorIndex/LectorIndex";
import { RelojIndex } from "../../components/RelojIndex/RelojIndex";

import "./index.css";

export const Index = () => {

  return (
    <section className="indexPage">
      <RelojIndex />
      <LectorIndex />
    </section>
  );
};
