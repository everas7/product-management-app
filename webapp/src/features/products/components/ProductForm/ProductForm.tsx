import React, { useEffect, useState } from "react";
import cx from "classnames";
import { Col, Spinner, Row } from "react-bootstrap";
import {
  FormikHelpers,
  FormikProvider,
  useFormik,
  useFormikContext,
} from "formik";
import _ from "lodash";

import styles from "./ProductForm.module.scss";
import { Button } from "../../../../app/components";
import { IProductForm, Product } from "../../../../app/models/product";
import { history } from "../../../../index";
import ProductDetails, {
  ProductFormValues,
} from "../ProductDetails/ProductDetails";
import { productSchema } from "../../validators/productValidator";

interface Props {
  product: IProductForm;
  onSubmit(
    values: ProductFormValues,
    formikHelpers: FormikHelpers<ProductFormValues>
  ): void;
}

export default function ProductForm({
  product,
  onSubmit,
}: Props): React.ReactElement<Props> {
  const formik = useFormik<ProductFormValues>({
    initialValues: {
      title: product.title,
      price: product.price,
      description: product.description,
    },
    validationSchema: productSchema,
    onSubmit: (
      values: ProductFormValues,
      formikHelpers: FormikHelpers<ProductFormValues>
    ) => onSubmit(values, formikHelpers),
  });


  return (
    <>
      <Col md="6">
        <FormikProvider value={formik}>
          <div className={styles["product-form__controls"]}>
            <Button
              disabled={
                formik.isSubmitting || !_.isEmpty((formik as any).errors)
              }
              onClick={() => formik.submitForm()}
              loading={formik.isSubmitting}
            >
              {product.id ? "Save Changes" : "Create Product"}
            </Button>
            <Button
              variant="light"
              onClick={() => {
                history.push(`/products/${product.id || ""}`);
              }}
            >
              Cancel
            </Button>
          </div>
          <ProductDetails
            product={product as Product}
            edit={true}
            formik={formik}
          />
        </FormikProvider>
      </Col>
      <Col md="6"></Col>
    </>
  );
}
