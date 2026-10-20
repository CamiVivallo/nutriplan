import type { Recipe, Ingredient } from "./App";
const data: Record<string, [number,number,number,number,number]> = {
 "Arroz":[360,7,79,1,180],"Tallarines normales":[355,12,73,1.5,250],"Tallarines integrales":[345,13,67,2.5,300],
 "Pechuga de pollo":[120,23,0,3,750],"Zanahoria":[41,0.9,10,0.2,150],"Cebolla":[40,1.1,9,0.1,170],
 "Arvejas":[81,5,14,0.4,300],"Choclo":[86,3.3,19,1.4,280],"Huevo":[143,13,1,10,720],
 "Atún al agua":[116,26,0,1,1250],"Tomate":[18,0.9,3.9,0.2,200],"Lentejas secas":[350,25,60,1,210],
 "Champiñones":[22,3.1,3.3,0.3,700],"Garbanzos cocidos":[164,9,27,2.6,300],"Pimentón":[31,1,6,0.3,350],
 "Zapallo italiano":[17,1.2,3.1,0.3,200],"Brócoli":[34,2.8,7,0.4,360],"Tofu":[76,8,1.9,4.8,900],
 "Ajo":[149,6.4,33,0.5,250],"Leche":[61,3.2,4.8,3.3,110],"Queso":[280,20,2,21,1200],
 "Espinaca":[23,2.9,3.6,0.4,440],"Albahaca":[23,3.2,2.7,0.6,1300]
};
function makeIngredient(name:string, grams:number):Ingredient {const d=data[name];if(!d)throw Error("Ingrediente desconocido: "+name);return {name,grams,kcal100:d[0],protein100:d[1],carbs100:d[2],fat100:d[3],price100:d[4]};}
type Variant={name:string;grain:"arroz"|"normal"|"integral";extras:string[];method:"olla"|"sartén"|"horno";minutes:number};
const variants:Variant[] = [
  {
    "name": "Arroz con pollo y zanahoria",
    "grain": "arroz",
    "extras": [
      "Pechuga de pollo",
      "Zanahoria",
      "Cebolla"
    ],
    "method": "olla",
    "minutes": 30
  },
  {
    "name": "Arroz primavera",
    "grain": "arroz",
    "extras": [
      "Zanahoria",
      "Arvejas",
      "Choclo"
    ],
    "method": "olla",
    "minutes": 25
  },
  {
    "name": "Arroz salteado con huevo",
    "grain": "arroz",
    "extras": [
      "Huevo",
      "Cebolla",
      "Zanahoria"
    ],
    "method": "sartén",
    "minutes": 20
  },
  {
    "name": "Arroz con atún y tomate",
    "grain": "arroz",
    "extras": [
      "Atún al agua",
      "Tomate"
    ],
    "method": "olla",
    "minutes": 20
  },
  {
    "name": "Arroz con lentejas",
    "grain": "arroz",
    "extras": [
      "Lentejas secas",
      "Cebolla"
    ],
    "method": "olla",
    "minutes": 45
  },
  {
    "name": "Arroz con champiñones",
    "grain": "arroz",
    "extras": [
      "Champiñones",
      "Cebolla"
    ],
    "method": "sartén",
    "minutes": 25
  },
  {
    "name": "Arroz con garbanzos y pimentón",
    "grain": "arroz",
    "extras": [
      "Garbanzos cocidos",
      "Pimentón"
    ],
    "method": "olla",
    "minutes": 25
  },
  {
    "name": "Arroz al horno con verduras",
    "grain": "arroz",
    "extras": [
      "Zapallo italiano",
      "Zanahoria",
      "Cebolla"
    ],
    "method": "horno",
    "minutes": 45
  },
  {
    "name": "Arroz con brócoli y pollo",
    "grain": "arroz",
    "extras": [
      "Brócoli",
      "Pechuga de pollo"
    ],
    "method": "olla",
    "minutes": 30
  },
  {
    "name": "Arroz salteado con tofu",
    "grain": "arroz",
    "extras": [
      "Tofu",
      "Pimentón",
      "Cebolla"
    ],
    "method": "sartén",
    "minutes": 25
  },
  {
    "name": "Tallarines con salsa de tomate",
    "grain": "normal",
    "extras": [
      "Tomate",
      "Cebolla",
      "Ajo"
    ],
    "method": "olla",
    "minutes": 20
  },
  {
    "name": "Tallarines con pollo y brócoli",
    "grain": "normal",
    "extras": [
      "Pechuga de pollo",
      "Brócoli",
      "Ajo"
    ],
    "method": "sartén",
    "minutes": 30
  },
  {
    "name": "Tallarines con atún",
    "grain": "normal",
    "extras": [
      "Atún al agua",
      "Tomate"
    ],
    "method": "olla",
    "minutes": 20
  },
  {
    "name": "Tallarines con champiñones",
    "grain": "normal",
    "extras": [
      "Champiñones",
      "Leche",
      "Cebolla"
    ],
    "method": "sartén",
    "minutes": 25
  },
  {
    "name": "Tallarines con verduras salteadas",
    "grain": "normal",
    "extras": [
      "Zapallo italiano",
      "Zanahoria",
      "Pimentón"
    ],
    "method": "sartén",
    "minutes": 25
  },
  {
    "name": "Tallarines con salsa de lentejas",
    "grain": "normal",
    "extras": [
      "Lentejas secas",
      "Tomate",
      "Cebolla"
    ],
    "method": "olla",
    "minutes": 45
  },
  {
    "name": "Tallarines con huevo revuelto",
    "grain": "normal",
    "extras": [
      "Huevo",
      "Tomate",
      "Ajo"
    ],
    "method": "sartén",
    "minutes": 20
  },
  {
    "name": "Tallarines al horno con queso",
    "grain": "normal",
    "extras": [
      "Queso",
      "Tomate",
      "Cebolla"
    ],
    "method": "horno",
    "minutes": 35
  },
  {
    "name": "Tallarines con garbanzos",
    "grain": "normal",
    "extras": [
      "Garbanzos cocidos",
      "Pimentón"
    ],
    "method": "olla",
    "minutes": 25
  },
  {
    "name": "Tallarines con pollo y espinaca",
    "grain": "normal",
    "extras": [
      "Pechuga de pollo",
      "Espinaca",
      "Ajo"
    ],
    "method": "sartén",
    "minutes": 30
  },
  {
    "name": "Tallarines integrales con tomate y albahaca",
    "grain": "integral",
    "extras": [
      "Tomate",
      "Albahaca",
      "Ajo"
    ],
    "method": "olla",
    "minutes": 20
  },
  {
    "name": "Tallarines integrales con pollo",
    "grain": "integral",
    "extras": [
      "Pechuga de pollo",
      "Zanahoria",
      "Cebolla"
    ],
    "method": "sartén",
    "minutes": 30
  },
  {
    "name": "Tallarines integrales con champiñones",
    "grain": "integral",
    "extras": [
      "Champiñones",
      "Ajo"
    ],
    "method": "sartén",
    "minutes": 25
  },
  {
    "name": "Tallarines integrales con brócoli",
    "grain": "integral",
    "extras": [
      "Brócoli",
      "Ajo",
      "Queso"
    ],
    "method": "olla",
    "minutes": 25
  },
  {
    "name": "Tallarines integrales con atún",
    "grain": "integral",
    "extras": [
      "Atún al agua",
      "Tomate"
    ],
    "method": "olla",
    "minutes": 20
  },
  {
    "name": "Tallarines integrales con zapallo italiano",
    "grain": "integral",
    "extras": [
      "Zapallo italiano",
      "Pimentón"
    ],
    "method": "sartén",
    "minutes": 25
  },
  {
    "name": "Tallarines integrales con garbanzos",
    "grain": "integral",
    "extras": [
      "Garbanzos cocidos",
      "Espinaca"
    ],
    "method": "olla",
    "minutes": 25
  },
  {
    "name": "Tallarines integrales gratinados",
    "grain": "integral",
    "extras": [
      "Queso",
      "Tomate"
    ],
    "method": "horno",
    "minutes": 35
  },
  {
    "name": "Tallarines integrales con tofu",
    "grain": "integral",
    "extras": [
      "Tofu",
      "Pimentón",
      "Ajo"
    ],
    "method": "sartén",
    "minutes": 25
  },
  {
    "name": "Tallarines integrales con lentejas",
    "grain": "integral",
    "extras": [
      "Lentejas secas",
      "Tomate",
      "Cebolla"
    ],
    "method": "olla",
    "minutes": 45
  }
];
export const expandedRecipes:Recipe[]=variants.map((v,index)=>{
 const base=v.grain==="arroz"?"Arroz":v.grain==="normal"?"Tallarines normales":"Tallarines integrales";
 const ingredients=[makeIngredient(base,85),...v.extras.map((name)=>makeIngredient(name,name==="Pechuga de pollo"?140:name==="Atún al agua"?100:name==="Lentejas secas"?65:name==="Queso"?40:name==="Ajo"||name==="Albahaca"?8:100))];
 const animal=v.extras.some(n=>["Pechuga de pollo","Atún al agua","Huevo","Leche","Queso"].includes(n));
 const nonVegetarian=v.extras.some(n=>["Pechuga de pollo","Atún al agua"].includes(n));
 const extras=v.extras.join(", ");
 const grainStep=v.grain==="arroz"?"Enjuaga el arroz, ponlo en una olla con aproximadamente el doble de volumen de agua y cocina tapado a fuego bajo entre 15 y 18 minutos, hasta que esté tierno.":"Hierve abundante agua en una olla. Agrega los tallarines y cocina según los minutos del envase hasta que queden al dente; escurre y reserva un poco del agua de cocción.";
 const special=v.extras.includes("Lentejas secas")?"Cuece las lentejas por separado en agua hasta que estén blandas (aproximadamente 20–30 minutos, según variedad) y escúrrelas. ":"";
 const protein=v.extras.includes("Pechuga de pollo")?"Corta el pollo en trozos pequeños y cocínalo completamente; comprueba que el centro alcance al menos 74 °C. ":"";
 const technique=v.method==="horno"?"Precalienta el horno a 190 °C. Mezcla el cereal ya cocido con los acompañamientos cocidos y hornea en una fuente entre 10 y 15 minutos, hasta que esté bien caliente.":v.method==="sartén"?"Calienta una sartén a fuego medio con una pequeña cantidad de aceite, saltea los vegetales de 5 a 8 minutos y mezcla con el cereal cocido.":"En una olla o sartén a fuego medio, cocina los acompañamientos de 5 a 8 minutos y mezcla con el cereal ya cocido.";
 const instructions="1. Lava y prepara los ingredientes: "+extras+". 2. "+special+protein+grainStep+" 3. "+technique+" 4. Verifica la cocción, ajusta sal y condimentos a gusto y sirve caliente. Si utilizas huevo, cocínalo hasta que esté cuajado.";
 return {id:100+index,name:v.name,category:"Almuerzo",portions:1,vegan:!animal,vegetarian:!nonVegetarian,glutenFree:v.grain==="arroz"&&v.extras.every(n=>n!=="Queso"),ingredients,instructions,minutes:v.minutes};
});
