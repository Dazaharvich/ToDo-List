//atrapando elementos del DOM en variables globales
const ingresarTarea = document.querySelector('#ingresarTarea');
const btnAgregar = document.querySelector('#btn-agregar');
const tablaNueva = document.querySelector('#tablaNueva');
const contadorTareas = document.querySelector('#contadorTareas');
const tareasRealizadas = document.querySelector('#tareasRealizadas');
//contador para generar ID
let idCounter = 0;
//arreglo de tareas
const tareas = [];


//ingresando tarea y descripcion mediante evento click y validando el input
btnAgregar.addEventListener('click', ()=>{
    if(ingresarTarea.value != ''){
    idCounter++
    const nuevaTarea = {id: idCounter, descripcion: ingresarTarea.value, /* estado: false */};
    tareas.push(nuevaTarea);
    ingresarTarea.value = "";
    renderTareas(tareas);
    }else{
        alert('Por favor ingresar una tarea')
    }

});

//funcion de render para actualizar template
function renderTareas(){
    tareasRealizadas.innerHTML = '';
    let html ="";
    for (let tarea of tareas){
        html+=`<tr>
        <td>${tarea.id}</td>
        <td>${tarea.descripcion}</td>
        <td>
        <input type="checkbox" onclick="estadoCheckbox(${tarea.id})" ${tarea.estado ? 'checked' : ''}/>
        <td/>
        <td><button onclick="eliminar(${tarea.id})" class="btn-eliminar">X</button></td>
        </tr>`;
    }
    tablaNueva.innerHTML = html;
    totalTareas();
};

//funcion para borrar una tarea
function eliminar(id){
    const index = tareas.findIndex((e) => e.id === id);
    tareas.splice(index, 1);
    renderTareas();
    totalTareas()
}
//funcion que actualiza estado de tarea(Realizado o No)
function estadoCheckbox(id){
    tareas.map((ele) => {if (ele.id == id) ele.estado = !ele.estado});
    renderTareas(tareas);
}

//contadores de tareas
function totalTareas(){
    contadorTareas.innerHTML = tareas.length;
    const totalRealizadas = tareas.filter((tarea) => tarea.estado ===true);
    tareasRealizadas.innerHTML = totalRealizadas.length;

}