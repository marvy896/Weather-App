import React, { useCallback, useEffect, useState } from "react";
import mockWeatherData from "./object.json";
import { Container, Tab, Tabs } from "react-bootstrap";
import { Grid, Paper, styled } from "@mui/material";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import AirIcon from "@mui/icons-material/Air";
import CloudIcon from "@mui/icons-material/Cloud";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import StormIcon from "@mui/icons-material/Storm";
import Brightness6Icon from "@mui/icons-material/Brightness6";
import MoodBadIcon from "@mui/icons-material/MoodBad";
import TryIcon from "@mui/icons-material/Try";
import CycloneIcon from "@mui/icons-material/Cyclone";
import SummarizeIcon from "@mui/icons-material/Summarize";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Brightness1Icon from "@mui/icons-material/Brightness1";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import VisibilityIcon from "@mui/icons-material/Visibility";

type WeatherData = typeof mockWeatherData;

export default function WeatherPage() {
  let [data, setData] = useState<WeatherData>();

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  useEffect(() => {
    const fetchLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
          },
          (error) => {
            console.error("Error getting location:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    fetchLocation();
  }, []);
  useEffect(() => {
    if (latitude == null){
      return
    }
    fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=bcd388dba5ae1fd82d622d631f2cff83`
    )
      .then((res) => res.json())
      .then((data1) => {
        setData(data1);
        console.log(data1);
      });
  }, [latitude]);

  if (data == undefined){
    return <div>Loading......</div>
  }
  let date = new Date(data.current.dt * 1000);
  let DateFormat = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);

  return (
    <Container className="UI">
      <div className="UIHeader">
        <div className="UIobject">
          <h4>{DateFormat}</h4>
          <h4>{data.timezone}</h4>
        </div>
        <h1>
          <AcUnitIcon />
          Today's Weather Forecast
        </h1>
        <div className="UIobject">
          Latitude: {latitude}
          <br />
          Longitude: {longitude}
        </div>
      </div>
      <Tabs defaultActiveKey="Current" id="uncontrolled-tab-example">
        <Tab eventKey="Current" title="Current">
          <div className="UIInner">
            <Item className="UIobjects">
              <CycloneIcon /> Humidity <div>{data.current.humidity}</div>
            </Item>
            <Item className="UIobjects">
              <CloudIcon /> Clouds
              <div>{data.current.clouds}</div>
            </Item>
            <Item className="UIobjects">
              <ThunderstormIcon /> Dew Point
              <div>{data.current.dew_point}</div>
            </Item>
            <Item className="UIobjects">
              <MoodBadIcon /> Feels Like
              <div>{data.current.feels_like}</div>
            </Item>
            <Item className="UIobjects">
              <TryIcon /> Pressure <div>{data.current.pressure}</div>
            </Item>
            <Item className="UIobjects">
              <WbSunnyIcon /> SunRise <div>{data.current.sunrise}</div>
            </Item>
            <Item className="UIobjects">
              <ThermostatIcon /> Temperature <div>{data.current.temp}</div>
            </Item>
          </div>
        </Tab>
        <Tab eventKey="hourly" title="Hourly">
          {data.hourly.map((key, value) => (
            <div className="UIInner" key={value}>
              <Item className="UIobjects">
                <CloudIcon /> Clouds <div>{key.clouds}</div>
              </Item>
              <Item className="UIobjects">
                <ThunderstormIcon /> Dew Point
                <div>{key.dew_point}</div>
              </Item>
              <Item className="UIobjects">
                {" "}
                <AllInclusiveIcon /> UVI
                <div>{key.uvi}</div>
              </Item>
              <Item className="UIobjects">
                <TryIcon /> Pressure <div>{key.pressure}</div>
              </Item>
              <Item className="UIobjects">
                <VisibilityIcon /> Visibility <div>{key.visibility}</div>
              </Item>
              <Item className="UIobjects">{key.pop}</Item>
            </div>
          ))}
        </Tab>
        <Tab eventKey="daily" title="Daily">
          {data.daily.map((key, value) => (
            <div className="UIInner" key={value}>
              <Item className="UIobjects">
                <Brightness6Icon /> Moon Phase <div>{key.moon_phase}</div>
              </Item>
              <Item className="UIobjects">
                <ThunderstormIcon /> Dew Point <div>{key.dew_point}</div>
              </Item>
              <Item className="UIobjects">
                <Brightness1Icon /> Moon Rise <div>{key.moonrise}</div>
              </Item>
              <Item className="UIobjects">
                <DarkModeIcon /> Moon Set <div>{key.moonset}</div>
              </Item>
              <Item className="UIobjects">
                <AirIcon /> Wind Degree <div>{key.wind_deg}</div>
              </Item>
              <Item className="UIobjects">
                <StormIcon /> Wind Gust <div>{key.wind_gust}</div>
              </Item>
              <Item className="UIobjects">
                <Brightness4Icon /> Moon Speed <div>{key.wind_speed}</div>
              </Item>
              <Item className="UIobjects">
                <AirIcon /> Wind Speed <div>{key.moon_phase}</div>
              </Item>
              <Item className="UIobjects">
                <SummarizeIcon /> Summary <div>{key.summary}</div>
              </Item>
            </div>
          ))}
        </Tab>
      </Tabs>
    </Container>
  );
}
