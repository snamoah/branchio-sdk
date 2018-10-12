# branchio-sdk

This is an unofficial sdk for [branch.io](https://branch.io). See API reference for what you can do with branch [here](https://branchmetrics.github.io/docs/pages/apps/api/)

**Features**

- Initialize SDK using either `appId` or `branchKey`

## Installation

```sh
> npm install branchio-sdk
```

## Usage

```javascript
const branchio = require('branchio-sdk')

const client = branchio({ 
  appId: <APP_ID>,
  branchKey: <BRANCH_IO_KEY>  // initialize branchio with either branch key or appId but not both
})

const { url } = await client.link({ 
  alias: '',
  stage: 'new user',
  channel: 'facebook',
  feature: 'dashboard',
  campaign: 'content 123',
  tags: [ 'tag1', 'tag2', 'tag3' ],
  data: {
    'custom_bool': true,
    '$og_title': 'Title',
    '$og_description': 'Description',
    '$og_image_url': 'https://lorempixel.com/400/400'
  }
})
//=> https://example.app.link/0AjuiLcpqF
```


## Methods

### link()

This method is use for creating a deep link. See corresponding docs [here](https://branchmetrics.github.io/docs/pages/apps/api/#link-create)

```javascript
const { url } = await client.link({ 
  alias: '',
  stage: 'new user',
  channel: 'facebook',
  feature: 'dashboard',
  campaign: 'content 123',
  tags: [ 'tag1', 'tag2', 'tag3' ],
  data: {
    'custom_bool': true,
    '$og_title': 'Title',
    '$og_description': 'Description',
    '$og_image_url': 'https://lorempixel.com/400/400'
  }
})
//=> https://example.app.link/0AjuiLcpqF
```

### bulkLinks()

This method allows you to create multiple deep links at a go. See [docs](https://branchmetrics.github.io/docs/pages/apps/api/#link-create-bulk)

```javascript
const links = await client.bulkLinks([
  {
    stage: 'new user',
    channel: 'facebook',
    feature: 'dashboard',
    campaign: 'content 123',
    tags: [ 'tag1', 'tag2', 'tag3' ],
    data: {
      'custom_bool': true,
      '$og_title': 'Title',
      '$og_description': 'Description',
      '$og_image_url': 'https://lorempixel.com/400/400'
    }
  },
  {
    stage: 'new user',
    channel: 'facebook',
    feature: 'dashboard',
    campaign: 'content 123',
    tags: [ 'tag1', 'tag2', 'tag3' ],
    data: {
      'custom_bool': true,
      '$og_title': 'Title',
      '$og_description': 'Description',
      '$og_image_url': 'https://lorempixel.com/400/400'
    }
  }
])
// => [{ url: 'https://example.app.link/xUrsD0P' }, { url: 'https:/example.app.link/erTweDt' }]
```
