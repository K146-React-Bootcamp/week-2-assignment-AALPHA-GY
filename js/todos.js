renderHeader();

const todosUrl = "https://jsonplaceholder.typicode.com/todos";
const root = document.querySelector("#root");
const editModal = document.querySelector("#editModal");
let todos = [];
let todo;

let current_page = 1;
let rows = 15;

const renderTodos = (page = 1) => {
	root.innerHTML = "";
	// todoları listele
	const table = document.createElement("table");
	table.setAttribute("class", "table table-hover");

	const thead = document.createElement("thead");
	thead.innerHTML = `
    <tr>
      <th scope="col">id<button id="id_pg">&circlearrowright;</button> <button id="id_pw">&circlearrowleft;</button></th>
      <th scope="col">Başlık<button id="title_pg">&circlearrowright;</button> <button id="title_pw">&circlearrowleft;</button></th>
      <th scope="col">Kullanıcı Id <button id="userId_pg">&circlearrowright;</button> <button id="userId_pw">&circlearrowleft;</button></th>
      <th scope="col">Durum <button id="is_active_pg">&circlearrowright;</button> <button id="is_active_pw">&circlearrowleft;</button></th>
      <th scope="col"></th>
    </tr>
  `;
	table.appendChild(thead);

	const tbody = document.createElement("tbody");
	const renderItem = (item) => {
		const tr = document.createElement("tr");
		tr.innerHTML = `
      <td>${item.id}</td>
      <td>${item.title}</td>
      <td>${item.userId}</td>
      <td>${item.completed ? "Tamamlandı" : "Yapılacak"}</td>
      <td>
        <button class="btn btn-xs btn-danger remove" data-id=${
					item.id
				}>Sil</button>
        <button class="btn btn-xs btn-warning edit" data-id=${
					item.id
				}>Düzenle</button>
      </td>
    `;
		tbody.appendChild(tr);
	};

	page--;

	let start = rows * page;
	console.log({ start });
	let end = start + rows;
	console.log({ end });
	let paginatedItems = todos.slice(start, end);
	paginatedItems.forEach((item) => {
		renderItem(item);
	});

	/*todos.slice(0, 15).forEach((item) => {
		renderItem(item);
	});*/


	table.appendChild(tbody);
	root.append(table);

	document.querySelectorAll(".remove").forEach((button) => {
		button.addEventListener("click", (e) => {
			const id = Number(e.currentTarget.getAttribute("data-id"));
			if (confirm("kaydı silmek istediğinize emin misiniz?")) {
				todos = todos.filter((x) => x.id !== id);
				renderTodos();
			}
		});
	});

	document.querySelectorAll(".edit").forEach((button) => {
		button.addEventListener("click", (e) => {
			const id = Number(e.currentTarget.getAttribute("data-id"));
			todo = todos.find((todo) => todo.id == id);
			editModal.querySelector("#title").value = todo.title;
			editModal.querySelector("#completed").checked = todo.completed;
			editModal.style.display = "block";
			editModal.classList.add("show");
		});
	});
	document.querySelector("#id_pg").addEventListener("click", () => {
		todos.sort((a, b) => b.id - a.id);
		renderTodos(current_page);
	});
	document.querySelector("#id_pw").addEventListener("click", () => {
		todos.sort((b, a) => b.id - a.id);
		renderTodos(current_page);
	});


	document.querySelector('#title_pg').addEventListener('click',() => {
		todos.sort((a, b) => {
			const nameA = a.title.toUpperCase();
			const nameB = b.title.toUpperCase();
			if (nameA < nameB) {
				return -1;
			}
			if (nameA > nameB) {
				return 1;
			}
			return 0;
		});
		renderTodos(current_page);
	});




	document.querySelector("#userId_pg").addEventListener("click", () => {
		todos.sort((a, b) => b.id - a.id);
		renderTodos(current_page);
	});
	document.querySelector("#userId_pw").addEventListener("click", () => {
		todos.sort((b, a) => b.id - a.id);
		renderTodos(current_page);
	});


	document.querySelector("#is_active_pg").addEventListener("click", () => {
		todos.sort((a, b) => {
			if(a.completed==true)
			{
				return -1;
			}else{
				return 0;
			}

		})
		renderTodos(current_page);
	});
	document.querySelector("#is_active_pw").addEventListener("click", () => {
		todos.sort((b, a) => {
			if(b.completed==false)
			{
				return -1;
			}else{
				return 0;
			}

		})
		renderTodos(current_page);
	});
};



document.querySelectorAll(".page-link").forEach((btn) => {
	btn.addEventListener("click", () => {
		let data_id = btn.getAttribute("data-id");
		current_page = Number(data_id);
		renderTodos(current_page);
	});
});





editModal.querySelector("#save").addEventListener("click", () => {
	todo.title = editModal.querySelector("#title").value;
	todo.completed = editModal.querySelector("#completed").checked;
	const index = todos.findIndex((t) => t.id == todo.id);
	todos[index] = todo;
	renderTodos();
	editModal.style.display = "none";
	editModal.classList.remove("show");
});

editModal.querySelectorAll(".close").forEach((button) => {
	button.addEventListener("click", () => {
		editModal.style.display = "none";
		editModal.classList.remove("show");
	});
});

fetch(todosUrl)
	.then((resp) => resp.json())
	.then((data = []) => {
		todos = data;
		renderTodos();
	})
	.catch((error) => {
		errorLogger(error);
	});

	// sıralama ödevi algoritması
	// table thead kısmındaki sıralama yapılacak kolonlara event listener eklenecek.
	// event listener hangi kolon için tıklanıyorsa
	// sort metodu kullanılarak sıralama yapılacak
	// sıralanmış todos'todus içerisine atılacak
	// renderTodos metodu çalıştırılacak.