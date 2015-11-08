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

## Apiary

### create
