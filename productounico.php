<?php
include('conexion.php');

$id = $_POST['id'];
$consulta = "SELECT * FROM productos WHERE id=$id";
$resultado = mysqli_query($conection,$consulta);



if(!$resultado){
    die("consulta fallida");
}

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

    $json_string = json_encode($json[0]);
    echo $json_string;


?>