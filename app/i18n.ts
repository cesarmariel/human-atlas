import {EXPLANATIONS,SYSTEMS,type SystemId,type View} from './anatomy';
export type Lang = 'en'|'es';
const STORAGE_KEY='human-atlas-lang';
export function initialLang():Lang{try{const saved=localStorage.getItem(STORAGE_KEY);if(saved==='en'||saved==='es')return saved;}catch{/* Storage can be unavailable; fall back to the browser language. */}return typeof navigator!=='undefined'&&navigator.language?.toLowerCase().startsWith('es')?'es':'en';}
export function saveLang(lang:Lang){try{localStorage.setItem(STORAGE_KEY,lang);}catch{/* Not persisted; the choice still applies to this visit. */}}
export const LOCALE:Record<Lang,string>={en:'en-US',es:'es-ES'};
const en={
 eyebrow:'INTERACTIVE ANATOMY',modeledPieces:'modeled pieces',panels:'Explorer panels',searchAnatomy:'Search anatomy',findStructure:'Find a structure',aboutAtlas:'About this atlas',
 switchLang:'Cambiar a español',otherLang:'ES',
 layers:'Anatomical layers',systems:'Systems',closeSystems:'Close systems',all:'All',skeleton:'Skeleton',organs:'Organs',showOnly:(s:string)=>`Show only ${s}`,show:(s:string)=>`Show ${s}`,piecesVisible:'pieces visible',hideAll:'Hide all',
 findAnatomy:'Find anatomy',closeSearch:'Close search',searchPlaceholder:'Heart, femur, cranial nerve…',searchLabel:'Search named anatomical structures',noMatches:'No structures match your search.',piece:'piece',pieces:'pieces',
 searchNoteQuery:'Showing up to 80 matches. Refine your search to find smaller structures.',searchNoteEmpty:'Start with a major organ, or search every named structure.',
 cameraControls:'Camera controls',views:{'three-quarter':'Three-quarter view',front:'Front view',side:'Side view',back:'Back view'} as Record<View,string>,viewKeys:['¾','F','S','B'],
 pauseRotation:'Pause rotation',rotateBody:'Rotate body',autoRotate:'Auto rotate',resetAll:'Reset view and layers',reset:'Reset',
 selectedStructure:'SELECTED STRUCTURE',inventory:'ANATOMICAL INVENTORY',separated:'SEPARATED STRUCTURES',adultMale:'ADULT HUMAN · MALE',
 openLayers:'Open system layers',explode:'Explode anatomy',assembled:'Assembled',everyPiece:'Every piece',assembleReset:'Assemble and reset',
 dragPan:'Drag to pan',dragOrbit:'Drag to orbit',pinchZoom:'Pinch to zoom',tapInspect:'Tap to inspect',credits:'Source & credits',
 preparing:'Preparing the anatomy',loading:'Loading',reload:'Reload viewer',
 anatomy:'ANATOMY',systemOverview:'System overview · structure identified from source anatomy',atlasReference:'Atlas reference',selectedPieces:'Selected pieces',included:'Included structures',andMore:(n:number)=>`And ${n} more modeled pieces.`,viewSource:'View anatomical source',
 showSurrounding:'Show surrounding anatomy',isolate:'Isolate structure',clear:'Clear selection',
 aboutEyebrow:'SOURCE & SCOPE',aboutTitle:'A body, revealed.',aboutLead:'Explore the adult male reference anatomy from BodyParts3D.',aboutMale:'Male · BodyParts3D',
 aboutP1:'2,325 individual meshes and 3,555 named concepts from an adult male reference anatomy. The lungs, the liver and 85 other structures come from BodyParts3D 3.0.',
 aboutP2:'This reference does not contain every human structure or variation. Named concepts can contain multiple pieces; each source mesh is rendered once.',
 aboutP3:'Colors and system groupings are designed for exploration. The geometry is simplified for the web, and short explanations provide general educational context. This is an anatomical reference, not a diagnostic or surgical tool.',
 source:'Source',sourceText:'BodyParts3D, © The Database Center for Life Science licensed under CC Attribution 4.0 International. Lungs, liver and other additions: BodyParts3D 3.0, © The Database Center for Life Science licensed under CC Attribution-Share Alike 2.1 Japan.',license:'Dataset license',original:'Original geometry & metadata',publication:'Read the source publication',
 canvasLabel:'Interactive human anatomy. Drag to orbit, pinch or scroll to zoom, and tap a structure to inspect it.',
};
export type Strings = typeof en;
const es:Strings={
 eyebrow:'ANATOMÍA INTERACTIVA',modeledPieces:'piezas modeladas',panels:'Paneles del explorador',searchAnatomy:'Buscar anatomía',findStructure:'Buscar una estructura',aboutAtlas:'Acerca de este atlas',
 switchLang:'Switch to English',otherLang:'EN',
 layers:'Capas anatómicas',systems:'Sistemas',closeSystems:'Cerrar sistemas',all:'Todo',skeleton:'Esqueleto',organs:'Órganos',showOnly:(s:string)=>`Mostrar solo: ${s}`,show:(s:string)=>`Mostrar: ${s}`,piecesVisible:'piezas visibles',hideAll:'Ocultar todo',
 findAnatomy:'Buscar anatomía',closeSearch:'Cerrar búsqueda',searchPlaceholder:'Corazón, fémur, nervio craneal…',searchLabel:'Buscar estructuras anatómicas por nombre',noMatches:'Ninguna estructura coincide con la búsqueda.',piece:'pieza',pieces:'piezas',
 searchNoteQuery:'Se muestran hasta 80 resultados. Afina la búsqueda para encontrar estructuras más pequeñas.',searchNoteEmpty:'Empieza por un órgano principal o busca cualquier estructura con nombre.',
 cameraControls:'Controles de cámara',views:{'three-quarter':'Vista de tres cuartos',front:'Vista frontal',side:'Vista lateral',back:'Vista posterior'},viewKeys:['¾','F','L','P'],
 pauseRotation:'Pausar rotación',rotateBody:'Girar el cuerpo',autoRotate:'Rotación automática',resetAll:'Restablecer vista y capas',reset:'Restablecer',
 selectedStructure:'ESTRUCTURA SELECCIONADA',inventory:'INVENTARIO ANATÓMICO',separated:'ESTRUCTURAS SEPARADAS',adultMale:'HUMANO ADULTO · VARÓN',
 openLayers:'Abrir capas de sistemas',explode:'Separar anatomía',assembled:'Ensamblado',everyPiece:'Todas las piezas',assembleReset:'Ensamblar y restablecer',
 dragPan:'Arrastra para desplazar',dragOrbit:'Arrastra para girar',pinchZoom:'Pellizca para ampliar',tapInspect:'Toca para inspeccionar',credits:'Fuente y créditos',
 preparing:'Preparando la anatomía',loading:'Cargando',reload:'Recargar visor',
 anatomy:'ANATOMÍA',systemOverview:'Resumen del sistema · estructura identificada en la anatomía de origen',atlasReference:'Referencia del atlas',selectedPieces:'Piezas seleccionadas',included:'Estructuras incluidas',andMore:(n:number)=>`Y ${n} piezas modeladas más.`,viewSource:'Ver fuente anatómica',
 showSurrounding:'Mostrar anatomía circundante',isolate:'Aislar estructura',clear:'Quitar selección',
 aboutEyebrow:'FUENTE Y ALCANCE',aboutTitle:'Un cuerpo al descubierto.',aboutLead:'Explora la anatomía de referencia de un varón adulto de BodyParts3D.',aboutMale:'Varón · BodyParts3D',
 aboutP1:'2325 mallas individuales y 3555 conceptos con nombre de una anatomía de referencia de un varón adulto. Los pulmones, el hígado y otras 85 estructuras proceden de BodyParts3D 3.0.',
 aboutP2:'Esta referencia no contiene todas las estructuras ni variaciones humanas. Un concepto con nombre puede agrupar varias piezas; cada malla de origen se dibuja una sola vez.',
 aboutP3:'Los colores y la agrupación por sistemas están pensados para explorar. La geometría está simplificada para la web y las explicaciones breves ofrecen contexto educativo general. Es una referencia anatómica, no una herramienta diagnóstica ni quirúrgica.',
 source:'Fuente',sourceText:'BodyParts3D, © The Database Center for Life Science, con licencia CC Attribution 4.0 International. Pulmones, hígado y otras incorporaciones: BodyParts3D 3.0, © The Database Center for Life Science, con licencia CC Attribution-Share Alike 2.1 Japan.',license:'Licencia del conjunto de datos',original:'Geometría y metadatos originales',publication:'Leer la publicación original',
 canvasLabel:'Anatomía humana interactiva. Arrastra para girar, pellizca o usa la rueda para ampliar y toca una estructura para inspeccionarla.',
};
export const STRINGS:Record<Lang,Strings>={en,es};
const SYSTEMS_ES:Record<SystemId,{name:string;description:string}>={
 skeletal:{name:'Esqueleto',description:'Los huesos forman el armazón que sostiene el cuerpo, protegen los órganos y sirven de anclaje a los músculos. Su tejido interno también almacena minerales y produce células sanguíneas.'},
 muscular:{name:'Músculos',description:'Los músculos esqueléticos generan movimiento al traccionar de sus inserciones. Junto con los tendones mueven las articulaciones, estabilizan la postura y producen calor.'},
 cardiac:{name:'Corazón',description:'El corazón es una bomba muscular de cuatro cavidades. Sus válvulas dirigen la sangre hacia delante por los circuitos pulmonar y sistémico.'},
 sensory:{name:'Órganos sensoriales',description:'Estas estructuras participan en los sentidos especiales, como la vista, el oído y el equilibrio. Sus tejidos especializados detectan estímulos y trabajan con el sistema nervioso para transmitir la información.'},
 arterial:{name:'Arterias',description:'El corazón impulsa la sangre por la circulación. Las arterias llevan la sangre desde el corazón para irrigar los tejidos o, en el circuito pulmonar, hacia los pulmones.'},
 venous:{name:'Venas',description:'Las venas devuelven la sangre hacia el corazón. Las redes superficial y profunda recogen la sangre de los tejidos; las venas pulmonares traen sangre oxigenada desde los pulmones.'},
 nervous:{name:'Sistema nervioso',description:'El encéfalo, la médula espinal y los nervios periféricos transmiten y procesan señales. Sustentan la sensibilidad, el movimiento, la coordinación y la regulación automática de las funciones corporales.'},
 respiratory:{name:'Respiratorio',description:'Las vías respiratorias conducen el aire hasta los pulmones, donde el oxígeno y el dióxido de carbono pasan entre el aire y la sangre. La respiración depende de los cambios de presión que producen los músculos respiratorios.'},
 digestive:{name:'Digestivo',description:'El tubo digestivo descompone los alimentos, absorbe nutrientes y agua y hace avanzar los residuos. Los órganos anejos aportan bilis y enzimas digestivas.'},
 urinary:{name:'Urinario',description:'Los riñones filtran la sangre y regulan el equilibrio de líquidos, electrolitos y ácido-base. La orina recorre los uréteres hasta la vejiga y sale por la uretra.'},
 lymphatic:{name:'Linfático',description:'Los vasos linfáticos devuelven a la circulación el exceso de líquido de los tejidos. Los ganglios linfáticos y otros órganos linfoides participan en la vigilancia y la respuesta inmunitarias.'},
 endocrine:{name:'Endocrino',description:'Los órganos endocrinos liberan hormonas a la sangre para coordinar procesos como el metabolismo, el crecimiento, la respuesta al estrés y la reproducción.'},
 reproductive:{name:'Reproductor',description:'Las estructuras reproductoras masculinas representadas aquí participan en la producción, maduración y transporte de los espermatozoides y en la producción de hormonas sexuales.'},
 integumentary:{name:'Superficie corporal',description:'La superficie corporal ofrece una referencia anatómica externa. El sistema tegumentario forma una barrera protectora y contribuye a la sensibilidad y la regulación de la temperatura.'},
 connective:{name:'Tejido conjuntivo',description:'El cartílago, los ligamentos y otros tejidos conjuntivos sostienen, unen y separan estructuras. Entre sus funciones están estabilizar las articulaciones y repartir las cargas mecánicas.'},
};
const EXPLANATIONS_ES:Record<string,string>={
 'heart':'Una bomba muscular situada en el tórax. Su lado derecho envía la sangre a los pulmones; el izquierdo la impulsa por la circulación sistémica.',
 'liver':'Un órgano grande situado bajo el lado derecho del diafragma. Procesa los nutrientes absorbidos, produce bilis y sintetiza muchas de las proteínas que transporta la sangre.',
 'brain':'El órgano central del sistema nervioso. Sus regiones interconectadas sustentan la percepción, el movimiento, la memoria, el lenguaje y la regulación de las funciones corporales.',
 'stomach':'Una cavidad muscular entre el esófago y el intestino delgado. Almacena el alimento y lo mezcla con ácido y enzimas antes de liberarlo al duodeno.',
 'spleen':'Un órgano linfoide de la parte superior izquierda del abdomen. Filtra la sangre, elimina las células sanguíneas envejecidas y participa en la respuesta inmunitaria.',
 'pancreas':'Un órgano abdominal con funciones digestivas y endocrinas. Aporta enzimas al intestino delgado y libera hormonas como la insulina y el glucagón.',
 'urinary bladder':'Un reservorio muscular de la pelvis que almacena la orina que llega desde los riñones por los uréteres.',
 'right lung':'El pulmón derecho tiene tres lóbulos separados por cisuras. El aire le llega por el bronquio principal derecho y su tejido intercambia oxígeno y dióxido de carbono con la sangre.',
 'left lung':'El pulmón izquierdo tiene dos lóbulos y una escotadura que deja sitio al corazón. El aire le llega por el bronquio principal izquierdo y su tejido intercambia oxígeno y dióxido de carbono con la sangre.',
 'trachea':'La vía aérea principal que une la laringe con los bronquios. Sus anillos de cartílago la mantienen abierta durante la respiración.',
 'diaphragm':'Un músculo amplio que separa el tórax del abdomen. Al contraerse aumenta el volumen torácico y ayuda a introducir aire en los pulmones.',
};
export function systemName(id:SystemId|undefined,lang:Lang){if(!id)return undefined;return lang==='es'?SYSTEMS_ES[id].name:SYSTEMS.find(s=>s.id===id)?.name;}
export function describe(name:string,system:SystemId,lang:Lang){const key=name.toLowerCase();if(lang==='es')return EXPLANATIONS_ES[key]??SYSTEMS_ES[system].description;return EXPLANATIONS[key]??SYSTEMS.find(s=>s.id===system)?.description??'';}
const ERRORS_ES:Record<string,string>={
 'The anatomy catalogue could not be loaded.':'No se pudo cargar el catálogo anatómico.',
 'This browser could not start the 3D viewer. Please try a browser with WebGL enabled.':'Este navegador no pudo iniciar el visor 3D. Prueba con un navegador que tenga WebGL activado.',
 'Could not assemble anatomy geometry.':'No se pudo montar la geometría anatómica.',
 'Could not load the anatomy.':'No se pudo cargar la anatomía.',
 'The 3D session was paused by your device. Reload to continue.':'Tu dispositivo ha pausado la sesión 3D. Recarga para continuar.',
 'An anatomy file could not be loaded.':'No se pudo cargar un archivo anatómico.',
 'An anatomy file was incomplete. Please reload the viewer.':'Un archivo anatómico llegó incompleto. Recarga el visor.',
};
export function errorText(message:string,lang:Lang){return lang==='es'?ERRORS_ES[message]??message:message;}
/** Spanish names are keyed by the lowercase English name; the source capitalization is kept. */
export type NameTable = Record<string,string>;
export function localName(name:string,lang:Lang,table:NameTable|null){if(lang!=='es'||!table)return name;const es=table[name.toLowerCase()];if(!es)return name;return name[0]!==name[0].toLowerCase()?es[0].toUpperCase()+es.slice(1):es;}
export function fold(text:string){return text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');}
