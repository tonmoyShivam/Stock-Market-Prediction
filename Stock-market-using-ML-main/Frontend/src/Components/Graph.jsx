import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Prediction from './Prediction'
import { Line } from 'react-chartjs-2';
import { Card, Space, Select, Form, Button } from 'antd';
import { CategoryScale } from "chart.js";
import Loader from './Loader';
import Chart from "chart.js/auto";
Chart.register(CategoryScale);
const { Option } = Select
function Graph() {
    const [prediction1, setPrediction1] = useState(0);
    const [prediction2, setPrediction2] = useState(0);
    const [prediction3, setPrediction3] = useState(0);
    const [cardHeading, setCardHeading] = useState('Select a stock')
    const [priceData, setPriceData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = async (values, option) => {
        setLoading(true);
        const stockSymbol = values.mySelect;
        console.log(stockSymbol)
        const stockName = values.mySelect;
        setCardHeading(stockName)
        // const stockSymbol = 'AAPL';
        const options = {
            method: 'GET',
            url: `https://yahoo-finance127.p.rapidapi.com/historic/${stockSymbol}/1d/15d`,
            headers: {
                'X-RapidAPI-Key': '87dc528461msh0f67c1ab97b2215p14ba8djsn79b6c7a8e07d',
                'X-RapidAPI-Host': 'yahoo-finance127.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            const analytics = await axios.get('http://localhost:3000/predict', {
                params: {
                    stock: stockSymbol,
                }
            });
            console.log(response.data)
            const predict = analytics.data;
            setPrediction1((parseFloat(predict[0]) * 100).toFixed(2));
            setPrediction2((parseFloat(predict[1]) * 100).toFixed(2));
            setPrediction3((parseFloat(predict[2]) * 100).toFixed(2));
            const data = response.data;
            const timestamps = data.timestamp;
            const prices = data.indicators.quote[0].close;

            const formattedData = timestamps.map((timestamp, index) => ({
                date: new Date(timestamp * 1000).toLocaleDateString(),
                price: prices[index]
            }));
            console.log(formattedData)
            setPriceData(formattedData);
            setCardHeading(stockSymbol)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false); // Turn off the loading state
        }
    }
    const chartData = {
        labels: priceData.map((data) => data.date),
        datasets: [
            {
                label: 'Price',
                data: priceData.map((data) => data.price),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    // const options = {
    //     scales: {
    //       yAxes: [
    //         {
    //           ticks: {
    //             beginAtZero: true,
    //             suggestedMin: 0
    //           },
    //         },
    //       ],
    //     },
    //   };
    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true
                    }
                }
            ]
        }
    };

    const defaultData = {
        labels: ['No Data'],
        datasets: [
            {
                label: 'Price',
                data: [0],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <>
            {/* <Loader loading={true} /> */}
            {loading ? (
                <Loader loading={loading} />
            ) : (
                <div
                    style={{
                        width: '100%',
                        margin: '20px',
                        marginRight: '20px',
                        display: 'flex',
                        flexDirection: 'row'
                    }}
                >
                    <Card style={{
                        display: 'flex',
                        width: '100%',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgb(242, 242, 242)',
                    }}
                        className="custom-card"
                        title={<h1 style={{ fontSize: '40px' }}>{cardHeading}</h1>}
                    >
                        {priceData.length > 0 ? (
                            <Line data={chartData}
                                options={options} height={400} width={800} />
                        ) : (
                            <Line data={defaultData} height={400} width={800} options={options} />
                        )}
                        <Form onFinish={fetchData}>
                            <Form.Item name="mySelect" label="Select Option" rules={[{ required: true, message: 'Please select an option' }]}>
                                <Select placeholder="Select an option">
                                    <Option value="AAPL">APPLE</Option>
                                    <Option value="MSFT">MICROSOFT</Option>
                                    <Option value="AMZN">AMAZON</Option>
                                    <Option value="^GSPC">S&P 500</Option>
                                    <Option value="^NSEI">NIFTY</Option>
                                    <Option value="INFY">INFOSYS</Option>
                                    <Option value="^BSESN">SENSEX</Option>
                                    <Option value="^IXIC">NASDAQ</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">Submit</Button>
                            </Form.Item>
                        </Form>
                    </Card>
                    <Prediction prediction1={prediction1} prediction2={prediction2} prediction3={prediction3} />
                </div>
            )}

        </>
    )
}

export default Graph
