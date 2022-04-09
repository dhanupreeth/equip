import React, { useState, useEffect } from 'react';
import mqtt from 'mqtt';
import { Row, Col, Card, Table, Tabs, Tab, Container, Button } from 'react-bootstrap';

export default function App() {

  const [Equipment_Value, setEquipment_Value] = useState("OFF");
  const [Equipment_Message, setEquipment_Message] = useState("No message");

  useEffect(() => {

    var client = mqtt.connect("ws://broker.hivemq.com:8000/mqtt");

    client.on("message", (topic, payload) => {
      var mqttvalue = payload.toString();
      var splits = mqttvalue.split(",");
      console.log (splits)
      setEquipment_Value(Number(splits[0]) == 1 ? "OFF" : "ON")
      setEquipment_Message(splits[1])
    })

    client.on("connect", () => {
      client.subscribe("vels545");
      console.log("++++++++++++++++++++Connected to MQTT Broker.++++++++++++++++++++++++++++++++");
    });

  })


  return (
    <div style={{
      backgroundImage: 'linear-gradient(to right,#42941f, #00BCD4)',
      width: '100vw',
      height: '100vh'
    }}>
      <h1 style={{ color: 'white', textAlign: 'center', fontWeight: 'bold', padding: 80 }}>EQUIPMENT FAILURE MONITORING SYSTEM</h1>
      <Row style={{ justifyContent: 'center' }} >

        <Col xl={5} lg={6} md={6} sm={12} xs={12} >
          <Card style={{ borderRadius: 25 }}>
            <Card.Body >
              <Row>
                <Col xl={8} lg={8} md={8} sm={8} xs={8}>
                  <h6 className=" d-flex align-items-center m-b-1 ml-1" style={{ fontWeight: 'bold', fontSize: 28, lineHeight: 1.2, padding: 10 }}>MOTOT STATUS</h6>
                  <p className='m-b-0 ml-1 ' style={{ fontWeight: 'bold', fontSize: 22, lineHeight: 1.2, color: '#7e7e7e', padding: 10 }}>{Equipment_Value}</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        <Col xl={5} lg={6} md={6} sm={12} xs={12} >
          <Card style={{ borderRadius: 25 }}>
            <Card.Body >
              <Row>

                <Col xl={8} lg={8} md={8} sm={8} xs={8}>
                  <h6 className=" d-flex align-items-center m-b-1 ml-1" style={{ fontWeight: 'bold', fontSize: 28, lineHeight: 1.2, padding: 10 }}>MESSAGE</h6>
                  <p className='m-b-0 ml-1 ' style={{ fontWeight: 'bold', fontSize: 22, lineHeight: 1.2, color: '#7e7e7e', padding: 10 }}>{Equipment_Message.toUpperCase()}</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

      </Row>

    </div>
  )
}
