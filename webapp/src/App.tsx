import { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Container, Row } from "react-bootstrap";

import { FullScreenSpinner, Navbar } from "./app/components";
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
        {/* Without Main Layout */}
        <AuthorizedRoute
          path={["/", "/products"]}
          isLoggedIn={isAuthenticated}
          component={() => <div>Logged IN</div>}
          user={user!}
          rolesAllowed={Permissions.All as Role[]}
          exact={true}
        />
        {/* With Main Layout */}
        <Route>
          <Container className="d-flex flex-column vh-100 overflow-hidden">
            <Row className="flex-shrink-0">{isAuthenticated && <Navbar />}</Row>
            <AuthorizedRoute
              path={["/", "/products"]}
              isLoggedIn={isAuthenticated}
              component={() => <div>Logged IN</div>}
              user={user!}
              rolesAllowed={Permissions.All as Role[]}
              exact={true}
            />
          </Container>
        </Route>
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
