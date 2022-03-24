import React, { useState } from "react";
import { FormikHelpers } from "formik";
import { Col, Row } from "react-bootstrap";

import ProductForm from "../../components/ProductForm/ProductForm";
import { Breadcrumb } from "../../../../app/components";
import { IProductForm } from "../../../../app/models/product";
import { Products } from "../../services/productsApi";
import { history } from "../../../../index";
import styles from "./ProductCreatePage.module.scss";
import { ProductFormValues } from "../../components/ProductDetails/ProductDetails";
import { removeNonNumericForDecimal } from "../../../../app/helpers/stringHelper";

export default function ProductCreatePage() {
  const [product] = useState<IProductForm>({
    title: "",
    price: 0,
    description: "",
  });

  const onSubmitClickHandler = (
    values: any,
    { setSubmitting }: FormikHelpers<ProductFormValues>
  ) => {
    Products.create({
      ...values,
      price: Number(removeNonNumericForDecimal(values.price)),
    }).then((res) => {
      setSubmitting(false);
      history.push(`/products/${res.id}`);
    });
  };

  return (
    <>
      <Col>
        <Row>
          <Col>
            <Breadcrumb
              items={[{ name: "Products", path: "/" }, { name: "Create" }]}
            />
          </Col>
        </Row>
      </Col>
      <Col md="12" className={styles["product-create-page__content"]}>
        <Row>
          <ProductForm product={product} onSubmit={onSubmitClickHandler} />
        </Row>
      </Col>
    </>
  );
}
