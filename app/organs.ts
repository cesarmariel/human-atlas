import type {Atlas,Concept,SystemId} from './anatomy';
import type {Lang} from './i18n';
/** Organ explanations written for this atlas, checked against OpenStax Anatomy and Physiology 2e (CC BY 4.0). */
export interface Organ {key:string;title:Record<Lang,string>;match:string[];systems?:SystemId[];section:string;sectionTitle:string;text:Record<Lang,{what:string;how:string}>}
export const OPENSTAX_PAGES='https://openstax.org/books/anatomy-and-physiology-2e/pages/';
const byName=new Map<string,Organ>();
const baseName=(name:string)=>name.toLowerCase().replace(/\((left|right)\)/g,'').replace(/\b(left|right)\b/g,'').trim().replace(/ [lr]$/,'').replace(/\s+/g,' ').trim();
/** Matches a name directly, or through its trailing "... of <organ>" (caudate lobe of liver, long head of biceps brachii). */
export function organByName(name:string):{organ:Organ;exact:boolean}|undefined{let rest=baseName(name),exact=true;for(;;){const organ=byName.get(rest);if(organ)return {organ,exact};const i=rest.indexOf(' of ');if(i<0)return undefined;rest=rest.slice(i+4).replace(/^the /,'');exact=false;}}
/** Each mesh takes the organ of the smallest organ concept that contains it, or of its own name. */
export function organsByPart(atlas:Atlas){
 const parts=new Map(atlas.parts.map(p=>[p.id,p])),map=new Map<string,Organ>();
 const allowed=(organ:Organ,id:string)=>!organ.systems||organ.systems.includes(parts.get(id)!.system);
 for(const c of [...atlas.concepts].sort((a,b)=>b.elements.length-a.elements.length)){const organ=organByName(c.name)?.organ;if(organ)for(const id of c.elements)if(allowed(organ,id))map.set(id,organ);}
 for(const p of atlas.parts){const organ=organByName(p.name)?.organ;if(organ&&allowed(organ,p.id))map.set(p.id,organ);}
 return map;
}
/** A concept named after the organ is described directly; a named part of it, or a concept whose pieces all belong to it, is described as part of it. */
export function organFor(concept:Concept,byPart:Map<string,Organ>):{organ:Organ;direct:boolean}|undefined{
 const named=organByName(concept.name);if(named)return {organ:named.organ,direct:named.exact};
 const organ=byPart.get(concept.elements[0]);
 return organ&&concept.elements.every(id=>byPart.get(id)===organ)?{organ,direct:false}:undefined;
}
export const ORGANS:Organ[]=[
 {
  "key": "heart",
  "title": {
   "en": "Heart",
   "es": "Corazón"
  },
  "match": [
   "heart"
  ],
  "section": "19-1-heart-anatomy",
  "sectionTitle": "19.1 Heart Anatomy",
  "text": {
   "en": {
    "what": "The heart is a hollow muscular pump about the size of a fist, lying in the mediastinum between the lungs and tilted toward the left. It has four chambers: two atria on top and two ventricles below.",
    "how": "The right side receives oxygen-poor blood from the body and sends it to the lungs, while the left side receives oxygenated blood from the lungs and pumps it through the aorta to the rest of the body. Each beat starts with an electrical impulse from the sinoatrial node, which spreads through the atria and then, via the atrioventricular node and Purkinje fibers, to the ventricles. The cardiac muscle contracts (systole) and relaxes (diastole) in sequence. Valves between the chambers and at the exits close behind the blood, keeping flow one-way."
   },
   "es": {
    "what": "El corazón es una bomba muscular hueca del tamaño aproximado de un puño, situada en el mediastino entre ambos pulmones y desplazada hacia la izquierda. Tiene cuatro cavidades: dos aurículas arriba y dos ventrículos abajo.",
    "how": "El lado derecho recibe sangre pobre en oxígeno del cuerpo y la envía a los pulmones, mientras que el izquierdo recibe la sangre oxigenada y la impulsa por la aorta hacia todo el organismo. Cada latido nace de un impulso eléctrico del nódulo sinusal, que recorre las aurículas y, a través del nódulo auriculoventricular y las fibras de Purkinje, llega a los ventrículos. El miocardio alterna contracción (sístole) y relajación (diástole). Las válvulas se cierran tras el paso de la sangre e impiden que retroceda."
   }
  }
 },
 {
  "key": "aorta",
  "title": {
   "en": "Aorta",
   "es": "Aorta"
  },
  "match": [
   "aorta"
  ],
  "section": "20-5-circulatory-pathways",
  "sectionTitle": "20.5 Circulatory Pathways",
  "text": {
   "en": {
    "what": "The aorta is the largest artery in the body, rising from the left ventricle of the heart, arching over it and descending through the chest and abdomen in front of the spine.",
    "how": "Each time the left ventricle contracts, it pushes oxygen-rich blood into the aorta, whose thick elastic wall stretches to absorb the surge. As the heart relaxes, the wall recoils and keeps blood moving forward, smoothing the flow between beats. Along its course, branches leave to supply the heart muscle, head, arms, chest wall and abdominal organs. In the lower abdomen it divides into the two common iliac arteries that carry blood to the pelvis and legs."
   },
   "es": {
    "what": "La aorta es la arteria más grande del cuerpo: nace del ventrículo izquierdo, forma un cayado sobre el corazón y desciende por el tórax y el abdomen por delante de la columna vertebral.",
    "how": "Con cada contracción del ventrículo izquierdo, la sangre oxigenada entra a presión en la aorta, cuya gruesa pared elástica se distiende para amortiguar el impulso. Cuando el corazón se relaja, la pared recupera su forma y sigue empujando la sangre, de modo que el flujo se mantiene entre latido y latido. A lo largo de su recorrido salen ramas hacia el propio corazón, la cabeza, los brazos, la pared torácica y las vísceras abdominales. En la parte baja del abdomen se bifurca en las arterias ilíacas comunes, que irrigan la pelvis y las piernas."
   }
  }
 },
 {
  "key": "pulmonary trunk",
  "title": {
   "en": "Pulmonary trunk",
   "es": "Tronco pulmonar"
  },
  "match": [
   "pulmonary trunk"
  ],
  "section": "20-5-circulatory-pathways",
  "sectionTitle": "20.5 Circulatory Pathways",
  "text": {
   "en": {
    "what": "The pulmonary trunk is the short, wide artery that leaves the right ventricle of the heart and splits beneath the aortic arch into the right and left pulmonary arteries.",
    "how": "Each time the right ventricle contracts, it pushes oxygen-poor blood through the pulmonary valve into the trunk. The trunk divides and delivers that blood to both lungs, where it passes through capillaries around the alveoli, unloads carbon dioxide and picks up oxygen. Unlike most arteries, it carries deoxygenated blood, and it works at a much lower pressure than the aorta because the lungs are close and offer little resistance. The pulmonary valve closes after each beat so blood cannot flow back into the ventricle."
   },
   "es": {
    "what": "El tronco pulmonar es una arteria corta y ancha que sale del ventrículo derecho del corazón y se divide, por debajo del cayado aórtico, en las arterias pulmonares derecha e izquierda.",
    "how": "Con cada contracción, el ventrículo derecho impulsa sangre pobre en oxígeno a través de la válvula pulmonar hacia el tronco. Este se bifurca y lleva la sangre a ambos pulmones, donde recorre los capilares que rodean los alvéolos, cede dióxido de carbono y capta oxígeno. A diferencia de casi todas las arterias, transporta sangre desoxigenada y trabaja a una presión mucho menor que la aorta, porque los pulmones están cerca y ofrecen poca resistencia. La válvula pulmonar se cierra tras cada latido para impedir el reflujo."
   }
  }
 },
 {
  "key": "vena cava",
  "title": {
   "en": "Venae cavae",
   "es": "Venas cavas"
  },
  "match": [
   "superior vena cava",
   "inferior vena cava"
  ],
  "section": "20-5-circulatory-pathways",
  "sectionTitle": "20.5 Circulatory Pathways",
  "text": {
   "en": {
    "what": "The venae cavae are the two largest veins of the body. The superior vena cava drains the head, neck, arms and chest, and the inferior vena cava drains the abdomen, pelvis and legs; both empty into the right atrium of the heart.",
    "how": "Together they return all deoxygenated blood from the systemic circulation to the heart. Their thin, distensible walls hold a large volume of blood at low pressure, acting as a reservoir. Because pressure in the veins is low, return is helped by the skeletal muscle pump squeezing deep veins, by one-way valves in limb veins, and by the respiratory pump: when the diaphragm descends during inhalation, pressure falls in the chest and rises in the abdomen, drawing blood up the inferior vena cava toward the heart."
   },
   "es": {
    "what": "Las venas cavas son las dos venas de mayor calibre del cuerpo. La vena cava superior recoge la sangre de la cabeza, el cuello, los brazos y el tórax, y la inferior la del abdomen, la pelvis y las piernas; ambas desembocan en la aurícula derecha.",
    "how": "Juntas devuelven al corazón toda la sangre desoxigenada de la circulación sistémica. Sus paredes finas y distensibles almacenan mucha sangre a baja presión, como un depósito. Como la presión venosa es baja, el retorno se apoya en la bomba muscular, que comprime las venas profundas, en las válvulas unidireccionales de las venas de las extremidades y en la bomba respiratoria: al descender el diafragma en la inspiración baja la presión torácica y sube la abdominal, lo que empuja la sangre por la cava inferior hacia el corazón."
   }
  }
 },
 {
  "key": "spleen",
  "title": {
   "en": "Spleen",
   "es": "Bazo"
  },
  "match": [
   "spleen"
  ],
  "section": "21-1-anatomy-of-the-lymphatic-and-immune-systems",
  "sectionTitle": "21.1 Anatomy of the Lymphatic and Immune Systems",
  "text": {
   "en": {
    "what": "The spleen is a soft, fist-sized organ in the upper left abdomen, tucked beneath the diaphragm behind the stomach.",
    "how": "Blood enters the spleen and passes through two kinds of tissue. In the red pulp, macrophages remove old or damaged red blood cells and recycle their iron, and a reserve of blood and platelets is held. In the white pulp, clusters of lymphocytes surround small arteries and inspect the blood for bacteria and other antigens, launching an immune response when they find them. This makes the spleen both a blood filter and an important defence against blood-borne infections."
   },
   "es": {
    "what": "El bazo es un órgano blando, del tamaño aproximado de un puño, situado en la parte superior izquierda del abdomen, bajo el diafragma y detrás del estómago.",
    "how": "La sangre que llega al bazo recorre dos tipos de tejido. En la pulpa roja, los macrófagos eliminan los glóbulos rojos viejos o dañados y reciclan su hierro, y además se almacena una reserva de sangre y plaquetas. En la pulpa blanca, acúmulos de linfocitos rodean pequeñas arterias y vigilan la sangre en busca de bacterias y otros antígenos, desencadenando una respuesta inmunitaria cuando los detectan. Así, el bazo actúa a la vez como filtro de la sangre y como defensa frente a las infecciones que circulan por ella."
   }
  }
 },
 {
  "key": "thymus",
  "title": {
   "en": "Thymus",
   "es": "Timo"
  },
  "match": [
   "thymus"
  ],
  "section": "21-1-anatomy-of-the-lymphatic-and-immune-systems",
  "sectionTitle": "21.1 Anatomy of the Lymphatic and Immune Systems",
  "text": {
   "en": {
    "what": "The thymus is a soft lymphoid organ in the upper chest, lying behind the sternum and in front of the heart. It is largest in childhood and is gradually replaced by fat after puberty.",
    "how": "The thymus is the training ground for T lymphocytes. Immature cells arrive from the bone marrow and multiply in the outer cortex, where each one builds a unique antigen receptor. Supporting epithelial cells then test them: cells that cannot recognise the body's own molecules are discarded, and so are those that react too strongly against the body's own tissues. Only a small fraction survive this selection and move to the medulla, then leave in the blood as mature T cells. The thymus also releases hormones, such as thymosin, that support T-cell development."
   },
   "es": {
    "what": "El timo es un órgano linfoide blando situado en la parte superior del tórax, detrás del esternón y delante del corazón. Alcanza su mayor tamaño en la infancia y, tras la pubertad, se va sustituyendo por grasa.",
    "how": "El timo es el lugar donde maduran los linfocitos T. Las células inmaduras llegan desde la médula ósea y proliferan en la corteza, donde cada una fabrica un receptor de antígeno distinto. Las células epiteliales del órgano las ponen a prueba: se eliminan las que no reconocen las moléculas propias y también las que reaccionan con demasiada fuerza contra los tejidos del cuerpo. Solo una pequeña parte supera esta selección, pasa a la médula y sale a la sangre como linfocito T maduro. Además, el timo segrega hormonas, como la timosina, que favorecen ese desarrollo."
   }
  }
 },
 {
  "key": "lymph node",
  "title": {
   "en": "Lymph node",
   "es": "Ganglio linfático"
  },
  "match": [
   "lymph node",
   "yao lymph node"
  ],
  "section": "21-1-anatomy-of-the-lymphatic-and-immune-systems",
  "sectionTitle": "21.1 Anatomy of the Lymphatic and Immune Systems",
  "text": {
   "en": {
    "what": "Lymph nodes are small bean-shaped organs placed along lymphatic vessels, clustered in areas such as the neck, armpits, groin and around the intestines.",
    "how": "Lymph collected from tissues enters a node through several afferent vessels and percolates slowly through its sinuses before leaving through an efferent vessel. Along the way, macrophages trap and digest bacteria, debris and cancer cells, acting as a biological filter. The node also hosts large numbers of lymphocytes: B cells in the outer follicles and T cells deeper in the cortex. When antigens arrive, matching lymphocytes are activated and multiply, launching an immune response, which is why nodes often swell during an infection."
   },
   "es": {
    "what": "Los ganglios linfáticos son pequeños órganos con forma de judía situados a lo largo de los vasos linfáticos, agrupados en zonas como el cuello, las axilas, las ingles y alrededor del intestino.",
    "how": "La linfa procedente de los tejidos entra en el ganglio por varios vasos aferentes, avanza lentamente por sus senos y sale por un vaso eferente. Durante ese recorrido, los macrófagos atrapan y digieren bacterias, restos celulares y células tumorales, actuando como filtro biológico. El ganglio alberga además muchos linfocitos: linfocitos B en los folículos externos y linfocitos T en la corteza profunda. Cuando llegan antígenos, los linfocitos que los reconocen se activan y proliferan, iniciando una respuesta inmunitaria; por eso los ganglios se inflaman durante una infección."
   }
  }
 },
 {
  "key": "palatine tonsil",
  "title": {
   "en": "Palatine tonsil",
   "es": "Amígdala palatina"
  },
  "match": [
   "palatine tonsil"
  ],
  "section": "21-1-anatomy-of-the-lymphatic-and-immune-systems",
  "sectionTitle": "21.1 Anatomy of the Lymphatic and Immune Systems",
  "text": {
   "en": {
    "what": "The palatine tonsils are two oval masses of lymphoid tissue located on each side of the back of the mouth, at the entrance to the throat.",
    "how": "Their surface is covered by epithelium folded into deep pits called crypts, which trap particles and microbes from swallowed food and inhaled air. Immune cells beneath the surface sample this material and present it to lymphocytes gathered in follicles. B cells in those follicles multiply and produce antibodies, helping the body recognise pathogens that enter through the mouth. They are part of a ring of tonsils that guards the upper airway and digestive tract."
   },
   "es": {
    "what": "Las amígdalas palatinas son dos masas ovaladas de tejido linfoide situadas a cada lado del fondo de la boca, en la entrada de la faringe.",
    "how": "Su superficie está cubierta por un epitelio que forma profundos repliegues llamados criptas, donde quedan atrapadas partículas y microorganismos procedentes de los alimentos y del aire. Las células inmunitarias que hay bajo el epitelio captan ese material y lo presentan a los linfocitos agrupados en folículos. Los linfocitos B de esos folículos proliferan y fabrican anticuerpos, lo que ayuda al organismo a reconocer los patógenos que entran por la boca. Forman parte de un anillo de tejido amigdalar que protege la entrada de las vías respiratorias y digestivas."
   }
  }
 },
 {
  "key": "larynx",
  "title": {
   "en": "Larynx",
   "es": "Laringe"
  },
  "match": [
   "larynx"
  ],
  "section": "22-1-organs-and-structures-of-the-respiratory-system",
  "sectionTitle": "22.1 Organs and Structures of the Respiratory System",
  "text": {
   "en": {
    "what": "The larynx, or voice box, is a cartilage-framed tube in the front of the neck that connects the pharynx above with the trachea below. The thyroid cartilage forms the visible Adam's apple.",
    "how": "The larynx has two jobs: guarding the airway and producing sound. During swallowing it rises and the epiglottis tips back over its entrance, steering food and liquid into the oesophagus. Inside lie the vocal folds, two bands of tissue that small muscles can pull together or apart. When they are drawn close, air breathed out from the lungs makes them vibrate, creating sound; tighter, thinner folds give a higher pitch, and stronger airflow gives a louder voice. The throat, mouth, tongue and lips then shape this sound into speech."
   },
   "es": {
    "what": "La laringe es un conducto con esqueleto cartilaginoso situado en la parte anterior del cuello, que une la faringe con la tráquea. El cartílago tiroides forma la prominencia conocida como nuez.",
    "how": "La laringe protege la vía aérea y produce la voz. Al tragar, asciende y la epiglotis se pliega sobre su entrada, desviando alimentos y líquidos hacia el esófago. En su interior se encuentran las cuerdas vocales, dos pliegues que unos pequeños músculos acercan o separan. Cuando se aproximan, el aire espirado las hace vibrar y genera sonido; cuanto más tensas y finas, más agudo es el tono, y cuanto mayor es el flujo de aire, más fuerte suena. La faringe, la boca, la lengua y los labios transforman después ese sonido en palabras."
   }
  }
 },
 {
  "key": "trachea",
  "title": {
   "en": "Trachea",
   "es": "Tráquea"
  },
  "match": [
   "trachea"
  ],
  "section": "22-1-organs-and-structures-of-the-respiratory-system",
  "sectionTitle": "22.1 Organs and Structures of the Respiratory System",
  "text": {
   "en": {
    "what": "The trachea, or windpipe, is a tube about 10 to 12 cm long that runs from the larynx down through the neck into the chest, where it divides into the two main bronchi. It lies in front of the esophagus.",
    "how": "Its wall is reinforced by 16 to 20 C-shaped rings of hyaline cartilage that keep the airway open while air pressure changes during breathing. The open back of each ring is closed by the trachealis muscle and connective tissue, allowing the esophagus to expand when swallowing and the trachea to narrow during coughing. The lining is a ciliated epithelium with goblet cells: mucus traps dust and microbes, and the beating cilia sweep it upward toward the throat, where it is swallowed or coughed out."
   },
   "es": {
    "what": "La tráquea es un tubo de unos 10 a 12 cm que desciende desde la laringe por el cuello hasta el tórax, donde se divide en los dos bronquios principales. Se sitúa por delante del esófago.",
    "how": "Su pared está reforzada por 16 a 20 anillos de cartílago hialino en forma de C que mantienen la vía abierta pese a los cambios de presión al respirar. La parte posterior abierta de cada anillo la cierran el músculo traqueal y tejido conjuntivo, lo que permite al esófago dilatarse al tragar y a la tráquea estrecharse al toser. Su mucosa es un epitelio ciliado con células caliciformes: el moco atrapa polvo y microorganismos y los cilios lo barren hacia la faringe, donde se traga o se expulsa."
   }
  }
 },
 {
  "key": "bronchial tree",
  "title": {
   "en": "Bronchial tree",
   "es": "Árbol bronquial"
  },
  "match": [
   "bronchial tree",
   "main bronchus",
   "tracheobronchial tree"
  ],
  "section": "22-1-organs-and-structures-of-the-respiratory-system",
  "sectionTitle": "22.1 Organs and Structures of the Respiratory System",
  "text": {
   "en": {
    "what": "The bronchial tree is the branching system of airways inside the lungs, starting where the trachea splits into the left and right main bronchi.",
    "how": "Each main bronchus divides again and again into smaller bronchi and then bronchioles, much like the branches of an upside-down tree. The larger airways are held open by rings or plates of cartilage, while the bronchioles rely on smooth muscle that can widen or narrow them to adjust airflow. A lining of mucus and beating cilia traps dust and germs and sweeps them up toward the throat. The finest branches end in the alveoli, where gas exchange with the blood takes place."
   },
   "es": {
    "what": "El árbol bronquial es el sistema ramificado de vías aéreas del interior de los pulmones, que comienza donde la tráquea se divide en los bronquios principales derecho e izquierdo.",
    "how": "Cada bronquio principal se divide una y otra vez en bronquios más pequeños y después en bronquiolos, como las ramas de un árbol invertido. Las vías de mayor calibre se mantienen abiertas gracias a anillos o placas de cartílago, mientras que los bronquiolos tienen músculo liso que puede dilatarlos o estrecharlos para regular el paso del aire. Un revestimiento de moco y cilios en movimiento atrapa el polvo y los gérmenes y los arrastra hacia la garganta. Las ramas más finas terminan en los alvéolos, donde se produce el intercambio de gases con la sangre."
   }
  }
 },
 {
  "key": "lung",
  "title": {
   "en": "Lung",
   "es": "Pulmón"
  },
  "match": [
   "lung",
   "lungs"
  ],
  "section": "22-2-the-lungs",
  "sectionTitle": "22.2 The Lungs",
  "text": {
   "en": {
    "what": "The lungs are two spongy, cone-shaped organs filling most of the chest on either side of the heart. The right lung has three lobes and the left has two, leaving room for the heart.",
    "how": "Air enters through the trachea and travels down ever-smaller bronchi and bronchioles until it reaches millions of tiny air sacs called alveoli. Their walls are extremely thin and wrapped in capillaries, so oxygen diffuses into the blood while carbon dioxide diffuses out. Breathing itself is driven by the diaphragm and rib muscles: when they enlarge the chest, pressure inside the lungs drops and air flows in; when they relax, the elastic lungs recoil and push air out. A surfactant coating keeps the alveoli from collapsing."
   },
   "es": {
    "what": "Los pulmones son dos órganos esponjosos de forma cónica que ocupan la mayor parte del tórax, a ambos lados del corazón. El derecho tiene tres lóbulos y el izquierdo dos, lo que deja espacio al corazón.",
    "how": "El aire entra por la tráquea y recorre bronquios y bronquiolos cada vez más finos hasta llegar a millones de pequeños sacos llamados alvéolos. Sus paredes son finísimas y están rodeadas de capilares, de modo que el oxígeno pasa a la sangre por difusión y el dióxido de carbono sale de ella. La respiración la impulsan el diafragma y los músculos intercostales: al ampliar el tórax, la presión intrapulmonar baja y entra aire; al relajarse, el retroceso elástico del pulmón lo expulsa. El surfactante impide que los alvéolos se colapsen."
   }
  }
 },
 {
  "key": "diaphragm",
  "title": {
   "en": "Diaphragm",
   "es": "Diafragma"
  },
  "match": [
   "diaphragm"
  ],
  "section": "22-3-the-process-of-breathing",
  "sectionTitle": "22.3 The Process of Breathing",
  "text": {
   "en": {
    "what": "The diaphragm is a dome-shaped sheet of skeletal muscle that separates the thoracic cavity from the abdominal cavity, attached to the lower ribs, the sternum and the lumbar vertebrae.",
    "how": "It is the main muscle of breathing. When the phrenic nerve stimulates it, the diaphragm contracts and flattens, enlarging the chest cavity; according to Boyle's law, the pressure inside the lungs drops below atmospheric pressure and air flows in. When it relaxes, it returns to its dome shape, the chest volume shrinks and air is pushed out, so quiet exhalation is largely passive. The diaphragm also helps raise abdominal pressure during coughing, vomiting or childbirth, and has openings for the esophagus, aorta and inferior vena cava."
   },
   "es": {
    "what": "El diafragma es una lámina de músculo esquelético en forma de cúpula que separa la cavidad torácica de la abdominal y se inserta en las costillas inferiores, el esternón y las vértebras lumbares.",
    "how": "Es el principal músculo respiratorio. Cuando el nervio frénico lo estimula, se contrae y se aplana, lo que aumenta el volumen del tórax; según la ley de Boyle, la presión en los pulmones cae por debajo de la atmosférica y entra el aire. Al relajarse recupera su forma de cúpula, el tórax se reduce y el aire sale, de modo que la espiración tranquila es sobre todo pasiva. También ayuda a elevar la presión abdominal al toser, vomitar o en el parto, y tiene orificios para el esófago, la aorta y la vena cava inferior."
   }
  }
 },
 {
  "key": "tongue",
  "title": {
   "en": "Tongue",
   "es": "Lengua"
  },
  "match": [
   "tongue"
  ],
  "section": "23-3-the-mouth-pharynx-and-esophagus",
  "sectionTitle": "23.3 The Mouth, Pharynx, and Esophagus",
  "text": {
   "en": {
    "what": "The tongue is a muscular organ on the floor of the mouth, anchored to the hyoid bone and the lower jaw.",
    "how": "It is built from intrinsic muscles that change its shape and extrinsic muscles that move it in and out and side to side. During chewing it pushes food between the teeth and mixes it with saliva into a soft ball called a bolus, then presses the bolus back toward the pharynx to start swallowing. Its upper surface carries papillae, many of which hold taste buds that detect sweet, salty, sour, bitter and umami. The tongue is also essential for shaping sounds in speech."
   },
   "es": {
    "what": "La lengua es un órgano muscular situado en el suelo de la boca y anclado al hueso hioides y a la mandíbula.",
    "how": "Está formada por músculos intrínsecos, que cambian su forma, y extrínsecos, que la desplazan hacia delante, hacia atrás y a los lados. Durante la masticación empuja los alimentos entre los dientes y los mezcla con la saliva hasta formar el bolo alimenticio, que después impulsa hacia la faringe para iniciar la deglución. Su cara superior presenta papilas, muchas de las cuales contienen botones gustativos que detectan los sabores dulce, salado, ácido, amargo y umami. Además, es fundamental para articular los sonidos del habla."
   }
  }
 },
 {
  "key": "tooth",
  "title": {
   "en": "Teeth",
   "es": "Dientes"
  },
  "match": [
   "tooth",
   "set of teeth"
  ],
  "section": "23-3-the-mouth-pharynx-and-esophagus",
  "sectionTitle": "23.3 The Mouth, Pharynx, and Esophagus",
  "text": {
   "en": {
    "what": "Teeth are hard structures set in sockets of the upper and lower jaws. Adults normally have 32 permanent teeth: incisors, canines, premolars and molars.",
    "how": "Teeth begin digestion mechanically by cutting, tearing and grinding food into smaller pieces that are easier to swallow and expose more surface to digestive enzymes. Incisors slice, canines grip and tear, and premolars and molars crush and grind. Each tooth has a crown covered in enamel, the hardest substance in the body, over a layer of dentin; at its core, the pulp holds nerves and blood vessels. The root is anchored in the jawbone by the periodontal ligament, which cushions the strong forces produced by the chewing muscles."
   },
   "es": {
    "what": "Los dientes son estructuras duras alojadas en alvéolos de los maxilares superior e inferior. Un adulto suele tener 32 piezas permanentes: incisivos, caninos, premolares y molares.",
    "how": "Los dientes inician la digestión mecánica al cortar, desgarrar y triturar los alimentos en fragmentos más fáciles de tragar y con más superficie para las enzimas digestivas. Los incisivos cortan, los caninos sujetan y desgarran, y premolares y molares aplastan y muelen. Cada diente tiene una corona cubierta de esmalte, la sustancia más dura del cuerpo, sobre una capa de dentina; en su interior, la pulpa contiene nervios y vasos sanguíneos. La raíz se fija al hueso mediante el ligamento periodontal, que amortigua las fuertes fuerzas de la masticación."
   }
  }
 },
 {
  "key": "salivary gland",
  "title": {
   "en": "Salivary glands",
   "es": "Glándulas salivales"
  },
  "match": [
   "submandibular gland",
   "sublingual gland",
   "parotid gland"
  ],
  "section": "23-3-the-mouth-pharynx-and-esophagus",
  "sectionTitle": "23.3 The Mouth, Pharynx, and Esophagus",
  "text": {
   "en": {
    "what": "The salivary glands are exocrine glands that release saliva into the mouth. The three major pairs are the parotid glands in front of the ears, the submandibular glands under the jaw and the sublingual glands beneath the tongue, plus many small glands in the oral lining.",
    "how": "Together they produce roughly 1 to 1.5 liters of saliva a day, which is mostly water with mucus, salts, antibodies and enzymes. Salivary amylase begins breaking starch into sugars, and lingual lipase starts fat digestion. Mucus moistens and binds food into a bolus that is easy to swallow, and dissolving food allows it to be tasted. Saliva also cleans the teeth and fights bacteria. Secretion is controlled by the autonomic nervous system and increases with the sight, smell or taste of food."
   },
   "es": {
    "what": "Las glándulas salivales son glándulas exocrinas que vierten saliva en la boca. Los tres pares principales son las parótidas, delante de las orejas; las submandibulares, bajo la mandíbula, y las sublinguales, bajo la lengua, además de numerosas glándulas menores en la mucosa oral.",
    "how": "En conjunto producen entre 1 y 1,5 litros de saliva al día, compuesta sobre todo por agua con moco, sales, anticuerpos y enzimas. La amilasa salival empieza a descomponer el almidón en azúcares y la lipasa lingual inicia la digestión de las grasas. El moco humedece el alimento y lo cohesiona en un bolo fácil de tragar, y al disolverlo permite percibir su sabor. La saliva además limpia los dientes y combate las bacterias. Su secreción depende del sistema nervioso autónomo y aumenta al ver, oler o saborear comida."
   }
  }
 },
 {
  "key": "esophagus",
  "title": {
   "en": "Esophagus",
   "es": "Esófago"
  },
  "match": [
   "esophagus"
  ],
  "section": "23-3-the-mouth-pharynx-and-esophagus",
  "sectionTitle": "23.3 The Mouth, Pharynx, and Esophagus",
  "text": {
   "en": {
    "what": "The esophagus is a muscular tube about 25 cm long that carries food from the pharynx down through the chest, passing through the diaphragm to reach the stomach.",
    "how": "When a bolus is swallowed, the upper esophageal sphincter relaxes to let it in. Waves of muscular contraction, called peristalsis, then squeeze it downward, so swallowing works even when lying down. Mucus from glands in its lining helps the food slide along. At the lower end, a sphincter opens to let the bolus into the stomach and then closes to limit the backflow of acidic stomach contents."
   },
   "es": {
    "what": "El esófago es un tubo muscular de unos 25 cm que lleva los alimentos desde la faringe, a través del tórax, y atraviesa el diafragma para llegar al estómago.",
    "how": "Al tragar, el esfínter esofágico superior se relaja para dejar pasar el bolo. A continuación, unas ondas de contracción muscular llamadas peristaltismo lo empujan hacia abajo, por lo que se puede tragar incluso tumbado. El moco que secretan las glándulas de su mucosa facilita el deslizamiento. En el extremo inferior, otro esfínter se abre para que el bolo entre en el estómago y luego se cierra para limitar el reflujo del contenido ácido gástrico."
   }
  }
 },
 {
  "key": "stomach",
  "title": {
   "en": "Stomach",
   "es": "Estómago"
  },
  "match": [
   "stomach"
  ],
  "section": "23-4-the-stomach",
  "sectionTitle": "23.4 The Stomach",
  "text": {
   "en": {
    "what": "The stomach is a J-shaped, muscular sac in the upper left abdomen, between the oesophagus and the small intestine.",
    "how": "The stomach stores a meal and starts breaking it down. Its wall has three layers of smooth muscle that churn food and mix it with gastric juice. Glands in the lining secrete hydrochloric acid, which kills many microbes and activates pepsin, an enzyme that starts digesting proteins; a thick mucus layer protects the wall from this acid. The result is a soupy mixture called chyme. The pyloric sphincter then releases it into the duodenum in small amounts, a pace controlled by nerves and hormones such as gastrin."
   },
   "es": {
    "what": "El estómago es un saco muscular en forma de J situado en la parte superior izquierda del abdomen, entre el esófago y el intestino delgado.",
    "how": "El estómago almacena la comida y comienza a descomponerla. Su pared tiene tres capas de músculo liso que la agitan y la mezclan con el jugo gástrico. Las glándulas de la mucosa segregan ácido clorhídrico, que destruye muchos microorganismos y activa la pepsina, una enzima que empieza a digerir las proteínas; una gruesa capa de moco protege la pared de ese ácido. Así se forma una papilla llamada quimo, que el esfínter pilórico deja pasar al duodeno en pequeñas cantidades, a un ritmo regulado por nervios y hormonas como la gastrina."
   }
  }
 },
 {
  "key": "duodenum",
  "title": {
   "en": "Duodenum",
   "es": "Duodeno"
  },
  "match": [
   "duodenum"
  ],
  "section": "23-5-the-small-and-large-intestines",
  "sectionTitle": "23.5 The Small and Large Intestines",
  "text": {
   "en": {
    "what": "The duodenum is the first and shortest part of the small intestine, a C-shaped segment about 25 cm long that curves around the head of the pancreas just after the stomach.",
    "how": "It receives acidic chyme from the stomach in small amounts through the pyloric sphincter. Its walls detect acid and fat and release the hormones secretin and cholecystokinin, which make the pancreas secrete bicarbonate-rich juice and enzymes and make the gallbladder contract. Bile and pancreatic juice enter together at the major duodenal papilla. Bicarbonate neutralizes the acid, bile emulsifies fats and pancreatic enzymes digest proteins, carbohydrates and lipids, while mucus glands in the wall protect the lining. Absorption of nutrients such as iron also begins here."
   },
   "es": {
    "what": "El duodeno es la primera y más corta porción del intestino delgado, un segmento en forma de C de unos 25 cm que rodea la cabeza del páncreas justo a continuación del estómago.",
    "how": "Recibe el quimo ácido del estómago en pequeñas cantidades a través del píloro. Su pared detecta el ácido y las grasas y libera las hormonas secretina y colecistocinina, que hacen que el páncreas segregue jugo rico en bicarbonato y enzimas y que la vesícula biliar se contraiga. La bilis y el jugo pancreático entran juntos por la papila duodenal mayor. El bicarbonato neutraliza el ácido, la bilis emulsiona las grasas y las enzimas pancreáticas digieren proteínas, hidratos de carbono y lípidos, mientras glándulas mucosas protegen la pared. Aquí comienza también la absorción de nutrientes como el hierro."
   }
  }
 },
 {
  "key": "small intestine",
  "title": {
   "en": "Small intestine",
   "es": "Intestino delgado"
  },
  "match": [
   "small intestine",
   "jejunum",
   "ileum"
  ],
  "section": "23-5-the-small-and-large-intestines",
  "sectionTitle": "23.5 The Small and Large Intestines",
  "text": {
   "en": {
    "what": "The small intestine is a coiled tube about 3 metres long in a living person that fills much of the central abdomen, running from the stomach to the large intestine in three parts: duodenum, jejunum and ileum.",
    "how": "In the duodenum, partly digested food from the stomach mixes with bile and pancreatic juice, whose enzymes break down carbohydrates, proteins and fats. Enzymes on the intestinal lining finish the job, producing simple sugars, amino acids and fatty acids. Circular folds, finger-like villi and microvilli give the wall an enormous surface area for absorbing these nutrients into the blood and lymph. Segmenting contractions mix the contents while peristalsis slowly moves them toward the colon."
   },
   "es": {
    "what": "El intestino delgado es un tubo enrollado de unos 3 metros de longitud en vida que ocupa buena parte del centro del abdomen; va del estómago al intestino grueso y se divide en duodeno, yeyuno e íleon.",
    "how": "En el duodeno, el contenido procedente del estómago se mezcla con la bilis y el jugo pancreático, cuyas enzimas descomponen hidratos de carbono, proteínas y grasas. Las enzimas de la propia mucosa intestinal completan la digestión y liberan azúcares simples, aminoácidos y ácidos grasos. Los pliegues circulares, las vellosidades y las microvellosidades proporcionan una enorme superficie para absorber estos nutrientes hacia la sangre y la linfa. Las contracciones de segmentación mezclan el contenido y el peristaltismo lo hace avanzar poco a poco hacia el colon."
   }
  }
 },
 {
  "key": "large intestine",
  "title": {
   "en": "Large intestine",
   "es": "Intestino grueso"
  },
  "match": [
   "large intestine",
   "colon",
   "ascending colon",
   "transverse colon",
   "descending colon",
   "sigmoid colon",
   "cecum"
  ],
  "section": "23-5-the-small-and-large-intestines",
  "sectionTitle": "23.5 The Small and Large Intestines",
  "text": {
   "en": {
    "what": "The large intestine is the final section of the digestive tract, about 1.5 metres long. It frames the small intestine and includes the caecum with the appendix, the colon, the rectum and the anal canal.",
    "how": "By the time material reaches the large intestine, most nutrients have already been absorbed. Its main task is to recover water and salts, turning liquid residue into solid faeces. Trillions of resident bacteria ferment leftover fibre, producing useful fatty acids and some vitamins, such as vitamin K. Slow mixing movements and occasional strong mass movements push the contents towards the rectum. When the rectum stretches, a reflex creates the urge to defecate, and the voluntary external anal sphincter allows that to be delayed until convenient."
   },
   "es": {
    "what": "El intestino grueso es el último tramo del tubo digestivo y mide alrededor de 1,5 metros. Enmarca el intestino delgado e incluye el ciego con el apéndice, el colon, el recto y el conducto anal.",
    "how": "Cuando el contenido llega al intestino grueso, la mayoría de los nutrientes ya se ha absorbido. Su función principal es recuperar agua y sales, transformando el residuo líquido en heces sólidas. Billones de bacterias residentes fermentan la fibra sobrante y producen ácidos grasos útiles y algunas vitaminas, como la vitamina K. Unos movimientos lentos de mezcla y, de vez en cuando, potentes movimientos de masa empujan el contenido hacia el recto. Al distenderse este, un reflejo provoca la necesidad de defecar, que el esfínter anal externo, voluntario, permite aplazar."
   }
  }
 },
 {
  "key": "appendix",
  "title": {
   "en": "Appendix",
   "es": "Apéndice"
  },
  "match": [
   "appendix",
   "vermiform appendix"
  ],
  "section": "23-5-the-small-and-large-intestines",
  "sectionTitle": "23.5 The Small and Large Intestines",
  "text": {
   "en": {
    "what": "The appendix, or vermiform appendix, is a narrow, finger-like tube several centimeters long that projects from the cecum, the first part of the large intestine, usually in the lower right abdomen.",
    "how": "It does not take part in digestion in any significant way. Its wall contains abundant lymphoid tissue, so it is considered part of the gut-associated immune system, helping lymphocytes sample microbes and antigens passing through the intestine. It may also serve as a reservoir of beneficial gut bacteria that can repopulate the colon after an intestinal infection. Because its opening is narrow, it can become blocked and inflamed, a condition known as appendicitis."
   },
   "es": {
    "what": "El apéndice vermiforme es un tubo estrecho, con forma de dedo y varios centímetros de longitud, que sale del ciego, la primera porción del intestino grueso, normalmente en la parte inferior derecha del abdomen.",
    "how": "No participa de forma relevante en la digestión. Su pared contiene abundante tejido linfoide, por lo que se considera parte del sistema inmunitario asociado al intestino y ayuda a que los linfocitos reconozcan microorganismos y antígenos que pasan por él. También podría funcionar como reserva de bacterias beneficiosas capaces de repoblar el colon tras una infección intestinal. Como su luz es estrecha, puede obstruirse e inflamarse, lo que se conoce como apendicitis."
   }
  }
 },
 {
  "key": "rectum",
  "title": {
   "en": "Rectum",
   "es": "Recto"
  },
  "match": [
   "rectum"
  ],
  "section": "23-5-the-small-and-large-intestines",
  "sectionTitle": "23.5 The Small and Large Intestines",
  "text": {
   "en": {
    "what": "The rectum is the final straight segment of the large intestine, lying in the pelvis in front of the sacrum and ending at the anal canal.",
    "how": "It stores feces formed in the colon until they can be expelled. When mass movements push feces into the rectum, its wall stretches and stretch receptors trigger the defecation reflex, creating the urge to go. The internal anal sphincter, made of smooth muscle, relaxes involuntarily, while the external sphincter, made of skeletal muscle, stays under voluntary control. Defecation happens when the external sphincter is relaxed, often helped by contracting the abdominal muscles."
   },
   "es": {
    "what": "El recto es el último tramo recto del intestino grueso; se sitúa en la pelvis, por delante del sacro, y termina en el conducto anal.",
    "how": "Almacena las heces formadas en el colon hasta que pueden expulsarse. Cuando los movimientos de masa empujan las heces hacia el recto, su pared se distiende y unos receptores de estiramiento activan el reflejo de la defecación, que produce la sensación de necesidad. El esfínter anal interno, de músculo liso, se relaja de forma involuntaria, mientras que el externo, de músculo esquelético, se controla voluntariamente. La defecación se produce al relajar el esfínter externo, a menudo ayudada por la contracción de la musculatura abdominal."
   }
  }
 },
 {
  "key": "liver",
  "title": {
   "en": "Liver",
   "es": "Hígado"
  },
  "match": [
   "liver"
  ],
  "section": "23-6-accessory-organs-in-digestion-the-liver-pancreas-and-gallbladder",
  "sectionTitle": "23.6 Accessory Organs in Digestion: The Liver, Pancreas, and Gallbladder",
  "text": {
   "en": {
    "what": "The liver is the largest internal organ, a reddish-brown wedge under the right side of the diaphragm, partly protected by the lower ribs.",
    "how": "The liver receives blood from two sources: oxygen-rich blood from the hepatic artery and nutrient-rich blood from the intestines via the hepatic portal vein. Its cells, the hepatocytes, process this blood as it flows past them, storing glucose as glycogen, making plasma proteins such as albumin and clotting factors, and breaking down drugs, alcohol and old hormones. They also convert toxic ammonia into urea. Hepatocytes produce bile, which drains through ducts to the gallbladder and duodenum, where its bile salts help emulsify fats for digestion."
   },
   "es": {
    "what": "El hígado es el órgano interno más grande; tiene forma de cuña, color pardo rojizo y se sitúa bajo el lado derecho del diafragma, protegido en parte por las últimas costillas.",
    "how": "El hígado recibe sangre por dos vías: la arteria hepática aporta sangre oxigenada y la vena porta hepática trae sangre rica en nutrientes desde el intestino. Sus células, los hepatocitos, procesan esa sangre a su paso: almacenan glucosa en forma de glucógeno, fabrican proteínas plasmáticas como la albúmina y los factores de coagulación, y degradan fármacos, alcohol y hormonas. También transforman el amoníaco tóxico en urea. Además producen la bilis, que llega por los conductos biliares a la vesícula y al duodeno, donde sus sales emulsionan las grasas."
   }
  }
 },
 {
  "key": "gallbladder",
  "title": {
   "en": "Gallbladder",
   "es": "Vesícula biliar"
  },
  "match": [
   "gallbladder"
  ],
  "section": "23-6-accessory-organs-in-digestion-the-liver-pancreas-and-gallbladder",
  "sectionTitle": "23.6 Accessory Organs in Digestion: The Liver, Pancreas, and Gallbladder",
  "text": {
   "en": {
    "what": "The gallbladder is a small, pear-shaped muscular sac about 8 to 10 cm long that sits in a hollow on the underside of the liver, in the upper right abdomen.",
    "how": "It stores and concentrates bile, which is made continuously by the liver. Between meals, bile flows back through the cystic duct into the gallbladder, whose lining absorbs water and salts and concentrates it several times. When fatty food reaches the duodenum, the hormone cholecystokinin makes the gallbladder wall contract and relaxes the sphincter at the end of the bile duct, releasing bile into the intestine. Bile salts emulsify fats into tiny droplets so enzymes can digest them more efficiently."
   },
   "es": {
    "what": "La vesícula biliar es un pequeño saco muscular con forma de pera, de unos 8 a 10 cm, alojado en una depresión de la cara inferior del hígado, en la parte superior derecha del abdomen.",
    "how": "Almacena y concentra la bilis que el hígado produce de forma continua. Entre comidas, la bilis retrocede por el conducto cístico hasta la vesícula, cuya mucosa absorbe agua y sales y la concentra varias veces. Cuando llegan alimentos grasos al duodeno, la hormona colecistocinina hace que la pared vesicular se contraiga y relaja el esfínter del final del colédoco, de modo que la bilis pasa al intestino. Las sales biliares emulsionan las grasas en gotas diminutas para que las enzimas las digieran con mayor eficacia."
   }
  }
 },
 {
  "key": "pancreas",
  "title": {
   "en": "Pancreas",
   "es": "Páncreas"
  },
  "match": [
   "pancreas"
  ],
  "section": "23-6-accessory-organs-in-digestion-the-liver-pancreas-and-gallbladder",
  "sectionTitle": "23.6 Accessory Organs in Digestion: The Liver, Pancreas, and Gallbladder",
  "text": {
   "en": {
    "what": "The pancreas is an elongated gland lying behind the stomach, with its head nestled in the curve of the duodenum and its tail reaching toward the spleen.",
    "how": "Most of the pancreas is exocrine tissue: clusters of cells called acini produce digestive enzymes that break down proteins, starches and fats, and duct cells add bicarbonate to neutralise stomach acid. This pancreatic juice drains through a duct into the duodenum. Scattered among the acini are the pancreatic islets, which release hormones directly into the blood. Their beta cells secrete insulin to lower blood sugar, and alpha cells secrete glucagon to raise it."
   },
   "es": {
    "what": "El páncreas es una glándula alargada situada detrás del estómago; su cabeza se aloja en la curva del duodeno y su cola se extiende hacia el bazo.",
    "how": "La mayor parte del páncreas es tejido exocrino: unos grupos de células llamados acinos fabrican enzimas digestivas que degradan proteínas, almidones y grasas, y las células de los conductos añaden bicarbonato para neutralizar el ácido del estómago. Este jugo pancreático desemboca en el duodeno a través de un conducto. Entre los acinos se reparten los islotes pancreáticos, que liberan hormonas directamente a la sangre. Sus células beta secretan insulina, que reduce la glucemia, y las células alfa secretan glucagón, que la eleva."
   }
  }
 },
 {
  "key": "kidney",
  "title": {
   "en": "Kidney",
   "es": "Riñón"
  },
  "match": [
   "kidney"
  ],
  "section": "25-3-gross-anatomy-of-the-kidney",
  "sectionTitle": "25.3 Gross Anatomy of the Kidney",
  "text": {
   "en": {
    "what": "The kidneys are two bean-shaped organs about the size of a fist, lying against the back wall of the abdomen on either side of the spine, just below the ribs.",
    "how": "Each kidney contains around a million nephrons. In each nephron, blood pressure forces water and small solutes out of a capillary knot, the glomerulus, into a capsule, forming filtrate. As this fluid travels along the tubule, most water, glucose, salts and other useful substances are reabsorbed into the blood, while wastes and excess ions are secreted into it. What remains becomes urine. Hormones such as antidiuretic hormone and aldosterone fine-tune how much water and sodium are kept, and the kidneys release renin to help control blood pressure and erythropoietin to stimulate red blood cell production."
   },
   "es": {
    "what": "Los riñones son dos órganos con forma de judía, del tamaño de un puño, situados contra la pared posterior del abdomen a ambos lados de la columna, justo por debajo de las costillas.",
    "how": "Cada riñón contiene alrededor de un millón de nefronas. En cada una, la presión arterial empuja agua y solutos pequeños desde un ovillo capilar, el glomérulo, hacia una cápsula, formando el filtrado. Al recorrer el túbulo, la mayor parte del agua, la glucosa, las sales y otras sustancias útiles se reabsorbe a la sangre, mientras que los desechos y el exceso de iones se secretan al túbulo. Lo que queda es la orina. Hormonas como la antidiurética y la aldosterona ajustan cuánta agua y sodio se retienen, y el riñón libera renina para regular la presión arterial y eritropoyetina para estimular la producción de glóbulos rojos."
   }
  }
 },
 {
  "key": "ureter",
  "title": {
   "en": "Ureter",
   "es": "Uréter"
  },
  "match": [
   "ureter"
  ],
  "section": "25-2-gross-anatomy-of-urine-transport",
  "sectionTitle": "25.2 Gross Anatomy of Urine Transport",
  "text": {
   "en": {
    "what": "The ureters are two narrow muscular tubes, each about 25 to 30 cm long, that carry urine from the renal pelvis of each kidney down behind the peritoneum to the urinary bladder.",
    "how": "Urine does not simply fall by gravity: the smooth muscle of the ureter wall produces rhythmic peristaltic waves several times per minute that push small spurts of urine toward the bladder. The lining is transitional epithelium, which stretches and resists the toxic effects of urine. The ureters enter the bladder at an oblique angle through its wall, so when the bladder fills and its pressure rises, the ends of the ureters are squeezed shut, preventing urine from flowing back toward the kidneys."
   },
   "es": {
    "what": "Los uréteres son dos tubos musculares estrechos, de unos 25 a 30 cm cada uno, que transportan la orina desde la pelvis renal de cada riñón, por detrás del peritoneo, hasta la vejiga urinaria.",
    "how": "La orina no desciende solo por gravedad: el músculo liso de la pared ureteral genera ondas peristálticas rítmicas varias veces por minuto que impulsan pequeños chorros hacia la vejiga. Su mucosa es un epitelio de transición, capaz de distenderse y de resistir el contacto con la orina. Los uréteres atraviesan la pared vesical de forma oblicua, de modo que, al llenarse la vejiga y aumentar su presión, sus extremos se comprimen y se impide el reflujo de orina hacia los riñones."
   }
  }
 },
 {
  "key": "urinary bladder",
  "title": {
   "en": "Urinary bladder",
   "es": "Vejiga urinaria"
  },
  "match": [
   "urinary bladder"
  ],
  "section": "25-2-gross-anatomy-of-urine-transport",
  "sectionTitle": "25.2 Gross Anatomy of Urine Transport",
  "text": {
   "en": {
    "what": "The urinary bladder is a hollow, muscular sac in the pelvis, behind the pubic bone, that collects urine arriving from the kidneys through the ureters.",
    "how": "Its wall contains a layer of smooth muscle, the detrusor, and a stretchy lining of transitional epithelium that lets it expand as it fills. As urine accumulates, stretch receptors signal the spinal cord and brain, producing the sensation of needing to urinate. During urination, the detrusor contracts while the internal and external urethral sphincters relax, pushing urine out through the urethra. The external sphincter is under voluntary control, which allows urination to be postponed."
   },
   "es": {
    "what": "La vejiga urinaria es un saco hueco y muscular situado en la pelvis, detrás del pubis, que recoge la orina que llega de los riñones por los uréteres.",
    "how": "Su pared tiene una capa de músculo liso, el detrusor, y un revestimiento de epitelio de transición que le permite distenderse a medida que se llena. Cuando se acumula orina, unos receptores de estiramiento envían señales a la médula espinal y al encéfalo, y aparece la sensación de ganas de orinar. Durante la micción, el detrusor se contrae mientras los esfínteres uretrales interno y externo se relajan, y la orina sale por la uretra. El esfínter externo se controla voluntariamente, lo que permite retrasar la micción."
   }
  }
 },
 {
  "key": "urethra",
  "title": {
   "en": "Urethra",
   "es": "Uretra"
  },
  "match": [
   "urethra"
  ],
  "section": "25-2-gross-anatomy-of-urine-transport",
  "sectionTitle": "25.2 Gross Anatomy of Urine Transport",
  "text": {
   "en": {
    "what": "The urethra is the tube that carries urine from the bladder to the outside of the body. It is about 4 cm long in females and about 20 cm in males, where it runs through the prostate and penis.",
    "how": "Urine collects in the bladder until stretch receptors in its wall signal that it is filling. Two sphincters normally keep the urethra closed: an internal one of involuntary smooth muscle and an external one of skeletal muscle under conscious control. During urination, the bladder wall contracts while both sphincters relax, and urine flows out through the urethra. In males it is also the route for semen during ejaculation, when a reflex closes the bladder neck so urine and semen do not mix. Its lining protects against the acidity of urine."
   },
   "es": {
    "what": "La uretra es el conducto que lleva la orina desde la vejiga hasta el exterior. Mide unos 4 cm en la mujer y unos 20 cm en el hombre, en quien atraviesa la próstata y el pene.",
    "how": "La orina se acumula en la vejiga hasta que los receptores de distensión de su pared avisan de que se está llenando. Dos esfínteres mantienen normalmente cerrada la uretra: uno interno, de músculo liso involuntario, y otro externo, de músculo esquelético bajo control consciente. Durante la micción, la pared vesical se contrae mientras ambos esfínteres se relajan, y la orina sale por la uretra. En el hombre es también la vía del semen durante la eyaculación, momento en que un reflejo cierra el cuello vesical para que orina y semen no se mezclen. Su epitelio la protege de la acidez de la orina."
   }
  }
 },
 {
  "key": "pituitary gland",
  "title": {
   "en": "Pituitary gland",
   "es": "Hipófisis"
  },
  "match": [
   "pituitary gland",
   "hypophysis"
  ],
  "section": "17-3-the-pituitary-gland-and-hypothalamus",
  "sectionTitle": "17.3 The Pituitary Gland and Hypothalamus",
  "text": {
   "en": {
    "what": "The pituitary gland, or hypophysis, is a pea-sized endocrine gland hanging from the base of the brain by a stalk connected to the hypothalamus. It rests in a bony pocket of the sphenoid bone called the sella turcica.",
    "how": "It has two parts that work differently. The anterior lobe makes and releases hormones such as growth hormone, prolactin, TSH, ACTH, FSH and LH when stimulated by releasing hormones carried from the hypothalamus through a small portal blood system; many of these hormones control other glands. The posterior lobe is an extension of nerve tissue that stores and releases oxytocin and antidiuretic hormone, which are produced by hypothalamic neurons. Negative feedback from target-gland hormones keeps secretion in balance."
   },
   "es": {
    "what": "La hipófisis es una glándula endocrina del tamaño de un guisante que cuelga de la base del encéfalo mediante un tallo unido al hipotálamo. Se aloja en una cavidad del hueso esfenoides llamada silla turca.",
    "how": "Tiene dos partes que funcionan de forma distinta. La adenohipófisis, o lóbulo anterior, fabrica y libera hormonas como la del crecimiento, la prolactina, la TSH, la ACTH, la FSH y la LH cuando la estimulan hormonas liberadoras que llegan desde el hipotálamo por un pequeño sistema porta; muchas regulan otras glándulas. La neurohipófisis, o lóbulo posterior, es tejido nervioso que almacena y libera oxitocina y hormona antidiurética, producidas por neuronas hipotalámicas. La retroalimentación negativa de las hormonas de las glándulas diana mantiene el equilibrio."
   }
  }
 },
 {
  "key": "hypothalamus",
  "title": {
   "en": "Hypothalamus",
   "es": "Hipotálamo"
  },
  "match": [
   "hypothalamus"
  ],
  "section": "17-3-the-pituitary-gland-and-hypothalamus",
  "sectionTitle": "17.3 The Pituitary Gland and Hypothalamus",
  "text": {
   "en": {
    "what": "The hypothalamus is a small region at the base of the brain, below the thalamus, connected to the pituitary gland by a thin stalk.",
    "how": "It acts as a link between the nervous and endocrine systems, constantly monitoring body temperature, water balance, hunger and other internal conditions. To respond, it controls the autonomic nervous system and sends releasing and inhibiting hormones through tiny blood vessels to the anterior pituitary, which then regulates other glands. Some of its neurons make antidiuretic hormone and oxytocin, which travel down their axons to the posterior pituitary and are released from there. It also helps govern sleep cycles, thirst and emotional responses."
   },
   "es": {
    "what": "El hipotálamo es una pequeña región de la base del encéfalo, situada por debajo del tálamo y unida a la hipófisis mediante un fino tallo.",
    "how": "Actúa como enlace entre el sistema nervioso y el endocrino, y vigila sin cesar la temperatura corporal, el equilibrio hídrico, el hambre y otras condiciones internas. Para responder, controla el sistema nervioso autónomo y envía hormonas liberadoras e inhibidoras por pequeños vasos sanguíneos hasta la adenohipófisis, que a su vez regula otras glándulas. Algunas de sus neuronas fabrican hormona antidiurética y oxitocina, que viajan por sus axones hasta la neurohipófisis y se liberan desde allí. También participa en el ciclo del sueño, la sed y las respuestas emocionales."
   }
  }
 },
 {
  "key": "pineal body",
  "title": {
   "en": "Pineal gland",
   "es": "Glándula pineal"
  },
  "match": [
   "pineal body",
   "pineal gland"
  ],
  "section": "17-7-the-pineal-gland",
  "sectionTitle": "17.7 The Pineal Gland",
  "text": {
   "en": {
    "what": "The pineal gland is a tiny, pine-cone-shaped endocrine gland deep in the brain, attached to the roof of the third ventricle between the two halves of the thalamus.",
    "how": "The pineal gland produces the hormone melatonin, which helps set the body's daily sleep and wake cycle. It does not sense light directly: light detected by the retina is relayed to a clock centre in the hypothalamus, which then signals the pineal gland through sympathetic nerves. In darkness, melatonin secretion rises, promoting sleepiness; bright light suppresses it. Because night length changes through the year, melatonin also helps the body track seasons, and it may influence the timing of puberty. Levels tend to fall with age."
   },
   "es": {
    "what": "La glándula pineal, o epífisis, es una diminuta glándula endocrina con forma de piña situada en lo profundo del encéfalo, unida al techo del tercer ventrículo entre ambos tálamos.",
    "how": "La glándula pineal produce melatonina, una hormona que ayuda a ajustar el ciclo diario de sueño y vigilia. No detecta la luz directamente: la retina envía esa información a un centro reloj del hipotálamo, que a su vez estimula la glándula a través de nervios simpáticos. En la oscuridad aumenta la secreción de melatonina y aparece la somnolencia; la luz intensa la inhibe. Como la duración de la noche varía a lo largo del año, también ayuda al cuerpo a percibir las estaciones y podría influir en el inicio de la pubertad. Sus niveles tienden a bajar con la edad."
   }
  }
 },
 {
  "key": "adrenal gland",
  "title": {
   "en": "Adrenal gland",
   "es": "Glándula suprarrenal"
  },
  "match": [
   "adrenal gland",
   "suprarenal gland"
  ],
  "section": "17-6-the-adrenal-glands",
  "sectionTitle": "17.6 The Adrenal Glands",
  "text": {
   "en": {
    "what": "The adrenal glands are two small endocrine glands that sit on top of the kidneys, each made of an outer cortex and an inner medulla.",
    "how": "The cortex has three zones that produce steroid hormones: aldosterone, which makes the kidneys retain sodium and water to support blood pressure; cortisol, which raises blood glucose and helps the body cope with long-term stress; and small amounts of androgens. Cortisol release is controlled by ACTH from the pituitary. The medulla is stimulated directly by sympathetic nerves and releases adrenaline and noradrenaline, which rapidly increase heart rate, blood pressure and fuel availability in the fight-or-flight response."
   },
   "es": {
    "what": "Las glándulas suprarrenales son dos pequeñas glándulas endocrinas situadas sobre los riñones; cada una consta de una corteza externa y una médula interna.",
    "how": "La corteza tiene tres zonas que producen hormonas esteroideas: la aldosterona, que hace que el riñón retenga sodio y agua para mantener la presión arterial; el cortisol, que eleva la glucemia y ayuda a afrontar el estrés prolongado; y pequeñas cantidades de andrógenos. La secreción de cortisol está regulada por la ACTH de la hipófisis. La médula recibe estímulos directos de los nervios simpáticos y libera adrenalina y noradrenalina, que aumentan con rapidez la frecuencia cardíaca, la presión arterial y la disponibilidad de energía en la respuesta de lucha o huida."
   }
  }
 },
 {
  "key": "testis",
  "title": {
   "en": "Testis",
   "es": "Testículo"
  },
  "match": [
   "testis"
  ],
  "section": "27-1-anatomy-and-physiology-of-the-testicular-reproductive-system",
  "sectionTitle": "27.1 Anatomy and Physiology of the Testicular Reproductive System",
  "text": {
   "en": {
    "what": "The testes are two oval glands held outside the abdomen in the scrotum, where the temperature is slightly lower than body temperature, which sperm production requires.",
    "how": "Each testis is packed with coiled seminiferous tubules in which sperm develop continuously from stem cells through meiosis, supported and nourished by Sertoli cells. Making a mature sperm cell takes around two months, and millions are produced every day. Between the tubules, Leydig cells secrete testosterone, which drives male sexual development, muscle and bone growth, and sperm production. Both processes are controlled by the pituitary hormones LH and FSH. New sperm move into the epididymis, where they mature and gain the ability to swim."
   },
   "es": {
    "what": "Los testículos son dos glándulas ovaladas alojadas fuera del abdomen, en el escroto, donde la temperatura es algo inferior a la corporal, condición necesaria para producir espermatozoides.",
    "how": "Cada testículo está repleto de túbulos seminíferos enrollados en los que los espermatozoides se forman de manera continua a partir de células madre mediante meiosis, con el sostén y la nutrición de las células de Sertoli. Producir un espermatozoide maduro lleva unos dos meses, y cada día se generan millones. Entre los túbulos, las células de Leydig segregan testosterona, que impulsa el desarrollo sexual masculino, el crecimiento muscular y óseo y la propia espermatogénesis. Ambos procesos los regulan las hormonas hipofisarias LH y FSH. Los espermatozoides pasan al epidídimo, donde maduran y adquieren movilidad."
   }
  }
 },
 {
  "key": "epididymis",
  "title": {
   "en": "Epididymis",
   "es": "Epidídimo"
  },
  "match": [
   "epididymis"
  ],
  "section": "27-1-anatomy-and-physiology-of-the-testicular-reproductive-system",
  "sectionTitle": "27.1 Anatomy and Physiology of the Testicular Reproductive System",
  "text": {
   "en": {
    "what": "The epididymis is a comma-shaped structure lying along the back of each testis. It consists of a single, tightly coiled tube about 6 meters long, divided into a head, body and tail.",
    "how": "Sperm leaving the testis are not yet able to swim effectively or fertilize an egg. As they travel slowly through the epididymis over about two weeks, they mature: they gain motility and the ability to fertilize. The tube's lining absorbs excess fluid and secretes substances that support this maturation. The tail stores mature sperm until ejaculation, when contractions of smooth muscle in its wall propel them into the ductus deferens."
   },
   "es": {
    "what": "El epidídimo es una estructura con forma de coma situada a lo largo del borde posterior de cada testículo. Está formado por un único conducto muy enrollado de unos 6 metros, dividido en cabeza, cuerpo y cola.",
    "how": "Los espermatozoides que salen del testículo todavía no pueden nadar bien ni fecundar un óvulo. Mientras recorren lentamente el epidídimo durante unas dos semanas, maduran: adquieren movilidad y capacidad fecundante. El revestimiento del conducto reabsorbe el exceso de líquido y segrega sustancias que favorecen esa maduración. La cola almacena los espermatozoides maduros hasta la eyaculación, cuando las contracciones del músculo liso de su pared los impulsan hacia el conducto deferente."
   }
  }
 },
 {
  "key": "deferent duct",
  "title": {
   "en": "Ductus deferens",
   "es": "Conducto deferente"
  },
  "match": [
   "deferent duct",
   "ductus deferens"
  ],
  "section": "27-1-anatomy-and-physiology-of-the-testicular-reproductive-system",
  "sectionTitle": "27.1 Anatomy and Physiology of the Testicular Reproductive System",
  "text": {
   "en": {
    "what": "The ductus deferens, or vas deferens, is a muscular tube that carries sperm from the epididymis of each testis up through the spermatic cord, into the pelvis and behind the bladder.",
    "how": "Sperm mature and are stored in the epididymis and the start of the duct. During ejaculation, the thick smooth-muscle wall of the ductus deferens contracts in strong peristaltic waves that propel sperm forward. Near its end it widens into the ampulla and joins the duct of the seminal vesicle to form the ejaculatory duct. This duct passes through the prostate and opens into the urethra, where sperm mix with glandular fluids to form semen."
   },
   "es": {
    "what": "El conducto deferente es un tubo muscular que transporta los espermatozoides desde el epidídimo de cada testículo, asciende por el cordón espermático, entra en la pelvis y pasa por detrás de la vejiga.",
    "how": "Los espermatozoides maduran y se almacenan en el epidídimo y en el inicio del conducto. Durante la eyaculación, la gruesa pared de músculo liso del conducto deferente se contrae en potentes ondas peristálticas que los impulsan hacia delante. Cerca de su final se ensancha formando la ampolla y se une al conducto de la vesícula seminal para formar el conducto eyaculador. Este atraviesa la próstata y desemboca en la uretra, donde los espermatozoides se mezclan con las secreciones glandulares para formar el semen."
   }
  }
 },
 {
  "key": "seminal vesicle",
  "title": {
   "en": "Seminal vesicle",
   "es": "Vesícula seminal"
  },
  "match": [
   "seminal vesicle"
  ],
  "section": "27-1-anatomy-and-physiology-of-the-testicular-reproductive-system",
  "sectionTitle": "27.1 Anatomy and Physiology of the Testicular Reproductive System",
  "text": {
   "en": {
    "what": "The seminal vesicles are a pair of coiled glands, each about 5 cm long, lying behind the bladder. Each joins the ductus deferens to form an ejaculatory duct that passes through the prostate.",
    "how": "The seminal vesicles do not store sperm; instead, they produce most of the fluid in semen, around 60 percent of its volume. This thick, slightly alkaline secretion is rich in fructose, which sperm use as fuel for swimming, and contains proteins that help semen clot briefly after ejaculation, along with prostaglandins. Its alkalinity helps neutralise the acidity of the male urethra and the vagina, improving sperm survival. During ejaculation, smooth muscle in the vesicle walls contracts and squeezes this fluid into the ejaculatory duct."
   },
   "es": {
    "what": "Las vesículas seminales son dos glándulas tortuosas de unos 5 cm situadas detrás de la vejiga. Cada una se une al conducto deferente para formar un conducto eyaculador que atraviesa la próstata.",
    "how": "Las vesículas seminales no almacenan espermatozoides, sino que producen la mayor parte del líquido seminal, alrededor del 60 % de su volumen. Esta secreción espesa y ligeramente alcalina es rica en fructosa, que los espermatozoides usan como combustible para nadar, y contiene proteínas que hacen que el semen coagule brevemente tras la eyaculación, además de prostaglandinas. Su alcalinidad ayuda a neutralizar la acidez de la uretra masculina y de la vagina, lo que favorece la supervivencia espermática. Durante la eyaculación, el músculo liso de su pared se contrae y expulsa el líquido al conducto eyaculador."
   }
  }
 },
 {
  "key": "prostate",
  "title": {
   "en": "Prostate",
   "es": "Próstata"
  },
  "match": [
   "prostate"
  ],
  "section": "27-1-anatomy-and-physiology-of-the-testicular-reproductive-system",
  "sectionTitle": "27.1 Anatomy and Physiology of the Testicular Reproductive System",
  "text": {
   "en": {
    "what": "The prostate is a walnut-sized gland located just below the urinary bladder, surrounding the first part of the urethra in the male pelvis, in front of the rectum.",
    "how": "It is made of glandular tissue embedded in smooth muscle. During ejaculation, the muscle contracts and squeezes a thin, milky, slightly alkaline fluid into the urethra, where it mixes with sperm and fluid from the seminal vesicles to form semen. Prostatic fluid contains citrate as an energy source, enzymes such as prostate-specific antigen that help liquefy semen after ejaculation, and other substances that support sperm motility. Because it encircles the urethra, enlargement of the prostate can make urination difficult."
   },
   "es": {
    "what": "La próstata es una glándula del tamaño de una nuez situada justo debajo de la vejiga urinaria, rodeando la primera porción de la uretra en la pelvis masculina, por delante del recto.",
    "how": "Está formada por tejido glandular rodeado de músculo liso. Durante la eyaculación, ese músculo se contrae y vierte en la uretra un líquido fino, lechoso y ligeramente alcalino, que se mezcla con los espermatozoides y la secreción de las vesículas seminales para formar el semen. El líquido prostático contiene citrato como fuente de energía, enzimas como el antígeno prostático específico, que ayudan a licuar el semen tras la eyaculación, y otras sustancias que favorecen la movilidad espermática. Como rodea la uretra, su agrandamiento puede dificultar la micción."
   }
  }
 },
 {
  "key": "penis",
  "title": {
   "en": "Penis",
   "es": "Pene"
  },
  "match": [
   "penis",
   "glans penis",
   "corpus cavernosum of penis",
   "corpus spongiosum of penis"
  ],
  "section": "27-1-anatomy-and-physiology-of-the-testicular-reproductive-system",
  "sectionTitle": "27.1 Anatomy and Physiology of the Testicular Reproductive System",
  "text": {
   "en": {
    "what": "The penis is the male external organ for urination and sexual intercourse, attached to the pelvis at its root and ending in the glans; the urethra runs through its length.",
    "how": "Its shaft contains three columns of erectile tissue: two corpora cavernosa on top and the corpus spongiosum below, which surrounds the urethra and forms the glans. During sexual arousal, parasympathetic nerves trigger the release of nitric oxide, which relaxes smooth muscle in the arteries and erectile tissue. Blood rushes into the spaces of the tissue, and the swelling compresses the veins that drain it, producing an erection. Ejaculation is then driven by sympathetic signals and rhythmic muscle contractions."
   },
   "es": {
    "what": "El pene es el órgano externo masculino de la micción y la cópula; se fija a la pelvis por su raíz, termina en el glande y está recorrido por la uretra.",
    "how": "Su cuerpo contiene tres columnas de tejido eréctil: los dos cuerpos cavernosos en la parte superior y el cuerpo esponjoso en la inferior, que rodea la uretra y forma el glande. Durante la excitación sexual, los nervios parasimpáticos provocan la liberación de óxido nítrico, que relaja el músculo liso de las arterias y del tejido eréctil. La sangre llena los espacios de ese tejido y su hinchazón comprime las venas que lo drenan, lo que produce la erección. La eyaculación se debe después a señales simpáticas y a contracciones musculares rítmicas."
   }
  }
 },
 {
  "key": "ovary",
  "title": {
   "en": "Ovary",
   "es": "Ovario"
  },
  "match": [
   "ovary"
  ],
  "section": "27-2-anatomy-and-physiology-of-the-ovarian-reproductive-system",
  "sectionTitle": "27.2 Anatomy and Physiology of the Ovarian Reproductive System",
  "text": {
   "en": {
    "what": "The ovaries are two almond-sized glands in the pelvis, one on each side of the uterus, held in place by ligaments close to the open ends of the uterine tubes.",
    "how": "At birth each ovary already contains all its immature egg cells, each inside a follicle. During each cycle, the pituitary hormone FSH stimulates several follicles to grow, and usually one becomes dominant. Its cells secrete oestrogen, which thickens the uterine lining. A surge of LH then triggers ovulation: the follicle bursts and releases the egg towards the uterine tube. The empty follicle becomes the corpus luteum, which produces progesterone to prepare the uterus for a possible pregnancy and breaks down if fertilisation does not occur."
   },
   "es": {
    "what": "Los ovarios son dos glándulas del tamaño de una almendra situadas en la pelvis, una a cada lado del útero, sujetas por ligamentos cerca del extremo abierto de las trompas uterinas.",
    "how": "Desde el nacimiento, cada ovario contiene ya todos sus ovocitos inmaduros, cada uno dentro de un folículo. En cada ciclo, la hormona hipofisaria FSH estimula el crecimiento de varios folículos, y normalmente uno se vuelve dominante. Sus células segregan estrógenos, que engrosan el endometrio. Un pico de LH desencadena entonces la ovulación: el folículo se rompe y libera el ovocito hacia la trompa. El folículo vacío se transforma en el cuerpo lúteo, que produce progesterona para preparar el útero ante un posible embarazo y degenera si no hay fecundación."
   }
  }
 },
 {
  "key": "uterine tube",
  "title": {
   "en": "Uterine tube",
   "es": "Trompa uterina"
  },
  "match": [
   "uterine tube",
   "fallopian tube"
  ],
  "section": "27-2-anatomy-and-physiology-of-the-ovarian-reproductive-system",
  "sectionTitle": "27.2 Anatomy and Physiology of the Ovarian Reproductive System",
  "text": {
   "en": {
    "what": "The uterine tubes, or fallopian tubes, are two slender tubes about 10 cm long that extend from the upper corners of the uterus toward each ovary. Their outer end widens into a funnel fringed with finger-like fimbriae.",
    "how": "At ovulation, the fimbriae sweep over the ovary and capture the released oocyte, drawing it into the tube. The oocyte is then moved toward the uterus by beating cilia in the lining and gentle peristaltic contractions of the muscular wall, while secretions nourish it. Fertilization normally happens in the widest part, the ampulla, if sperm are present. The resulting embryo continues its journey for several days and reaches the uterus, where it implants."
   },
   "es": {
    "what": "Las trompas uterinas, o trompas de Falopio, son dos conductos finos de unos 10 cm que salen de los ángulos superiores del útero hacia cada ovario. Su extremo externo se ensancha en un embudo rodeado de prolongaciones digitiformes llamadas fimbrias.",
    "how": "En la ovulación, las fimbrias rozan el ovario y captan el ovocito liberado, que entra en la trompa. Después avanza hacia el útero gracias al movimiento de los cilios de la mucosa y a suaves contracciones peristálticas de la pared muscular, mientras las secreciones lo nutren. Si hay espermatozoides, la fecundación suele producirse en la porción más ancha, la ampolla. El embrión resultante sigue su camino durante varios días hasta llegar al útero, donde se implanta."
   }
  }
 },
 {
  "key": "uterus",
  "title": {
   "en": "Uterus",
   "es": "Útero"
  },
  "match": [
   "uterus"
  ],
  "section": "27-2-anatomy-and-physiology-of-the-ovarian-reproductive-system",
  "sectionTitle": "27.2 Anatomy and Physiology of the Ovarian Reproductive System",
  "text": {
   "en": {
    "what": "The uterus is a hollow, pear-shaped muscular organ in the female pelvis, between the bladder and the rectum, connected to the uterine tubes above and opening into the vagina through the cervix.",
    "how": "Its wall has three layers: an outer serosa, a thick smooth-muscle myometrium and an inner lining, the endometrium. Each menstrual cycle, estrogen and progesterone from the ovaries make the endometrium thicken and grow glands and blood vessels to receive an embryo. If no pregnancy occurs, hormone levels fall and the functional layer is shed as menstruation. During pregnancy the uterus expands greatly to hold the fetus, and at birth oxytocin drives powerful myometrial contractions that push the baby out."
   },
   "es": {
    "what": "El útero es un órgano muscular hueco con forma de pera situado en la pelvis femenina, entre la vejiga y el recto; se comunica con las trompas uterinas por arriba y con la vagina a través del cuello uterino.",
    "how": "Su pared tiene tres capas: una serosa externa, un grueso miometrio de músculo liso y un revestimiento interno, el endometrio. En cada ciclo menstrual, los estrógenos y la progesterona de los ovarios hacen que el endometrio se engrose y desarrolle glándulas y vasos para acoger un embrión. Si no hay embarazo, los niveles hormonales caen y la capa funcional se desprende con la menstruación. Durante la gestación, el útero crece enormemente para albergar al feto y, en el parto, la oxitocina provoca intensas contracciones del miometrio que expulsan al bebé."
   }
  }
 },
 {
  "key": "vagina",
  "title": {
   "en": "Vagina",
   "es": "Vagina"
  },
  "match": [
   "vagina"
  ],
  "section": "27-2-anatomy-and-physiology-of-the-ovarian-reproductive-system",
  "sectionTitle": "27.2 Anatomy and Physiology of the Ovarian Reproductive System",
  "text": {
   "en": {
    "what": "The vagina is a muscular, elastic canal about 10 cm long that runs from the cervix of the uterus to the outside of the body, lying between the bladder and urethra in front and the rectum behind.",
    "how": "The vagina receives the penis and semen during intercourse, lets menstrual flow leave the body, and forms the lower part of the birth canal. Its folded walls of smooth muscle and stratified epithelium can stretch enormously during childbirth and then recover. The lining has no glands of its own; it is moistened by fluid seeping from its walls and mucus from the cervix. Under the influence of oestrogen, its cells store glycogen, which resident lactobacilli ferment into lactic acid. This acidic environment helps protect against harmful microbes."
   },
   "es": {
    "what": "La vagina es un conducto muscular y elástico de unos 10 cm que va desde el cuello del útero hasta el exterior, situado entre la vejiga y la uretra por delante y el recto por detrás.",
    "how": "La vagina recibe el pene y el semen durante el coito, permite la salida del flujo menstrual y forma la parte inferior del canal del parto. Sus paredes plegadas, de músculo liso y epitelio estratificado, pueden distenderse enormemente durante el parto y recuperarse después. La mucosa carece de glándulas propias; se humedece con líquido que trasuda de sus paredes y con el moco del cuello uterino. Por efecto de los estrógenos, sus células acumulan glucógeno, que los lactobacilos residentes fermentan en ácido láctico. Este medio ácido ayuda a proteger frente a microorganismos dañinos."
   }
  }
 },
 {
  "key": "mammary gland",
  "title": {
   "en": "Mammary gland",
   "es": "Glándula mamaria"
  },
  "match": [
   "mammary gland",
   "breast",
   "mammary lobe"
  ],
  "section": "28-6-lactation",
  "sectionTitle": "28.6 Lactation",
  "text": {
   "en": {
    "what": "The mammary glands are modified sweat glands inside the breasts, lying over the pectoral muscles of the chest. Each consists of 15 to 20 lobes of milk-producing alveoli connected by ducts that open at the nipple.",
    "how": "During pregnancy, estrogen and progesterone make the duct system and alveoli grow. After birth, the drop in these hormones lets prolactin from the pituitary stimulate alveolar cells to produce milk. The first secretion, colostrum, is rich in antibodies; mature milk follows within days. When the baby suckles, nerve signals trigger release of oxytocin, which contracts the cells around the alveoli and pushes milk into the ducts, the milk ejection reflex. Regular suckling keeps prolactin high and milk production going."
   },
   "es": {
    "what": "Las glándulas mamarias son glándulas sudoríparas modificadas situadas en el interior de las mamas, sobre los músculos pectorales. Cada una está formada por 15 a 20 lóbulos de alvéolos productores de leche conectados por conductos que se abren en el pezón.",
    "how": "Durante el embarazo, los estrógenos y la progesterona hacen crecer el sistema de conductos y los alvéolos. Tras el parto, el descenso de estas hormonas permite que la prolactina de la hipófisis estimule a las células alveolares para fabricar leche. La primera secreción, el calostro, es rica en anticuerpos, y a los pocos días aparece la leche madura. Cuando el bebé succiona, las señales nerviosas provocan la liberación de oxitocina, que contrae las células que rodean los alvéolos y empuja la leche hacia los conductos: es el reflejo de eyección. La succión frecuente mantiene alta la prolactina y la producción de leche."
   }
  }
 },
 {
  "key": "placenta",
  "title": {
   "en": "Placenta and umbilical cord",
   "es": "Placenta y cordón umbilical"
  },
  "match": [
   "placenta",
   "umbilical cord"
  ],
  "section": "28-2-embryonic-development",
  "sectionTitle": "28.2 Embryonic Development",
  "text": {
   "en": {
    "what": "The placenta is a temporary disc-shaped organ that forms on the inner wall of the uterus during pregnancy, and the umbilical cord is the flexible stalk that connects it to the fetus.",
    "how": "The placenta develops from both embryonic tissue and the uterine lining. Fetal blood flows through tree-like chorionic villi bathed in maternal blood, but the two circulations stay separate. Across this thin barrier, oxygen and nutrients diffuse to the fetus, while carbon dioxide and wastes pass to the mother. The umbilical cord carries two arteries that bring fetal blood to the placenta and one vein that returns oxygen-rich blood. The placenta also makes hormones such as hCG, estrogen and progesterone that maintain pregnancy."
   },
   "es": {
    "what": "La placenta es un órgano temporal en forma de disco que se forma en la pared interna del útero durante el embarazo, y el cordón umbilical es el tallo flexible que la une al feto.",
    "how": "La placenta se desarrolla a partir de tejido embrionario y del revestimiento uterino. La sangre fetal circula por unas vellosidades coriónicas ramificadas que están bañadas por sangre materna, pero ambas circulaciones no llegan a mezclarse. A través de esta fina barrera, el oxígeno y los nutrientes pasan al feto, y el dióxido de carbono y los desechos pasan a la madre. El cordón umbilical contiene dos arterias que llevan la sangre fetal a la placenta y una vena que devuelve sangre oxigenada. La placenta también fabrica hormonas como la hCG, los estrógenos y la progesterona, que mantienen la gestación."
   }
  }
 },
 {
  "key": "brain",
  "title": {
   "en": "Brain",
   "es": "Encéfalo"
  },
  "match": [
   "brain",
   "cerebral hemisphere",
   "telencephalon",
   "allen brain",
   "allen brain hemisphere"
  ],
  "section": "13-2-the-central-nervous-system",
  "sectionTitle": "13.2 The Central Nervous System",
  "text": {
   "en": {
    "what": "The brain is the control centre of the nervous system, housed in the skull. Its main parts are the cerebrum, the diencephalon, the brainstem and the cerebellum.",
    "how": "The brain contains roughly 86 billion neurons that communicate through electrical impulses and chemical messengers called neurotransmitters. The folded outer layer of the cerebrum, the cerebral cortex, handles perception, voluntary movement, language and thought, with different regions specialised for different tasks. Deeper structures relay sensory information, regulate emotions, memory and hormones, while the brainstem controls breathing and heart rate and the cerebellum coordinates movement and balance. The brain is cushioned by cerebrospinal fluid and the meninges, and it uses about a fifth of the body's oxygen."
   },
   "es": {
    "what": "El encéfalo es el centro de control del sistema nervioso y se aloja en el cráneo. Sus partes principales son el cerebro, el diencéfalo, el tronco del encéfalo y el cerebelo.",
    "how": "El encéfalo contiene unos 86 000 millones de neuronas que se comunican mediante impulsos eléctricos y mensajeros químicos llamados neurotransmisores. La capa externa plegada del cerebro, la corteza cerebral, se ocupa de la percepción, el movimiento voluntario, el lenguaje y el pensamiento, con regiones especializadas en distintas tareas. Las estructuras profundas transmiten información sensitiva y regulan emociones, memoria y hormonas; el tronco del encéfalo controla la respiración y la frecuencia cardíaca, y el cerebelo coordina el movimiento y el equilibrio. Está amortiguado por el líquido cefalorraquídeo y las meninges, y consume cerca de una quinta parte del oxígeno del cuerpo."
   }
  }
 },
 {
  "key": "cerebellum",
  "title": {
   "en": "Cerebellum",
   "es": "Cerebelo"
  },
  "match": [
   "cerebellum"
  ],
  "section": "13-2-the-central-nervous-system",
  "sectionTitle": "13.2 The Central Nervous System",
  "text": {
   "en": {
    "what": "The cerebellum is the second largest part of the brain, located at the back of the skull beneath the occipital lobes of the cerebrum and behind the brainstem. Its surface is folded into fine ridges called folia.",
    "how": "It coordinates movement rather than starting it. The cerebellum receives a copy of the motor commands sent from the cerebral cortex, together with sensory information from muscles, joints, the inner ear and the eyes about what the body is actually doing. By comparing intended and actual movement, it sends corrections back through the brainstem and thalamus, making motions smooth, accurate and well timed. It is essential for balance, posture and learning motor skills, and damage causes clumsy, uncoordinated movement."
   },
   "es": {
    "what": "El cerebelo es la segunda porción más grande del encéfalo y se sitúa en la parte posterior del cráneo, bajo los lóbulos occipitales del cerebro y detrás del tronco del encéfalo. Su superficie está plegada en finas láminas llamadas folias.",
    "how": "Coordina el movimiento más que iniciarlo. Recibe una copia de las órdenes motoras que envía la corteza cerebral y, a la vez, información sensitiva de músculos, articulaciones, oído interno y ojos sobre lo que el cuerpo está haciendo realmente. Al comparar el movimiento previsto con el real, envía correcciones a través del tronco del encéfalo y el tálamo, de modo que los gestos sean suaves, precisos y bien sincronizados. Es esencial para el equilibrio, la postura y el aprendizaje motor, y su lesión produce movimientos torpes y descoordinados."
   }
  }
 },
 {
  "key": "brainstem",
  "title": {
   "en": "Brainstem",
   "es": "Tronco del encéfalo"
  },
  "match": [
   "brainstem",
   "medulla oblongata",
   "pons",
   "midbrain"
  ],
  "section": "13-2-the-central-nervous-system",
  "sectionTitle": "13.2 The Central Nervous System",
  "text": {
   "en": {
    "what": "The brainstem is the stalk-like part of the brain that connects the cerebrum to the spinal cord, made up of the midbrain, pons and medulla oblongata.",
    "how": "All the nerve tracts running between the brain and the body pass through it, so it acts as a vital relay. It contains the nuclei of most cranial nerves, which control movements and sensations of the face, eyes, mouth and throat. Centres in the medulla and pons regulate breathing, heart rate and blood pressure, and coordinate reflexes such as swallowing, coughing and vomiting. A network of neurons running through it, the reticular formation, helps keep the brain awake and alert."
   },
   "es": {
    "what": "El tronco del encéfalo es la porción en forma de tallo que une el cerebro con la médula espinal; está formado por el mesencéfalo, la protuberancia y el bulbo raquídeo.",
    "how": "Por él pasan todas las vías nerviosas que comunican el encéfalo con el resto del cuerpo, por lo que funciona como una estación de relevo vital. Contiene los núcleos de la mayoría de los pares craneales, que controlan los movimientos y la sensibilidad de la cara, los ojos, la boca y la garganta. Los centros del bulbo y la protuberancia regulan la respiración, la frecuencia cardíaca y la presión arterial, y coordinan reflejos como la deglución, la tos y el vómito. Una red de neuronas que lo recorre, la formación reticular, contribuye a mantener la vigilia y el estado de alerta."
   }
  }
 },
 {
  "key": "thalamus",
  "title": {
   "en": "Thalamus",
   "es": "Tálamo"
  },
  "match": [
   "thalamus"
  ],
  "section": "13-2-the-central-nervous-system",
  "sectionTitle": "13.2 The Central Nervous System",
  "text": {
   "en": {
    "what": "The thalamus is a pair of egg-shaped masses of grey matter deep in the centre of the brain, forming most of the diencephalon on either side of the third ventricle.",
    "how": "The thalamus acts as the main relay and filtering station for information heading to the cerebral cortex. Nearly all sensory signals, including vision, hearing, taste and touch, pass through specific thalamic nuclei, where they are processed and sent on to the right cortical area; smell is the main exception. The thalamus also links the cortex with the cerebellum and basal ganglia to help plan and refine movement. Because it controls which signals reach the cortex, it plays a key role in attention, alertness and the sleep–wake state."
   },
   "es": {
    "what": "El tálamo es un par de masas ovoides de sustancia gris situadas en el centro del encéfalo, que forman la mayor parte del diencéfalo a ambos lados del tercer ventrículo.",
    "how": "El tálamo es la principal estación de relevo y filtrado de la información que se dirige a la corteza cerebral. Casi todas las señales sensitivas, como la vista, el oído, el gusto y el tacto, pasan por núcleos talámicos concretos, donde se procesan y se envían a la zona cortical correspondiente; el olfato es la principal excepción. También conecta la corteza con el cerebelo y los ganglios basales para planificar y ajustar los movimientos. Como decide qué señales llegan a la corteza, desempeña un papel clave en la atención, el estado de alerta y el ciclo de sueño y vigilia."
   }
  }
 },
 {
  "key": "hippocampus",
  "title": {
   "en": "Hippocampus",
   "es": "Hipocampo"
  },
  "match": [
   "hippocampus"
  ],
  "section": "13-2-the-central-nervous-system",
  "sectionTitle": "13.2 The Central Nervous System",
  "text": {
   "en": {
    "what": "The hippocampus is a curved structure in the medial part of each temporal lobe, folded along the floor of the lateral ventricle. Its shape reminded early anatomists of a seahorse, which gives it its name.",
    "how": "It is part of the limbic system and is central to forming new long-term memories of facts and events. Information from many areas of the cortex converges on the hippocampus, which links its elements together and, over time, helps consolidate them into lasting memories stored in the cerebral cortex. Its synapses strengthen with repeated activity, a process called long-term potentiation that is thought to underlie learning. It also builds maps of space for navigation. Damage leaves older memories largely intact but prevents new ones from forming."
   },
   "es": {
    "what": "El hipocampo es una estructura curva situada en la parte medial de cada lóbulo temporal, plegada sobre el suelo del ventrículo lateral. Su forma recordó a los primeros anatomistas a un caballito de mar, de ahí su nombre.",
    "how": "Forma parte del sistema límbico y es clave para crear nuevos recuerdos a largo plazo de hechos y vivencias. A él llega información de muchas áreas de la corteza, que el hipocampo relaciona entre sí y ayuda a consolidar con el tiempo en recuerdos duraderos almacenados en la corteza cerebral. Sus sinapsis se refuerzan con la actividad repetida, un proceso llamado potenciación a largo plazo que se considera la base del aprendizaje. También elabora mapas espaciales para orientarse. Su lesión respeta en gran parte los recuerdos antiguos, pero impide formar otros nuevos."
   }
  }
 },
 {
  "key": "spinal cord",
  "title": {
   "en": "Spinal cord",
   "es": "Médula espinal"
  },
  "match": [
   "spinal cord"
  ],
  "section": "13-2-the-central-nervous-system",
  "sectionTitle": "13.2 The Central Nervous System",
  "text": {
   "en": {
    "what": "The spinal cord is a long cylinder of nervous tissue that extends from the brainstem down through the vertebral canal to about the level of the first lumbar vertebra.",
    "how": "Its central butterfly-shaped gray matter contains neuron cell bodies: the posterior horns receive sensory input and the anterior horns hold motor neurons that drive skeletal muscles. Surrounding white matter is organised into tracts that carry sensory information up to the brain and motor commands down to the body. Thirty-one pairs of spinal nerves leave the cord, each formed by a sensory dorsal root and a motor ventral root. The cord can also produce rapid reflexes, such as the knee-jerk, without waiting for the brain."
   },
   "es": {
    "what": "La médula espinal es un largo cilindro de tejido nervioso que desciende desde el tronco del encéfalo por el conducto vertebral hasta aproximadamente la primera vértebra lumbar.",
    "how": "En su centro, la sustancia gris con forma de mariposa contiene los cuerpos neuronales: las astas posteriores reciben la información sensitiva y las anteriores albergan las motoneuronas que activan los músculos esqueléticos. La sustancia blanca que la rodea se organiza en vías que llevan la información sensitiva hacia el encéfalo y las órdenes motoras hacia el cuerpo. De ella salen 31 pares de nervios raquídeos, cada uno formado por una raíz dorsal sensitiva y una raíz ventral motora. La médula también genera reflejos rápidos, como el rotuliano, sin necesidad de esperar al encéfalo."
   }
  }
 },
 {
  "key": "eye",
  "title": {
   "en": "Eye",
   "es": "Ojo"
  },
  "match": [
   "eyeball",
   "eye",
   "cornea",
   "lens",
   "retina",
   "sclera",
   "iris",
   "eyes"
  ],
  "section": "14-1-sensory-perception",
  "sectionTitle": "14.1 Sensory Perception",
  "text": {
   "en": {
    "what": "The eye is a roughly spherical sense organ about 2.5 cm across, sitting in the bony orbit of the skull and moved by six small external muscles.",
    "how": "Light enters through the transparent cornea, which does most of the focusing, then passes through the pupil, whose size the iris adjusts to the amount of light. The lens fine-tunes the focus by changing shape, a process controlled by the ciliary muscle, and projects an image onto the retina at the back of the eye. There, photoreceptors convert light into nerve signals: rods work in dim light, while cones detect colour and fine detail. These signals are processed by retinal neurons and carried by the optic nerve to the brain."
   },
   "es": {
    "what": "El ojo es un órgano sensorial casi esférico, de unos 2,5 cm de diámetro, alojado en la órbita ósea del cráneo y movido por seis pequeños músculos extrínsecos.",
    "how": "La luz entra por la córnea transparente, que realiza la mayor parte del enfoque, y atraviesa la pupila, cuyo tamaño ajusta el iris según la cantidad de luz. El cristalino afina el enfoque cambiando de forma gracias al músculo ciliar y proyecta una imagen sobre la retina, en el fondo del ojo. Allí, los fotorreceptores transforman la luz en señales nerviosas: los bastones funcionan con poca luz y los conos detectan el color y los detalles finos. Las neuronas de la retina procesan estas señales y el nervio óptico las lleva al encéfalo."
   }
  }
 },
 {
  "key": "ear",
  "title": {
   "en": "Ear",
   "es": "Oído"
  },
  "match": [
   "external ear",
   "ear",
   "auricle"
  ],
  "section": "14-1-sensory-perception",
  "sectionTitle": "14.1 Sensory Perception",
  "text": {
   "en": {
    "what": "The ear is the sense organ of hearing and balance. It has three parts: the outer ear (auricle and ear canal), the air-filled middle ear with three tiny ossicles, and the inner ear, a fluid-filled labyrinth inside the temporal bone.",
    "how": "Sound waves funneled down the ear canal make the tympanic membrane vibrate. The malleus, incus and stapes amplify these vibrations and pass them to the oval window, creating pressure waves in the fluid of the cochlea. The waves move the basilar membrane, bending the stereocilia of hair cells in the organ of Corti; different frequencies stimulate different regions. The hair cells convert this into nerve signals carried by the cochlear nerve to the brain. Elsewhere in the inner ear, the vestibule and semicircular canals detect head position and rotation for balance."
   },
   "es": {
    "what": "El oído es el órgano sensorial de la audición y el equilibrio. Tiene tres partes: el oído externo (pabellón auricular y conducto auditivo), el oído medio, lleno de aire y con tres huesecillos, y el oído interno, un laberinto lleno de líquido dentro del hueso temporal.",
    "how": "Las ondas sonoras que recorren el conducto auditivo hacen vibrar la membrana timpánica. El martillo, el yunque y el estribo amplifican esas vibraciones y las transmiten a la ventana oval, generando ondas de presión en el líquido de la cóclea. Estas ondas mueven la membrana basilar y doblan los estereocilios de las células ciliadas del órgano de Corti; cada frecuencia estimula una zona distinta. Las células ciliadas transforman el estímulo en señales nerviosas que el nervio coclear lleva al encéfalo. El vestíbulo y los conductos semicirculares detectan la posición y los giros de la cabeza para el equilibrio."
   }
  }
 },
 {
  "key": "skin",
  "title": {
   "en": "Skin",
   "es": "Piel"
  },
  "match": [
   "skin",
   "skin of body"
  ],
  "section": "5-1-layers-of-the-skin",
  "sectionTitle": "5.1 Layers of the Skin",
  "text": {
   "en": {
    "what": "The skin is the body's largest organ, covering its entire surface and made of two main layers, the epidermis and the dermis, resting on a fatty hypodermis.",
    "how": "The epidermis is a stratified epithelium whose deepest cells divide continually and are pushed upward, filling with keratin and dying to form a tough, waterproof outer layer that is constantly shed. Melanocytes add melanin pigment that shields cells from ultraviolet light. The dermis below contains collagen and elastic fibres, blood vessels, nerve endings, hair follicles and sweat and oil glands. Together these layers protect against injury and microbes, sense touch and temperature, and help regulate body temperature through sweating and changes in blood flow."
   },
   "es": {
    "what": "La piel es el órgano más extenso del cuerpo; cubre toda su superficie y consta de dos capas principales, la epidermis y la dermis, apoyadas sobre una hipodermis rica en grasa.",
    "how": "La epidermis es un epitelio estratificado cuyas células más profundas se dividen sin cesar y ascienden, se llenan de queratina y mueren hasta formar una capa externa resistente e impermeable que se renueva continuamente. Los melanocitos aportan melanina, un pigmento que protege a las células de la radiación ultravioleta. La dermis contiene fibras de colágeno y elásticas, vasos sanguíneos, terminaciones nerviosas, folículos pilosos y glándulas sudoríparas y sebáceas. En conjunto, estas capas protegen frente a lesiones y microorganismos, perciben el tacto y la temperatura, y ayudan a regular el calor corporal mediante el sudor y los cambios del flujo sanguíneo."
   }
  }
 },
 {
  "key": "skull",
  "title": {
   "en": "Skull",
   "es": "Cráneo"
  },
  "match": [
   "skull",
   "cranium",
   "mandible"
  ],
  "section": "7-2-the-skull",
  "sectionTitle": "7.2 The Skull",
  "text": {
   "en": {
    "what": "The skull is the bony framework of the head, made up of 22 bones. It is divided into the cranium, which encloses the brain, and the facial skeleton.",
    "how": "The eight cranial bones form a strong vault that protects the brain and supports the meninges. In adults most skull bones are locked together by immovable joints called sutures; in infants these are still flexible, with soft spots called fontanelles that allow the head to pass through the birth canal and the brain to grow. The fourteen facial bones shape the face, house the eyes, nose and teeth, and anchor the muscles of chewing and facial expression. The mandible is the only bone that moves freely, hinging at the temporomandibular joint."
   },
   "es": {
    "what": "El cráneo es el armazón óseo de la cabeza y está formado por 22 huesos. Se divide en el neurocráneo, que encierra el encéfalo, y el esqueleto facial.",
    "how": "Los ocho huesos del neurocráneo forman una bóveda resistente que protege el encéfalo y sostiene las meninges. En el adulto, la mayoría de los huesos craneales están unidos por articulaciones inmóviles llamadas suturas; en el lactante aún son flexibles y presentan zonas blandas, las fontanelas, que permiten el paso de la cabeza por el canal del parto y el crecimiento cerebral. Los catorce huesos faciales dan forma a la cara, alojan los ojos, la nariz y los dientes, y sirven de anclaje a los músculos de la masticación y la expresión. La mandíbula es el único hueso móvil y articula en la articulación temporomandibular."
   }
  }
 },
 {
  "key": "vertebral column",
  "title": {
   "en": "Vertebral column",
   "es": "Columna vertebral"
  },
  "match": [
   "vertebral column",
   "vertebra",
   "intervertebral disk",
   "vertebrae"
  ],
  "section": "7-3-the-vertebral-column",
  "sectionTitle": "7.3 The Vertebral Column",
  "text": {
   "en": {
    "what": "The vertebral column, or spine, is the flexible bony axis of the trunk, running from the skull to the pelvis. It is made of 24 separate vertebrae (7 cervical, 12 thoracic, 5 lumbar) plus the fused sacrum and coccyx.",
    "how": "Vertebrae are stacked on one another and joined by intervertebral discs, whose gel-like core and fibrous outer ring absorb shock and allow small movements that add up to bending and twisting. Strong ligaments and the facet joints between vertebrae limit excessive motion. Its four natural curves help balance the weight of the head and upper body over the hips and act like a spring when walking. The vertebral arches together form the vertebral canal, which protects the spinal cord, while spinal nerves exit through openings between neighboring vertebrae."
   },
   "es": {
    "what": "La columna vertebral es el eje óseo flexible del tronco, que va desde el cráneo hasta la pelvis. Está formada por 24 vértebras independientes (7 cervicales, 12 torácicas y 5 lumbares), además del sacro y el cóccix, que están fusionados.",
    "how": "Las vértebras se apilan unas sobre otras unidas por discos intervertebrales, cuyo núcleo gelatinoso y anillo fibroso amortiguan los impactos y permiten pequeños movimientos que, sumados, hacen posible flexionar y girar el tronco. Ligamentos resistentes y las articulaciones entre apófisis articulares limitan el movimiento excesivo. Sus cuatro curvaturas naturales ayudan a equilibrar el peso de la cabeza y la parte superior del cuerpo sobre las caderas y actúan como un muelle al caminar. Los arcos vertebrales forman el conducto vertebral, que protege la médula espinal, y los nervios raquídeos salen por los agujeros entre vértebras vecinas."
   }
  }
 },
 {
  "key": "thoracic cage",
  "title": {
   "en": "Rib cage",
   "es": "Caja torácica"
  },
  "match": [
   "rib",
   "sternum",
   "costal cartilage",
   "thoracic cage"
  ],
  "section": "7-4-the-thoracic-cage",
  "sectionTitle": "7.4 The Thoracic Cage",
  "text": {
   "en": {
    "what": "The rib cage, or thoracic cage, is the bony frame of the chest, formed by the 12 pairs of ribs, the sternum in front and the thoracic vertebrae behind.",
    "how": "It protects the heart, lungs and great vessels while remaining flexible enough for breathing. The first seven pairs of ribs attach directly to the sternum through costal cartilage, the next three join it indirectly, and the last two float free at the front. The joints with the vertebrae let the ribs swing up and outward when the intercostal muscles and diaphragm contract, enlarging the chest so air flows into the lungs. When these muscles relax, the elastic cage returns to its resting position and air is exhaled."
   },
   "es": {
    "what": "La caja torácica es el armazón óseo del tórax, formado por los 12 pares de costillas, el esternón por delante y las vértebras torácicas por detrás.",
    "how": "Protege el corazón, los pulmones y los grandes vasos y, al mismo tiempo, es lo bastante flexible para permitir la respiración. Los siete primeros pares de costillas se unen directamente al esternón mediante cartílago costal, los tres siguientes lo hacen de forma indirecta y los dos últimos quedan libres por delante (costillas flotantes). Sus articulaciones con las vértebras permiten que las costillas se eleven y se desplacen hacia fuera cuando se contraen los músculos intercostales y el diafragma, lo que amplía el tórax y hace entrar el aire. Al relajarse estos músculos, la caja recupera su posición de reposo y se espira el aire."
   }
  }
 },
 {
  "key": "femur",
  "title": {
   "en": "Femur",
   "es": "Fémur"
  },
  "match": [
   "femur"
  ],
  "section": "8-4-bones-of-the-lower-limb",
  "sectionTitle": "8.4 Bones of the Lower Limb",
  "text": {
   "en": {
    "what": "The femur, or thigh bone, is the longest and strongest bone in the body. It runs from the hip, where it meets the pelvis, to the knee, where it meets the tibia and patella.",
    "how": "The femur transmits the body's weight from the pelvis to the lower leg and acts as a lever for the powerful thigh and hip muscles during walking, running and jumping. Its rounded head fits into the acetabulum of the hip bone, forming a ball-and-socket joint that allows wide movement. The angled neck and the large trochanters give attachment to muscles such as the gluteals. Its thick shaft of compact bone resists bending, while spongy bone at the ends absorbs loads, and its marrow cavity holds bone marrow. At the knee, two rounded condyles form a hinge-like joint."
   },
   "es": {
    "what": "El fémur es el hueso del muslo, el más largo y resistente del cuerpo. Va desde la cadera, donde articula con la pelvis, hasta la rodilla, donde articula con la tibia y la rótula.",
    "how": "El fémur transmite el peso del cuerpo desde la pelvis a la pierna y actúa como palanca para los potentes músculos del muslo y la cadera al caminar, correr o saltar. Su cabeza redondeada encaja en el acetábulo del hueso coxal y forma una articulación esférica de gran movilidad. El cuello inclinado y los grandes trocánteres sirven de inserción a músculos como los glúteos. Su diáfisis de hueso compacto resiste la flexión, el hueso esponjoso de los extremos absorbe las cargas y la cavidad medular alberga médula ósea. En la rodilla, dos cóndilos redondeados forman una articulación de tipo bisagra."
   }
  }
 },
 {
  "key": "humerus",
  "title": {
   "en": "Humerus",
   "es": "Húmero"
  },
  "match": [
   "humerus"
  ],
  "section": "8-2-bones-of-the-upper-limb",
  "sectionTitle": "8.2 Bones of the Upper Limb",
  "text": {
   "en": {
    "what": "The humerus is the single long bone of the upper arm, extending from the shoulder, where it meets the scapula, to the elbow, where it meets the radius and ulna.",
    "how": "Its rounded head fits into the shallow glenoid cavity of the scapula, forming a ball-and-socket joint that allows the shoulder its very wide range of motion. Bony landmarks such as the greater and lesser tubercles and the deltoid tuberosity serve as attachment points for the rotator cuff, deltoid and other muscles that lift and rotate the arm. At the lower end, the trochlea and capitulum form the hinge of the elbow with the ulna and radius. The ulnar nerve runs behind the medial epicondyle, the spot known as the funny bone."
   },
   "es": {
    "what": "El húmero es el único hueso largo del brazo y se extiende desde el hombro, donde se articula con la escápula, hasta el codo, donde se articula con el radio y el cúbito.",
    "how": "Su cabeza redondeada encaja en la cavidad glenoidea, poco profunda, de la escápula, formando una articulación esférica que da al hombro su enorme amplitud de movimiento. Relieves óseos como el troquíter, el troquín y la tuberosidad deltoidea sirven de inserción al manguito rotador, al deltoides y a otros músculos que elevan y rotan el brazo. En el extremo inferior, la tróclea y el cóndilo humeral forman con el cúbito y el radio la bisagra del codo. Por detrás de la epitróclea pasa el nervio cubital, el punto que provoca calambre al golpearlo."
   }
  }
 },
 {
  "key": "pelvis",
  "title": {
   "en": "Pelvis",
   "es": "Pelvis"
  },
  "match": [
   "pelvis",
   "hip bone",
   "bony pelvis",
   "pelvic girdle"
  ],
  "systems": [
   "skeletal"
  ],
  "section": "8-3-the-pelvic-girdle-and-pelvis",
  "sectionTitle": "8.3 The Pelvic Girdle and Pelvis",
  "text": {
   "en": {
    "what": "The pelvis is the basin-shaped ring of bone at the base of the trunk, formed by the two hip bones in front and at the sides and the sacrum and coccyx behind.",
    "how": "Each hip bone results from the fusion of the ilium, ischium and pubis, which meet at the acetabulum, the socket for the head of the femur. The hip bones join the sacrum at the sacroiliac joints and each other at the pubic symphysis, creating a strong, stable ring. This ring transfers the weight of the upper body to the legs when standing and to the ischial tuberosities when sitting. It also supports and protects the bladder, rectum and reproductive organs, and in females it is wider to allow childbirth."
   },
   "es": {
    "what": "La pelvis es el anillo óseo en forma de cuenco situado en la base del tronco, formado por los dos coxales por delante y a los lados, y por el sacro y el cóccix por detrás.",
    "how": "Cada coxal resulta de la fusión del ilion, el isquion y el pubis, que convergen en el acetábulo, la cavidad donde encaja la cabeza del fémur. Los coxales se articulan con el sacro en las articulaciones sacroilíacas y entre sí en la sínfisis del pubis, formando un anillo resistente y estable. Este anillo transmite el peso de la parte superior del cuerpo a las piernas al estar de pie y a las tuberosidades isquiáticas al sentarse. También sostiene y protege la vejiga, el recto y los órganos reproductores, y en la mujer es más ancho para permitir el parto."
   }
  }
 },
 {
  "key": "biceps brachii",
  "title": {
   "en": "Biceps brachii",
   "es": "Bíceps braquial"
  },
  "match": [
   "biceps brachii"
  ],
  "section": "11-5-muscles-of-the-pectoral-girdle-and-upper-limbs",
  "sectionTitle": "11.5 Muscles of the Pectoral Girdle and Upper Limbs",
  "text": {
   "en": {
    "what": "The biceps brachii is the two-headed muscle on the front of the upper arm. Its heads start on the scapula and join into a tendon that attaches to the radius just below the elbow.",
    "how": "Like all skeletal muscles, the biceps contracts when nerve impulses from the musculocutaneous nerve make its fibres shorten, as actin and myosin filaments slide past each other. Because it crosses the elbow, its pull bends the forearm towards the upper arm. Because it attaches to the radius, it is also a powerful supinator, turning the palm upwards, as when using a screwdriver. Crossing the shoulder as well, it helps raise the arm forwards. It works in opposition to the triceps brachii on the back of the arm, which straightens the elbow."
   },
   "es": {
    "what": "El bíceps braquial es el músculo de dos cabezas situado en la cara anterior del brazo. Sus cabezas nacen en la escápula y se unen en un tendón que se inserta en el radio, justo por debajo del codo.",
    "how": "Como todo músculo esquelético, el bíceps se contrae cuando los impulsos del nervio musculocutáneo hacen que sus fibras se acorten al deslizarse los filamentos de actina y miosina. Al cruzar el codo, su tracción flexiona el antebrazo sobre el brazo. Como se inserta en el radio, también es un potente supinador, que gira la palma hacia arriba, como al usar un destornillador. Al cruzar además el hombro, ayuda a elevar el brazo hacia delante. Actúa como antagonista del tríceps braquial, situado en la cara posterior, que extiende el codo."
   }
  }
 },
 {
  "key": "quadriceps femoris",
  "title": {
   "en": "Quadriceps femoris",
   "es": "Cuádriceps femoral"
  },
  "match": [
   "quadriceps femoris",
   "rectus femoris",
   "vastus lateralis",
   "vastus medialis",
   "vastus intermedius"
  ],
  "section": "11-6-appendicular-muscles-of-the-pelvic-girdle-and-lower-limbs",
  "sectionTitle": "11.6 Appendicular Muscles of the Pelvic Girdle and Lower Limbs",
  "text": {
   "en": {
    "what": "The quadriceps femoris is the large muscle group on the front of the thigh. It has four heads: the rectus femoris, vastus lateralis, vastus medialis and vastus intermedius.",
    "how": "All four heads join into the quadriceps tendon, which encloses the patella and continues as the patellar ligament to the tibial tuberosity just below the knee. When the muscle contracts, it pulls on this tendon and powerfully extends the knee, as in standing up, climbing stairs, jumping or kicking. The patella acts like a pulley, increasing the leverage of the pull. The rectus femoris also crosses the hip, so it helps flex the thigh. The muscle also stabilizes the knee and absorbs impact when landing."
   },
   "es": {
    "what": "El cuádriceps femoral es el gran grupo muscular de la cara anterior del muslo. Tiene cuatro cabezas: el recto femoral, el vasto lateral, el vasto medial y el vasto intermedio.",
    "how": "Las cuatro cabezas se unen en el tendón cuadricipital, que envuelve la rótula y continúa como ligamento rotuliano hasta la tuberosidad de la tibia, justo debajo de la rodilla. Al contraerse tira de ese tendón y extiende la rodilla con fuerza, como al levantarse, subir escaleras, saltar o dar una patada. La rótula actúa como una polea que aumenta la palanca de la tracción. El recto femoral cruza además la cadera, por lo que también ayuda a flexionar el muslo. El músculo estabiliza la rodilla y amortigua el impacto al aterrizar."
   }
  }
 },
 {
  "key": "gluteus maximus",
  "title": {
   "en": "Gluteus maximus",
   "es": "Glúteo mayor"
  },
  "match": [
   "gluteus maximus"
  ],
  "section": "11-6-appendicular-muscles-of-the-pelvic-girdle-and-lower-limbs",
  "sectionTitle": "11.6 Appendicular Muscles of the Pelvic Girdle and Lower Limbs",
  "text": {
   "en": {
    "what": "The gluteus maximus is the largest and most superficial muscle of the buttock, running from the back of the ilium, sacrum and coccyx to the femur and the iliotibial tract.",
    "how": "Its main action is to extend the thigh at the hip, pulling the leg backward, and it also rotates the thigh outward. It is relatively quiet during easy walking but works hard when climbing stairs, running, jumping or rising from a squat or a chair. By pulling on the iliotibial tract it also helps stabilise the knee. Its bulk and strength are linked to upright posture, since it keeps the trunk from tipping forward over the hips."
   },
   "es": {
    "what": "El glúteo mayor es el músculo más grande y superficial de la nalga; se extiende desde la cara posterior del ilion, el sacro y el cóccix hasta el fémur y la cintilla iliotibial.",
    "how": "Su acción principal es extender el muslo a nivel de la cadera, llevando la pierna hacia atrás, y además lo rota hacia fuera. Trabaja poco al caminar con normalidad, pero se activa con fuerza al subir escaleras, correr, saltar o levantarse de una sentadilla o de una silla. Al tensar la cintilla iliotibial también contribuye a estabilizar la rodilla. Su volumen y potencia están ligados a la postura erguida, ya que impide que el tronco se incline hacia delante sobre las caderas."
   }
  }
 },
 {
  "key": "abdominal wall",
  "title": {
   "en": "Abdominal wall muscles",
   "es": "Músculos de la pared abdominal"
  },
  "match": [
   "rectus abdominis",
   "external oblique",
   "internal oblique",
   "transversus abdominis"
  ],
  "section": "11-4-axial-muscles-of-the-abdominal-wall-and-thorax",
  "sectionTitle": "11.4 Axial Muscles of the Abdominal Wall, and Thorax",
  "text": {
   "en": {
    "what": "The abdominal wall muscles form the front and sides of the trunk between the ribs and pelvis. They include the rectus abdominis, the external and internal obliques, and the transversus abdominis.",
    "how": "These muscles are arranged in layers whose fibres run in different directions, like plywood, which makes the wall strong without any bone. The rectus abdominis runs vertically and bends the trunk forwards, the obliques run diagonally to twist and bend it sideways, and the transversus abdominis wraps horizontally like a corset. Together they support and protect the abdominal organs and stabilise the spine. By squeezing the abdomen they raise internal pressure, which helps with forceful breathing out, coughing, urination, defecation and childbirth."
   },
   "es": {
    "what": "Los músculos de la pared abdominal forman la parte anterior y lateral del tronco entre las costillas y la pelvis. Incluyen el recto del abdomen, los oblicuos externo e interno y el transverso del abdomen.",
    "how": "Estos músculos se disponen en capas cuyas fibras siguen direcciones distintas, como un contrachapado, lo que da gran resistencia a una pared sin hueso. El recto del abdomen es vertical y flexiona el tronco hacia delante; los oblicuos, de trayecto diagonal, lo giran y lo inclinan lateralmente; y el transverso del abdomen lo rodea horizontalmente como una faja. En conjunto sostienen y protegen las vísceras abdominales y estabilizan la columna. Al comprimir el abdomen aumentan la presión interna, lo que ayuda a la espiración forzada, la tos, la micción, la defecación y el parto."
   }
  }
 }
];
for(const organ of ORGANS)for(const name of organ.match)byName.set(name,organ);
