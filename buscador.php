<?php
include("conexion.php");

$busqueda = $_POST["search"]; //search es la variable que se envia desde la peticion ajax data

if(!empty($busqueda)){
    $peticion = "SELECT * FROM productos WHERE nombre LIKE '$busqueda%'";
    $resultado = mysqli_query($conection, $peticion);

    if(!$resultado){
        die("Error de consulta". mysqli_error($conection));
    }
    $json = array();
    //Llena el Json
    while($row = mysqli_fetch_array($resultado)){
        $json[] = array(
            'id' => $row['id'],
            'codigo' => $row['codigo'],
            'nombre' => $row['nombre'],
            'categoria' => $row['categoria'],
            'frase_promocional' => $row['frase_promocional'],
            'descripcion' => $row['descripcion'],
            'colores' => $row['colores'],
            'precio' => $row['precio'],
            'disponibilidad' => $row['disponibilidad'],
            'promocion' => $row['promocion'],
            'fecha' => $row['fecha']
        );}

        $json_string = json_encode($json);
        echo $json_string;


}


?>