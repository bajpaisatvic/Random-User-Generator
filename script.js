document.addEventListener("DOMContentLoaded", function () {
  const generateBtn = document.getElementById(`generate`);
  const userList = document.getElementById(`user-list`);

  generateBtn.addEventListener(`click`, async function () {
    userList.innerHTML = ``;
    try {
      const data = await fetchUsers();
      displayUsers(data);
    } catch (error) {
      alert(`Error fetching users: ${error}`);
    }
  });

  async function fetchUsers() {
    const randomNo = (Math.random() % 50) + 1;
    const url = `https://api.freeapi.app/api/v1/public/randomusers?page=${randomNo}&limit=5`;
    const options = { method: "GET", headers: { accept: "application/json" } };
    const response = await fetch(url, options);
    // const response = await fetch(`https://randomuser.me/api/?results=10`);
    if (!response.ok) {
      throw new Error(`Network response was not ok`);
    }
    const users = await response.json();
    return users.data;
  }

  function displayUsers(data) {
    console.log(data.data[0]); // Log the users to the console
    const users = data.data;
    userList.innerHTML = ``; // Clear previous users

    users.forEach((user) => {
      const li = document.createElement(`li`);
      li.classList.add(`user`);
      li.innerHTML = `<div class='username'>${user.name.first} ${user.name.last} </div>
      <div class='gender'> ${user.gender}</div>
      <div class='age'> ${user.dob.age}</div>`;
      //   li.textContent = `${user.name.first} ${user.name.last}`;
      userList.appendChild(li);
    });
  }
});
