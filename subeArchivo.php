<?php
//se recuperan los datos del arhivo
$nombre_archivo = $_FILES['imagen']['name'];
$tipo_archivo = $_FILES['imagen']['type'];
$tamano_archivo = $_FILES['imagen']['size'];

//compruebo si las características del archivo son las que se quiere
//strpos busca la primera ocurrencia de una subcadena en un string, devuelve falso si no la encuentra 
if (!((strpos($tipo_archivo, "png") || strpos($tipo_archivo, "jpeg")) && ($tamano_archivo < 100000))){
   	echo "La extensión o el tamaño de los archivos no es correcta. <br><br><table><tr><td><li>Se permiten archivos .png y .jpg<br><li>se permiten archivos de 100 Kb máximo.</td></tr></table>";
}else{
   	if (move_uploaded_file($_FILES['imagen']['tmp_name'],  "images/".$nombre_archivo)){
      		echo "El archivo ha sido cargado correctamente.";
   	}else{
      		echo "Ocurrió algún error al subir el fichero. No pudo guardarse.";
   	}
}

?>