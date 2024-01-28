import {
    ArcElement, CategoryScale, Chart as ChartJS, Legend, LineElement, LinearScale,
    PointElement, Title, Tooltip
} from "chart.js";
import { Doughnut, Line } from 'react-chartjs-2';


ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend);

ChartJS.defaults.color = "#fff";

const labels = ['October 12, 2023', 'October 13, 2023', 'October 14, 2023', 'October 15, 2023'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Commits',
            data: [0, 18, 24, 12],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
    ],
};

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Commits',
        },
    },
};


export default function Chart() {
    return (
        <main className="flex h-screen w-screen flex-col justify-between bg-white dark:bg-black">
            <div className="h-2/5 justify-center flex">
                <Doughnut
                    data={{
                        labels: ["JavaScript", "Rust", "Dockerfile", "CSS"],
                        datasets: [
                            {
                                label: "# of Votes",
                                data: [94.4, 3.5, 1.4, 0.7],
                                backgroundColor: ["#f1e05a", "#dea584", "#384d54", "#563d7c"],
                                borderColor: ["#f1e05a", "#dea584", "#384d54", "#563d7c"],
                                borderWidth: 1,
                            },
                        ],
                    }}
                    options={{
                        responsive: true,
                        maintainAspectRatio: true,
                        plugins: {
                            legend: {
                                position: "right",
                            },
                            title: {
                                display: true,
                                text: "Languages",
                            },
                        },
                    }}
                />
            </div>

            <div className="h-2/5 flex justify-center">
                <Line options={options} data={data} />
            </div>

        </main>
    )
}