import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { ShowSchool } from "./showSchool";
import { ListSchools } from "./listSchools";
import { SchoolFeatureCollectionDto } from "../../api/defaultApi";

export function SchoolsRoute({
  schools,
}: {
  schools: SchoolFeatureCollectionDto;
}) {
  return (
    <Routes>
      <Route path={"/:id"} element={<ShowSchool schools={schools} />} />
      <Route path={"/"} element={<ListSchools schools={schools} />} />
    </Routes>
  );
}
