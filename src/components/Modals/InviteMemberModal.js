 import {Form, Modal, Select, Spin, Avatar} from 'antd';
import { collection, limit, orderBy, query, where,onSnapshot } from 'firebase/firestore';
import { debounce } from 'lodash';
import React ,{ useContext, useMemo, useState } from 'react';

import { AppContext } from '../../Context/AppProvider';
import { db } from '../../firebase/config';
import { setDocument } from '../../firebase/services';

function DebounceSelect({fectchOptions, debounceTimeOut = 300, ...props}){
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);
    const debounceFetcher = useMemo(()=>{
        const loadOptions = (value)=>{
            setFetching(true);
            setOptions([]);

            fectchOptions(value,props.curmembers).then(newOptions=>{
                setOptions(newOptions);
                setFetching(false);
            })
        }
        return debounce(loadOptions,debounceTimeOut);
    },[debounceTimeOut,fectchOptions]);
    return(
        <Select
            labelInValue
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size='small'/>: null}
            filterOption={false}
            {...props}
        >
            {
                options.map((opt,index)=>{
                    return(
                        <Select.Option key={index} value={opt.value} title={opt.label}>
                            <Avatar size="small" src={opt.photoURL}>
                                {opt.photoURL ? '' : opt.label?.charAt(0)?.toUpperCase()}
                            </Avatar>
                            {`${opt.label}`}
                        </Select.Option>
                    )
                })
            }
        </Select>
    )

}

function fetchUsersList (search,curMembers){
    return new Promise( async(resolve,reject)=>{
        try {
            const usersRef = collection(db,'users');
            const q = await query(usersRef,where('keywords','array-contains',search),orderBy('displayName'),limit(20));
            await onSnapshot(q, (querySnapshot) => {
                const documents = querySnapshot.docs.map(doc=>({
                    ...doc.data(),
                    id: doc.id
                }))
                let data = documents.filter(opt=>{
                    return !curMembers.includes(opt.uid);
                });
                let resultDocuments = data.map((doc)=>{
                    return {
                        label: doc.displayName,
                        value: doc.uid,
                        photoURL: doc.photoURL
                    }
                })
                resolve(resultDocuments);
            })
            
        }
        catch (error) {
            reject(error)
        }
            
    });
};





function InviteMemberModal() {
    const {isInviteMemberModalVisible, setIsInviteMemberModalVisible,selectedRoomId,selectedRoom} = useContext(AppContext);
    const [value, setValue] = useState()
    // const {user} = useContext(AuthContext);
    const [form] = Form.useForm();
    let h = new Date().getTime();
    const handleOk =()=>{
        console.log(selectedRoom,selectedRoomId)
        setDocument('rooms',selectedRoom.id,{
            ...selectedRoom,
            members: [...selectedRoom.members,...value.map(val=>val.value)]
        });
        setIsInviteMemberModalVisible(false);
        form.resetFields();
    }
    const handleCancel = ()=>{
        setIsInviteMemberModalVisible(false);
        form.resetFields();
    }
    return ( 
        <div>
            <Modal
                title='Thêm thành viên'
                visible={isInviteMemberModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout='vertical'>
                    <DebounceSelect
                        mode="multiple"
                        label="Tên các thành viên"
                        value={value}
                        placeholder="Nhập tên thành viên"
                        fectchOptions={fetchUsersList}
                        curmembers={selectedRoom?selectedRoom.members:[]}
                        onChange={newValue=>setValue(newValue)}
                        style={{width: '100%'}}
                    />
                </Form>
            </Modal>
        </div>
    );
}

export default InviteMemberModal;