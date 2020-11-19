<?php

include("conexion.php");

$consulta = "SELECT * FROM productos ORDER BY id ASC";

$resultado = mysqli_query($conection,$consulta);


if(!$resultado){
    die("Error".mysqli_error($conection));
}

$json = array();

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
    );
}

    $json_string = json_encode($json);
    echo $json_string;




?>