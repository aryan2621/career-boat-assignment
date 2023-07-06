class FormClass {
  name = "";
  email = "";
  phone = "";
  message = "";
  time = new Date().getTime().toString();
  status = Status.pending;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(json: any) {
    this.name = json.name;
    this.email = json.email;
    this.phone = json.phone;
    this.message = json.message;
    this.status = json.status ? json.status : Status.pending;
  }
}

enum Status {
  pending = "pending",
  approved = "approved",
  rejected = "rejected",
}

export { FormClass, Status };
