var isTeacher = false;
var isActive = false;
var id = 0;

if (localStorage.length > 0) {
  console.log("entrou");
  for (let i = 1; i < localStorage.length; i++) {
    const userSalvo = JSON.parse(localStorage.getItem(i));

    const criar = async () =>
      await criarComponente(
        i,
        userSalvo.name,
        userSalvo.email,
        userSalvo.isTeacher
      );

    try {
      criar();
    } catch (error) {
      console.log(error);
    }
    console.log(userSalvo);
  }
}

const swicth = document.querySelector("#swicth");
swicth.addEventListener("click", () => {
  if (isActive) {
    isTeacher = false;
    isActive = false;
  } else {
    isTeacher = true;
    isActive = true;
  }
});

function salvar() {
  const name = document.querySelector("#nome").value;
  const email = document.querySelector("#email").value;

  const user = {
    name: name,
    email: email,
    isTeacher: isTeacher,
  };

  id++;

  localStorage.setItem(id, JSON.stringify(user));

  const userSalvo = JSON.parse(localStorage.getItem(id));
  criarComponente(id, userSalvo.name, userSalvo.email, userSalvo.isTeacher);
}

async function criarComponente(id, nome, email, isProfessor) {
  const userContainer = document.createElement("div");
  userContainer.className = "user-container";
  userContainer.id = id;

  const nometxt = document.createElement("span");
  nometxt.innerText = nome;

  const emailtxt = document.createElement("span");
  emailtxt.innerText = email;

  const isTeachertxt = document.createElement("span");
  isTeachertxt.innerText = isProfessor ? "Professor" : "Aluno";

  const excluirButton = document.createElement("button");
  excluirButton.className = "btn-excluir";
  excluirButton.innerText = "X";
  excluirButton.addEventListener("click", () => {
    userList.removeChild(userContainer);
    localStorage.removeItem(excluirButton.parentElement.id);
  });

  // Adiciona os elementos à div principal
  userContainer.appendChild(nometxt);
  // userContainer.appendChild(document.createElement("br"));
  userContainer.appendChild(emailtxt);
  // userContainer.appendChild(document.createElement("br"));
  userContainer.appendChild(isTeachertxt);
  // userContainer.appendChild(document.createElement("br"));
  userContainer.appendChild(excluirButton);

  // Adiciona a div principal ao corpo do documento
  const userList = document.querySelector("#user-list");

  userList.appendChild(userContainer);
}
