document.addEventListener("DOMContentLoaded", () => {
    const ctx = document.getElementById("BeeSwarm").getContext("2d");
    new Chart(ctx, {
      type: "bubble", // Bubble chart can approximate a bee swarm
      data: {
        datasets: [
          {
            label: "Bee Swarm",
            data: Array.from({ length: 50 }, () => ({
              x: Math.random() * 100,
              y: Math.random() * 100,
              r: Math.random() * 5 + 3,
            })),
            backgroundColor: "rgba(153, 102, 255, 0.6)",
          },
        ],
      },
      options: {
        scales: {
          x: {
            beginAtZero: true,
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  });
  