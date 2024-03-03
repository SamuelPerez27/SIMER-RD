## **:clipboard: Problema abordado**


Antes de implementar la programación presentaba 3 problemas en el programa de sistema de control de energía renovable que se ha realizado hasta al momento. Dichos problemas son descritos a continuación:

**1- Datos de cálculos de Promedio de energía Renovable y total de energía renovable no persistente:** estos datos no estaban persistentes y cada vez que se actualizaba la página del lado del Front los mismos volvían a su valor iniciar (es decir a 0) ya que las variables inicializaban de esta forma y del lado del back no se estaba persistiendo dicha información.

**2-Verificacion de la existencia de una energía renovable antes de agregarla a la lista:** no se estaba verificando/comprobando que la información proporcionada por el usuario existiera en al lista de energía renovables antes de agregarla, es decir, que si ya existía el tipo de energía Solar y el usuario por error la intentaba agregar, el programa le permitía hacerlo, este comportamiento no es correcto.


**3-Verificacion de la existencia de una ubicación antes de agregarla a la lista:** no se estaba verificando/comprobando que la información proporcionada por el usuario existiera en la lista de ubicaciones antes de agregarla, es decir, que si ya existía la provincia de Azua y el usuario por error la intentaba agregar, el programa le permitía hacerlo, este comportamiento no es correcto.


## **:interrobang: Como se resuelve en el programa**

**1-Soluccion del problema No. 1 - Datos de cálculos de Promedio de energía Renovable y total de energía renovable no persistente:** para solucionar este problema hice uso de una función recursiva que su caso base se encarga de verificar si la cantidad de elementos del lista enviada es igual a 0, en caso contrario sigue con el caso recursivo tomando el elemento en la primera posición en la lista y luego volviendo a llamar a la función pasando la lista sin el primer elemento (ya que este fue tomado) esta sucesión sigue hasta completar todos los elementos de la lista y se suman cada uno de los elementos (elemento actual y elemento anterior) al final la función devuelve el resultado de esta suma.

![image](https://github.com/SamuelPerez27/SIMER-RD/assets/61362199/39b53c3d-a433-4536-94ff-cc6005b7bc2b)


**2-Soluccion del problema No. 2 - verificación de la existencia de una energía renovable antes de agregarla a la lista:** para solucionar este problema hice uso de una función recursiva que su caso base se encarga de verificar si la cantidad de elementos del lista enviada es igual a 0, si esto se cumple se devuelve este valor en la función, en caso contrario sigue verificando para comprobar que si el primer elemento en la lista es igual a la energía nueva que se quiere agregar, si esto no es así, se llama a la función de manera recursiva pasando le como parámetros la misma lista si el elemento que se acaba de comprobar (el primer elemento) y el nombre de la nueva energía que se quiere agregar, si la energía no existe la función devolverá un false, dándole entrada a la energía a la lista.

![image](https://github.com/SamuelPerez27/SIMER-RD/assets/61362199/b76e0be9-5534-467c-b5a9-ef4b708e0793)

**3-Soluccion del problema No. 3 - verificación de la existencia de una ubicación antes de agregarla a la lista**: para solucionar este problema hice uso de una función recursiva que su caso base se encarga de verificar si la cantidad de elementos del lista enviada es igual a 0, si esto se cumple se devuelve este valor en la función, en caso contrario sigue verificando para comprobar que si el primer elemento en la lista es igual al nombre de la provincia que se quiere agregar, si esto no es así, se llama a la función de manera recursiva pasándole como parámetros la misma lista si el elemento que se acaba de comprobar (el primer elemento) y el nombre de la nueva provincia que se quiere agregar, si la provincia no existe la función devolverá un false, dándole entrada a la energía a la lista.

![image](https://github.com/SamuelPerez27/SIMER-RD/assets/61362199/40e24e33-151e-4ca5-8fb1-f5676325ffaa)


**Escenario cuando la provincia existe en la lista -> Resultado: No agrega a la lista y se informa al usuario** 

![image](https://github.com/SamuelPerez27/SIMER-RD/assets/61362199/402718ec-7314-47d8-aa32-558e4c2539e4)

**Escenario cuando la provincia no existe en la lista -> Resultado: Se agrega a la lista** 
![image](https://github.com/SamuelPerez27/SIMER-RD/assets/61362199/27e41007-c55a-40eb-acff-52154f6e997b)
