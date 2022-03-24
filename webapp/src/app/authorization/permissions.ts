import {
  PRODUCT_CREATORS,
  PRODUCT_MANAGERS,
  PRODUCT_PRICING,
  Role,
} from "../models/user";

interface Permissions {
  [x: string]: Role[] | Permissions;
}

export const Permissions: Permissions = {
  All: [PRODUCT_CREATORS, PRODUCT_MANAGERS, PRODUCT_PRICING],
  Products: {
    List: {
      PageAccess: [PRODUCT_CREATORS, PRODUCT_MANAGERS, PRODUCT_PRICING],
      AddButton: [PRODUCT_CREATORS],
    },
    Detail: {
      PageAccess: [PRODUCT_CREATORS, PRODUCT_MANAGERS, PRODUCT_PRICING],
      ManageAction: [PRODUCT_MANAGERS],
    },
    Create: {
      PageAccess: [PRODUCT_CREATORS],
    },
    Edit: {
      PageAccess: [PRODUCT_MANAGERS, PRODUCT_PRICING],
    },
    Delete: {
      Action: [PRODUCT_MANAGERS],
    },
  },
};
