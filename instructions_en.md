## Tech Exercise

### Context
The task is to create a Single Page Application (SPA) that, after logging in, displays a list of items.

There are two types of items:
- "user" type items
- "bot" type items

All items share the following fields:
- `id`
- `name`

"User" type items have additional data:
- `email`
- `birth`

"Bot" type items have additional data:
- `tokens`
- `pricePerToken`
- `currency`

### Requirements
- The login page must display a form with two fields: `username` and `password`.
- If the credentials are incorrect, an error message must be shown.
- If the login is successful, the user must be redirected to the item list page.
- The list page must be accessible only after a successful login.
- The list should display the following item data:
  - `name`
  - `email` (only for users)
  - `birth` (only for users)
  - `tokens` (only for bots)
  - total cost (only for bots): `tokens * pricePerToken` along with the `currency`

### API

**Login**
> username: 'frontend@smartness.com'
>
> password: 'Password!'
```
POST https://smart-fe.netlify.app/.netlify/functions/login
{
  "username": "",
  "password": ""
}
```

Returns either `ApiError` or `LoginResponse`

**Get items**

```
GET https://smart-fe.netlify.app/.netlify/functions/list
Authorization: Bearer <token>
```

Returns either `ApiError` or `Array<ListItem>`

### Interfaces

```ts
interface ApiError {
  error: string;
}
```

```ts
interface LoginResponse {
  token: string;
}
interface LoginBody {
  username: string;
  password: string;
}
```

```ts
interface BaseListItem {
  id: number;
  name: string;
}

interface UserListItem extends BaseListItem {
    "kind": "user",
    "data": {
      "birth": string,
      "email": string
    }
}

interface BotListItem  extends BaseListItem{
  "kind": "bot",
  "data": {
    "tokens": number,
    "pricePerToken": number,
    "currency": string
  }
}

type ListItem = UserListItem | BotListItem

```
