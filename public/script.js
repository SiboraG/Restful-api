fetch("http://localhost:5500/book")
  .then( res => res.json())
  .then(book => {
    renderBook(book);
  })

  

    //fetch with delete method the localhost/5500/book/id
   function deleteBook(id) {
      fetch('http://localhost:5500/book/${id}', {
       method: "Delete",
        body: JSON.stringify({
           data: "to",
            send: "here",
       }),
    })
        .then(response => response.json())
        .then(book => console.log(book))
  }
  

    // fetch with  PUT method the localhost/5500/book/id
    fetch('http://localhost:5500/book/${id}', {
      method: "PUT",
      body: JSON.stringify({
          data: "to",
          send: "here",
      }),
  })
      .then(response => response.json())
      .then(book => console.log(book));

    function renderBook(book) {
    const tableBody = document.getElementById("book-table").querySelector("tbody");
    tableBody.innerHTML = ""; // Clear existing rows
  

    
    book.forEach((book, index) => {
      const row = document.createElement("tr");
  
      // TODO or to think. maybe using addEventListener instead of using direct event listeners.
      row.innerHTML = `
        <td>${book.id}</td>
        <td contenteditable="true" oninput="updateBook(${index}, 'title', this.innerText)">${book.title}</td>
        <td contenteditable="true" oninput="updateBook(${index}, 'author', this.innerText)">${book.author}</td>
        <td contenteditable="true" oninput="updateBook(${index}, 'publisher', this.innerText)">${book.publisher}</td>
        <td contenteditable="true" oninput="updateBook(${index}, 'genre', this.innerText)">${book.genre}</td>
        <td>
          <button onclick= "deleteRow(this)"> Delete </button>
        </td> `;
      
      tableBody.appendChild(row);
    });
    
  }
 
  function createNewBook() {
   
    //fetch with  POST method the localhost/5500/book
    fetch('http://localhost:5500/book', {
     method: "POST",
      body: JSON.stringify({
         data: "to",
       send: "here",
     }),
 })
     .then(response => response.json())
     .then(book => console.log(book));

    const newTitle = document.getElementById("newTitle").value;
    const newAuthor = document.getElementById("newAuthor").value;
    const newPublisher = document.getElementById("newPublisher").value;
    const newGenre = document.getElementById("newGenre").value;
  
    if (!newTitle || !newAuthor || !newPublisher || !newGenre) {
      alert("Please fill in all fields.");
      return;
    }
  
    const newBook = {
      id: book.length ? book[book.length - 1].id + 1 : 1,
      title: newTitle,
      author: newAuthor,
      publisher: newPublisher,
      genre: newGenre,
    };
    
    book.push(newBook);
    renderBook();
  
    // Clear the input fields
    document.getElementById("newTitle").value = "";
    document.getElementById("newAuthor").value = "";
    document.getElementById("newPublisher").value = "";
    document.getElementById("newGenre").value = "";
  }
  