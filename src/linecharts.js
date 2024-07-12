import React, { PureComponent, useContext, useEffect } from 'react'
import { AreaChart, Area, XAxis, YAxis, LabelList, Tooltip, ResponsiveContainer,Label } from 'recharts';
import { curveCardinal } from 'd3-shape';
import { Context } from './App';

const datasj=[
    { time: 'Now', temperature: 27, precipitation: 23 },
    { time: '11:00', temperature: 28, precipitation: 29 },
    { time: '12:00', temperature: 28, precipitation: 58 },
    { time: '13:00', temperature: 28, precipitation: 75 },
    { time: '14:00', temperature: 28, precipitation: 33 },
    { time: '15:00', temperature: 28, precipitation: 20 },
    { time: '16:00', temperature: 28, precipitation: 73 },
    { time: '17:00', temperature: 28, precipitation: 49 },
  ];

const Linecharts = ({ hourlyforecastdata }) => {
    const contextdata = useContext(Context)

    const Next8hours = (data) => {
        const d = new Date();
        let updateddata = data.map((items) => {
            let spliteddata = items["datetime"].split(":")[1];


            if (spliteddata >= d.getHours() || (spliteddata < d.getHours() && items["datetime"].split(":")[0].split("-")[2] > d.getDate())) {
                return items;
            }

        })

        updateddata = updateddata.filter((items) => {
            return items !== undefined;
        })

        updateddata = updateddata.map((items) => {
            return {
                Precipitation: items["precip"],
                temp: items["temp"],
                time: `${items["datetime"].split(":")[1]}:00`
            }
        })

        contextdata.setUpdatedHourlyforecastdata(updateddata.slice(0, 8));

    }

    useEffect(() => {
        Next8hours(hourlyforecastdata);
    }, [hourlyforecastdata])


    return (
        <>
           <div style={{ width: '100%', height: '100%' }}>
           <ResponsiveContainer width="100%" height="96%" aspect={1}>

                {
                    contextdata.updatedhourlyforecastdata !== "" && <>
                        <AreaChart
                            width={850}
                            height={140}
                            data={contextdata.updatedhourlyforecastdata}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 0,
                                bottom: 5,
                            }}
                        >
                            <XAxis dataKey="time" >
                            </XAxis>
                            {/* <YAxis dataKey="Precipitation" ></YAxis> */}
                            <Tooltip />
                            <Area
                                type="monotone"
                                dataKey="Precipitation"
                                stroke="#4787cc"
                                fill="#5c9ce5"
                                width={300}
                                height={300}
                            >
                                {/* <LabelList dataKey="temperature" content={CustomLabel} /> */}
                            </Area>
                        </AreaChart>
                    </>
                }
            </ResponsiveContainer>
            </div>
        </>
    )
}

export default Linecharts