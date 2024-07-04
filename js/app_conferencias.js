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
