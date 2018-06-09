const ul = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');

// Get Data
function handleDbItems(item) {
  const li = document.createElement('li');
  const name = document.createElement('span');
  const city = document.createElement('span');
  const cross = document.createElement('div')

  name.textContent = item.data().name;
  city.textContent = item.data().city;

  cross.textContent = 'x'

  li.setAttribute('data-id', item.id);

  li.appendChild(name);
  li.appendChild(city);

  li.appendChild(cross)

  ul.appendChild(li);

  //deleting data
  cross.addEventListener('click', (e) => {
    e.stopPropagation();
    
    const id = e.target.parentElement.getAttribute('data-id')
    if (id === item.id) {
      db.collection('cafes').doc(id).delete();
      e.target.parentElement.remove()
    }
  })
}

db.collection('cafes')
  .get()
  .then(snapshot => {
    snapshot.forEach(item => {
      handleDbItems(item);
    });
  });

//Upload data
form.addEventListener('submit', e => {
  e.preventDefault();

  db.collection('cafes').add({
    name: form.name.value,
    city: form.city.value
  }).then(() => {
    form.name.value = '';
    form.city.value = '';
  });
});
