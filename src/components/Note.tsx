import { FunctionComponent, useState } from "react";
import {NoteData} from "../types.js";
import { Button, Flex } from "antd";
import {RightOutlined } from "@ant-design/icons";
import {Fields} from "./Fields.tsx";

export const Note: FunctionComponent<NoteData> = ({name, fields}) => {
  const [isFieldsContainerOpen, setIsFieldsContainerOpen] = useState(false)
  const [currentFields, setCurrentFields] = useState(fields)

  return (
    <div style={{width: '500px', fontSize: '20px'}}>
      <Button block onClick={() => setIsFieldsContainerOpen(!isFieldsContainerOpen)}>
        <Flex justify="space-between" align="center">
          {name}
          <RightOutlined style={{transform: isFieldsContainerOpen ? 'rotate(90deg)' : 'rotate(0deg)'}}/>
        </Flex>
      </Button>
      {isFieldsContainerOpen &&
        <Fields
          fields={currentFields} setParentFields={(newFields) => setCurrentFields(newFields)} noteName={name}/>}
  </div>
  )
}