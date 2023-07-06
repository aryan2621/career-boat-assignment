import { Doughnut, Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { FormClass, Status } from "../model/form";
import { getForms } from "../apis/form-manager";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart() {
  const [forms, setForms] = useState<FormClass[]>([]);
  const [data, setData] = useState({
    labels: ["Approved", "Pending", "Rejected"],
    datasets: [
      {
        label: "Status stats",
        data: [0, 0, 0],
        backgroundColor: [
          "rgba(0, 255, 0, 0.5)",
          "rgba(255, 255, 0, 0.5)",
          "rgba(255, 0, 0, 0.5)",
        ],
        hoverBackgroundColor: [
          "rgba(0, 255, 0, 1)",
          "rgba(255, 255, 0, 1)",
          "rgba(255, 0, 0, 1)",
        ],
        borderWidth: 1,
        borderColor: "black",
      },
    ],
  });
  const dataCounts = [0, 0, 0];
  useEffect(() => {
    (async () => {
      const res = await getForms();
      setForms(res ? res : []);
      res.map((form) => {
        if (form.status === Status.approved) {
          dataCounts[0]++;
        } else if (form.status === Status.pending) {
          dataCounts[1]++;
        } else if (form.status === Status.rejected) {
          dataCounts[2]++;
        }
      });
      setData({
        labels: ["Approved", "Pending", "Rejected"],
        datasets: [
          {
            label: "Status stats",
            data: dataCounts,
            backgroundColor: [
              "rgba(0, 255, 0, 0.5)",
              "rgba(255, 255, 0, 0.5)",
              "rgba(255, 0, 0, 0.5)",
            ],
            hoverBackgroundColor: [
              "rgba(0, 255, 0, 1)",
              "rgba(255, 255, 0, 1)",
              "rgba(255, 0, 0, 1)",
            ],
            borderWidth: 1,
            borderColor: "black",
          },
        ],
      });
    })();
  }, []);

  return (
    <>
      <div className="container">
        <Doughnut
          data={data}
          options={{
            plugins: {
              title: {
                display: true,
                text: "Status stats",
                font: {
                  size: 20,
                },
              },
              legend: {
                display: true,
                position: "bottom",
                align: "center",
              },
              tooltip: {
                enabled: true,
              },
            },
          }}
        />
      </div>
    </>
  );
}
