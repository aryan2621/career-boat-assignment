export class User {
  email = "";
  family_name = "";
  given_name = "";
  id = "";
  locale = "";
  name = "";
  picture = "";
  verified_email = false;

  constructor(data: any) {
    if(data){
      this.email = data.email;
      this.family_name = data.family_name;
      this.given_name = data.given_name;
      this.id = data.id;
      this.locale = data.locale;
      this.name = data.name;
      this.picture = data.picture;
      this.verified_email = data.verified_email;
    }
  }
}
