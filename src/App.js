import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Container, Form, Button } from "react-bootstrap";
import { setImageRed } from "./ducks/Image/imageSlice";
import { useSelector, useDispatch } from "react-redux";

const App = () => {
  const canvasRef = useRef(null);
  const dispatch = useDispatch();
  const imageSelector = useSelector((state) => state.imageSlice.image);

  const [imageState, setImageState] = useState(null);

  const changeImage = (e) => {
    dispatch(setImageRed({ image: URL.createObjectURL(e.target.files[0]) }));
  };

  useEffect(() => {
    const catImage = new Image();
    catImage.src = imageSelector;
    catImage.onload = () => {
      setImageState(catImage);
    };
  }, [imageSelector]);

  useEffect(() => {
    if (imageState && canvasRef) {
      const ctx = canvasRef.current.getContext("2d");
      ctx.fillStyle = "black";
      ctx.drawImage(imageState, 10, 10, 300, 277);
    }
  }, [imageState, canvasRef]);

  const download = () => {
    let image = canvasRef.current
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    window.location.href = image;
  };

  return (
    <Container className="d-flex flex-column align-items-center mt-5">
      <Row className="c-app c-default-layout flex-row align-items-center justify-content-center">
        <Form>
          <Form.Group>
            <Form.File
              id="imagepicker"
              type="file"
              onChange={(e) => changeImage(e)}
            />
          </Form.Group>
        </Form>
      </Row>
      <Row>
        <canvas ref={canvasRef} width={400} height={400} />
      </Row>
      {imageState != null && (
        <Col md="1">
          <Button onClick={() => download()}>Download</Button>
        </Col>
      )}
    </Container>
  );
};

export default App;
