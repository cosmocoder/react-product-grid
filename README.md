React Product Grid
====

Features
----

- products, which are ascii faces like `(ノ・∀・)ノ` and `¯_(ツ)_/¯`, are displayed in a grid.
- option to sort the products in ascending order. Can sort by "size", "price" or "id".
- each product has :
  - a "size" field, which is the font-size (in pixels). The ascii faces are displayed in their correct size.
  - a "price" field, in cents. This is formatted in dollars like `$3.51`.
  - a "date" field, which is the date the product was added to the catalog. Dates are displayed in relative time (eg. "3 days ago") unless they are older than 1 week, in which case the full date is displayed.
- the product grid automatically loads more items as you scroll down.
- an animated "loading..." message is displayed while the user waits for the data to load.
- pre-emptively fetches the next batch of results in advance, making use of idle-time, but they are not displayed until the user has scrolled to the bottom of the product grid.
- when the user reaches the end and there are no more products to display, the message "~ end of catalogue ~" is shown.
- after every 20 products an advertisement is shown.
- Ads are randomly selected, but a user never sees the same ad twice in a row.


Products API
----

- The basic query looks like this: `/api/products`
- The response format is newline-delimited JSON.
- To get a larger results set use the `limit` parameter, eg: `/api/products?limit=100`
- To paginate results use the `skip` parameter, eg: `/api/products?limit=15&skip=30` (returns 15 results starting from the 30th).
- To sort results use the `sort` parameter, eg: `/api/products?sort=price`. Valid sort values are `price`, `size` and `id`.


Run the app
----

Start with `npm start`. The server will look for any files present in the `static/` directory.
