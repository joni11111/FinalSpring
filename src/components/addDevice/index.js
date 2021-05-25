import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import '../../App.css'
import { Form, Input, Button, Select } from 'antd';
import {addDevice} from "../../store/actions/deviceActions";
import Header from "../../components/header";
import {withRouter} from 'react-router-dom'
import {connect} from "react-redux";

function Device(props) {

    const [isOpen, setOpen] = useState(false)
    const [formDevice, setFormDevice] = useState({
        deviceOwnerName: '',
        deviceOwnerPhone: '',
        explanation: '',
        manufacturer: '',
        year: 0,
    });

    const handleChange = e =>{
        setFormDevice({...formDevice, [e.target.name]: e.target.value})
    };
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 8 },
    };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 8 },
    };

    const onFinish = values => {
        console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    const handleSave = () =>{
        props.addDevice(formDevice);
        setFormDevice({
            deviceOwnerName: '',
            deviceOwnerPhone: '',
            explanation: '',
            manufacturer: '',
            year: null,
        })
    };


    return (
        <div>
            <Header/>
            <div className="container-inner container">
                <div>
                        <Form
                            {...layout}
                            name="basic"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <Form.Item
                                label="Device owner"
                                name="deviceOwnerName"
                                rules={[{ required: true, message: 'Please input your deviceOwnerName!' }]}
                            >
                                <Input name="deviceOwnerName" value={formDevice.deviceOwnerName} onChange={handleChange}/>
                            </Form.Item>
                            <Form.Item
                                label="Device owner phone"
                                name="deviceOwnerPhone"
                                rules={[{ required: true, message: 'Please input your deviceOwnerPhone' }]}
                            >
                                <Input name="deviceOwnerPhone" value={formDevice.deviceOwnerPhone} onChange={handleChange}/>
                            </Form.Item>
                            <Form.Item
                                label="Explanation"
                                name="explanation"
                                rules={[{ required: true, message: 'Please input your explanation!' }]}
                            >
                                <Input name="explanation" value={formDevice.explanation} onChange={handleChange}/>
                            </Form.Item>
                            <Form.Item
                                label="Manufacturer"
                                name="manufacturer"
                                rules={[{ required: true, message: 'Please input your manufacturer!' }]}
                            >
                                <Input name="manufacturer" value={formDevice.manufacturer} onChange={handleChange}/>
                            </Form.Item>
                            <Form.Item
                                label="Year"
                                name="year"
                                rules={[{ required: true, message: 'Please input your year!' }]}
                            >
                                <Input name="year" value={formDevice.year} onChange={handleChange}/>
                            </Form.Item>

                            <Form.Item {...tailLayout}>
                                <Button type="primary" htmlType="submit" onClick={handleSave}>
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state =>({
    deviceReducer: state.deviceReducer,

});

const mapDispatchToProps = {
    addDevice,

};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Device))