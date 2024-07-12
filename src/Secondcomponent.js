import React, { useContext, useEffect } from 'react'
import { Context } from './App';
import { Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { hourlyforecast, _7daysforecast } from './Apicall';
import Linecharts from './linecharts';
import WaterDropOutlinedIcon from '@mui/icons-material/WaterDropOutlined';
import AirIcon from '@mui/icons-material/Air';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import Gauge from './Gauge';
import { notification } from "./App"
import "../src/secondcontainer.css"
import "../src/App.css";

const Secondcomponent = () => {
  const contextdata = useContext(Context);
  let date;
  const day = ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"]

  useEffect(() => {
    if (contextdata.geocodingdata !== "") {
      (async function () {
        try {
          let response = await hourlyforecast(contextdata.geocodingdata.lon, contextdata.geocodingdata.lat)

          if (response.error == undefined) {
            contextdata.setHourlyforecastdata(response.data.data)
          }
        else{
            notification(response?.error,"error")
        }
        }
        catch (exception) {
          notification(exception.message, "error")
        }
      })();

      (async function () {
        try {
          let response = await _7daysforecast(contextdata.geocodingdata.lon, contextdata.geocodingdata.lat)
          if (response?.error == undefined) {
            contextdata.set7daysforecast(response.data.data.slice(1, 8))
          }
          else{
            notification(response?.error,"error")
        }
        }
        catch (exception) {
          notification(exception.message, "error")
        }
      })();
    }
    else {
      notification("Sorry fail to fetch data", "error")
    }

  }, [contextdata.geocodingdata])
  return (
    <Box className="responsiveBox" sx={{ backgroundColor: "backgroundlight.secondcontaine" }}>
      <Container fixed className="mainContainer">
        <Typography fontFamily={"Poppins"} sx={{ fontSize: "17px", fontWeight: 500 }} className='weatherforecastsection'>
          Weather Forecast of {contextdata.geocodingdata?.name || contextdata.currentdata?.city_name}
        </Typography>

        <Container fixed className="searchContainer">
          <SearchIcon />
          <input
            placeholder='Search'
            className="searchInput"
            value={contextdata.searchtext}
            onChange={(event) => {
              contextdata.setSearchtext(event.target.value);
            }}
          />
        </Container>
      </Container>

      <Container>
        <Typography fontFamily={"Poppins"} sx={{ fontSize: "12px", fontWeight: 300, color: "grey" }}>
          Checkout the overall weather information
        </Typography>
      </Container>

      <Container className="infoContainer">
        <Container className="innerContainer">
          <Typography sx={{ fontSize: "14px", color: "black", fontWeight: 400, fontFamily: "Poppins", paddingX: "5px", paddingY: "5px" }}>
            Precipitation of Upcoming hours
          </Typography>
          <Container sx={{ paddingX: "4px !important", flex: 1, height: "100%", width: "100%", minHeight: "fit-content !important" }}>
            {contextdata.hourlyforecastdata !== "" && <Linecharts hourlyforecastdata={contextdata.hourlyforecastdata} />}
          </Container>
        </Container>
      </Container>

      <Container className="highlightContent">
        <Container className="highlightContainer">
          <Container sx={{ paddingX: "0px !important", marginBottom: "2px", marginTop: "2px", height: "10%" }}>
            <Typography fontFamily="Poppins" fontWeight={500} fontSize={16} color="black" className='highlightTitle'>Today's Highlight</Typography>
          </Container>
          <Container width="100%" sx={{ height: "90% !important", paddingX: "0px !important" }}>
            <Container sx={{ height: "100% !important", width: "100% !important", paddingX: "0px !important", marginX: "0px", display: "flex !important", flexDirection: "row", flexWrap: "wrap", gap: "5px", flex: 1 }}>

              <Box className="boxContainer" width="49%" sx={{ height: "50%" }}>
                <div className='boxcontainer'>
                  <Typography className="boxTitle">Relative Humidity</Typography>
                  <div className='iconsbox'>
                    <WaterDropOutlinedIcon sx={{ color: "white" }} />
                  </div>
                </div>

                <div className='secondcontent'>
                  <Typography fontSize="17px" fontFamily="Poppins" fontWeight={500}>{contextdata.currentdata["rh"]}%</Typography>
                  <div className='slideroutside'>
                    <div className='sliderinside' style={{ width: `${contextdata.currentdata["rh"]}%` }}></div>
                  </div>
                  <Typography className="secondContent">The Dew point is {contextdata.currentdata["dewpt"]}° right now</Typography>
                </div>
              </Box>

              <Box className="boxContainer" width="49%" sx={{ height: "50%" }}>
                <div className='boxcontainer'>
                  <Typography className="boxTitle">Wind</Typography>
                  <div className='iconsbox'>
                    <AirIcon sx={{ color: "white" }} />
                  </div>
                </div>
                <div className='windContent'>
                  <div className='windSubContent'>
                    <div className='windheading'>Wind Direction:</div>
                    <div className='winddata'>{contextdata.currentdata.wind_cdir || null}</div>
                  </div>
                  <div className='windSubContent'>
                    <div className='windheading'>Wind Gust Speed (m/s):</div>
                    <div className='winddata'>{contextdata.currentdata.gust || 0}</div>
                  </div>
                  <div className='windSubContent'>
                    <div className='windheading'>Wind Speed (m/s):</div>
                    <div className='winddata'>{contextdata.currentdata.wind_spd || 0}</div>
                  </div>
                </div>
              </Box>

              <Box className="boxContainer" width="49%" sx={{ height: "50%" }}>
                <div className='boxcontainer'>
                  <Typography className="boxTitle">UV Index</Typography>
                  <div className='iconsbox'>
                    <WbSunnyIcon sx={{ color: "white" }} />
                  </div>
                </div>
                <div className='secondcontent' style={{ height: "100%", width: "100%" }}>
                  <div style={{ height: "100%", width: "100%" }}>
                    <Gauge value={contextdata.currentdata.uv} />
                  </div>
                </div>
              </Box>

              <Box className="boxContainer" width="49%" sx={{ height: "50%" }}>
                <div className='boxcontainer'>
                  <Typography className="boxTitle">Feels Like</Typography>
                  <div className='iconsbox'>
                    <DeviceThermostatIcon sx={{ color: "white" }} />
                  </div>
                </div>
                <div className='secondcontent'>
                  <Typography fontSize="17px" fontFamily="Poppins" fontWeight={500}>{contextdata.currentdata["app_temp"]}°</Typography>
                  <div className='slideroutside'>
                    <div className='sliderinside' style={{ width: `${contextdata.currentdata["app_temp"]}%` }}></div>
                  </div>
                  <Typography className="secondContent" width="100%">Pressure: {contextdata.currentdata.pres || 0} mb <br />Sea Level Pressure: {contextdata.currentdata.slp || 0} mb</Typography>
                </div>
              </Box>
            </Container>
          </Container>
        </Container>

        <Container className="forecastContainer">
          <Container sx={{ paddingX: "0px !important", marginBottom: "2px", marginTop: "2px", height: "10%" }}>
            <Typography fontFamily="Poppins" fontWeight={500} fontSize={16} color="black" className='highlightTitle'>7 days forecast</Typography>
          </Container>
          <Container className="scrollContainer">
            <div className='scrollcontainer'>
              {contextdata._7daysforecast.length !== 0 && (
                contextdata._7daysforecast.map((items) => {
                  date = new Date(items.valid_date);
                  return (
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding: "10px", borderBottom: "1px solid #bababa", alignItems: "center" }}>
                      <div><img height="29" width="29" alt="Weather icon" src={`https://cdn.weatherbit.io/static/img/icons/${items?.weather?.icon}.png`} /></div>
                      <div>
                        <Typography fontFamily="Poppins" fontWeight={400}>{items?.temp}</Typography>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Typography fontFamily="Poppins" fontWeight={400} fontSize={12} color="grey">{date.getDate()} {date.toLocaleString('EN', { month: 'long' })}</Typography>
                      </div>
                      <div>
                        <Typography fontFamily="Poppins" fontWeight={400} fontSize={12} color="grey">{day[date.getDay()]}</Typography>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </Container>
        </Container>
      </Container>
    </Box>
  )
}

export default Secondcomponent