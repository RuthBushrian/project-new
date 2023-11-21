import React, { useContext, useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import { Get } from '../../Hooks/fetchWithHook';
import UserContext from "../user/UserContext";

function Graf() {
    const { user } = useContext(UserContext);
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const { data, loading, error, refetch } = Get(`dash/${user.idofficer}`);

    useEffect(() => {
        const years = [];
        const reds = [];
        const greens = [];
        if (data) {

            data.forEach(element => {
                years.push(element.year)
            });

            data.forEach(element => {
                reds.push(element.red)
            });


            data.forEach(element => {
                greens.push(element.green)
            });
        }
        else {
            console.log("loading");
        }
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        const data1 = {
            labels: years,
            datasets: [
                {
                    label: '0',
                    data: reds,
                    fill: false,
                    backgroundColor: '#2f4860',
                    borderColor: '#2f4860',
                    tension: 0.4
                },
                {
                    label: '1',
                    data: greens,
                    fill: false,
                    backgroundColor: '#00bb7e',
                    borderColor: '#00bb7e',
                    tension: 0.4
                }
            ]
        };


        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };

        setChartData(data1);
        setChartOptions(options);
    }, [data]);

    return (
        <div className="card">
            <Chart type="line" data={chartData} options={chartOptions} style={{height: '300px'}}/>
        </div>
    )
}
export default Graf;