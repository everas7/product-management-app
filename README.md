# product-management-app

## Instructions on How To Run
```
cd api
cp .env.example .env
docker-compose up -d

docker exec -it api_api_1 bash
npm run migrate && npm run seed
```

```
cd webapp
cp .env.example .env
npm run start
```

## Demo Users and Roles
- Only users with Authority PRODUCT_CREATORS can create products.
- Only users with Authority PRODUCT_MANAGERS can modify and/or delete products.
- Only users with the ROLE PRODUCT_PRICING can manage or modify product prices.

All users has same password: strongpassword1

- John Doe
    - Roles: All Roles
    - Email: jdoe@test.com

- Jack Sparrow
    - Roles: PRODUCT_PRICING
    - Email: jsparrow@test.com

- Clark Kent
    - Roles: PRODUCT_MANAGERS
    - Email: ckent@test.com

- Peter Parker
    - Roles: PRODUCT_CREATORS
    - Email: pparker@test.com
