<?php

if($_POST){  //Se verifica que hayan llegado datos vía POST
   //echo "recibo algo POST";
   
   //se recuperan los datos y se decodifico con PHP
   $misDatosJSON = json_decode($_POST["datos"],true);
   
   $datos_animaless = file_get_contents("files/animales.json"); //Se leen los datos del archivo json
   $json_animales = json_decode($datos_animaless, true); //Se decodifican y se guardan en un arreglo
 
   array_push($json_animales["animales"], $misDatosJSON); //Se agregan los datos recibidos 

//Se vuelven a guardar en el archivo json
 $file = 'files/animales.json';  
file_put_contents($file, json_encode($json_animales)); 
}


?>