import React from "react";

// Your shopping list manager code
const App = () => {
  const addButton = document.getElementById("addButton");
  const itemInput = document.getElementById("itemInput");
  const itemList = document.getElementById("itemList");

  const addItem = async () => {
    const itemName = itemInput.value.trim();
    if (itemName) {
      try {
        const response = await fetch("/api/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ item: itemName }),
        });
        const result = await response.json();
        alert(result.message);
        itemInput.value = "";
        fetchItems();
      } catch (error) {
        console.error("Error adding item:", error);
        alert("There was an error adding the item. Please try again.");
      }
    } else {
      alert("Please enter an item.");
    }
  };

  const fetchItems = async () => {
    try {
      const response = await fetch("/api/items");
      const items = await response.json();
      itemList.innerHTML = "";
      items.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        itemList.appendChild(li);
      });
    } catch (error) {
      console.error("Error fetching items:", error);
      alert("There was an error fetching the items. Please try again.");
    }
  };

  // Use useEffect to fetch items on component mount
  React.useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div>
      <input type="text" id="itemInput" placeholder="Enter an item" />
      <button id="addButton" onClick={addItem}>
        Add Item
      </button>
      <ul id="itemList"></ul>
    </div>
  );
};

// Ensure App is exported as the default export
export default App;
