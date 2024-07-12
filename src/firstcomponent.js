import React, { useContext, useEffect, useRef, useState } from 'react';
import { Context } from './App';
import { Box, Container, Typography } from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { Geocoding, Currentdata, Quotedetail } from './Apicall';
import PublicIcon from '@mui/icons-material/Public';
import { notification } from './App';
import "../src/firstcontainstyle.css"
import "../src/App.css";

const Firstcomponent = () => {
  const contextdata = useContext(Context)
  const date = new Date();

  const toPascalCase = str => (str.match(/[a-zA-Z0-9]+/g) || []).map(w => `${w.charAt(0).toUpperCase()}${w.slice(1)}`).join('');

  let [enteredtext, setEnteredtext] = useState("");
  let [visibletext, setVisibletext] = useState("");
  let [apicalltext, setApicalltext] = useState("");
  const hasFetchedQuote = useRef(false);

  useEffect(() => {
    if (contextdata.searchtext != "") {

      const interval = setTimeout(async () => {

        const response = await Geocoding(contextdata.searchtext)
        console.log(response)
        if(response.message == undefined){
          contextdata.setGeocoding(response.data.features[0].properties)
          setEnteredtext(contextdata.searchtext);
         }
       else{
           notification(response.message,"error")
       }
      }, 1000);

      return (() => {
        clearTimeout(interval)
      })
    }

    else {
      // notification("Sorry fail to fetch data","error")
    }
  }, [contextdata.searchtext])

  let count = useRef(0);
  const quotefunction = async () => {
      hasFetchedQuote.current = true;
    let quoteresponse = await Quotedetail();
    console.log(quoteresponse)
    if (quoteresponse?.error == "") {
      notification(quoteresponse.error,"error")
    } 
    else{
      setApicalltext(`"${quoteresponse[0].quote}"  - ${quoteresponse[0].author}`);
    }
}

  useEffect(() => {
    if(apicalltext === "" && !hasFetchedQuote.current){
      quotefunction();
    }
  }, []);

  useEffect(() => {
    if (apicalltext !== visibletext) {
      const timeouttyping = setInterval(() => {
        if (apicalltext !== visibletext) {
          count.current++;
          setVisibletext(apicalltext.substring(0, count.current));
        }
      }, 50);

      return () => clearInterval(timeouttyping);
    }
  }, [apicalltext]);

  useEffect(() => {
    if (contextdata.geocodingdata !== "") {
      (async function () {

  let response = await Currentdata(contextdata.geocodingdata.lon, contextdata.geocodingdata.lat)
  console.log(response)
        if (response.message == undefined) {
          contextdata.setCurrentdata(response.data.data[0])
          setEnteredtext(contextdata.searchtext);
        }
         else{
           notification(response.message,"error")
       }
      })()
    }
    else {
      notification("Please check location name once","error")
    }

  }, [contextdata.geocodingdata])

  return (
    <>
      <Box className="box" sx={{ backgroundColor: "backgroundlight.firstcontainer",marginLeft:"10px"}}>
  <Container className="container-1"></Container>
  <Container className="container-2">
    <Container className="container-3">
      <Container className="container-4">
        <LocationOnOutlinedIcon style={{ color: "white", fontSize: "21px" }} />
        <Typography
          className='typography-1 '
        >
          {toPascalCase(enteredtext) || toPascalCase(contextdata.geocodingdata.name)},{" "}
          {contextdata.geocodingdata?.country_code?.toUpperCase()}
        </Typography>
      </Container>

      <Container className="container-5">
        <PublicIcon style={{ color: "white", fontSize: "21px" }} />
        <Typography
         className='typography-1 '
        >
          {contextdata.currentdata.lon?.toFixed(2)} , {contextdata.currentdata.lat?.toFixed(2)}
        </Typography>
      </Container>
    </Container>

    <Container className="container-6">
      <Typography
        fontSize="17px"
        color={"white"}
        fontFamily={"Poppins"}
        fontWeight={300}
      >
        {date.getDate()}.{date.toLocaleString('EN', { month: 'long' })}.{date.getFullYear()}
      </Typography>
    </Container>
  </Container>

  <Container className="container-7">
    <div className="container-8">
      <Typography fontSize={"60px"} color={"white"} fontFamily={"Poppins"} fontWeight={400}>
        {contextdata.currentdata && contextdata.currentdata.temp}
      </Typography>
      <sup style={{ fontSize: "30px", fontWeight: 400, fontFamily: "Poppins", color: "white" }}>
        O
      </sup>
      <Typography fontSize={"60px"} color={"white"} fontFamily={"Poppins"} fontWeight={400}>
        C
      </Typography>
    </div>

    <div className="container-9">
      <img height="48" width="48" alt="Weather icon" src={`https://cdn.weatherbit.io/static/img/icons/${contextdata.currentdata?.weather?.icon}.png`} />
      <Typography fontSize={"15px"} color={"white"} fontFamily={"Poppins"} fontWeight={300}>
        {contextdata.currentdata?.weather?.description}
      </Typography>
    </div>
  </Container>

  <Container className="container-10">
    <Typography className='quote' color={"white"} fontWeight={400} fontSize={"16px"} fontFamily={"Poppins"}>
      {visibletext}
    </Typography>
  </Container>
</Box>

    </>
  )
}

export default Firstcomponent