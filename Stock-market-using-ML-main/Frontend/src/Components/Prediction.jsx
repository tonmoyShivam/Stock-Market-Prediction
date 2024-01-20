import React from 'react'
import { Progress, Space, Card } from 'antd';

function Prediction({ prediction1, prediction2, prediction3 }) {
    return (
        // <div>
        //   <Progress type="circle" percent={75} />
        // </div>
        <Space
            style={{
                display: 'flex',
                justifyContent: 'space-around',
                flexDirection: 'column',
                marginRight: '20px',
                marginLeft: '20px',
            }}
        >
            <Card style={{
                display: 'flex',
                width: '300px',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgb(242, 242, 242)',
            }}
                title="First Prediction"
            >
                <Progress
                    strokeWidth={10}
                    type="circle"
                    percent={prediction1}
                    strokeColor={{
                        '0%': 'rgb(230, 63, 2)',
                        '100%': 'blue',
                    }}
                />
            </Card>
            <Card
                className="custom-card"
                title="Prediction after backtesting"
                style={{
                    display: 'flex',
                    width: '300px',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgb(242, 242, 242)'
                }}
            >
                <Progress
                    strokeWidth={10}
                    type="circle"
                    percent={prediction2}
                    strokeColor={{
                        '0%': '#108ee9',
                        '100%': '#87d068',
                    }}
                />
            </Card>
            <Card
                title="Prediction after adding moving averages"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '300px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgb(242, 242, 242)'
                }}
            >
                <Progress
                    strokeWidth={10}
                    type="circle"
                    percent={prediction3}
                    strokeColor={{
                        '0%': '#108ee9',
                        '100%': '#87d068',
                    }}
                />
            </Card>
        </Space>
    )
}

export default Prediction
