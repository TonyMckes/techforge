# Endpoints

- [Users](#users)
- [Profiles](#profiles)
- [Followers](#followers)
- [Articles](#articles)
- [Comments](#comments)
- [Favorites](#favorites)
- [Tags](#tags)

## Users

### Authentication

`POST /api/users/login`

Request body example:

```JSON
{
  "user":{
    "email": "example@mail.com",
    "password": "example_password"
  }
}
```

**Required** fields: `email`, `password`

Returns a User

### Registration

`POST /api/users`

Request body example:

```JSON
{
  "user":{
    "username": "Marilyn",
    "email": "example@mail.com",
    "password": "example_password"
  }
}
```

**Required** fields: `email`, `username`, `password`

Returns a User

### Get Current User

`GET /api/user`

- Authentication **required**

Returns a User that's the current user

### Update User

`PUT /api/user`

Request body example:

```JSON
{
  "user":{
    "email": "example@mail.com",
    "bio": "I like reading",
    "image": null
  }
}
```

Accepted fields: `email`, `username`, `password`, `image`, `bio`

- Authentication **required**

Returns the User

## Profiles

### Get Profile

`GET /api/profiles/:username`

Returns a Profile

## Followers

### Follow user

`POST /api/profiles/:username/follow`

- Authentication **required**

Returns a Profile

### Unfollow user

`DELETE /api/profiles/:username/follow`

- Authentication **required**

Returns a Profile

## Articles

### List Articles

`GET /api/articles`

Returns most recent articles globally by default, provide `tag`, `author` or `favorited` query parameter to filter results

Query Parameters:

- Filter by tag: `?tag=ReactJS`
- Filter by author: `?author=marilyn`
- Favorited by user: `?favorited=marilyn`
- Limit number of articles (default is 20): `?limit=20`
- Offset/skip number of articles (default is 0): `?offset=0`

Returns multiple articles, ordered by most recent first

### Feed Articles

`GET /api/articles/feed`

- Authentication **required**
- Limit number of articles (default is 20): `?limit=20`
- Offset/skip number of articles (default is 0): `?offset=0`

Returns multiple articles created by followed users, ordered by most recent first.

### Get Article

`GET /api/articles/:slug`

Returns a single article

### Create Article

`POST /api/articles`

Request body example:

```JSON
{
  "article": {
    "title": "Interview with Senior JavaScript Developer",
    "description": "Did you know JavaScript was actually written in seven days?.",
    "body": "Did you know JavaScript was actually not written in seven days?.",
    "tagList": ["JavaScript", "ReactJS", "NextJS"]
  }
}
```

- Authentication **required**

**Required** fields: `title`, `description`, `body`

Optional fields: `tagList` as an array of Strings

Returns an Article

### Update Article

`PUT /api/articles/:slug`

Request body example:

```JSON
{
  "article": {
    "title": "Interviewing a JavaScript Developer"
  }
}
```

- Authentication **required**

Optional fields: `title`, `description`, `body`

The `slug` also gets updated when the `title` is changed

Returns the updated Article

### Delete Article

`DELETE /api/articles/:slug`

Authentication **required**

## Comments

### Add Comments to an Article

`POST /api/articles/:slug/comments`

Request body example:

```JSON
{
  "comment": {
    "body": "This is an exemplary comment."
  }
}
```

**Required** field: `body`

- Authentication **required**

Returns the created Comment

### Get Comments from an Article

`GET /api/articles/:slug/comments`

Returns multiple comments

### Delete Comment

`DELETE /api/articles/:slug/comments/:id`

Authentication **required**

## Favorites

### Favorite Article

`POST /api/articles/:slug/favorite`

- Authentication **required**

Returns the Article

### Unfavorite Article

`DELETE /api/articles/:slug/favorite`

- Authentication **required**

Returns the Article

## Tags

### Get Tag

`GET /api/tags`

Returns a List of Tags
