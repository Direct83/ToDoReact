import React, { useState, useContext } from 'react';
import { Context } from '../../context/context'
import './item-add-form.css';

export default function ItemAddForm(props) {
  const [label, setLabel] = useState({
    label: '',
  })
  const onLabelChange = (event) => {
    setLabel({
      label: event.target.value
    })
  }
  const { addItem } = useContext(Context)
  const onSubmit = (event) => {
    event.preventDefault()
    addItem(label.label)
    event.target.inputAdd.value = ''
    setLabel({
      label: ''
    })
  }
  return (
    <form className='item-add-form d-flex'
      onSubmit={onSubmit}>
      <input type="text"
        className='form-control'
        name="inputAdd"
        onChange={onLabelChange}
        placeholder="Whats needs to be done"
      />
      <button type="submit" className="btn btn-outline-secondary"
      >Add Item</button>
    </form >
  )

};
