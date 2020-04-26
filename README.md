## user

本地搭建mysql，设置账号为root，密码为123456，并创建数据库library，表会自动建

`host = http://localhost:1323` 

### register

`POST /user/register`

`data`
```json
{
  "username": "",
  "password": "",
  "rePassword": ""
}
```

### login

`POST /user/login`

`data`
```json
{
  "username": "",
  "password": ""
}
```

## book

这里的api都需要在请求头加上token

```python
headers = {
    "Authorization": "Bearer token"
}
```

### get books

`GET /book/books`

`query`

```json
{
  "page": "",
  "perPage": ""
}
```

### add books

`POST /book/books`

`data`

```json
{
	"name": "book3",
	"publishing_house": "pub2",
	"author": "author2",
	"stock": 10
}
```

### update books

`PUT /book/books`

`data`

```json
{
        "id": 1,
        "name": "book1111",
        "publishing_house": "pub1",
        "author": "author1",
        "stock": 10
}
```

### delete books

`DELETE /book/books`

`data`

```json
{
	"id": 1
}
```

### get borrowed books

`GET /book/booklents`


### continue borrow

`PUT /book/booklents`

`data`

```json
{
	"book_id": 2
}
```