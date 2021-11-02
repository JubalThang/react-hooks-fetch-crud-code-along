import React from "react";

function Item({ item, deletedItem, handleUpdate }) {

  function handleDeleteItem() {
    fetch(`http://localhost:3000/items/${item.id}`, {
      method: 'DELETE',
    })
    deletedItem(item.id)
  }

  function handleAddToCart() {
    fetch(`http://localhost:3000/items/${item.id}`, {
      method : 'PATCH',
      headers : {
        'Content-type' : 'application/json'
      },
      body : JSON.stringify({
        isInCart : !item.isInCart
      })
    })
    .then(resp => resp.json())
    .then(updatedItem => handleUpdate(updatedItem))
  }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button className={item.isInCart ? "remove" : "add"}
        onClick={handleAddToCart}>
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" onClick={handleDeleteItem}>Delete</button>
    </li>
  );
}

export default Item;
