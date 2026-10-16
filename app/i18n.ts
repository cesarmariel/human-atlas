import {SYSTEMS,type AnatomySex,type SystemId,type View} from './anatomy';
export type Lang = 'en'|'es';
const STORAGE_KEY='human-atlas-lang';
export function initialLang():Lang{try{const saved=localStorage.getItem(STORAGE_KEY);if(saved==='en'||saved==='es')return saved;}catch{/* Storage can be unavailable; fall back to the browser language. */}return typeof navigator!=='undefined'&&navigator.language?.toLowerCase().startsWith('es')?'es':'en';}
export function saveLang(lang:Lang){try{localStorage.setItem(STORAGE_KEY,lang);}catch{/* Not persisted; the choice still applies to this visit. */}}
export const LOCALE:Record<Lang,string>={en:'en-US',es:'es-ES'};
const en={
 eyebrow:'INTERACTIVE ANATOMY',modeledPieces:'modeled pieces',panels:'Explorer panels',searchAnatomy:'Search anatomy',findStructure:'Find a structure',aboutAtlas:'About this atlas',
 switchLang:'Cambiar a español',otherLang:'ES',
 chooseAnatomy:'Choose male or female anatomy',maleAnatomy:'Male anatomy',femaleAnatomy:'Female anatomy',femaleNote:'Partial model: the skeleton and muscles are incomplete.',
 layers:'Anatomical layers',systems:'Systems',closeSystems:'Close systems',all:'All',skeleton:'Skeleton',organs:'Organs',showOnly:(s:string)=>`Show only ${s}`,show:(s:string)=>`Show ${s}`,piecesVisible:'pieces visible',hideAll:'Hide all',
 findAnatomy:'Find anatomy',closeSearch:'Close search',searchPlaceholder:'Heart, femur, cranial nerve…',searchLabel:'Search named anatomical structures',noMatches:'No structures match your search.',piece:'piece',pieces:'pieces',
 searchNoteQuery:'Showing up to 80 matches. Refine your search to find smaller structures.',searchNoteEmpty:'Start with a major organ, or search every named structure.',
 cameraControls:'Camera controls',views:{'three-quarter':'Three-quarter view',front:'Front view',side:'Side view',back:'Back view'} as Record<View,string>,viewKeys:['¾','F','S','B'],
 pauseRotation:'Pause rotation',rotateBody:'Rotate body',autoRotate:'Auto rotate',resetAll:'Reset view and layers',reset:'Reset',
 selectedStructure:'SELECTED STRUCTURE',inventory:'ANATOMICAL INVENTORY',separated:'SEPARATED STRUCTURES',adultMale:'ADULT HUMAN · MALE',adultFemale:'FEMALE · REFERENCE ANATOMY',
 openLayers:'Open system layers',explode:'Explode anatomy',assembled:'Assembled',everyPiece:'Every piece',assembleReset:'Assemble and reset',
 dragPan:'Drag to pan',dragOrbit:'Drag to orbit',pinchZoom:'Pinch to zoom',tapInspect:'Tap to inspect',credits:'Source & credits',
 preparing:'Preparing the anatomy',loading:'Loading',reload:'Reload viewer',
 anatomy:'ANATOMY',howItWorks:'How it works',partOf:(s:string)=>`Part of: ${s}`,organSource:'Source: OpenStax, Anatomy and Physiology 2e',organCredit:'Organ explanations are written for this atlas and checked against OpenStax, Anatomy and Physiology 2e (Rice University, CC BY 4.0).',systemOverview:'System overview · structure identified from source anatomy',atlasReference:'Atlas reference',selectedPieces:'Selected pieces',included:'Included structures',andMore:(n:number)=>`And ${n} more modeled pieces.`,viewSource:'View anatomical source',
 showSurrounding:'Show surrounding anatomy',isolate:'Isolate structure',clear:'Clear selection',
 aboutEyebrow:'SOURCE & SCOPE',aboutTitle:'A body, revealed.',aboutLead:'Explore the anatomy available in two independent, licensed reference collections.',aboutMale:'Male · BodyParts3D',aboutFemale:'Female · Human Reference Atlas',
 aboutFemaleText:'888 source meshes, including the whole-body surface, selected organs, and female reproductive anatomy. Female skeleton and muscle coverage is partial. Eight pregnancy reference pieces are in a separate layer, hidden by default.',
 aboutP1:'2,325 individual meshes and 3,555 named concepts from an adult male reference anatomy. The lungs, the liver and 85 other structures come from BodyParts3D 3.0.',
 aboutP2:'These collections have different coverage. Neither contains every human structure or variation. Named concepts can contain multiple pieces; each source mesh is rendered once.',
 aboutP3:'Colors and system groupings are designed for exploration. The geometry is simplified for the web, and short explanations provide general educational context. This is an anatomical reference, not a diagnostic or surgical tool.',
 forkCredit:'This version is developed by César Mariel Albert (Iristrace.com), based on the original Human Atlas by ashemag.',
 femaleSource:'Female source',femaleSourceText:'Kristen Browne and Heidi Schlehlein, Human Reference Atlas / HuBMAP, 3D Reference Organ Set for Female v1.5 (2023). CC BY 4.0. Geometry adapted for this viewer.',femaleCollection:'Female reference collection',
 source:'Male source',sourceText:'BodyParts3D, © The Database Center for Life Science licensed under CC Attribution 4.0 International. Lungs, liver and other additions: BodyParts3D 3.0, © The Database Center for Life Science licensed under CC Attribution-Share Alike 2.1 Japan.',license:'Dataset license',original:'Original geometry & metadata',publication:'Read the source publication',
 report:'Report',reportTitle:'My medical report',reportClose:'Close report',
 reportDisclaimer:'Upload your own report, lab results or images to see where the findings are on the body. This is an educational aid, not a diagnosis: always go over the results with your doctor.',
 reportBridgeDown:'The local AI bridge is not running. Start it on this computer, in the project folder, and try again:',reportRetry:'Try again',
 reportProvider:'AI provider',reportUnavailable:'not configured',reportNoProvider:'No provider is configured. Sign in to Claude Code or Codex, or add an API key or a local model to .env (see .env.example).',
 reportFiles:'Documents (PDF, images or text)',reportNotes:'Context (optional)',reportNotesPlaceholder:'For example: pain when raising the right arm',
 reportPrivacy:'Files go only to the provider you choose, through the bridge on this computer. Results are saved only in this browser.',
 reportAnalyze:'Analyse',reportAnalyzing:'Analysing… this can take a minute',reportTooLarge:'The files are too large (60 MB maximum).',
 reportSaved:'Saved analyses',reportDelete:'Delete analysis',reportOtherFemale:'This analysis was made with the female model. Switch to it to see the findings on the body.',reportOtherMale:'This analysis was made with the male model. Switch to it to see the findings on the body.',
 reportSummary:'Summary',reportFindings:'Findings',reportShowAll:'Show all on the body',
 severity:{normal:'Normal',mild:'Mild',moderate:'Moderate',severe:'Severe',unclear:'Unclear'} as Record<'normal'|'mild'|'moderate'|'severe'|'unclear',string>,
 reportApprox:(s:string)=>`Not modelled exactly; closest structure in the atlas: ${s}.`,reportLocate:'Locate on the body',reportNotInAtlas:'This structure is not modelled in the atlas.',
 reportGlossary:'Terms',reportQuestions:'Questions for your doctor',reportBy:(s:string)=>`Analysed with ${s}. AI can make mistakes.`,
 canvasLabel:'Interactive human anatomy. Drag to orbit, pinch or scroll to zoom, and tap a structure to inspect it.',
};
export type Strings = typeof en;
const es:Strings={
 eyebrow:'ANATOMÍA INTERACTIVA',modeledPieces:'piezas modeladas',panels:'Paneles del explorador',searchAnatomy:'Buscar anatomía',findStructure:'Buscar una estructura',aboutAtlas:'Acerca de este atlas',
 switchLang:'Switch to English',otherLang:'EN',
 chooseAnatomy:'Elegir anatomía masculina o femenina',maleAnatomy:'Anatomía masculina',femaleAnatomy:'Anatomía femenina',femaleNote:'Modelo parcial: el esqueleto y la musculatura están incompletos.',
 layers:'Capas anatómicas',systems:'Sistemas',closeSystems:'Cerrar sistemas',all:'Todo',skeleton:'Esqueleto',organs:'Órganos',showOnly:(s:string)=>`Mostrar solo: ${s}`,show:(s:string)=>`Mostrar: ${s}`,piecesVisible:'piezas visibles',hideAll:'Ocultar todo',
 findAnatomy:'Buscar anatomía',closeSearch:'Cerrar búsqueda',searchPlaceholder:'Corazón, fémur, nervio craneal…',searchLabel:'Buscar estructuras anatómicas por nombre',noMatches:'Ninguna estructura coincide con la búsqueda.',piece:'pieza',pieces:'piezas',
 searchNoteQuery:'Se muestran hasta 80 resultados. Afina la búsqueda para encontrar estructuras más pequeñas.',searchNoteEmpty:'Empieza por un órgano principal o busca cualquier estructura con nombre.',
 cameraControls:'Controles de cámara',views:{'three-quarter':'Vista de tres cuartos',front:'Vista frontal',side:'Vista lateral',back:'Vista posterior'},viewKeys:['¾','F','L','P'],
 pauseRotation:'Pausar rotación',rotateBody:'Girar el cuerpo',autoRotate:'Rotación automática',resetAll:'Restablecer vista y capas',reset:'Restablecer',
 selectedStructure:'ESTRUCTURA SELECCIONADA',inventory:'INVENTARIO ANATÓMICO',separated:'ESTRUCTURAS SEPARADAS',adultMale:'HUMANO ADULTO · VARÓN',adultFemale:'MUJER · ANATOMÍA DE REFERENCIA',
 openLayers:'Abrir capas de sistemas',explode:'Separar anatomía',assembled:'Ensamblado',everyPiece:'Todas las piezas',assembleReset:'Ensamblar y restablecer',
 dragPan:'Arrastra para desplazar',dragOrbit:'Arrastra para girar',pinchZoom:'Pellizca para ampliar',tapInspect:'Toca para inspeccionar',credits:'Fuente y créditos',
 preparing:'Preparando la anatomía',loading:'Cargando',reload:'Recargar visor',
 anatomy:'ANATOMÍA',howItWorks:'Cómo funciona',partOf:(s:string)=>`Forma parte de: ${s}`,organSource:'Fuente: OpenStax, Anatomy and Physiology 2e',organCredit:'Las explicaciones de los órganos están redactadas para este atlas y contrastadas con OpenStax, Anatomy and Physiology 2e (Rice University, CC BY 4.0).',systemOverview:'Resumen del sistema · estructura identificada en la anatomía de origen',atlasReference:'Referencia del atlas',selectedPieces:'Piezas seleccionadas',included:'Estructuras incluidas',andMore:(n:number)=>`Y ${n} piezas modeladas más.`,viewSource:'Ver fuente anatómica',
 showSurrounding:'Mostrar anatomía circundante',isolate:'Aislar estructura',clear:'Quitar selección',
 aboutEyebrow:'FUENTE Y ALCANCE',aboutTitle:'Un cuerpo al descubierto.',aboutLead:'Explora la anatomía de dos colecciones de referencia independientes y con licencia abierta.',aboutMale:'Varón · BodyParts3D',aboutFemale:'Mujer · Human Reference Atlas',
 aboutFemaleText:'888 mallas de origen, con la superficie corporal completa, órganos seleccionados y la anatomía reproductora femenina. El esqueleto y la musculatura femeninos son parciales. Ocho piezas de referencia del embarazo van en una capa aparte, oculta por defecto.',
 aboutP1:'2325 mallas individuales y 3555 conceptos con nombre de una anatomía de referencia de un varón adulto. Los pulmones, el hígado y otras 85 estructuras proceden de BodyParts3D 3.0.',
 aboutP2:'Las dos colecciones tienen una cobertura distinta. Ninguna contiene todas las estructuras ni variaciones humanas. Un concepto con nombre puede agrupar varias piezas; cada malla de origen se dibuja una sola vez.',
 aboutP3:'Los colores y la agrupación por sistemas están pensados para explorar. La geometría está simplificada para la web y las explicaciones breves ofrecen contexto educativo general. Es una referencia anatómica, no una herramienta diagnóstica ni quirúrgica.',
 forkCredit:'Esta versión está desarrollada por César Mariel Albert (Iristrace.com), a partir del Human Atlas original de ashemag.',
 femaleSource:'Fuente femenina',femaleSourceText:'Kristen Browne y Heidi Schlehlein, Human Reference Atlas / HuBMAP, 3D Reference Organ Set for Female v1.5 (2023). CC BY 4.0. Geometría adaptada para este visor.',femaleCollection:'Colección de referencia femenina',
 source:'Fuente masculina',sourceText:'BodyParts3D, © The Database Center for Life Science, con licencia CC Attribution 4.0 International. Pulmones, hígado y otras incorporaciones: BodyParts3D 3.0, © The Database Center for Life Science, con licencia CC Attribution-Share Alike 2.1 Japan.',license:'Licencia del conjunto de datos',original:'Geometría y metadatos originales',publication:'Leer la publicación original',
 report:'Informe',reportTitle:'Mi informe médico',reportClose:'Cerrar informe',
 reportDisclaimer:'Sube tu propio informe, analítica o imágenes para ver en el cuerpo dónde están los hallazgos. Es una ayuda educativa, no un diagnóstico: revisa siempre los resultados con tu médico.',
 reportBridgeDown:'El puente local de IA no está en marcha. Arráncalo en este ordenador, en la carpeta del proyecto, y vuelve a intentarlo:',reportRetry:'Reintentar',
 reportProvider:'Proveedor de IA',reportUnavailable:'sin configurar',reportNoProvider:'No hay ningún proveedor configurado. Inicia sesión en Claude Code o Codex, o añade una clave de API o un modelo local en .env (consulta .env.example).',
 reportFiles:'Documentos (PDF, imágenes o texto)',reportNotes:'Contexto (opcional)',reportNotesPlaceholder:'Por ejemplo: dolor al levantar el brazo derecho',
 reportPrivacy:'Los archivos solo van al proveedor que elijas, a través del puente de este ordenador. Los resultados se guardan solo en este navegador.',
 reportAnalyze:'Analizar',reportAnalyzing:'Analizando… puede tardar un minuto',reportTooLarge:'Los archivos son demasiado grandes (60 MB como máximo).',
 reportSaved:'Análisis guardados',reportDelete:'Borrar análisis',reportOtherFemale:'Este análisis se hizo con el modelo femenino. Cambia a él para ver los hallazgos en el cuerpo.',reportOtherMale:'Este análisis se hizo con el modelo masculino. Cambia a él para ver los hallazgos en el cuerpo.',
 reportSummary:'Resumen',reportFindings:'Hallazgos',reportShowAll:'Ver todo en el cuerpo',
 severity:{normal:'Normal',mild:'Leve',moderate:'Moderado',severe:'Grave',unclear:'Sin determinar'},
 reportApprox:(s:string)=>`No está modelada con exactitud; la más cercana del atlas es: ${s}.`,reportLocate:'Localizar en el cuerpo',reportNotInAtlas:'Esta estructura no está modelada en el atlas.',
 reportGlossary:'Términos',reportQuestions:'Preguntas para tu médico',reportBy:(s:string)=>`Analizado con ${s}. La IA puede equivocarse.`,
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
 pregnancy:{name:'Referencia del embarazo',description:'La placenta y el cordón umbilical permiten el intercambio entre la circulación materna y la fetal durante el embarazo. Estas estructuras de referencia se muestran aparte de la anatomía adulta por defecto.'},
 connective:{name:'Tejido conjuntivo',description:'El cartílago, los ligamentos y otros tejidos conjuntivos sostienen, unen y separan estructuras. Entre sus funciones están estabilizar las articulaciones y repartir las cargas mecánicas.'},
};
export function systemName(id:SystemId|undefined,lang:Lang){if(!id)return undefined;return lang==='es'?SYSTEMS_ES[id].name:SYSTEMS.find(s=>s.id===id)?.name;}
const FEMALE_REPRODUCTIVE:Record<Lang,string>={en:'Female reproductive structures include the ovaries, uterine tubes, uterus, cervix, and vagina. Together they support oocyte development, fertilization, menstruation, and pregnancy.',es:'Las estructuras reproductoras femeninas incluyen los ovarios, las trompas uterinas, el útero, el cuello uterino y la vagina. Juntas participan en el desarrollo de los ovocitos, la fecundación, la menstruación y el embarazo.'};
/** System-level text for structures without an organ explanation. */
export function describe(system:SystemId,lang:Lang,sex:AnatomySex='male'){if(sex==='female'&&system==='reproductive')return FEMALE_REPRODUCTIVE[lang];return lang==='es'?SYSTEMS_ES[system].description:SYSTEMS.find(s=>s.id===system)?.description??'';}
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
