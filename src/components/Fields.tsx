import { FunctionComponent, useState } from "react";

import { PlusOutlined } from "@ant-design/icons";
import {  Button, Flex } from "antd";

import {FieldData} from "../types.js";

import { Field } from "./Field.tsx";
import { NewFieldForm } from "./NewFieldForm.tsx";

export const Fields: FunctionComponent<{fields: FieldData[], noteName: string, setParentFields: (newFields: FieldData[]) => void}>
  = ({fields, noteName, setParentFields}) => {
  const [fieldsData, setFieldsData] = useState(fields);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // return the notes array from local host
  const getNotesArrFromLocalStorage = () => {
    const localStorageNotes = localStorage.getItem('notes')
    return JSON.parse(localStorageNotes)
  }

  // get the current note obj we wish to change in local storage
  const getCurrentNoteObj = () => {
    const localStorageNotesArr = getNotesArrFromLocalStorage()
    const note = localStorageNotesArr.find(note => note.name === noteName)
    return note;
  }

  // set the notes array in local storage with the changed note
  const updateNotesInLocalStorage = (noteToUpdate) => {
    let localStorageNotesArr = getNotesArrFromLocalStorage()
    const indexToUpdate = localStorageNotesArr.findIndex(note => note.name === noteToUpdate.name)
    localStorageNotesArr[indexToUpdate] = noteToUpdate
    localStorage.setItem('notes', JSON.stringify(localStorageNotesArr))
  }

  /*
    get the current note and add the new field to it
    update the current fields state
    update notes in local storage
  */
  const saveNewFieldsData = (newField: FieldData) => {
    let note = getCurrentNoteObj()
    const exitedFieldIndex = note.fields.findIndex(field => field.key === newField.key)
    if(exitedFieldIndex === -1) {
      note.fields.push(newField)
    } else {
      note.fields[exitedFieldIndex] = newField
    }
    setFieldsData(note.fields)
    updateNotesInLocalStorage(note)
    setParentFields(note.fields)
  };

  /*
    Filter out the element with the specified id
    Update the state with the new array
    Update notes in local storage
   */
  const deleteField = (idToDelete: string) => {
    let note = getCurrentNoteObj()
    const newFieldsArray = note.fields.filter(item => item.key !== idToDelete);
    setParentFields(newFieldsArray)
    setFieldsData(newFieldsArray);
    note.fields = newFieldsArray;
    updateNotesInLocalStorage(note)
  }

  const cancelIsClickedForField = (index: number) => {
    let newFieldsDataArray = [...fieldsData]
    newFieldsDataArray[index].isEdited = false;
    setFieldsData(newFieldsDataArray)
  }

  const updateIsFieldEdited = (index: number) => {
    let newFieldsDataArray = [...fieldsData]
    newFieldsDataArray[index].isEdited = true;
    setFieldsData(newFieldsDataArray)
  }

  return (
    <section style={{padding: '1em', fontSize: '15px'}}>
      {fieldsData.map((field, index) => field.isEdited ?
          <NewFieldForm
          fieldData={field}
          setNew={(newField) => saveNewFieldsData(newField)}
          cancel={() => cancelIsClickedForField(index)}/> :
          <Field key={field.key} field={field} deleteField={() => deleteField(field.key)} setIsFieldEdited={() => updateIsFieldEdited(index)}/>)}
      <Flex justify="start" align="center" gap="middle">
        {isFormOpen ? <NewFieldForm
            setNew={(newField) => saveNewFieldsData(newField)}
            cancel={() => setIsFormOpen(false)}/> :
          <Button type="primary" onClick={() => setIsFormOpen(true)}>Add Field<PlusOutlined /></Button>}
      </Flex>
    </section>
  );
};
