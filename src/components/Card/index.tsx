import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import Carousel from "react-bootstrap/Carousel";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

import Heart from "../../components/Icons/Heart";
import Cancel from "../../components/Icons/Cancel";
import { useUser } from "../../stores/user";

import * as Styled from "./Card.styled";

type CardProps = {
  images: string[];
  index: number;
  description: string;
  id: string;
};

function Card({ images, description, index, id }: CardProps) {
  const user = useUser((state) => state.user);
  const updateUser = useUser((state) => state.updateUser);
  const [isSending, setIsSending] = useState(false);
  const [styles, setStyles] = useState<CSSProperties>({});
  const cardRef = useRef<HTMLDivElement>();

  const dislike = async () => {
    try {
      setIsSending(true);
      await updateUser({ ...user, disliked: [id] });
      setStyles({
        transform: "rotate(-30deg)",
        left: -90 - 320 + "px",
        transition: "transform 0.15s ease-out, left 0.3s ease-out",
      });
    } catch (err) {
    } finally {
      setIsSending(false);
    }
  };

  const like = async () => {
    try {
      setIsSending(true);
      await updateUser({ ...user, liked: [id] });
      setStyles({
        transform: "rotate(30deg)",
        left: "calc(100vw + 90px)",
        transition: "transform 0.15s ease-out, left 0.3s ease-out",
      });
    } catch (err) {
    } finally {
      setIsSending(false);
    }
  };

  useLayoutEffect(() => {
    function moveToCenter() {
      if (!cardRef.current) {
        return console.error("card ref is absent");
      }
      const card = cardRef.current;
      const parentEl = cardRef.current.parentElement;
      if (!parentEl) {
        return console.error("no parent element for card");
      }
      setStyles({
        left: parentEl.offsetWidth / 2 - card.offsetWidth / 2 + "px",
        top: 0,
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
      const parentEl = card.parentElement;
      if (!parentEl) {
        return console.error("card parent element is null");
      }
      const parentRect = parentEl.getBoundingClientRect();
      const rect = card.getBoundingClientRect();
      const initX = rect.left - parentRect.left;
      const shiftX = e.clientX - rect.left;

      function onMouseMove(e: MouseEvent) {
        const left = e.pageX - shiftX - parentRect.left;
        const distance = initX - left;

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
          const left = e.pageX - shiftX - parentRect.left;
          const distance = initX - left;

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
              left: initX + "px",
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
      ref={cardRef}
    >
      {images.length === 1 ? (
        <Styled.Card.Img
          variant="top"
          src={images[0]}
          alt="Duck"
          style={{ width: "100%", height: "200px", objectFit: "cover" }}
        />
      ) : (
        <Carousel>
          {images.map((image, index) => (
            <Carousel.Item key={index}>
              <img
                src={image}
                alt="Duck"
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      )}
      <Styled.Card.Body>
        <Styled.Card.Text>{description}</Styled.Card.Text>
        <Stack
          direction="horizontal"
          gap={3}
          style={{ justifyContent: "center" }}
        >
          <Button variant="danger" onClick={dislike} disabled={isSending}>
            <Cancel />
          </Button>
          <Button variant="success" onClick={like} disabled={isSending}>
            <Heart />
          </Button>
        </Stack>
      </Styled.Card.Body>
    </Styled.Card>
  );
}

export default Card;
