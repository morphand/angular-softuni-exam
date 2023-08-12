type Result = {
  success: boolean;
  errors: Array<string>;
  value: Object;
  wasCached: boolean;
};

type LoginResult = Result & {
  value: {
    token: JSONWebToken;
  };
};

type JSONWebToken = string;

type Car = {
  _id: String;
  model: String;
  generation: String;
  madeIn: Number;
  class: String;
  doors: Number;
  powertrain: {
    fuel: String;
    sizeInL: Number;
    powerOutputInKw: Number;
    powerOutputInHp: Number;
    transmissionType: String;
    transmissionGears: Number;
  };
  dimensions: {
    lengthInMm: Number;
    widthInMm: Number;
    heightInMm: Number;
    weightInKg: Number;
  };
  imageURL: String;
};

type CatalogResult = Result & {
  value: { cars: Car[] };
};
