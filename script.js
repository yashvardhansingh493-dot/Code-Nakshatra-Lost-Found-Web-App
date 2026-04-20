let items = JSON.parse(localStorage.getItem("items")) || [];

// Handle Form Submit
document.getElementById("itemForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let file = document.getElementById("image").files[0];

  if (file) {
    let reader = new FileReader();
    reader.onload = function() {
      saveItem(reader.result);
    };
    reader.readAsDataURL(file);
  } else {
    saveItem("");
  }
});

function saveItem(imageData) {
  let item = {
    name: document.getElementById("name").value,
    location: document.getElementById("location").value,
    description: document.getElementById("description").value,
    type: document.getElementById("type").value,
    contact: document.getElementById("contact").value,
    image: imageData
  };

  items.push(item);
  localStorage.setItem("items", JSON.stringify(items));

  document.getElementById("itemForm").reset();
  displayItems(items);
}

// Display Items
function displayItems(data) {
  let container = document.getElementById("itemsContainer");
  container.innerHTML = "";

  data.forEach((item, index) => {
    container.innerHTML += `
      <div class="card">
        ${item.image ? `<img src="${item.image}">` : ""}
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <p><b>Location:</b> ${item.location}</p>
        <p><b>Type:</b> ${item.type}</p>
        <p><b>Contact:</b> ${item.contact}</p>
        <button onclick="deleteItem(${index})">Delete</button>
      </div>
    `;
  });
}

// Delete Item
function deleteItem(index) {
  items.splice(index, 1);
  localStorage.setItem("items", JSON.stringify(items));
  displayItems(items);
}

// Filter Items
function filterItems(type) {
  if (type === "all") {
    displayItems(items);
  } else {
    let filtered = items.filter(item => item.type === type);
    displayItems(filtered);
  }
}

// Load items on page load
displayItems(items);