# tipalti
Helper to generate tipalti urls.

## Use
```js
const { TipaltiUrl, TipaltiHash, TipaltiUser } = require('tipalti');

const hash = new TipaltiHash('unique_secret_key', 'Payer LTD');

const user = new TipaltiUser('id_used_as_idap', 'john.doe@mail.com');

const sandbox = true;
const url = (new TipaltiUrl(hash, sandbox)).get(user);

console.log(url.dashboard);//iframe url for dashboard
console.log(url.invoices);//iframe url for invoices
console.log(url.payments);//iframe url for payments list
```
