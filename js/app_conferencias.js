document.addEventListener('DOMContentLoaded',function()
{
    const form=document.getElementById('itemForm');
    const itemsTableBody=this.getElementById('itemsTableBody');

    function loadConferencias()
    {
        fetch('http://localhost/c24145/api/api.php')
        // fetch('https://php-c24145-codoacodo.000webhostapp.com/api/api.php')
        // .then(response=>console.log(response))
        .then(response=>response.json())
        .then(data=>
            {
                itemsTableBody.innerHTML='';
                // console.log('data:',data.conferencias);
                if(data.conferencias){
                    data.conferencias.forEach(conferencia=>
                        {
                            const row=document.createElement('tr');
                            row.innerHTML=`
                                <td>${conferencia.id}</td>
                                <td>${conferencia.titulo}</td>
                                <td>${conferencia.orador}</td>
                                <td>${conferencia.fecha}</td>
                                <td>${conferencia.horario}</td>
                                <td>${conferencia.ubicacion}</td>
                                <td>${conferencia.categoria}</td>
                                <td>${conferencia.sinopsis}</td>
                                <td>
                                    <button class="btn btn-danger" onclick="deleteItem(${conferencia.id})">Eliminar</button>
                                </td>
                                <td>
                                    <button class="btn btn-success" onclick="editItem(
                                    ${conferencia.id},
                                    '${conferencia.titulo}',
                                    '${conferencia.orador}',
                                    '${conferencia.fecha}',
                                    '${conferencia.horario}',
                                    '${conferencia.ubicacion}',
                                    '${conferencia.categoria}',
                                    '${conferencia.sinopsis}')
                                    ">Editar</button>
                                </td>
                            `
                            itemsTableBody.appendChild(row);
                        }
                    )
                }
                else{
                    console.log('No hay informacion de conferencias para mostrar.');

                }
            }
        )
        .catch(error=>console.error('Error:',error));
    }

    loadConferencias();

});

const conferencia_form = document.querySelector("#itemForm");

async function sendData() {
  // Associate the FormData object with the form element
  const formData = new FormData(conferencia_form);
  console.log(formData);
   // Build the data object.
  const json_data = {};
  formData.forEach((value, key) => (json_data[key] = value));
  console.log(json_data);
  // Log the data.
  try {
    const response = await fetch("https://php-c24145-codoacodo.000webhostapp.com/api/api.php", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      // Set the FormData instance as the request body
      body: JSON.stringify(json_data),
    });
    console.log(await response.json());
  } catch (e) {
    console.error(e);
  }
}

// Take over form submission
conferencia_form.addEventListener("submit", (event) => {
  console.log("Submiting form trough sendData...");
  event.preventDefault();
  sendData();
});
