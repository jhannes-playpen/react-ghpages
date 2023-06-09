import { Link, useParams } from "react-router-dom";
import { slugify } from "./slugify";
import { useMapFit, useMapLayer } from "../map";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Feature } from "ol";
import * as React from "react";
import { useMemo } from "react";
import { FeatureLike } from "ol/Feature";
import { useClickOnSchool } from "./useClickOnSchool";
import { schoolCircleStyle, textStyle } from "./style";
import { geometryFromDto } from "../map/createFeatureSource";
import {
  SchoolFeatureCollectionDto,
  SchoolFeaturePropertiesDto,
} from "../../api/defaultApi";
import { FeatureDto, PointDto } from "../../api/geojson";

function schoolToFeature(
  school: FeatureDto<PointDto, SchoolFeaturePropertiesDto>
) {
  const feature = new Feature({
    ...school.properties,
    geometry: geometryFromDto(school.geometry),
  });
  feature.setId(slugify(school.properties));
  return feature;
}

const selectedStyleOffentlig = schoolCircleStyle([255, 0, 0]);
const selectedStylePrivat = schoolCircleStyle([128, 0, 255]);
const nonSelectedStyleOffentlig = schoolCircleStyle([255, 0, 0, 0.4]);
const nonSelectedStylePrivat = schoolCircleStyle([128, 0, 255, 0.4]);

export function ShowSchool({
  schools,
}: {
  schools: SchoolFeatureCollectionDto;
}) {
  const { id } = useParams();
  const school = schools.features.find(
    (school) => slugify(school.properties) === id
  )!;
  const schoolPoint = useMemo(() => geometryFromDto(school.geometry), [school]);

  function style(feature: FeatureLike) {
    const school = feature.getProperties() as SchoolFeaturePropertiesDto;
    if (feature.getId() == id) {
      const circleStyle =
        school.eierforhold === "Offentlig"
          ? selectedStyleOffentlig
          : selectedStylePrivat;
      return [circleStyle, textStyle(school.navn)];
    }
    return school.eierforhold === "Offentlig"
      ? nonSelectedStyleOffentlig
      : nonSelectedStylePrivat;
  }

  useMapLayer(
    new VectorLayer({
      style,
      source: new VectorSource({
        features: schools.features.map(schoolToFeature),
      }),
    }),
    [id]
  );
  useClickOnSchool([id]);

  useMapFit(schoolPoint, {
    maxZoom: 12,
    duration: 400,
  });
  return (
    <div>
      <h3>
        <Link to={".."}>Schools »</Link>
      </h3>
      <h2>{school.properties.navn}</h2>
      <ul>
        <li>Antall elever: {school.properties.antall_elever}</li>
        <li>Antall ansatte: {school.properties.antall_ansatte}</li>
        <li>Eierform: {school.properties.eierforhold}</li>
      </ul>
    </div>
  );
}
