document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'http://localhost:3000/monsters';
    let page = 1;
    const limit = 50;
  
    // Fetch and display monsters
    const fetchMonsters = (page) => {
      fetch(`${API_URL}/?_limit=${limit}&_page=${page}`)
        .then(response => response.json())
        .then(monsters => displayMonsters(monsters))
        .catch(error => console.error('Error fetching monsters:', error));
    };
  
    // Display monsters
    const displayMonsters = (monsters) => {
      const monsterContainer = document.getElementById('monster-container');
      monsterContainer.innerHTML = ''; // Clear previous monsters
  
      monsters.forEach(monster => {
        const monsterDiv = document.createElement('div');
        monsterDiv.className = 'monster';
        monsterDiv.innerHTML = `
          <h2>${monster.name}</h2>
          <p>Age: ${monster.age}</p>
          <p>Description: ${monster.description}</p>
        `;
        monsterContainer.appendChild(monsterDiv);
      });
    };
  
    // Create monster form
    const createMonsterForm = () => {
      const createMonsterDiv = document.getElementById('create-monster');
      createMonsterDiv.innerHTML = `
        <form id="monster-form">
          <input type="text" id="name" name="name" placeholder="Name" required>
          <input type="number" id="age" name="age" placeholder="Age" required>
          <textarea id="description" name="description" placeholder="Description" required></textarea>
          <button type="submit">Create Monster</button>
        </form>
      `;
  
      document.getElementById('monster-form').addEventListener('submit', createMonster);
    };
  
    // Create a new monster
    const createMonster = (event) => {
      event.preventDefault();
      
      const name = event.target.name.value;
      const age = event.target.age.value;
      const description = event.target.description.value;
  
      fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ name, age, description })
      })
      .then(response => response.json())
      .then(monster => {
        console.log('Monster created:', monster);
        fetchMonsters(page); // Refresh the list after creation
        event.target.reset(); // Reset form
      })
      .catch(error => console.error('Error creating monster:', error));
    };
  
    // Navigation buttons
    document.getElementById('back').addEventListener('click', () => {
      if (page > 1) {
        page--;
        fetchMonsters(page);
      }
    });
  
    document.getElementById('forward').addEventListener('click', () => {
      page++;
      fetchMonsters(page);
    });
  
    // Initial fetch and form creation
    fetchMonsters(page);
    createMonsterForm();
  });
  