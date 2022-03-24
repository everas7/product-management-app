import React, { useEffect, useState } from "react";
import { Col, Row, Modal, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import cx from "classnames";

import ProductCorousel from "../../components/ProductCorousel/ProductCorousel";
import ProductDetails from "../../components/ProductDetails/ProductDetails";
import {
  Breadcrumb,
  Button,
  NotFound,
  IconButton,
  FullScreenSpinner,
} from "../../../../app/components";
import { Product } from "../../../../app/models/product";
import { Products } from "../../services/productsApi";
import styles from "./ProductDetailPage.module.scss";
import { history } from "../../../../index";
import { AuthorizedComponent } from "../../../../app/authorization/AuthorizedComponent";
import { Permissions } from "../../../../app/authorization/permissions";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Role } from "../../../../app/models/user";

export default function ProductDetailPage(): JSX.Element {
  const [product, setProduct] = useState<Product>();
  const [error, setError] = useState("");
  const { id } = useParams<{ id: string }>();

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);

  useEffect(() => {
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
      setError("Not Found");
    } else {
      Products.get(parsedId)
        .then((res) => {
          setProduct(res);
          setError("");
        })
        .catch((err) => {
          if (err.status === 403 || err.status === 404) {
            setError("Not Found");
          }
        });
    }
  }, [id]);

  function handleDelete() {
    Products.delete(+id).then(() => {
      handleCloseDeleteModal();
      history.push("/");
    });
  }
  if (error === "Not Found") return <NotFound />;
  if (!product) return <FullScreenSpinner alt="Loading product..." />;

  return (
    <>
      <Col>
        <Row>
          <Col>
            <Breadcrumb
              items={[{ name: "Products", path: "/" }, { name: id }]}
            />
          </Col>
        </Row>
      </Col>
      <Col
        md="12"
        className={cx(styles["product-detail-page__content-container"])}
      >
        <Row className={cx(styles["product-detail-page__content"])}>
          <Col md="6">
            <ProductCorousel />
            <AuthorizedComponent
              rolesAllowed={Permissions.Products.Detail.ManageAction as Role[]}
            >
              <div className={styles["product-detail-page__controls"]}>
                <IconButton
                  onClick={() => history.push(`/products/${id}/edit`)}
                  icon={<FaEdit />}
                >
                  Edit
                </IconButton>

                <IconButton
                  variant="danger"
                  icon={<FaTrashAlt />}
                  onClick={handleShowDeleteModal}
                >
                  Delete
                </IconButton>
              </div>
            </AuthorizedComponent>
            {(product && <ProductDetails product={product} />) || ""}
          </Col>
        </Row>
      </Col>
      <Modal
        show={showDeleteModal}
        onHide={handleCloseDeleteModal}
        aria-labelledby="contained-modal-title-vcenter"
        centered={true}
      >
        <Modal.Header>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
