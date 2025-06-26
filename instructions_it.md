## Tech excercise

### Context
La richiesta è di creare una SPA che, a seguito di un login, mostri una lista di oggetti.

Gli oggetti sono di due tipologie:
- oggetti di tipo "user"
- oggetti di tipo "bot"

Tutti gli oggetti hanno in comune i campi
 - id
 - name

Gli oggetti di tipo "user" hanno come dati aggiuntivi:
- email
- birth

Gli oggetti di tipo "bot" hanno come dati aggiuntivi:
- tokens
- pricePerToken
- currency


### Requirements
- La pagina di login deve mostrare un form con due campi: username e password.
- In caso di credenziali errate, deve essere mostrato un messaggio di errore.
- In caso di successo, la pagina di login deve portare l'utente alla pagina di visualizzazione della lista oggetti.
- La pagina di lista deve essere raggiungibile solo in caso di accesso effettuato.
- La lista mostra l'elenco di oggetti con i seguenti dati:
  - name
  - email (solo per gli utenti)
  - birth (solo per gli utenti)
  - tokens (solo per i bot)
  - costo totale (solo per i bot): tokens * pricePerToken con indicazione della currency

### API

**Login**
> username: frontend@smartness.com
>
> password: Password!
```
POST https://smart-fe.netlify.app/.netlify/functions/login
{
  "username": "",
  "password": ""
}
```

ritorna `ApiError` oppure `LoginResponse`


**Get items**

```
GET https://smart-fe.netlify.app/.netlify/functions/list
Authorization: Bearer <token>
```

ritorna `ApiError` oppure `Array<ListItem>`

### Interfacce

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
