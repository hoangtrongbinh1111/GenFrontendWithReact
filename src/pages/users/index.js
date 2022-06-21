import { Space, Table, Modal, Input, Button, Row, Col, Form, Popconfirm, notification } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as UsersActions from '../../redux/actions/users';
import { connect } from 'react-redux';
import Edit from './edit';
const { Search } = Input;
const PAGE_SIZE_OPTIONS = [5, 10, 50, 100, 500, 1000];

function Users(props) {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [rowId, setRowId] = useState();
  const [IsModalVisible, setIsModalVisible] = useState(false);
  const [IsModalVisibleEdit, setIsModalVisibleEdit] = useState(false);
  const [columns, setColumns] = useState();

  //setup configs here

  useEffect(() => {
    const moduleFields = [{name:"stt",type:"text",label:"STT"},{name:"email",type:"text",label:"Email"},{name:"role",type:"text",label:"Role"},{name:"verified",type:"radio",options:[{label:"Đã xác minh",value:true},{label:"Chưa được xác minh",value:false}],label:"Verified"}];
    let column = moduleFields.map((field) => {
      let columnItem = {
        title: field.label,
        dataIndex: field.name,
        key: field.name
      };
      if (field.type === "radio") {
        columnItem = {
          ...columnItem,
          render: (item) => {
            let itemSelected = field.options.find(it => it.value === item);
            return <span>{itemSelected.label}</span>
          },
        }
      }
      return columnItem;
    });
    // add Actions
    column.push(
      {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
          <Space size="middle">
            <Button onClick={() => _handleEdit(record._id)}>Sửa</Button>
            <Popconfirm
              title="Bạn có chắc chắn muốn xóa?"
              onConfirm={() => _handleDelete(record._id)}
              // onCancel={cancel}
              okText="Xóa"
              cancelText="Hủy"
            >
              <Button>Xóa</Button>
            </Popconfirm>
          </Space>
        ),
      },
    );
    setColumns(column);
  }, []);
  //end setup

  const getData = () => {
    let params = {
      page: page,
      limit: pageSize
    }
    if (searchText !== "") {
      params = {
        ...params,
        search: searchText
      }
    }
    props.dispatch(UsersActions.getUsers(params, (res) => {
      const dataFormat = res.data.map((item, index) => {
        return {
          ...item,
          stt: (pageSize * (page - 1)) + index + 1,
          key: (pageSize * (page - 1)) + index
        }
      });
      setTotal(res.total);
      setData(dataFormat);
    }));
  };

  useEffect(() => {
    getData();
  }, [searchText, page, pageSize]);

  // Function logic here

  const _handleAdd = () => {
    setIsModalVisible(true);
  }

  const _handleEdit = (id) => {
    setRowId(id);
    setIsModalVisibleEdit(true);
  }

  const _handleUpdate = () => {
    getData();
    setIsModalVisibleEdit(false);
  }

  const _handleDelete = (id) => {
    props.dispatch(UsersActions.deleteUsers({ id }, (res) => {
      getData();
      notification['success']({
        message: 'Xóa thành công'
      });
    }));
  }

  const _handleSearchData = (value) => {
    setSearchText(value);
    setPage(1);
  };

  const _handleAddSuccess = (val) => {
    const params = {
      email: val.email,
      password: val.password
    };
    props.dispatch(UsersActions.addUsers(params, (res) => {
      if (res.error) {
        notification['error']({
          message: 'Thêm lỗi! Xin thử lại'
        });
      }
      else {
        notification['success']({
          message: 'Thêm thành công!'
        });
        getData();
        setIsModalVisible(false);
        form.resetFields();
      }
    }));
  };

  const _handleAddFail = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <Row>
        <Col span={24}>
          <Row>
            <Col span={18}>
              <Button type="primary" icon={<PlusOutlined />} onClick={() => _handleAdd()}>Thêm mới</Button>
            </Col>
            <Col span={6}>
              <Search
                placeholder="Tìm kiếm tại đây"
                allowClear
                enterButton
                size="large"
                onSearch={_handleSearchData}
              />
            </Col>
          </Row>
        </Col>
        <Col span={24} style={{ marginTop: "1rem" }}>
          <Table
            className="table-striped-rows"
            dataSource={data}
            columns={columns}
            bordered
            pagination={{
              hideOnSinglePage: false,
              total: total,
              responsive: true,
              showLessItems: true,
              pageSizeOptions: PAGE_SIZE_OPTIONS,
              pageSize: pageSize,
              onChange: (page, pageSize) => {
                setPage(page);
                setPageSize(pageSize);
              },
              current: Number(page),
              showTotal: (total) => `Total records: ${total}`,
              showSizeChanger: true,
            }}
          />
        </Col>
      </Row>
      {/* Modal Add */}
      <Modal title="Thêm mới"
        visible={IsModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={_handleAddSuccess}
          onFinishFailed={_handleAddFail}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Bạn cần điền email tại đây!',
              },
              {
                type: 'email',
                message: 'Định dạng này không phải email!'
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Bạn cần điền mật khẩu tại đây!',
              },
              {
                type: 'string',
                min: 8
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button onClick={() => setIsModalVisible(false)} style={{ marginRight: "1rem" }}>
              Hủy
            </Button>
            <Button type="primary" htmlType="submit">
              Thêm
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {/* Modal Edit */}
      {
        rowId &&
        <Modal title="Thêm mới"
          visible={IsModalVisibleEdit}
          onOk={() => setIsModalVisibleEdit(false)}
          onCancel={() => setIsModalVisibleEdit(false)}
          footer={null}
        >
          <Edit id={rowId} onCloseEditModal={() => _handleUpdate()} />
        </Modal>
      }
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};

export default connect(mapStateToProps)(Users);
