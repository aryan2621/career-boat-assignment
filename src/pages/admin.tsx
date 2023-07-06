import { useEffect, useState } from "react";
import { FormClass, Status } from "../model/form";
import { updateForm } from "../apis/status-manager";
import { getForms } from "../apis/form-manager";
import NotFound from "../components/not-found";

export default function Admin() {
  const [forms, setForms] = useState<FormClass[]>([]);

  useEffect(() => {
    (async () => {
      const res = await getForms();
      setForms(res ? res : []);
    })();
  }, []);

  const handleAccept = (form: FormClass) => async () => {
    await updateForm(Status.approved, form.time);
  };
  const handleReject = (form: FormClass) => async () => {
    await updateForm(Status.rejected, form.time);
  };

  return (
    <>
      <div className="w-75 mx-auto">
        {forms.length === 0 ? (
          <NotFound />
        ) : (
          <div className="row">
            {forms.map((form: FormClass) => (
              <div className="col-12 col-sm-6 col-lg-4 pt-4" key={form.time}>
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
                    <br />
                    <div className="btn-group w-75 mx-auto" role="group">
                      <button
                        type="button"
                        onClick={handleAccept(form)}
                        className="btn btn-primary"
                      >
                        Accept
                      </button>
                      <button
                        type="button"
                        onClick={handleReject(form)}
                        className="btn btn-info "
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
