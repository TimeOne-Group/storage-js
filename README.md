# storage-js

Store data in browser

## Install

```
npm install @timeone-group/storage-js
```

## Use

```javascript
import StorageJS from '@timeone-group/storage-js';

const test = new StorageJS();
test.save({ id: 'uuid', test: 'ok' });
test.find('uuid');
test.delete('uuid')
```

## Develop

```
docker-compose up
```

http://localhost:8080/test.html