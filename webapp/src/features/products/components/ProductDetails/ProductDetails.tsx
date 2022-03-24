import React, { useEffect, useState } from "react";
import { FaBed, FaRulerCombined } from "react-icons/fa";
import cx from "classnames";
import { Field, FieldProps, FormikContextType } from "formik";

import { Product, IProductForm } from "../../../../app/models/product";
import styles from "./ProductDetails.module.scss";
import * as Constants from "../../../../app/constants";
import { NumericInput, Input } from "../../../../app/components";
import { AuthorizedComponent } from "../../../../app/authorization/AuthorizedComponent";
import { Users } from "../../../../app/services/usersApi";
import { User } from "../../../../app/models/user";
import { useAppSelector } from "../../../../app/store/hooks";
import { selectAuthenticatedUser } from "../../../access/services/accessSlice";
import { Permissions } from "../../../../app/authorization/permissions";

export interface ProductFormValues extends IProductForm {}

interface Props {
  product: Product;
  edit?: boolean;
  formik?: FormikContextType<ProductFormValues>;
}

export default function ProductDetails({
  product,
  edit = false,
  formik,
}: Props): React.ReactElement<Props> {
  return (
    <div className={cx(styles["product-details"])}>
      <div className={styles["product-details__name"]}>
        {edit ? (
          <Field
            type="text"
            name="title"
            placeholder="Product Title"
            component={Input}
            value={formik!.values.title}
            onChange={formik!.handleChange}
          />
        ) : (
          product.title
        )}
      </div>
      <div className={styles["product-details__price"]}>
        {edit ? (
          <Field
            type="text"
            name="price"
            placeholder="$0000"
            component={NumericInput}
            value={formik!.values.price}
            onChange={formik!.handleChange}
          />
        ) : (
          `$${product.price.toLocaleString()}`
        )}
      </div>
      <div className={styles["product-details__description"]}>
        {edit ? (
          <>
            Description
            <Field
              name="description"
              value={formik!.values.description}
              onChange={formik!.handleChange}
            >
              {(props: FieldProps) => (
                <Input
                  {...props}
                  placeholder="Description of the product"
                  as="textarea"
                />
              )}
            </Field>
          </>
        ) : (
          <div className={styles["product-details__description-text"]}>
            {product.description}
          </div>
        )}
      </div>
    </div>
  );
}
