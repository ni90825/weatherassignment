import './App.css';
import { createContext, useState } from 'react';
import Firstcomponent from './firstcomponent';
import Secondcomponent from './Secondcomponent';
import Container from '@mui/material/Container';
import { Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Context=createContext();

export const notification=(message,type)=>{
  toast.error(message);
}

function App() {
  const [mode,setMode]=useState(true);
  const [searchtext,setSearchtext]=useState("");
  const [geocodingdata,setGeocoding]=useState({lon:72.878176,lat:19.0785451,country_code:"in",name:"Mumbai"});
  const [currentdata,setCurrentdata]=useState([]);
  const [hourlyforecastdata,setHourlyforecastdata]=useState("");
  const [updatedhourlyforecastdata,setUpdatedHourlyforecastdata]=useState([]);
  const [_7daysforecast,set7daysforecast]=useState([])
  const date = new Date();

  const Theme = createTheme({
    typography:{
      fontFamily: 'Poppins, Arial, sans-serif',
      fontWeightRegular: 300,
      fontWeightMedium: 400,
      fontWeightSemiBold:500,
      fontWeightBold:700,
      fontWeightBlack: 900,    
    },
    palette:{
      backgroundlight: {
        mainbackground: "#b5d8ff",
        firstcontainer: "#5c9ce5",
        secondcontaine: "#deedff",
      }
    }
    })

  return (
<>
    <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
    />
    <ThemeProvider theme={Theme}>
    <Context.Provider value={{mode,setMode,searchtext,setSearchtext,geocodingdata,setGeocoding,currentdata,setCurrentdata,hourlyforecastdata,setHourlyforecastdata,updatedhourlyforecastdata,setUpdatedHourlyforecastdata,_7daysforecast,set7daysforecast,date}}>
    <Box sx={{width:"100vw",height:"100vh",backgroundColor:"backgroundlight.mainbackground"}}>



<Container className="maincontain" sx={{width:"100%",height:"95%", position: "absolute",top: "50%",left: "50%",transform: "translate(-50%,-50%)",paddingLeft:"0px !important",paddingRight:"0px !important",display:"flex"}}>
    <Firstcomponent></Firstcomponent>
    <Secondcomponent></Secondcomponent>
</Container>
    
    </Box>
    </Context.Provider>
    </ThemeProvider>
    </>
  );
}

export {App,Context};
