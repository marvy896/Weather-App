import React, { useCallback, useEffect, useState } from "react";
import data from "./object.json";
import { Container, Tab, Tabs } from "react-bootstrap";

export default function WeatherPage() {
  let weather = [];
  

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
        </div>
        <h1>Today's Weather Forecast</h1>
        <div className="UIobject">
          Latitude: {latitude}
          <br />
          Longitude: {longitude}
        </div>
      </div>
      <Tabs defaultActiveKey="Home" id="uncontrolled-tab-example">
        <Tab eventKey="home" title="Home">
          <div className="UIInner">
            <div className="UIobjects">
              Humidity <div>{data.current.humidity}</div>
            </div>
            <div className="UIobjects">
              Clouds
              <div>{data.current.clouds}</div>
            </div>
            <div className="UIobjects">
              Dew Point
              <div>{data.current.dew_point}</div>
            </div>
            <div className="UIobjects">
              Feels Like
              <div>{data.current.feels_like}</div>
            </div>
            <div className="UIobjects">
              Pressure <div>{data.current.pressure}</div>
            </div>
            <div className="UIobjects">
              SunRise <div>{data.current.sunrise}</div>
            </div>
            <div className="UIobjects">
              Temperature <div>{data.current.temp}</div>
            </div>
          </div>
        </Tab>
        <Tab eventKey="profile" title="Profile">
          Tab content for Profile
        </Tab>
        <Tab eventKey="contact" title="Contact">
          Tab content for Contact
        </Tab>
      </Tabs>
    </Container>
  );
}
