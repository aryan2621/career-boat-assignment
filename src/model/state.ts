export class State {
  success: boolean;
  pending: boolean;
  error: boolean;

  constructor() {
    this.success = false;
    this.pending = false;
    this.error = false;
  }

  setSuccess() {
    this.success = true;
    this.pending = false;
    this.error = false;
  }
  setPending() {
    this.success = false;
    this.pending = true;
    this.error = false;
  }
  setError() {
    this.success = false;
    this.pending = false;
    this.error = true;
  }

  setDefault() {
    this.success = false;
    this.pending = false;
    this.error = false;
  }
}
