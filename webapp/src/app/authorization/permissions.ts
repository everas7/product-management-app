import {
  PRODUCT_CREATORS,
  PRODUCT_MANAGERS,
  PRODUCT_PRICING,
  Role,
} from "../models/user";

export const Permissions = {
  All: [PRODUCT_CREATORS, PRODUCT_MANAGERS, PRODUCT_PRICING],
  Products: {
    List: {
      PageAccess: [PRODUCT_CREATORS, PRODUCT_MANAGERS, PRODUCT_PRICING],
      AddButton: [PRODUCT_CREATORS],
    },
    Detail: {
      PageAccess: [PRODUCT_CREATORS, PRODUCT_MANAGERS, PRODUCT_PRICING],
      EditAction: [PRODUCT_MANAGERS, PRODUCT_PRICING],
      DeleteAction: [PRODUCT_MANAGERS],
    },
    Create: {
      PageAccess: [PRODUCT_CREATORS],
    },
    Edit: {
      PageAccess: [PRODUCT_MANAGERS, PRODUCT_PRICING],
      Title: [PRODUCT_MANAGERS, PRODUCT_CREATORS],
      Description: [PRODUCT_MANAGERS, PRODUCT_CREATORS],
      Price: [PRODUCT_MANAGERS, PRODUCT_PRICING, PRODUCT_CREATORS]
    },
    Delete: {
      Action: [PRODUCT_MANAGERS],
    },
  },
};
