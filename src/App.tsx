import { useEffect, useMemo, useState } from "react";

type Ingredient = { name: string; grams: number; kcal100: number; protein100: number; carbs100: number; fat100: number; price100: number };
type Recipe = { id: number; name: string; category: string; portions: number; vegan: boolean; vegetarian: boolean; glutenFree: boolean; ingredients: Ingredient[]; instructions: string };
const ingredient = (name: string, grams: number, kcal100: number, protein100: number, carbs100: number, fat100: number, price100: number): Ingredient => ({ name, grams, kcal100, protein100, carbs100, fat100, price100 });
const rice = ingredient("Arroz", 80, 360, 7, 79, 1, 180);
const chicken = ingredient("Pechuga de pollo", 150, 120, 23, 0, 3, 750);
const egg = ingredient("Huevo", 110, 143, 13, 1, 10, 720);
const tomato = ingredient("Tomate", 120, 18, 0.9, 3.9, 0.2, 200);
const lentils = ingredient("Lentejas secas", 100, 350, 25, 60, 1, 210);
const oats = ingredient("Avena", 60, 389, 17, 66, 7, 320);
const banana = ingredient("Plátano", 120, 89, 1.1, 23, 0.3, 200);
const milk = ingredient("Leche", 220, 61, 3.2, 4.8, 3.3, 110);
const yogurt = ingredient("Yogur natural", 170, 63, 4.5, 7, 2.3, 400);
const peanut = ingredient("Mantequilla de maní", 20, 588, 25, 20, 50, 900);
const tuna = ingredient("Atún al agua", 120, 116, 26, 0, 1, 1250);
const bread = ingredient("Pan integral", 80, 247, 13, 41, 4, 400);
const chickpeas = ingredient("Garbanzos cocidos", 140, 164, 9, 27, 2.6, 300);
const potato = ingredient("Papa", 200, 77, 2, 17, 0.1, 160);
const apple = ingredient("Manzana", 160, 52, 0.3, 14, 0.2, 240);
const lettuce = ingredient("Lechuga", 60, 15, 1.4, 2.9, 0.2, 300);
const recipes: Recipe[] = [
 {id:1,name:"Bowl de pollo con arroz",category:"Almuerzo",portions:1,vegan:false,vegetarian:false,glutenFree:true,ingredients:[chicken,rice,tomato],instructions:"Cocina el arroz, dora el pollo y acompaña con tomate fresco."},
 {id:2,name:"Ensalada de lentejas",category:"Almuerzo",portions:2,vegan:true,vegetarian:true,glutenFree:true,ingredients:[lentils,tomato,lettuce],instructions:"Hierve las lentejas, enfría y combina con verduras."},
 {id:3,name:"Avena con plátano",category:"Desayuno",portions:1,vegan:false,vegetarian:true,glutenFree:false,ingredients:[oats,banana,milk],instructions:"Calienta la avena con leche y sirve con plátano."},
 {id:4,name:"Tostadas con huevo",category:"Desayuno",portions:1,vegan:false,vegetarian:true,glutenFree:false,ingredients:[bread,egg,tomato],instructions:"Tuesta el pan y agrega huevo cocido con tomate."},
 {id:5,name:"Ensalada de atún",category:"Cena",portions:1,vegan:false,vegetarian:false,glutenFree:true,ingredients:[tuna,lettuce,tomato,potato],instructions:"Cuece las papas y sirve con atún y verduras."},
 {id:6,name:"Hummus rápido",category:"Snack",portions:2,vegan:true,vegetarian:true,glutenFree:true,ingredients:[chickpeas,tomato],instructions:"Procesa los garbanzos cocidos y acompaña con tomate."},
 {id:7,name:"Yogur con manzana",category:"Postre",portions:1,vegan:false,vegetarian:true,glutenFree:true,ingredients:[yogurt,apple],instructions:"Corta la manzana y mezcla con yogur natural."},
 {id:8,name:"Batido de plátano",category:"Bebida",portions:1,vegan:false,vegetarian:true,glutenFree:true,ingredients:[milk,banana,peanut],instructions:"Licúa todos los ingredientes y sirve frío."},
 {id:9,name:"Tortilla de papas",category:"Cena",portions:2,vegan:false,vegetarian:true,glutenFree:true,ingredients:[egg,potato,tomato],instructions:"Cocina las papas y cuájalas junto con el huevo."},
 {id:10,name:"Bowl de garbanzos",category:"Almuerzo",portions:1,vegan:true,vegetarian:true,glutenFree:true,ingredients:[chickpeas,rice,lettuce],instructions:"Cocina arroz y mezcla con garbanzos cocidos y lechuga."}
];
const round = (value: number) => Math.round(value);
const formatMoney = (value: number) => new Intl.NumberFormat("es-CL", {style:"currency",currency:"CLP",maximumFractionDigits:0}).format(value);
function nutrient(recipe: Recipe, key: "kcal100" | "protein100" | "carbs100" | "fat100") {return recipe.ingredients.reduce((sum, item) => sum + item.grams / 100 * item[key], 0) / recipe.portions;}
function missingCost(recipe: Recipe, pantry: string[]) {return recipe.ingredients.filter(item => !pantry.includes(item.name)).reduce((sum, item) => sum + item.price100 * item.grams / 100, 0);}
const allIngredients = [...new Set(recipes.flatMap(recipe => recipe.ingredients.map(item => item.name)))].sort((a,b)=>a.localeCompare(b,"es"));
function readPantry():string[]{try{const saved=JSON.parse(localStorage.getItem("nutriplan.pantry") || "[]");return Array.isArray(saved)?saved.filter((x):x is string=>typeof x==="string"):[]}catch{return [];}}
export default function App() {
 const [query,setQuery]=useState("");
 const [filter,setFilter]=useState("Todos");
 const [category,setCategory]=useState("Todas");
 const [sort,setSort]=useState("compatibility");
 const [budget,setBudget]=useState(15000);
 const [pantry,setPantry]=useState<string[]>(readPantry);
 const [selected,setSelected]=useState<Recipe|null>(null);
 useEffect(()=>{localStorage.setItem("nutriplan.pantry",JSON.stringify(pantry));},[pantry]);
 const visible=useMemo(()=>recipes.filter(recipe=>{
  const q=query.trim().toLowerCase();
  const matches=recipe.name.toLowerCase().includes(q) || recipe.ingredients.some(item=>item.name.toLowerCase().includes(q));
  return matches && (category==="Todas" || category===recipe.category) && (filter==="Todos" || (filter==="Vegano" && recipe.vegan) || (filter==="Vegetariano" && recipe.vegetarian) || (filter==="Sin gluten" && recipe.glutenFree) || (filter==="Alto en proteína" && nutrient(recipe,"protein100")>=20)) && missingCost(recipe,pantry)<=budget;
 }).sort((a,b)=>sort==="protein"?nutrient(b,"protein100")-nutrient(a,"protein100"):sort==="calories"?nutrient(a,"kcal100")-nutrient(b,"kcal100"):sort==="price"?missingCost(a,pantry)-missingCost(b,pantry):a.ingredients.filter(i=>pantry.includes(i.name)).length/a.ingredients.length < b.ingredients.filter(i=>pantry.includes(i.name)).length/b.ingredients.length?1:-1),[query,filter,category,sort,budget,pantry]);
 return <main className="shell">
 <header className="top"><div className="logo">✦ Nutri<span>Plan</span></div><span className="top-note">Comer rico también puede ser simple</span></header>
 <section className="hero"><div className="eyebrow">PLANIFICA · APROVECHA · DISFRUTA</div><h1>Ideas ricas con lo que <em>ya tienes.</em></h1><p>Encuentra recetas según tu despensa, preferencias y presupuesto. Sin complicarte la vida ni desperdiciar alimentos.</p><div className="hero-stats"><span><strong>{recipes.length}</strong> recetas para explorar</span><span><strong>{pantry.length}</strong> ingredientes en tu despensa</span></div></section>
 <div className="layout"><aside className="sidebar"><section className="panel"><h2>Tu despensa</h2><p className="muted">Marca los alimentos que tienes en casa.</p><div className="pantry">{allIngredients.map(name=><label key={name} className="pantry-item"><input type="checkbox" checked={pantry.includes(name)} onChange={e=>setPantry(p=>e.target.checked?[...p,name]:p.filter(x=>x!==name))}/><span>{name}</span></label>)}</div><button className="subtle-button" onClick={()=>setPantry([])}>Vaciar despensa</button></section><section className="panel"><h2>Tu presupuesto</h2><p className="muted">Máximo para ingredientes faltantes (precios de ejemplo).</p><strong className="price">{formatMoney(budget)}</strong><input aria-label="Presupuesto" type="range" min="0" max="30000" step="1000" value={budget} onChange={e=>setBudget(Number(e.target.value))}/><div className="range-ends"><span>$0</span><span>$30.000</span></div></section></aside>
 <section className="results"><div className="results-head"><div><p className="eyebrow dark">EXPLORA TU MENÚ</p><h2>¿Qué cocinamos hoy?</h2></div><span className="result-count">{visible.length} resultados</span></div>
 <div className="controls"><input className="search" type="search" aria-label="Buscar recetas" placeholder="Busca una receta o ingrediente..." value={query} onChange={e=>setQuery(e.target.value)}/><select aria-label="Categoría" value={category} onChange={e=>setCategory(e.target.value)}>{["Todas","Desayuno","Almuerzo","Cena","Snack","Postre","Bebida"].map(x=><option key={x}>{x}</option>)}</select><select aria-label="Ordenar" value={sort} onChange={e=>setSort(e.target.value)}><option value="compatibility">Más compatibles</option><option value="protein">Más proteína</option><option value="calories">Menos calorías</option><option value="price">Menor costo adicional</option></select></div>
 <div className="chips">{["Todos","Alto en proteína","Sin gluten","Vegano","Vegetariano"].map(x=><button key={x} className={filter===x?"chip active":"chip"} onClick={()=>setFilter(x)}>{x}</button>)}</div>
 <div className="cards">{visible.map(recipe=><article key={recipe.id} className="recipe"><div className="recipe-banner"><span>{recipe.category}</span><div className="recipe-illustration">{recipe.category==="Bebida"?"🥤":recipe.category==="Postre"?"🍎":recipe.category==="Desayuno"?"🥣":recipe.category==="Snack"?"🥙":"🥗"}</div></div><div className="recipe-body"><div className="tags">{recipe.vegan?<span>Vegano</span>:recipe.vegetarian?<span>Vegetariano</span>:null}{recipe.glutenFree?<span>Sin gluten*</span>:null}</div><h3>{recipe.name}</h3><p className="muted small">{recipe.ingredients.length} ingredientes · {recipe.portions} {recipe.portions===1?"porción":"porciones"}</p><div className="macros"><div><strong>{round(nutrient(recipe,"kcal100"))}</strong><small>kcal</small></div><div><strong>{round(nutrient(recipe,"protein100"))} g</strong><small>proteínas</small></div><div><strong>{round(nutrient(recipe,"carbs100"))} g</strong><small>carbohidratos</small></div></div><div className="card-bottom"><div><small>Te faltaría gastar</small><strong>{formatMoney(missingCost(recipe,pantry))}</strong></div><button onClick={()=>setSelected(recipe)}>Ver receta →</button></div></div></article>)}</div>
 {!visible.length&&<div className="empty"><h3>No encontramos recetas con esos filtros.</h3><p>Prueba subir el presupuesto, agregar ingredientes a tu despensa o quitar filtros.</p><button onClick={()=>{setQuery("");setFilter("Todos");setCategory("Todas");setBudget(30000);}}>Ver todas las recetas</button></div>}
 </section></div><footer>NutriPlan · Proyecto educativo · Valores nutricionales y precios referenciales. *Sin gluten según ingredientes declarados; verifica etiquetas y contaminación cruzada.</footer>
 {selected&&<div className="modal-backdrop" onClick={()=>setSelected(null)}><section className="modal" role="dialog" aria-modal="true" aria-label={selected.name} onClick={e=>e.stopPropagation()}><button className="close" aria-label="Cerrar" onClick={()=>setSelected(null)}>×</button><p className="eyebrow dark">{selected.category}</p><h2>{selected.name}</h2><p>{selected.instructions}</p><h3>Ingredientes</h3><ul>{selected.ingredients.map(item=><li key={item.name}>{item.name}: {item.grams} g · {round(item.kcal100*item.grams/100)} kcal {pantry.includes(item.name)?"✓ En despensa":"· Falta comprar"}</li>)}</ul><h3>Nutrición por porción</h3><p>{round(nutrient(selected,"kcal100"))} kcal · {nutrient(selected,"protein100").toFixed(1)} g proteínas · {nutrient(selected,"carbs100").toFixed(1)} g carbohidratos · {nutrient(selected,"fat100").toFixed(1)} g grasas</p><p><strong>Costo estimado faltante: {formatMoney(missingCost(selected,pantry))}</strong></p><p className="muted small">Todos los datos son aproximados y demostrativos; no constituyen una recomendación médica.</p></section></div>}
 </main>;
}