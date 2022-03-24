import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Row } from "react-bootstrap";

import ProductForm from "../../components/ProductForm/ProductForm";
import {
  Breadcrumb,
  NotFound,
  FullScreenSpinner,
} from "../../../../app/components";
import { Product } from "../../../../app/models/product";
import { Products } from "../../services/productsApi";
import { history } from "../../../../index";
import styles from "./ProductEditPage.module.scss";
import { removeNonNumericForDecimal } from "../../../../app/helpers/stringHelper";

export default function ProductEditPage() {
  const [product, setProduct] = useState<Product>();
  const { id } = useParams<{ id: string }>();
  const [error, setError] = useState("");

  useEffect(() => {
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
      setError("Not Found");
    } else {
      Products.get(parsedId)
        .then((res) => {
          setProduct(res);
        })
        .catch((err) => {
          if (err.status === 403 || err.status === 404) {
            setError("Not Found");
          }
        });
    }
  }, [id]);

  const onSubmitClickHandler = (values: any, { setSubmitting }: any) => {
    Products.update(+id, {
      ...values,
      price: Number(removeNonNumericForDecimal(values.price)),
    }).then(async () => {
      setSubmitting(false);
      history.push(`/products/${id}`);
    });
  };

  if (error === "Not Found") return <NotFound />;
  if (!product) return <FullScreenSpinner alt="Loading product..." />;

  return (
    <>
      <Col>
        <Row>
          <Col>
            <Breadcrumb
              items={[
                { name: "Products", path: "/" },
                { name: id, path: `/products/${id}` },
                { name: "Edit" },
              ]}
            />
          </Col>
        </Row>
      </Col>
      <Col md="12" className={styles["product-edit-page__content"]}>
        <Row>
          <ProductForm product={product} onSubmit={onSubmitClickHandler} />
        </Row>
      </Col>
    </>
  );
}
