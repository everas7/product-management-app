import React from "react";
import cx from "classnames";
import { Field, FieldProps, FormikContextType } from "formik";

import { Product, IProductForm } from "../../../../app/models/product";
import styles from "./ProductDetails.module.scss";
import { NumericInput, Input } from "../../../../app/components";
import { AuthorizedDisabledComponent } from "../../../../app/authorization/AuthorizedDisabledComponent ";
import { Role } from "../../../../app/models/user";
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
      <div className={styles["product-details__title"]}>
        {edit ? (
          <>
            <strong>Title</strong>
            <AuthorizedDisabledComponent
              rolesAllowed={Permissions.Products.Edit.Title as Role[]}
            >
              <Field
                type="text"
                name="title"
                placeholder="Product Title"
                component={Input}
                value={formik!.values.title}
                onChange={formik!.handleChange}
              />
            </AuthorizedDisabledComponent>
          </>
        ) : (
          product.title
        )}
      </div>
      <div className={styles["product-details__price"]}>
        {edit ? (
          <>
            Price
            <AuthorizedDisabledComponent
              rolesAllowed={Permissions.Products.Edit.Price as Role[]}
            >
              <Field
                type="text"
                name="price"
                placeholder="$0000"
                component={NumericInput}
                value={formik!.values.price}
                onChange={formik!.handleChange}
              />
            </AuthorizedDisabledComponent>
          </>
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
                <AuthorizedDisabledComponent
                  rolesAllowed={Permissions.Products.Edit.Description as Role[]}
                >
                  <Input
                    {...props}
                    placeholder="Description of the product"
                    as="textarea"
                  />
                </AuthorizedDisabledComponent>
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
