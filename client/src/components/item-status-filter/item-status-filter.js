import React, { useContext } from 'react';
import './item-status-filter.css';
import { Context } from '../../context/context'

export default function ItemStatusFilter(props) {
  let buttons = [
    { name: 'All', },
    { name: 'Active', },
    { name: 'Done', },
  ]
  const { onFilterChange } = useContext(Context)
  const { filter } = props;
  buttons = buttons.map(({ name }) => {
    const isActive = filter === name ? 'btn-info' : 'btn-outline-secondary'
    return (
      <button type='button'
        className={`btn ${isActive}`}
        key={name}
        onClick={() => onFilterChange(name)}>
        { name}
      </button >
    )
  })
  return (
    <div className="btn-group" name='formName' >
      { buttons}
    </div>
  );
}


