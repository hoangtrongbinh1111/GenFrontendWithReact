# Công cụ sinh code CRUD với ReactJS

Công cụ giúp tạo ra giao diện hiển thị, thêm, sửa, xóa, tìm kiếm, phân trang.

## Cài đặt nhanh

Cấu hình file config.json và chạy câu lệnh sau, file generate sẽ được lưu tại thư mục src/pages/<CRUD_Name>/index.js

```bash
node index.js
```
Copy file vừa tạo vào component cần hiển thị
## Cách cấu hình file config.json

```js
import foobar
{
     "CRUD_Name": <Tên thực thể muốn đặt>,
     "questions": <Định dạng cấu hình redux-saga>[
          {
              "type": <Hành động muốn thao tác>,
              "method": <Method để gọi API (get/put/post/patch/delete)>,
              "single": <thực thể duy nhất (true/false)>,
              "suffex": <chỉ hành động chi tiết>,
              "isToken": <gọi API có cần gắn thêm Token ở header không (true/false)>
              "endpoint": <đường dẫn API>
          },
          {
               ...........
          }
     ],
     "fields":<các trường hiển thị lên giao diện>[
           {
               "name": <tên trường dữ liệu>,
               "type": <loại hiển thị dữ liệu trên giao diện>,
               "label": <Nhãn hiển thị trên giao diện>,
               "options": [
                     {
                         "label": <Nhãn>,
                         "value": <Giá trị>
                     }
                ]
           },
           {
               ...........
           }
      ],
      "fields_Add":<Các trường trong form thêm mới> [
            {
                 "key": <tên trường dữ liệu tương ứng>,
                 "label": <Nhãn hiển thị>,
                 "required": <Có yêu cầu bắt buộc không (true/false)>
                 "widget": <Loại nhập liệu>,
                 "rules": [
                         {
                              "type": <Loại dữ liệu>,
                              "message": <Thông báo nhập liệu>
                         }
                  ]
            }
      ],
      "fields_Edit":<Các trường trong form Sửa> [
            {
                 <Định dạng như fields_Add>
            }
      ]
}

```

## File config mẫu
```js
{
    "CRUD_Name": "users",
    "questions": [
        {
            "type": "get",
            "method": "get",
            "single": true,
            "isToken": true,
            "endpoint": "http://localhost:8686/v1/users"
        },
        {
            "suffex": "details",
            "type": "get",
            "method": "get",
            "single": true,
            "isToken": true,
            "endpoint": "http://localhost:8686/v1/users/"
        },
        {
            "suffex": "",
            "type": "add",
            "method": "post",
            "single": true,
            "isToken": true,
            "endpoint": "http://localhost:8686/v1/auth/sign-up"
        },
        {
            "suffex": "",
            "type": "update",
            "method": "patch",
            "single": true,
            "isToken": true,
            "endpoint": "http://localhost:8686/v1/users/"
        },
        {
            "suffex": "",
            "type": "delete",
            "method": "delete",
            "single": true,
            "isToken": true,
            "endpoint": "http://localhost:8686/v1/users/"
        }
    ],
    "fields": [
        {
            "name": "stt",
            "type": "text",
            "label": "STT"
        },
        {
            "name": "email",
            "type": "text",
            "label": "Email"
        },
        {
            "name": "role",
            "type": "text",
            "label": "Role"
        },
        {
            "name": "verified",
            "type": "radio",
            "options": [
                {
                    "label": "Đã xác minh",
                    "value": true
                },
                {
                    "label": "Chưa được xác minh",
                    "value": false
                }
            ],
            "label": "Verified"
        }
    ],
    "fields_Add": [
        {
            "key": "email",
            "label": "Email",
            "rules": [
                {
                    "type": "email",
                    "message": "Invalid email"
                }
            ],
            "required": true
        },
        {
            "key": "password",
            "label": "Password",
            "widget": "password",
            "rules": [
                {
                    "type": "string",
                    "min": 8
                }
            ],
            "required": true
        }
    ],
    "fields_Edit": [
        {
            "key": "_id",
            "label": "Mã",
            "disabled": true
        },
        {
            "key": "email",
            "label": "Email",
            "rules": [
                {
                    "type": "email",
                    "message": "Invalid email"
                }
            ],
            "disabled": true
        },
        {
            "key": "role",
            "label": "Role",
            "widget": "select",
            "options": [
                "admin",
                "user"
            ]
        },
        {
            "key": "verified",
            "label": "Verified",
            "widget": "select",
            "options": [
                true,
                false
            ]
        }
    ]
}
```
## License
[MIT](https://choosealicense.com/licenses/mit/)
