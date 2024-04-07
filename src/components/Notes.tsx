import { FunctionComponent, useEffect, useState, useRef } from "react";

import { PlusOutlined } from "@ant-design/icons";
import {  Button, Flex, Input, Modal } from "antd";

import { Note } from "./Note.tsx";

import { NotesProps } from "../types.js";

export const Notes: FunctionComponent<NotesProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notesData, setNotesData] = useState(JSON.parse(localStorage.getItem('notes')) || []);
  const [newNoteName, setNewNoteName] = useState("");
  const [error, setError] = useState("");

  const inputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notesData))
  }, [notesData])


  const showModal = () => {
    setIsModalOpen(true);
    setTimeout(() => {
      inputRef.current.focus();
    }, 200)

  };

  const handleOK = () => {
    setIsModalOpen(false);
    setNotesData([...notesData, {name: newNoteName, fields: []}])
    setNewNoteName('')
  };

  const checkNewNoteName = (event) => {
    if(notesData.find(note => note.name === event.target.value)) {
      setError('Name already exist, please choose another one')
    } else {
      setError('')
      setNewNoteName(event.target.value)
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setNewNoteName('')
  };

  return (
    <Flex justify="center" vertical style={{padding: '0 50px', width: '100%'}}>
      <Flex justify="center" align="center" gap="middle">
        <h1>Notes</h1>
        <Button type="primary" onClick={showModal}>Add Note<PlusOutlined /></Button>
      </Flex>
      <Flex vertical justify="center" align="center" gap="middle">
        {
          notesData.map((note, index) => <Flex vertical key={index}>
            <Note key={index} {...note}/></Flex>)
        }
      </Flex>

      <Modal
        title="New Note"
        okText="Save"
        okButtonProps={{ disabled:  error !== ''  }}
        open={isModalOpen} onOk={handleOK} onCancel={handleCancel}>
        <Input ref={inputRef} placeholder="Please add your note name" value={newNoteName}
               onChange={(event) => {checkNewNoteName(event)}}
               style={{fontSize: ''}}></Input>
        {error && (<label style={{color: 'red'}}>{error}</label>)}

      </Modal>
    </Flex>
  );
};
