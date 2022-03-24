import React from "react";
import { RouteProps } from "react-router-dom";

import { selectAuthenticatedUser } from "../../features/access/services/accessSlice";

import { Role, User } from "../models/user";
import { useAppSelector } from "../store/hooks";

interface IProps extends RouteProps {
  children: any;
  rolesAllowed?: Role[];
  customValidation?(user: User): boolean;
}

export const AuthorizedDisabledComponent: React.FC<IProps> = ({
  children,
  rolesAllowed,
  customValidation,
}) => {
  const user = useAppSelector(selectAuthenticatedUser);
  let isAllowed = true;
  if (rolesAllowed) {
    isAllowed =
      isAllowed && rolesAllowed.some((ra) => user!.roles.includes(ra));
  }

  if (customValidation) {
    isAllowed = isAllowed && customValidation(user!);
  }

  return <children.type {...children.props} disabled={!isAllowed} />;
};
