import { Space, Table, Modal, Input, Button, Row, Col, Form, Popconfirm, notification } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import * as #resourceUpperFirst#Actions from '../../redux/actions/#resource#';
import FormBuilder from 'antd-form-builder'
import { connect } from 'react-redux';
const { Search } = Input;
const PAGE_SIZE_OPTIONS = [5, 10, 50, 100, 500, 1000];

function #resourceUpperFirst#(props) {
  const [formEdit] = Form.useForm();
  const [formAdd] = Form.useForm();
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [pending, setPending] = useState(false);
  const [IsModalVisible, setIsModalVisible] = useState(false);
  const [IsModalVisibleEdit, setIsModalVisibleEdit] = useState(false);
  const [columns, setColumns] = useState();
  //setup configs here

  useEffect(() => {
    const moduleFields = #moduleField#;
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
            <Button onClick={() => _handleEdit(record)}>Sửa</Button>
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

  //============== With Edit Form===================//

  const getMetaAdd = () => {
    const meta = {
      columns: 1,
      // disabled: pending,
      fields: #moduleFieldAdd#,
    }
    return meta
  }

  const getMetaEdit = () => {
    const meta = {
      columns: 1,
      // disabled: pending,
      fields: #moduleFieldEdit#
    }
    return meta
  }

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
    props.dispatch(#resourceUpperFirst#Actions.get#resourceUpperFirst#(params, (res) => {
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

  const _handleEdit = (record) => {
    formEdit.setFieldsValue(record);
    setIsModalVisibleEdit(true);
  }

  const _handleUpdate = (values) => {
    setPending(true);
    props.dispatch(#resourceUpperFirst#Actions.update#resourceUpperFirst#(values, (res) => {
      setPending(false);
      notification['success']({
        message: 'Cập nhật thành công'
      });
    }));
    // getData();
    setIsModalVisibleEdit(false);
  }

  const _handleDelete = (_id) => {
    props.dispatch(#resourceUpperFirst#Actions.delete#resourceUpperFirst#({ _id }, (res) => {
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

  const _handleAdd = (values) => {
    setPending(true);
    props.dispatch(#resourceUpperFirst#Actions.add#resourceUpperFirst#(values, (res) => {
      setPending(false);
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
        formAdd.resetFields();
      }
    }));
  };

  return (
    <div>
      <Row>
        <Col span={24}>
          <Row>
            <Col span={18}>
              <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>Thêm mới</Button>
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
        <Form layout="horizontal" form={formAdd} onFinish={_handleAdd} >
          <FormBuilder form={formAdd} getMeta={getMetaAdd} viewMode={false} />
          <Form.Item className="form-footer" style={{ textAlign: "center" }} wrapperCol={{ span: 16, offset: 4 }}>
            <Button
              onClick={() => {
                formAdd.resetFields();
                setIsModalVisible(false);
              }}
              style={{ marginRight: '15px' }}
            >
              Hủy
            </Button>
            <Button htmlType="submit" type="primary" disabled={pending}>
              {pending ? 'Đang thêm mới...' : 'Thêm mới'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {/* Modal Edit */}
      {
        <Modal title="Sửa thông tin"
          visible={IsModalVisibleEdit}
          onOk={() => setIsModalVisibleEdit(false)}
          onCancel={() => setIsModalVisibleEdit(false)}
          footer={null}
        >
          <Form layout="horizontal" form={formEdit} onFinish={_handleUpdate} >
            <FormBuilder form={formEdit} getMeta={getMetaEdit} viewMode={false} />
            <Form.Item className="form-footer" style={{ textAlign: "center" }} wrapperCol={{ span: 16, offset: 4 }}>
              <Button
                onClick={() => {
                  formEdit.resetFields();
                  setIsModalVisibleEdit(false);
                }}
                style={{ marginRight: '15px' }}
              >
                Hủy
              </Button>
              <Button htmlType="submit" type="primary" disabled={pending}>
                {pending ? 'Đang cập nhật...' : 'Cập nhật'}
              </Button>
            </Form.Item>
          </Form>
          {/* <Edit id={rowId} onCloseEditModal={() => _handleUpdate()} /> */}
        </Modal>
      }
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    #resource#: state.#resource#,
  };
};

export default connect(mapStateToProps)(#resourceUpperFirst#);
