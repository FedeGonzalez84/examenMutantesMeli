# Challenge Mutantes Meli

## Instrucciones:
La api posee dos enpoints:

1) El primero /stats es utilizado para obtener estadisticas de las secuencias de adn que se encuentran en la base de datos
  https://api-mutantes.herokuapp.com/stats (POST)
  

2) El segundo /mutant permite pasar una secuencia de ADN en el body del request y poder determinar así, si es humano o mutante
  https://api-mutantes.herokuapp.com/mutant (POST)


## Ejemplos:
1) https://api-mutantes.herokuapp.com/stats:
```
{
    "count_mutant_dna": 1,
    "count_human_dna": 2,
    "ratio": 0.5
}
```
2) https://api-mutantes.herokuapp.com/mutant, donde en el body pasamos lo siguiente: <br />
```
{
	"dna":["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]
}
```
Obtenemos **200-OK**, lo que representa una cadena mutante. <br />

Para una secuencia humana: <br/>
```
{
	"dna":["ATGC","CAGT","TTAT","AGAA"]
}
```
La respuesta del servidor será: **403-Forbidden**
