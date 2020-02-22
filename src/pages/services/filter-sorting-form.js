import React from 'react';
import { Form, Input, Switch } from 'antd'

const FilterSortingForm = ({ form: { getFieldDecorator }}) => {
  return (
    <Form onSubmit={() => {}}>
      <Form.Item label="Поиск по названию">
        {
          getFieldDecorator('search', {
            rules: [],
          })(<Input placeholder="Введите название СТО" />)
        }
      </Form.Item>
      <Form.Item label="Показать только специализированые СТО">
        {
          getFieldDecorator('specialized', {
            rules: [],
            valuePropName: 'checked',
          })(<Switch />)
        }
      </Form.Item>
    </Form>
  )
}
export default ({ onValuesChange }) => Form.create({ name: 'filterSortingForm', onValuesChange })(FilterSortingForm);

