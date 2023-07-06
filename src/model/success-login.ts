export class SuccessLogin {
  access_token = "";
  authuser = "";
  expires_in = 0;
  prompt = "";
  scope = "";
  token_type = "";

  constructor(json: any) {
    if (json) {
      this.access_token = json.access_token;
      this.authuser = json.authuser;
      this.expires_in = json.expires_in;
      this.prompt = json.prompt;
      this.scope = json.scope;
      this.token_type = json.token_type;
    }
  }
}
