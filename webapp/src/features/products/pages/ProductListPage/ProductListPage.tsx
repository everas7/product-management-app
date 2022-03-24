import React, { useEffect, useState } from "react";
import { Row, Col, CardDeck, Container, ProgressBar } from "react-bootstrap";
import cx from "classnames";
import ReactPaginate from "react-paginate";

import ProductFilters from "../../components/ProductFilters/ProductFilters";
import ProductCard from "../../components/ProductCard/ProductCard";
import { Button, Navbar } from "../../../../app/components";
import { history } from "../../../../index";
import styles from "./ProductListPage.module.scss";
import { AuthorizedComponent } from "../../../../app/authorization/AuthorizedComponent";
import { Permissions } from "../../../../app/authorization/permissions";
import { useAppDispatch, useAppSelector } from "../../../../app/store/hooks";
import {
  fetchProducts,
  selectLoadingList,
  selectPage,
  selectProducts,
  selectTotalPages,
  setPage,
} from "../../services/productsSlice";
import { Role } from "../../../../app/models/user";

interface SelectProtected {
  readonly listElement: HTMLElement | null;
}

export default function ProductListPage() {
  const dispatch = useAppDispatch();

  const products = useAppSelector(selectProducts);
  const pageCount = useAppSelector(selectTotalPages);
  const page = useAppSelector(selectPage);
  const loading = useAppSelector(selectLoadingList);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const [showFilters, setShowFilters] = useState(false);

  function handlePageClick({ selected }: { selected: number }) {
    dispatch(setPage(selected + 1));
    dispatch(fetchProducts());

    const selectProtected: SelectProtected = {
      listElement: document.getElementById("product-list"),
    };
    selectProtected.listElement!.scroll({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <Col md="3" className="mh-100">
        <Button
          className="d-sm-block d-md-none w-100 mb-2"
          onClick={() => setShowFilters(!showFilters)}
          variant="light"
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
        </Button>
        <ProductFilters
          className={cx(
            {
              collapse: !showFilters,
            },
            "d-md-block"
          )}
        />
      </Col>
      <Col
        md="9"
        id="product-list"
        className={cx(styles["product-list-page__list"], "d-lg-block")}
      >
        <AuthorizedComponent
          rolesAllowed={Permissions.Products.List.AddButton as Role[]}
        >
          <div className={styles["product-list-page__header"]}>
            <div className={styles["product-list-page__header-title"]}>
              Products
            </div>
            <Button onClick={() => history.push("/products/create")}>
              Add Product
            </Button>
          </div>
        </AuthorizedComponent>

        {loading ? (
          <ProgressBar className="mb-3" animated={true} now={100} />
        ) : (
          ""
        )}
        {!loading && !products.length ? (
          <Row md="12" className="justify-content-center">
            <Col md="8" className="text-left">
              <h4 className="mb-4">
                Sorry, we couldn't find any products available with the current
                filters.
              </h4>
            </Col>
          </Row>
        ) : (
          ""
        )}
        <CardDeck className={cx(styles["product-list-page__card-deck"])}>
          <Row>
            {products.map((product, i) => (
              <Col
                md="6"
                onClick={() => history.push(`/products/${product.id}`)}
                key={`product_card-${i}`}
              >
                <ProductCard
                  title={product.title}
                  price={product.price}
                  description={product.description}
                />
              </Col>
            ))}
          </Row>
        </CardDeck>
        {products.length ? (
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            pageCount={pageCount}
            forcePage={page - 1}
            initialPage={0}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            containerClassName={"pagination"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            activeClassName={"active"}
          />
        ) : (
          ""
        )}
      </Col>
    </>
  );
}
