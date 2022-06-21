import { Button, Form, Input, Select, notification } from 'antd';
import { useHistory, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import * as #resourceUpperFirst#Actions from '../../redux/actions/#resource#';
import { connect } from 'react-redux';
const { Option } = Select;
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const Edit = (props) => {
    const [form] = Form.useForm();
    const { id } = props;
    const history = useHistory();
    useEffect(() => {
        props.dispatch(#resourceUpperFirst#Actions.get#resourceUpperFirst#Details({ id }, (res) => {
            form.setFieldsValue(res);
        }));
    }, [id]);
    const onVerifyChange = (value) => {
        switch (value) {
            case true:
                form.setFieldsValue({
                    verified: true,
                });
                return;

            case false:
                form.setFieldsValue({
                    verified: false,
                });
                return;
        }
    };

    const onFinish = (values) => {
        const params = {
            id: id,
            role: values.role,
            verified: values.verified
        }
        props.dispatch(#resourceUpperFirst#Actions.update#resourceUpperFirst#(params, (res) => {
            notification['success']({
                message: 'Cập nhật thành công'
            });
            props.onCloseEditModal();
        }));
    };

    const onReset = () => {
        form.resetFields();
    };

    return (
        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
            <Form.Item
                name="email"
                label="Email"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input disabled />
            </Form.Item>
            <Form.Item
                name="role"
                label="Role"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Select
                    placeholder="Select roles"
                    allowClear
                >
                    <Option value="admin">Admin</Option>
                    <Option value="user">User</Option>
                </Select>
            </Form.Item>
            <Form.Item
                name="verified"
                label="Verified"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Select
                    placeholder="Select a option to verified"
                    onChange={onVerifyChange}
                    allowClear
                >
                    <Option value={true}>True</Option>
                    <Option value={false}>False</Option>
                </Select>
            </Form.Item>
            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
                <Button htmlType="button" onClick={onReset}>
                    Reset
                </Button>
            </Form.Item>
        </Form>
    );
};
const mapStateToProps = (state) => {
    return {
        #resource#: state.#resource#,
    };
};

export default connect(mapStateToProps)(Edit);