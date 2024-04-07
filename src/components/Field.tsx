import { FunctionComponent } from "react";
import {FieldData} from "../types.js";
import { Flex, Select, Space, Radio, Button } from "antd";
import TextArea from "antd/es/input/TextArea.js";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
const { Option } = Select;

export const Field: FunctionComponent<{field: FieldData, deleteField: () => void, setIsFieldEdited: () => void}>
    = ({field, deleteField, setIsFieldEdited}) => {
  const {key, title, type, options} = field

  return (
    <Flex key={key} id="field-container" align="center" justify="space-between" style={{fontSize: '15px', padding: '1em 0'}}>
      <Flex>
        <Flex align="center" style={{marginRight: '20px'}}>{title}</Flex>
        {type === 'dropdown' && options.length > 0 ?
          (<Select style={{width: '200px'}} defaultValue={options[0]}>
            {options.map((option, index) => <Option key={index} value={option}>{option}</Option>)}
          </Select>) :
          type === 'radio' && options.length > 0 ?
            (<Radio.Group>
              <Space>
                {options.map(option => <Radio value={option}>{option}</Radio>)}
              </Space></Radio.Group>) : <TextArea/>}
      </Flex>
      <Flex>
        <Button style={{marginRight: '10px', cursor: 'pointer'}} onClick={setIsFieldEdited}>
          <EditOutlined />
        </Button>
        <Button style={{marginRight: '10px', color: 'red',cursor: 'pointer'}} onClick={deleteField}>
          <DeleteOutlined />
        </Button>
      </Flex>
    </Flex>
  )
}