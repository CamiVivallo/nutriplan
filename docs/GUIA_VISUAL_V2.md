# NutriPlan · Guía visual V2

Estado: diseño aprobado para implementación progresiva. **No significa que la interfaz esté implementada.**

## Concepto
**Editorial cálido**, un recetario cotidiano en español de Chile, con fotografías apetitosas y navegación funcional. Base consistente en todas las categorías. La sección de recetas chilenas admite una variante casera sutil, sin cambiar componentes ni usabilidad.

## Paleta
| Uso | Color |
| --- | --- |
| Crema / fondo | `#F6F1E8` |
| Verde oscuro / textos | `#2E4A3D` |
| Verde oliva / botones | `#6F8B5E` |
| Verde salvia / secundario | `#A8B99A` |
| Verde suave / superficies | `#DCE8D6` |
| Tostado suave / separadores | `#C9B59A` |
| Terracota suave / acento ocasional | `#B97A5B` |
| Rojo frutilla suave / solo recetas pertinentes | `#C96B76` |
| Amarillo mango / solo recetas pertinentes | `#D9A84E` |

La UI es principalmente crema y verde. Las fotos ofrecen el color del plato. No teñir todo el sitio de rosado. Verduras y ensaladas usan verde salvia/oliva; legumbres, oliva/tostado; masas, beige/oliva; bebidas, acentos del ingrediente real (frutilla, mango, espinaca).

## Tipografías
- **Fraunces**: encabezados, nombres de recetas, títulos de sección y detalles.
- **Karla**: navegación, párrafos, botones, ingredientes, instrucciones, filtros y cifras.
- Tamaños de referencia desktop: H1 48–64px, H2 28–36px, H3 20–24px, cuerpo 15–16px, metadata 12–13px. Escalado fluido en móvil.
- Sin puntos al final de titulares ni etiquetas. Puntuación natural en párrafos explicativos.

## Tarjeta unificada (catálogo)
1. Imagen horizontal, ratio 4:3, representativa **del plato concreto**; recorte consistente y descripción accesible.
2. Categoría en pequeña etiqueta; estado de borrador destacado si corresponde.
3. Nombre de receta (máximo dos líneas), sin punto final.
4. Metadatos breves y útiles: ⏱ tiempo, 🍽 porciones, método, cuando estén verificados. No inventar cifras para borradores.
5. Tags dietéticos solo cuando puedan justificarse; `Versión Saludable` como filtro editorial, no garantía médica.
6. Un CTA `Ver receta` con el mismo comportamiento en todas las categorías.
7. Misma altura aproximada, espaciado, borde y comportamiento móvil. Sin segunda estética para ideas.

## Vista de receta (interior)
- Breadcrumb y botón de volver.
- Imagen protagonista con proporciones responsivas.
- Título, resumen breve, tiempo, porciones ajustables, método y temperatura *cuando sea pertinente y fiable*.
- Ingredientes por gramos/ml/unidades y selector de 1–20 personas; escalar cantidades y costo.
- Preparación numerada, legible; señales breves `⏱`, `🍳`, `♨️` según corresponda.
- Nutrición por porción, solo si hay datos de ingredientes consistentes; costo estimado por 100g y compra real diferenciados.
- Consejos de preparación y seguridad alimentaria.
- En móvil, una columna; no panel lateral fijo que tape contenido.

## Verificación de datos
- **Receta revisada**: contenido revisado editorialmente y cálculos con fuente/fecha; esto NO equivale a aprobación médica.
- **En desarrollo**: visible si se quiere explorar, pero con aviso explícito `Información no verificada · Estamos trabajando en esta receta`; no inventar nutrición exacta, temperaturas, seguridad alimentaria ni prometer propiedades de salud.
- Nunca afirmar `Sin gluten`, `Apta para alérgicos` o atributos médicos solo por una etiqueta superficial.

## Fotografía
- Fotografía realista como estándar; si es generada, conservar una representación fiel y apetecible y no presentarla como imagen de un plato efectivamente cocinado.
- Prioridad de imágenes: propias o con permisos/licencia clara; sin copiar fotografías de portales de recetas sin autorización.
- Optimizar WebP/AVIF, lazy loading, dimensiones estables. Fallback ilustrado **del plato correcto**, no el mismo emoji para recetas distintas.

## Navegación
- Un menú y un único sistema de resultados para todas las categorías.
- Categorías activas deben ocultar resultados de otras; contadores deben reflejar lo visible.
- Despensa agrupada, filtro por ingrediente, presupuesto y chips de selección persistentes.
- Categoría `Recetas chilenas`: se permiten acentos más tierra y contexto cultural, pero misma estructura, fuentes y componentes.

## QA obligatorio antes de informar que algo se publicó
1. Compilar y corregir errores.
2. Validar desktop y móvil, navegación, filtros, ficha y selector de porciones.
3. Subir a GitHub y confirmar despliegue **READY** en Vercel.
4. Abrir dominio de producción; no afirmar que está actualizado sin comprobar.
