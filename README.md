# Prototype Server

## Usage

```js
var port = process.env.PORT || 3000;
var server = require('prototype-server')({
  views: __dirname + '/src/views',
  data: __dirname + '/src/data',
  public: __dirname + '/public'
});

server.listen(port, function () {
  console.log(`Server running on port ${port}`);
});
```
