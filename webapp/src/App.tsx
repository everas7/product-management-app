import { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Container, Row } from "react-bootstrap";

import { FullScreenSpinner, Navbar, NotFound } from "./app/components";
import { useAppDispatch, useAppSelector } from "./app/store/hooks";
import { AccessPage } from "./features/access";
import {
  selectIsAuthenticated,
  selectAuthenticatedUser,
  setCurrentUser,
} from "./features/access/services/accessSlice";
import * as authHelper from "./app/helpers/authHelper";
import { AuthorizedRoute } from "./app/routes/AuthorizedRoute";
import { Permissions } from "./app/authorization/permissions";
import { Role } from "./app/models/user";
import ProductListPage from "./features/products/pages/ProductListPage/ProductListPage";
import ProductDetailPage from "./features/products/pages/ProductDetailPage/ProductDetailPage";

export default function Routes() {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectAuthenticatedUser);

  const [loadingApp, setLoadingApp] = useState(true);

  useEffect(() => {
    const token = authHelper.getToken();
    if (token && !isAuthenticated) {
      dispatch(setCurrentUser());
    }
    if (user || !token) {
      setLoadingApp(false);
    }
  }, [dispatch, user, isAuthenticated]);

  if (loadingApp) return <FullScreenSpinner />;

  function renderAccessPage() {
    return !isAuthenticated ? <AccessPage /> : <Redirect to="/" />;
  }

  function renderRoutes() {
    return (
      <Switch>
        <Route>
          <Container className="d-flex flex-column vh-100 overflow-hidden">
            <Row className="flex-shrink-0">{isAuthenticated && <Navbar />}</Row>
            <Row className="flex-grow-1 overflow-hidden">
              <AuthorizedRoute
                path={["/", "/products"]}
                isLoggedIn={isAuthenticated}
                component={ProductListPage}
                user={user!}
                rolesAllowed={Permissions.Products.List.PageAccess as Role[]}
                exact={true}
              />
              <AuthorizedRoute
                path={["/products/:id"]}
                user={user!}
                isLoggedIn={isAuthenticated}
                component={ProductDetailPage}
                rolesAllowed={Permissions.Products.Detail.PageAccess as Role[]}
                exact={true}
              />
            </Row>
          </Container>
        </Route>
        <Route path="/(.+)" component={NotFound} />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/access" component={renderAccessPage} exact={true} />
      <Route path="/*" render={renderRoutes} />
    </Switch>
  );
}
