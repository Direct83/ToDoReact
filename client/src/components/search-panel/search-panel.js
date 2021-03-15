import React, { useContext } from 'react';
import { Context } from '../../context/context'
import './search-panel.css';

export default function SearchPanel() {
  const { onSearchChange } = useContext(Context)
  return (
    <input type="text"
      onChange={(event) => onSearchChange(event.target.value)}
      className="form-control search-input"
      placeholder="type to search" />
  );
};


