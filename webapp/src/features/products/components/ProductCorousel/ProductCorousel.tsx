import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import cx from "classnames";
import * as Constants from "../../../../app/constants";
import styles from "./ProductCorousel.module.scss";

interface Props {}

export default function ProductCorousel({}: Props): React.ReactElement<Props> {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      interval={null}
      className="h100"
    >
      <Carousel.Item key={1}>
        <img
          className={cx("d-block w-100", styles["product-corousel__img"])}
          src={Constants.PRODUCT_PLACEHOLDER}
          alt="Example Slide 1"
        />
      </Carousel.Item>
    </Carousel>
  );
}
