import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import Carousel from "react-bootstrap/Carousel";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

import Heart from "../../components/Icons/Heart";
import Cancel from "../../components/Icons/Cancel";

import * as Styled from "./Card.styled";

type CardProps = {
  images: string[];
  index: number;
};

function Card({ images, index }: CardProps) {
  const [animName, setAnimName] = useState<"" | "like" | "dislike">("");
  const [styles, setStyles] = useState<CSSProperties>({});
  const cardRef = useRef<HTMLDivElement>();

  useLayoutEffect(() => {
    function moveToCenter() {
      if (!cardRef.current) {
        return console.error("card ref is absent");
      }
      const card = cardRef.current;
      setStyles({
        left: window.innerWidth / 2 - card.offsetWidth / 2 + "px",
        top: window.innerHeight / 2 - card.offsetHeight / 2 + "px",
      });
    }

    moveToCenter();
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) {
      return console.error("card ref is absent");
    }
    // disable browser drag'n'drop
    card.ondragstart = () => false;
    function onMouseDown(e: MouseEvent) {
      if (!card) {
        return;
      }
      const rect = card.getBoundingClientRect();
      console.log(rect);

      const shiftX = e.clientX - rect.left;

      function onMouseMove(e: MouseEvent) {
        const left = e.pageX - shiftX;
        const distance = rect.left - left;
        console.log(distance);

        if (distance >= 20) {
          setStyles((oldStyles) => ({
            ...oldStyles,
            transform: "rotate(-30deg)",
          }));
        }
        if (distance < 20 && distance > -20) {
          setStyles((oldStyles) => ({
            ...oldStyles,
            transform: "",
          }));
        }
        if (distance <= -20) {
          setStyles((oldStyles) => ({
            ...oldStyles,
            transform: "rotate(30deg)",
          }));
        }

        setStyles((oldStyles) => ({
          ...oldStyles,
          left: left + "px",
        }));
      }
      document.addEventListener("mousemove", onMouseMove);
      card.addEventListener(
        "mouseup",
        (e) => {
          const left = e.pageX - shiftX;
          const distance = rect.left - left;
          const maxDistance = rect.width * 1.5;
          const minLeft = rect.left - maxDistance;

          if (distance >= 20) {
            setStyles((oldStyles) => ({
              ...oldStyles,
              left: -90 - rect.width + "px",
              transition: "transform, left 0.15s ease-out",
            }));
          }
          if (distance < 20 && distance > -20) {
            setStyles((oldStyles) => ({
              ...oldStyles,
              transform: "",
              left: rect.left + "px",
            }));
          }
          if (distance <= -20) {
            setStyles((oldStyles) => ({
              ...oldStyles,
              left: "calc(100vw + 90px)",
              transition: "transform, left 0.15s ease-out",
            }));
          }

          document.removeEventListener("mousemove", onMouseMove);
        },
        { once: true }
      );
    }
    card.addEventListener("mousedown", onMouseDown);

    return () => {
      card?.removeEventListener("mousedown", onMouseDown);
    };
  }, []);

  return (
    <Styled.Card
      style={{
        zIndex: 9999 - index,
        ...styles,
      }}
      $animName={animName}
      ref={cardRef}
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
