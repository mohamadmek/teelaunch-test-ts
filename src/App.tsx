import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Container, Form, Button } from "react-bootstrap";
import { setImageRed, selectImage } from "./ducks/Image/imageSlice";
import { useSelector, useDispatch } from "react-redux";
import Header from "./components/common/Header";

const App = () => {
  const canvasRef = useRef<null | any>(null);
  const dispatch = useDispatch();
  const imageSelector = useSelector(selectImage);

  const [imageState, setImageState] = useState<HTMLImageElement | null>(null);
  const [text, setText] = useState<string>("");

  const changeImage = (e: any) => {
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
    if (imageState) {
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      ctx.fillStyle = "black";
      ctx.drawImage(imageState, 10, 10, 400, 277);
      ctx.fillText(text, 150, 50, 200);
    }
  }, [imageState, canvasRef, text]);

  const download = () => {
    let image = canvasRef.current
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    window.location.href = image;
  };

  return (
    <>
      <Header />
      <Container className="d-flex flex-column align-items-center mt-5">
        {imageState != null && (
          <Form.Group
            style={{ position: "absolute", left: 50, top: 150 }}
            controlId="formGridAddress1"
          >
            <Form.Label>Text</Form.Label>
            <Form.Control
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter Text"
            />
          </Form.Group>
        )}
        <Row className="c-app c-default-layout flex-row align-items-center justify-content-center">
          <Form>
            <Form.Group>
              <Form.File
                id="imagepicker"
                type="file"
                onChange={(e: any) => changeImage(e)}
              />
            </Form.Group>
          </Form>
        </Row>
        <Row>
          <canvas ref={canvasRef} width={400} height={400} />
        </Row>
        <Row>
          {imageState != null && (
            <Col>
              <Button onClick={() => download()}>Download</Button>
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
};

export default App;
