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
