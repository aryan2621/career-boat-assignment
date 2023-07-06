import PieChart from "../components/chart";

export default function Home() {
  const scrollToChart = () => {
    const element = document.getElementById("chart");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <>
      <div className="container">
        <div className="jumbotron">
          <h2>Introducing JobSift: Your Ultimate Job Filling Website</h2>
          <br />
          <p className="lead">
            Are you tired of spending countless hours searching for the perfect
            candidates to fill your job vacancies? Look no further! JobSift is
            here to revolutionize your hiring process and make it easier than
            ever to find the right talent for your organization.
          </p>
          <hr className="my-4" />
          <p>
            At JobSift, we understand the challenges faced by employers when it
            comes to filling job positions. Whether you're a small startup or a
            large corporation, finding qualified candidates who align with your
            company culture and meet the required skillset can be a daunting
            task. That's why we've developed a user-friendly, efficient, and
            comprehensive job filling website to streamline the entire process.
          </p>
          <p className="lead">
            <a className="btn btn-primary btn-lg" onClick={scrollToChart}>
              Learn more
            </a>
          </p>
        </div>
      </div>
      <div id="chart" className="container mt-3" style={{ width: 300 }}>
        <PieChart />
      </div>
    </>
  );
}
