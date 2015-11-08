# API Documentation

## Authentication

### GET /logout

Removes the current session the user is part of, logging them out of the system

### POST /api/auth/local/register

Expects username and password to be sent using HTTP Basic authentication. (See section below)
If a new user is successfully created a new session will authomativally be created, so there is no need to call the login endpoint.

### GET /api/auth/local/:action

This is a callback endpoint for connecting or login to local accounts. Currently tested is only the login handling of this endpoint.

### GET /api/auth/:provider/callback

This is a callback endpoint for authentication with provider. This is untested functionality.

### GET /api/auth/:provider/:action

This is the first part of the provider authentication progress, which was not a high priority feature for the project and it is not tested.
  
### HTTP Basic Auth

HTTP Basic Authentication/Authorization using a header to send the data. The header key is `Authorization`.
The value is `Basic` followed by a space, followed by the string `username:password` to base64.

## User

### GET /api/me

Returns the currently logged in user information.

## Apiary

### POST /api/apiary/create

Given the answeres for all questions, a location (lat and long) and a name, it creates a new apiary.
All the keys for the questions are keywords from the questions themselves.

```
  name: {
    type: 'string'
  },

  months: {
    type: 'json'
  },

  // GPS
  lat: {
    type: 'float'
  },
  log: {
    type: 'float'
  },

  startYear: {
    type: 'date'
  },

  // questions
  //environment
  water: {
    type: 'string'
  },
  miombo: {
    type: 'string'
  },
  forests: {
    type: 'string'
  },
  grass: {
    type: 'string'
  },
  forestPlantation: {
    type: 'string'
  },
  sisalPlantation: {
    type: 'string'
  },
  orchard: {
    type: 'string'
  },
  mixed: {
    type: 'string'
  },
  pesticides: {
    type: 'string'
  },

  //accessibility
  vehicle: {
    type: 'string'
  },
  cycle: {
    type: 'string'
  },
  foot: {
    type: 'string'
  },

  //type
  natural: {
    type: 'string'
  },
  tree: {
    type: 'string'
  },
  height: {
    type: 'string'
  },
  beeHouse: {
    type: 'string'
  },
  badger: {
    type: 'string'
  }
  ```

  ### GET /api/apiary
  
  Returns all apiaries the user is involved in
  
  ### GET /api/apiary/:apiary
  
  Returns one apiary by an ID.
  
  ### POST /api/apiary/beekeeper/add
  
  Adds a new user to the apiary. All beekeepers and sponsors should be here.
  
  ### POST /api/apiary/beekeeper/remove
  
  Remove a user from a apiary.
  
  ## Hive

  Note: All endpoints work with both givenId and normal database id.

  ### POST /api/hive/create
  
  Given an apiary and an answer to all questions it creates a new hive inside the apiary.
  
  ```
  givenId: {
    type: "string"
  },

  // GPS
  lat: {
    type: 'float'
  },
  lon: {
    type: 'float'
  },

  installationDate: {
    type: "date"
  },
  type: {
    type: "string"
  },
  exposure: {
    type: "string"
  }
  ```
  
  A picture upload is being implemented, which will save it into the DB.
  
  ### POST /api/hive/sponsor/add
  
  Adds a sponsor to the Hive, allowing them to view the hive.
  
  ### POST /api/hive/sponsor/remove
  
  Removes a sponsor from a Hive
  
  ### GET /api/hive/:hive
  
  Returns all information about a given hive.
  
  ### GET /api/hive/:apiary/apiary
  
  Returns all hives inside an apiary, which are viewable from the user.
  
  ## Inspection
  
  ### POST /api/inspection/create
  
  Creates a new Inspection for a given hive.
  
  ```
  givenHive: {
    type: "string"
  },
  date: {
    type: "date"
  },
  weather: {
    type: "string"
  },
  state: {
    type: "string"
  },
  temper: {
    type: "string"
  },
  queens: {
    type: "string"
  },

  //Comb Condition
  honey: {
    type: "string"
  },
  pollen: {
    type: "string"
  },
    
  //diseases
  beetles: {
    type: "string"
  },
  mites: {
    type: "string"
  },
  ants: {
    type: "string"
  },
  chalk: {
    type: "string"
  },

  hiveCondition: {
    type: "string"
  },

  tools: {
    type: "string"
  }
  ```
  
  
  ### GET /api/inspection/get
  
  Returns all inspections for a given hive
  
  ## Harvest
  
  ### POST /api/harvest/create
  
  Create a new Harvest for a given hive
  
  ```
  date: {
    type: "date"
  },
  ripe: {
    type: "number"
  },
  beekeeperClothing: {
    type: "boolean"
  },
  assistantsClothing: {
    type: "boolean"
  },
  smoker: {
    type: "boolean"
  },
  buckets: {
    type: "number"
  }
  ```

  ### GET /api/harvest/get
  
  Returns all harvests for a given hive
