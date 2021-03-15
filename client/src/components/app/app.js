import React, { useState } from 'react';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form'
import './app.css';
import { Context } from '../../context/context'

export default function App() {

  let maxId = 0;
  const [data, setData] = useState({
    todoData: [
      { label: 'Drink Coffee', important: false, done: false, id: maxId++ },
      { label: 'Make Awesome App', important: false, done: false, id: maxId++ },
      { label: 'Have a lunch', important: false, done: false, id: maxId++ },
    ],
    term: '',
    filter: 'All', //active all done
  })


  const deleteItem = (id) => {
    setData(({ todoData }) => ({
      todoData: todoData.filter(el => el.id !== id)
    }))
  }

  const addItem = (item) => {
    const newItem = { label: item, important: false, done: false, id: maxId++ };
    setData(({ todoData }) => ({
      todoData: [...todoData, newItem]
    }))
  }

  function onToggleProperty(id, propName) {
    console.log(id);
    setData(({ todoData, term, filter }) => {
      const indexItem = todoData.findIndex(el => el.id === id)
      return {
        term,
        filter,
        todoData: [...todoData.slice(0, indexItem),
        { ...todoData[indexItem], [propName]: !todoData[indexItem][propName] },
        ...todoData.slice(indexItem + 1)
        ]
      }
    })
  }

  const onToggleDone = (id) => {
    onToggleProperty(id, 'done')
  }

  const onToggleImportant = (id) => {
    onToggleProperty(id, 'important')
  }

  function search(items, term = "") {

    return items.filter(el => new RegExp([term], 'i').test(el.label))
  }
  const onSearchChange = (term) => {
    console.log("onSearchChange", term);
    setData({
      ...data,
      term,
    })
  }
  const onFilterChange = (filter) => {
    setData({
      ...data,
      filter,
    });
  }
  function filterItem(items, filter) {
    switch (filter) {
      case 'All':
        return items;
      case 'Active':
        return items.filter(el => !el.done)
      case 'Done':
        return items.filter(el => el.done)
      default:
        return items;
    }
  }

  const visibleItem = filterItem(search(data.todoData, data.term), data.filter)
  const todoCount = data.todoData.filter(el => !el.done).length;
  const doneCount = data.todoData.length - todoCount;
  return (
    <Context.Provider value={{ onSearchChange, onToggleDone, onToggleImportant, deleteItem, onFilterChange, addItem }}>
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter
            filter={data.filter}
          />
        </div>
        <TodoList todos={visibleItem} />
        <div>
          <ItemAddForm />
        </div>
      </div>
    </Context.Provider>
  )
};
