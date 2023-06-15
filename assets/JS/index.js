$(function () {
    $("#boton").click(function() {
        $.get("https://sinca.mma.gob.cl/index.php/json/listadomapa2k19/", 
        function(data, status) {
            console.log(status);

            let indiceSeleccionado = atajarInput(data)

            comuna =  JSON.stringify(data[indiceSeleccionado].comuna)
            materialParticulado = JSON.stringify(data[indiceSeleccionado].realtime[0].tableRow.value)
            region = JSON.stringify(data[indiceSeleccionado].region)
            calidadAire = JSON.stringify(data[indiceSeleccionado].realtime[0].tableRow.status)
            valor = JSON.stringify(data[indiceSeleccionado].realtime[0].name)

            $("#resultados").html(`<p>Comuna: ${comuna}</p>
                                <p>Región: ${region}</p>
                                <p>El valor de ${valor} en el aire es de ${materialParticulado}</p>
                                <p>La calidad del aire es ${calidadAire}</p>
                                `)
        })
    })
})

$(function() {
    $("#input").click(function() {
        $("#input").val("")
        $("#resultados").html("")
    })
})

function atajarInput(data) {
    let nombresLocalidad = []
            
    let nombreIngresado = $("#input").val()
    const palabras = nombreIngresado.split(" ");
    for (let i = 0; i < palabras.length; i++) {
        palabras[i] = palabras[i][0].toUpperCase() + palabras[i].substr(1);
    }
    
    nombreCapitalized = palabras.join(" ");

    console.log(nombreCapitalized);
    data.forEach(localidad => {
        nombresLocalidad.push(localidad.comuna)
    });
    console.log(nombresLocalidad);
    
    let indiceSeleccionado = nombresLocalidad.indexOf(nombreCapitalized)

    return indiceSeleccionado
}