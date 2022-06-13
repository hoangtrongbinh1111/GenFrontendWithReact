#Note
- Config file JSON
1. CRUD_Name: Tên thực thể
2. Questions: Để chỉ các method trong thực thể. 
    - Suffex: Là để chỉ tên gắn kèm sau. Nếu không có thuộc tính Suffex thì sẽ tự hiểu là "" và nếu thêm method GET thì sẽ tự động phân trang
    - Type: Loại hành động (như get, add, delete...) . Dùng cố định là get, ADD, UPDATE, DELETE
    - Method: Method của RESTful API (như get, post, delete, put)
    - single: Boolean, nếu là true thì sẽ giữ nguyên thực thể, nếu false thì sẽ cắt kí tự cuối của câu để tránh trùng lặp
    - endpoint: đường dẫn API
