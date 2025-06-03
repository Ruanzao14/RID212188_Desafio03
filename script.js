const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');

let completedTasks = 0;

const tasks = [
  { name: 'Implementar tela de listagem de tarefas', tag: 'frontend', created: '21/08/2024', done: false },
  { name: 'Criar endpoint para cadastro de tarefas', tag: 'backend', created: '21/08/2024', done: false },
  { name: 'Implementar protótipo da listagem de tarefas', tag: 'ux', created: '21/08/2024', done: true },
];

function updateTaskCount() {
  taskCount.textContent = `${completedTasks} tarefa${completedTasks !== 1 ? 's' : ''} concluída${completedTasks !== 1 ? 's' : ''}`;
}

function createTaskElement(task, index) {
  const li = document.createElement('li');
  li.className = 'task';

  const info = document.createElement('div');
  info.className = 'task-info';

  const name = document.createElement('p');
  name.textContent = task.name;
  if (task.done) name.classList.add('concluida-texto');

  const tag = document.createElement('span');
  tag.className = 'tag';
  tag.textContent = task.tag;

  const date = document.createElement('span');
  date.textContent = `Criado em: ${task.created}`;

  info.appendChild(name);
  info.appendChild(tag);
  info.appendChild(date);

  const button = document.createElement('button');
  if (task.done) {
    button.innerHTML = '✓';
    button.className = 'concluida';
  } else {
    button.textContent = 'Concluir';
    button.className = 'concluir';
    button.onclick = () => {
      task.done = true;
      completedTasks++;
      renderTasks();
    };
  }

  li.appendChild(info);
  li.appendChild(button);

  return li;
}

function renderTasks() {
  taskList.innerHTML = '';
  completedTasks = 0;

  tasks.forEach((task, i) => {
    if (task.done) completedTasks++;
    const taskElement = createTaskElement(task, i);
    taskList.appendChild(taskElement);
  });

  updateTaskCount();
}

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('taskName').value.trim();
  const label = document.getElementById('taskLabel').value.trim();

  if (!name) return;

  const newTask = {
    name,
    tag: label || 'geral',
    created: new Date().toLocaleDateString('pt-BR'),
    done: false,
  };

  tasks.push(newTask);
  renderTasks();

  taskForm.reset();
});

renderTasks();