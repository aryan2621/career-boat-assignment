import { useEffect, useState } from "react";
import { FormClass, Status } from "../model/form";
import { addForm, getForms } from "../apis/form-manager";
import NotFound from "../components/not-found";
import { State } from "../model/state";

export default function Form() {
  const formObj = new FormClass({});
  const [form, setForm] = useState(formObj);
  const [forms, setForms] = useState<FormClass[]>([]);
  const state = new State();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      state.setPending();
      e.preventDefault();
      await addForm(form);
      state.setSuccess();
    } catch (error) {
      state.setError();
      console.log("Error while submission", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setForm({ ...form, message: value });
  };
  useEffect(() => {
    (async () => {
      const res = await getForms();
      setForms(res ? res : []);
    })();
  }, []);

  return (
    <>
      <div className="row mx-auto">
        <div className="col">
          <div className="w-75 mx-auto">
            <div className="card mt-2 mx-auto p-4 bg-light">
              <div className="card-body bg-light">
                <div className="container">
                  <form onSubmit={handleSubmit}>
                    <div className="controls">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                              id="name"
                              type="text"
                              name="name"
                              className="form-control"
                              value={form.name}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                              id="email"
                              type="email"
                              name="email"
                              className="form-control"
                              value={form.email}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <input
                          id="phone"
                          type="phone"
                          name="phone"
                          className="form-control"
                          value={form.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea
                              id="message"
                              name="message"
                              className="form-control"
                              value={form.message}
                              rows={4}
                              onChange={handleMessageChange}
                            ></textarea>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <input
                            type="submit"
                            className="btn btn-success mt-2 w-100"
                            value=" Submit"
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          {forms.length === 0 ? (
            <NotFound />
          ) : (
            <>
              <div className="row">
                {forms.map((form: FormClass) => (
                  <div
                    className="col-12 col-sm-6 col-lg-4 pt-4"
                    key={form.time}
                  >
                    <div
                      className={
                        "card " +
                        (form.status === Status.pending
                          ? "bg-warning"
                          : form.status === Status.approved
                          ? "bg-success"
                          : "bg-secondary")
                      }
                    >
                      <div className="card-body">
                        <h5 className="card-title">
                          {form.name} &#91;{form.status}&#93;
                        </h5>
                        <h6 className="card-subtitle mb-2">{form.email}</h6>
                        <p className="card-text">{form.message}</p>
                        <h6 className="card-subtitle mb-2">{form.phone}</h6>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
