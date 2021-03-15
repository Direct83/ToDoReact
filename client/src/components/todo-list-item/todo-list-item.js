import React, { useContext } from 'react';
import './todo-list-item.css';
import { Context } from '../../context/context'

export default function TodoListItem(props) {
  const { label, done, important, id } = props;
  let classNames = 'todo-list-item';
  if (done) {
    classNames += ' done'
  }
  if (important) {
    classNames += ' important'
  }
  const { onToggleDone, onToggleImportant, deleteItem } = useContext(Context)
  return (
    <span className={classNames}>
      <span
        className="todo-list-item-label"
        onClick={() => onToggleDone(id)}>
        {label}
      </span>

      <button type="button"
        className="btn btn-outline-success btn-sm float-right"
        onClick={() => onToggleImportant(id)}>
        <i className="fas fa-exclamation-triangle" />
      </button>

      <button type="button"
        className="btn btn-outline-danger btn-sm float-right"
        onClick={() => deleteItem(id)}>
        <i className="fas fa-backspace" />
      </button>
    </span >
  );

}
