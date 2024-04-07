import { FunctionComponent, useState } from "react";
import {  Button, Input, Form, Select } from "antd";
import {FieldData} from "../types.ts";
const { Option } = Select;

export const NewFieldForm: FunctionComponent<{
  fieldData?: FieldData,
  setNew: (field: FieldData) => void,
  cancel: () => void}> =
  ({fieldData, setNew, cancel}) => {

  const [currentField, setCurrentField] = useState({key: fieldData.key || '',
    title: fieldData.title || '',
    type: fieldData.type || 'textarea',
    options: fieldData.options || []})

  const onFinish = (values) => {
    setNew({...values, options: values.options ? values.options.split(',') : []})
    cancel()
  };

  const handleChange = (key, event) => {
    setCurrentField({...currentField, type: event.value})
  };

  return (
    <Form
      name="basic"
      onFinish={onFinish}
      autoComplete="off"
      style={{border: '1px dashed gray', width: '100%', padding: '1em'}}
    >
      <Form.Item
        label="Key"
        name="key"
        rules={[
          {
            required: true,
            message: 'Please enter your key!',
          },
        ]}
      >
        <Input defaultValue={currentField.key}/>
      </Form.Item>

      <Form.Item
        label="Title"
        name="title"
        rules={[
          {
            required: true,
            message: 'Please enter your title!',
          },
        ]}
      >
        <Input defaultValue={currentField.title}/>
      </Form.Item>

      <Form.Item
        name="type"
        label="Type"
      >
        <Select defaultValue={currentField.type || 'textarea'} onChange={handleChange}>
          <Option value="textarea">textarea</Option>
          <Option value="dropdown">dropdown</Option>
          <Option value="radio">radio</Option>
        </Select>
      </Form.Item>

      {(currentField.type === 'dropdown' || currentField.type === 'radio') && (<Form.Item
        label="Options"
        name="options"
      >
        <Input placeholder="Please seperate options values using ','" defaultValue={currentField.options}/>
      </Form.Item>)}

      <Form.Item>
        <Button type="primary"
                htmlType="submit"
                style={{marginRight: '10px'}}>
          Save
        </Button>
        <Button onClick={() => cancel()}>
          Cancel
        </Button>
      </Form.Item>
    </Form>
  )
}