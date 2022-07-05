import {Form, Modal, Input} from 'antd';
import React ,{ useContext } from 'react';
import { AppContext } from '../../Context/AppProvider';
import { AuthContext } from '../../Context/AuthProvider';
import { setDocument } from '../../firebase/services';


function AddRoomModal() {
    const {isAddRoomVisible,setIsAddRoomVisible} = useContext(AppContext);
    const {user} = useContext(AuthContext);
    const [form] = Form.useForm();
    const handleOk = ()=>{
        // console.log(form.getFieldValue());;
        // setDocument('rooms',{...form.getFieldValue(),members:[user.uid]})
        setIsAddRoomVisible(false);
    }
    const handleCancel = ()=>{
        setIsAddRoomVisible(false);
    }
    return ( 
        <div>
            <Modal
                title='Tạo phòng'
                visible={isAddRoomVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout='vertical'>
                <Form.Item label='Tên phòng' name='name'>
                    <Input placeholder='Nhập tên phòng' />
                </Form.Item>
                <Form.Item label='Mô tả' name='description'>
                    <Input.TextArea placeholder='Nhập mô tả' />
                </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default AddRoomModal;