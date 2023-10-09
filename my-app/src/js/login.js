
const formEl = document.querySelector('.form');

async function register(event) {
  event.preventDefault();

  const formData = new FormData(formEl);

  try {
    const response = await fetch('http://thesis.test/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(Object.fromEntries(formData))
    });

    if (!response.ok) {
      // Handle non-OK response
      const errorText = await response.text();
      console.log(`Error: ${response.status} - ${errorText}`);
      return;
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

formEl.addEventListener('submit', register);


const formlogin = document.querySelector('.login');

async function login(event) {
  event.preventDefault();

  const formData = new FormData(formlogin);

  try {
    const response = await fetch('http://thesis.test/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    });

    if (!response.ok) {
      // Handle server-side errors with an error message
      const errorText = await response.text();
      console.error(`Error: ${response.status} - ${errorText}`);
      return;
    }

    // Assuming the response contains user information, you can parse it
    const data = await response.json();



    showUserInfo(data);
    showUserrubrics(data);
    userdrp(data);
    rubricsdrp(data);





    
  } catch (error) {
    console.error(error);
  }
}

formlogin.addEventListener('submit', login);


// Function to update the user data in the HTML
function updateUserData(id, question) {
  const userDataDiv = document.getElementById("userData");

  // Create new elements for ID and Question
  const idElement = document.createElement("p");
  const questionElement = document.createElement("p");

  // Set the content for the new elements
  idElement.textContent = `User ID: ${id}`;
  questionElement.textContent = `User Question: ${question}`;

  // Append the new elements to the userDataDiv
  userDataDiv.appendChild(idElement);
  userDataDiv.appendChild(questionElement);
}

function showUserInfo(data) {
  const userId = data.user.id;
  const apiUrl = `http://thesis.test/api/question/${userId}`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log("API Response Data:", data); // Log the API response for inspection
      if (data.length >= 1) {
        for (let i = 0; i < data.length; i++){
          const id = data[i].id;
        const question = data[i].question;
        
        updateUserData(id, question); 

        }
        
        
      } else {
        console.error("Data is missing 'id' or 'question' properties:", data);
      }
      // let id = data[0].id;
      // let question = data[0].question;
      
      // console.log(id);
      // console.log(question);
    })
    .catch(error => {
      console.error("Fetch Error:", error);
    });
}







function updateUserrubrics(id, rubrics) {
  const userDataDiv = document.getElementById("userrubrics");

  // Create new elements for ID and Question
  const idElement = document.createElement("p");
  const questionElement = document.createElement("p");

  // Set the content for the new elements
  idElement.textContent = `User ID: ${id}`;
  questionElement.textContent = `User Rubrics: ${rubrics}`;

  // Append the new elements to the userDataDiv
  userDataDiv.appendChild(idElement);
  userDataDiv.appendChild(questionElement);
}

function showUserrubrics(data) {
  const userId = data.user.id;
  const apiUrl = `http://thesis.test/api/rubrics/${userId}`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log("API Response Data:", data); // Log the API response for inspection
      if (data.length >= 1) {
        for (let i = 0; i < data.length; i++){
          const id = data[i].id;
        const rubrics = data[i].rubrics;
        
        updateUserrubrics(id, rubrics); 

        }
        
        
      } else {
        console.error("Data is missing 'id' or 'question' properties:", data);
      }
   
    })
    .catch(error => {
      console.error("Fetch Error:", error);
    });
}




function userdrp(data) {
  const userId = data.user.id;
  const apiUrl = `http://thesis.test/api/question/${userId}`;

  fetch(apiUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    console.log("API Response Data:", data); 
    if (data.length >= 1) {
      drpdownquestion(data); 
    }
  })
  .catch((error) => {
    console.error("Error:", error);
  });
}

function drpdownquestion(data) {
  const dropdown = document.createElement("select");

  for (let i = 0; i < data.length; i++) {
    const option = document.createElement("option");
    option.text = data[i].question; 
    option.value = data[i].id; 
    dropdown.appendChild(option);
  }


  const container = document.getElementById("dropdownquestion");
  container.appendChild(dropdown);
}


function rubricsdrp(data) {
  const userId = data.user.id;
  const apiUrl = `http://thesis.test/api/rubrics/${userId}`;

  fetch(apiUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    console.log("API Response Data:", data); 
    if (data.length >= 1) {
      drpdownrubrics(data); a
    }
  })
  .catch((error) => {
    console.error("Error:", error);
  });
}

function drpdownrubrics(data) {
  const dropdown = document.createElement("select");

  for (let i = 0; i < data.length; i++) {
    const option = document.createElement("option");
    option.text = data[i].rubrics; 
    option.value = data[i].id; 
    dropdown.appendChild(option);
  }

  const container = document.getElementById("dropdownrubrics");
  container.appendChild(dropdown);
}

const takePictureButton = document.getElementById('takePictureButton');
const capturedImage = document.getElementById('capturedImage');


const takePicture = async () => {
  try {
    const image = await Capacitor.Plugins.Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: Capacitor.Enums.CameraResultType.Uri
    });

  
    capturedImage.src = image.webPath;
    capturedImage.style.display = 'block';
  } catch (error) {
    console.error('Error taking picture:', error);
  }
};

takePictureButton.addEventListener('click', takePicture);