document.addEventListener("DOMContentLoaded", () => {
    const ctx = document.getElementById("GroupBarChart").getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          {
            label: "Dataset 1",
            data: [10, 20, 30, 40, 50, 60],
            backgroundColor: "rgba(255, 99, 132, 0.6)",
          },
          {
            label: "Dataset 2",
            data: [15, 25, 35, 45, 55, 65],
            backgroundColor: "rgba(54, 162, 235, 0.6)",
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
        },
      },
    });
  });
  