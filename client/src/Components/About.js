import React from "react";

import { Container } from "react-bootstrap";

export default function About() {
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
  
  return (
    <Container>
      <br />
      <h2>Image Processing API</h2>
      <p>
        This project is a simple image processing application. Its intention is
        to provide a means to access images through an api, and to resize images
        uploaded from your browser. The project is built using Node, React,
        Typescript, and various modules and packages. Among them is Sharp.js.
        <br />
        <br />
        You can use this project in two ways: <br />
        <br />
        Firstly, you can use the interface on the home page to upload images,
        and resize them based on parameters you can input from UI. The server
        will not store any images you resize, but they should remain in your
        browser until you either refresh or leave the page.
        <br />
        <br />
        Secondly, you can make calls directly to the server from your browser.
        To do this, enter a URL address into your browser's address bar. <br />
        <br />
        The URL should have the format: <br />
        <br />
        '{apiUrl}/api?name=<b>imagename</b>
        &width=<b>number</b>
        &height=<b>number</b>'
        <br />
        <br />
        <br />
        For example, try copying and pasting the following into the address bar
        in another tab in your browser:
        <br />
        <br />
        {apiUrl}/api?name=encenadaport&width=600&height=600
        <br />
        <br />
        {apiUrl}/api?name=fjord&width=800&height=400
        <br />
        <br />
        {apiUrl}/api?name=palmtunnel&width=1000&height=1000
        <br />
        <br />
        If you want to try a unique URL, the available image names are: fjord,
        palmtunnel, santamonica, icelandwaterfall, and encenadaport.
      </p>
    </Container>
  );
}
