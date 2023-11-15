import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import Carousel from "react-bootstrap/Carousel";
import { useState } from "react";

import Heart from "../../components/Icons/Heart";
import Cancel from "../../components/Icons/Cancel";

import * as Styled from "./Card.styled";

type CardProps = {
  images: string[];
  index: number;
};

function Card({ images, index }: CardProps) {
  const [animName, setAnimName] = useState<"" | "like" | "dislike">("");

  return (
    <Styled.Card
      style={{
        zIndex: 9999 - index,
      }}
      $animName={animName}
    >
      <Carousel>
        {images.map((image, index) => (
          <Carousel.Item key={index}>
            <img
              src={image}
              alt=""
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
          </Carousel.Item>
        ))}
      </Carousel>
      <Styled.Card.Body>
        <Styled.Card.Text>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae,
          deleniti necessitatibus est, quidem beatae pariatur fugiat quaerat
          tenetur repellat consequatur similique adipisci molestias quisquam id?
          Molestiae fuga nemo velit explicabo?
        </Styled.Card.Text>
        <Stack
          direction="horizontal"
          gap={3}
          style={{ justifyContent: "center" }}
        >
          <Button variant="danger" onClick={() => setAnimName("dislike")}>
            <Cancel />
          </Button>
          <Button variant="success" onClick={() => setAnimName("like")}>
            <Heart />
          </Button>
        </Stack>
      </Styled.Card.Body>
    </Styled.Card>
  );
}

export default Card;
