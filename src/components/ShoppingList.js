import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  function handleAddNewItem(newItem) {
    setItems([...items, newItem])
  }

  function deleteItem(id) {
    setItems(items.filter(item => item.id !== id))
  }

  function handleUpdateItem(updatedItem) {
    const updatedItems = items.map(item => {
      if (item.id === updatedItem.id) {
        return updatedItem
      }
      return item
    })

    setItems(updatedItems)
  }

  function errorHandler(res) {
    if (res.status >= 200 && res.status <= 299) {
      return res.json()
    } else {
      throw Error(res.statusText);
    }
  }
  useEffect(() => {
    fetch('http://localhost:3000/items')
      // .then(res => res.json())
      .then(errorHandler)
      // .then(res => {
      //  if(!res.ok){
      //    throw new Error('Network response was not OK')
      //  } else {
      //    res.json()
      //  }
      // })
      .then(items => setItems(items))
      .catch(error => {})

  }, [])

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddNewItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
     
      {items.length > 0 ? <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} deletedItem={deleteItem} handleUpdate={handleUpdateItem} />
        ))}
      </ul> : <h1 style={{textAlign: 'center'}}>Check your Connections</h1>}
      
    </div>
  );
}

export default ShoppingList;
