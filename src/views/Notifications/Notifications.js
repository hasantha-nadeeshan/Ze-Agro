import React, { useEffect, useState} from 'react';
// react plugin for creating charts
import ChartistGraph from "react-chartist";
//redux
import { useSelector, useDispatch } from "react-redux";
import {getAllLimits,addNewLimits} from "./action";

// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Slider from '@material-ui/core/Slider';
import Switch from '@material-ui/core/Switch';
// @material-ui/icons
import AccessTime from "@material-ui/icons/AccessTime";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import EcoIcon from '@material-ui/icons/Eco';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardFooter from "components/Card/CardFooter.js";
//Semantic Ui icons
import { Icon } from "semantic-ui-react";


import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

const Notifications = ()=> {
  const classes = useStyles();
  const dispatch =useDispatch();
  const data =useSelector((state)=>state.settingsReducer);

  useEffect(() => {
    dispatch(getAllLimits()); 
  },[dispatch]);
  const limits = data.limits[0];
  console.log(limits,"limits")

  const [tempValue, setTempValue] = useState([20,30]);
  const [humValue, setHumValue] = useState([50, 80]);
  const [waterValue, setWaterValue] = useState([50, 90]);
 
  
  const handleChangeAutoMode = (event)=>{
    const motor = {
       motorAutoMode:event.target.checked
    }
    dispatch(addNewLimits(motor))   
  }
  const handleChangeMotorSwitch = (event)=>{
    const motor = {
       motorSwitch:event.target.checked
    }
    dispatch(addNewLimits(motor))   
  }
  

  const tempHandleChange = (event, newValue) => {
    setTempValue(newValue);
    const temp = {
      temperatureLowerLimit : newValue[0],
      temperatureUpperLimit : newValue[1]
    }
    dispatch(addNewLimits(temp))  
  };
  const humHandleChange = (event, newValue) => {
    setHumValue(newValue);
    const hum = {
      humidityLowerLimit : newValue[0],
      humidityUpperLimit : newValue[1]
    }
    dispatch(addNewLimits(hum))  
  };
  const waterHandleChange = (event, newValue) => {
    setWaterValue(newValue);
    const water = {
      waterLowerLimit : newValue[0],
      waterUpperLimit : newValue[1]
    }
    dispatch(addNewLimits(water))  
  };
  console.log(tempValue,"temp");
  console.log(humValue,"hum");
  console.log(waterValue,"water")
  
  return (
    <div>
      {data.loading && console.log("loading")}
      {limits ?(!data.loading && 
        <div>
          <GridContainer>
            <GridItem xs={12} sm={6} md={4}>
              <Card>
                <CardHeader color="danger" stats icon>
                  <CardIcon color="danger">
                    <Icon name="thermometer half" />
                  </CardIcon>
                  <p className={classes.cardCategory}>Temperature Limit</p>
                  <h3 className={classes.cardTitle}>
                    Recommended Values
                    <Slider
                      value={tempValue}
                      onChange={tempHandleChange}
                      valueLabelDisplay="auto"
                      aria-labelledby="range-slider"
                      valueLabelDisplay="on"
                    />
                  </h3>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>
                    <AccessTime />
                    updated your limits  {limits.temperatureLowerLimit}<small>c°</small> - {limits.temperatureUpperLimit}<small>c°</small>
                  </div>
                </CardFooter>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={4}>
              <Card>
                <CardHeader color="info" stats icon>
                  <CardIcon color="info">
                    <Icon name="theme" />
                  </CardIcon>
                  <p className={classes.cardCategory}>Humidity Limit</p>
                  <h3 className={classes.cardTitle}>
                    Recommended Values
                    <Slider
                        value={humValue}
                        onChange={humHandleChange}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        valueLabelDisplay="on"
                      />
                  </h3>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>
                    <AccessTime />
                    updated your limits  {limits.humidityLowerLimit} <small>%</small>  -  {limits.humidityUpperLimit} <small>%</small>
                  </div>
                </CardFooter>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={4}>
              <Card>
                <CardHeader color="success" stats icon>
                  <CardIcon color="success">
                    <Icon name="tree" />
                  </CardIcon>
                  <p className={classes.cardCategory}>Soil Water Level Limit</p>
                  <h3 className={classes.cardTitle}>
                    Recommended Values
                    <Slider
                          value={waterValue}
                          onChange={waterHandleChange}
                          valueLabelDisplay="auto"
                          aria-labelledby="range-slider"
                          valueLabelDisplay="on"
                    />
                  </h3>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>
                    <AccessTime />
                    updated your limits  {limits.waterLowerLimit} <small>%</small> - {limits.waterUpperLimit} <small>%</small> 
                  </div>
                </CardFooter>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={6}>
              <Card>
                <CardHeader color="rose" stats icon>
                  <CardIcon color="rose">
                    <Icon name="sync alternate" />
                  </CardIcon>
                  <p className={classes.cardCategory}>Motor Auto Mode</p>
                  <h3 className={classes.cardTitle}>
                    <Switch
                      checked={ limits.motorAutoMode}
                      onChange={handleChangeAutoMode}
                      name="checkedA"
                      inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                  </h3>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>
                  <AccessTime />
                    Auto Mode-- {limits.motorAutoMode && <div style={{color:"green",fontWeight:"bold"}}>ON</div>} {!limits.motorAutoMode && <div style={{color:"red",fontWeight:"bold"}}>OFF</div>}
                  </div>
                </CardFooter>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={6}>
              <Card>
                <CardHeader color="rose" stats icon>
                  <CardIcon color="rose">
                    <EcoIcon />
                  </CardIcon>
                  <p className={classes.cardCategory}>Motor Switch</p>
                  <h3 className={classes.cardTitle}>
                    <Switch
                      checked={ limits.motorSwitch}
                      onChange={handleChangeMotorSwitch}
                      name="checkedA"
                      inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                  </h3>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>
                  <AccessTime />
                    Motor-- {limits.motorSwitch && <div style={{color:"green",fontWeight:"bold"}}>ON</div>} {!limits.motorSwitch && <div style={{color:"red",fontWeight:"bold"}}>OFF</div>} 
                  </div>
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      ):null }
  </div>

  );
}
export default Notifications;