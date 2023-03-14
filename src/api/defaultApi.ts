import { BaseAPI, RequestCallOptions } from "./base";
import {
  FeatureCollectionDto,
  FeatureDto,
  PointDto,
  PolygonDto,
} from "./geojson";

export interface SchoolFeaturePropertiesDto {
  navn: string;
  antall_elever: number;
  antall_ansatte: number;
  eierforhold: SchoolFeaturePropertiesDtoEierforholdEnum;
  kommunenummer: string;
}

export const SchoolFeaturePropertiesDtoEierforholdEnumValues = [
  "Offentlig",
  "Privat",
];

export type SchoolFeaturePropertiesDtoEierforholdEnum =
  (typeof SchoolFeaturePropertiesDtoEierforholdEnumValues)[number];

export type SchoolFeatureDto = FeatureDto<PointDto, SchoolFeaturePropertiesDto>;

export type SchoolFeatureCollectionDto = FeatureCollectionDto<SchoolFeatureDto>;

export interface MunicipalityFeaturePropertiesDto {
  kommunenummer: string;
  navn: string;
}

export type MunicipalityFeatureDto = FeatureDto<
  PolygonDto,
  MunicipalityFeaturePropertiesDto
>;

export type MunicipalityFeatureCollectionDto =
  FeatureCollectionDto<MunicipalityFeatureDto>;

export class DefaultApi extends BaseAPI {
  constructor() {
    super("/react-ghpages/");
  }

  /**
   *
   * @throws {HttpError}
   */
  public async listMunicipalityFeatures(
    params: RequestCallOptions = {}
  ): Promise<MunicipalityFeatureCollectionDto> {
    return await this.fetch(
      this.basePath + "/geojson/municipalities.json",
      params
    );
  }

  /**
   *
   * @throws {HttpError}
   */
  public async listSchoolFeatures(
    params: RequestCallOptions = {}
  ): Promise<SchoolFeatureCollectionDto> {
    return await this.fetch(this.basePath + "/geojson/schools.json", params);
  }
}
