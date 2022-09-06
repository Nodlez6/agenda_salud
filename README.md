### Ruta para hacer un requerimiento

1. Pararse en la rama main y traerse los cambios que se hayan subido

```
git checkout main
git pull
```

2. Crear una rama nueva a partir de main

```
git checkout -b [código requerimiento]-[nombre requerimiento]
```

3. Hacer los cambios necesarios y hacer commit

```

git add .
git commit -m "Mensaje del commit"

```

4. Subir los cambios a la rama remota

```

git push origin nombre-de-la-rama

```

5. Crear un pull request en GitHub
6. Esperar a que alguien revise el código y lo apruebe
7. Hacer merge de la rama a main y resolver los conflictos si los hay
8. Borrar la rama local

```

git branch -d nombre-de-la-rama

```
