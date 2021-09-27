// HTML 
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Redux demo</title>
</head>

<body>
  <h1>Redux demo</h1>

  <form id="hobbyFormId">
    Enter your hobby: <input id="hobbyTextId" type="text">
  </form>

  <h2>My hobbies:</h2>
  <ul id="hobbyListId"></ul>

  <script src="https://unpkg.com/redux@4.0.5/dist/redux.js"></script>
  <script src="./main.js"></script>
</body>

</html>
// javascpript
console.log(window.Redux)

const { createStore } = window.Redux;

// SETUP REDUX STORE
// state
// reducer
// store
const initialState = JSON.parse(localStorage.getItem('hobby_list')) || [];

const hobbyReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_HOBBY': {
      const newList = [...state];
      newList.push(action.payload);

      return newList;
    }
    default:
      return state;
  }
}

const store = createStore(hobbyReducer);

// -----------------

// RENDER REDUX HOBBY LIST
const renderHobbyList = (hobbyList) => {
  if (!Array.isArray(hobbyList) || hobbyList.length === 0) return;

  const ulElement = document.querySelector('#hobbyListId');
  if (!ulElement) return;

  // reset previous content of ul
  ulElement.innerHTML = '';

  for (const hobby of hobbyList) {
    const liElement = document.createElement('li');
    liElement.textContent = hobby;

    ulElement.appendChild(liElement);
  }
}


// RENDER INITIAL HOBBY LIST
const initialHobbyList = store.getState();
console.log(initialHobbyList);
renderHobbyList(initialHobbyList);


// HANDLE FORM SUBMIT
const hobbyFormElement = document.querySelector('#hobbyFormId');
if (hobbyFormElement) {
  const handleFormSubmit = (e) => {
    // prevent browser from reloading
    e.preventDefault();

    const hobbyTextElement = hobbyFormElement.querySelector('#hobbyTextId');
    if (!hobbyTextElement) return;

    console.log('SUBMIT', hobbyTextElement.value);
    const action = {
      type: 'ADD_HOBBY',
      payload: hobbyTextElement.value
    };
    store.dispatch(action);

    // reset form
    hobbyFormElement.reset();
  };

  hobbyFormElement.addEventListener('submit', handleFormSubmit);
}

store.subscribe(() => {
  console.log('STATE UPDATE: ', store.getState());
  const newHobbyList = store.getState();
  renderHobbyList(newHobbyList);

  localStorage.setItem('hobby_list', JSON.stringify(newHobbyList));
});
