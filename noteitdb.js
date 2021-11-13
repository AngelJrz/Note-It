var connection = connect("mongodb://noteitdb_user:pa55word123@localhost/admin");

db = connection.getSiblingDB('noteitdb')

db.carreras.insertMany([
  {
    _id: ObjectId("61787209f57911dc05a94ea1"),
    nombre: "Lic. en Ingeniería de Software",
    descripcion:
      "Formar profesionistas que cubran las necesidades que demanda la sociedad en materia de Ingeniería de Software, proponiendo soluciones que involucren la abstracción, análisis, diseño, implementación y prueba de software, así como la selección de metodologías y herramientas a emplear. Todo esto en un ambiente de tolerancia, respeto y honestidad hacia el cliente y su información, empleando los recursos de manera responsable y puntual.",
  },
  {
    _id: ObjectId("61787590512d6b78b60ebc24"),
    nombre: "Lic. Estadística",
    descripcion:
      "Formar profesionistas con conocimientos sólidos en la disciplina Estadística bajo un enfoque metodológico, utilizando software y herramientas computacionales de manera eficiente, con aplicación en diversos ámbitos del conocimiento y fomentando el trabajo multidisciplinario e interdisciplinario.",
  },
  {
    _id: ObjectId("617875acb9057cd74bce5068"),
    nombre: "Lic. en Tecnologías Computacionales",
    descripcion:
      "Formar profesionales en Tecnologías Computacionales de manera integral, ética, proactiva y de calidad, que tengan las competencias para proponer soluciones sustentables basadas en tecnologías computacionales que satisfagan necesidades sociales y contribuyan al desarrollo económico y social de la región y del país.",
  },
  {
    _id: ObjectId("617875d43c242ac897fe4f88"),
    nombre: "Lic. Ciencias y Técnicas Estadísticas",
    descripcion:
      "Formar profesionales responsables, honestos, versátiles, con alto sentido del trabajo en equipo y con valores éticos universales, conocimientos sólidos en la disciplina profesional de la estadística a nivel de comprensión, para que tengan la capacidad de generarlos y aplicarlos en la toma de decisiones, con habilidades y actitudes para brindar servicios de consultoría y asesoría estadística.",
  },
  {
    _id: ObjectId("6178760054aee1e3e6e772ba"),
    nombre: "Lic. en Redes y Servicios de Cómputo",
    descripcion:
      "Formar profesionales en Redes y Servicios de Cómputo de manera integral, ética, proactiva y de calidad, que tengan las competencias para proponer soluciones sustentables basadas en tecnologías computacionales que satisfagan necesidades sociales y contribuyan al desarrollo económico y social de la región y del país.",
  },
]);

db.materias.insertMany([
  //Ingeniería de software
  {
    _id: ObjectId("6178d9388c9c391890f678aa"),
    nombre: "Habilidades de comunicación",
    descripcion:
      "Se basa en el análisis, selección y práctica de técnicas para la mejor expresión y comunicación de ideas, tanto oral como escrita. El desempeño de la unidad de competencia se evidencia mediante exposiciones, tareas y prácticas; suficientes, pertinentes y puntuales; y mediante un examen escrito, suficiente.",
    carrera: ObjectId("61787209f57911dc05a94ea1"),
  },
  {
    _id: ObjectId("6178d98ac42c26109e227277"),
    nombre: "Laboratorio de resolución de problemas",
    descripcion:
      "El estudiante se enfrenta por primera vez a las tareas de resolución de problemas, diseñando alternativas de software a través del empleo de diversos métodos ayudándose de las herramientas correspondientes.",
    carrera: ObjectId("61787209f57911dc05a94ea1"),
  },
  {
    _id: ObjectId("6178d9a4c43f850b47a0db4c"),
    nombre: "Introducción a la programación",
    descripcion:
      "Brinda competencias necesarias para resolver problemas algorítmicos, que permitirán resolver problemas con un enfoque teórico-metodológicos a través de la construcción de sistemas de software.",
    carrera: ObjectId("61787209f57911dc05a94ea1"),
  },
  {
    _id: ObjectId("6178d9c90a0408fa7b409ac4"),
    nombre: "Requerimientos de software",
    descripcion:
      "La identificación de requerimientos es la primera fase en el proceso de desarrollo de software, en la cual se describen las necesidades del cliente, es decir, las funcionalidades que debe cubrir el software a desarrollar, además de los criterios de calidad, siguiendo de manera sistemática una serie de actividades para generar una especificación, que será la base para el desarrollo del producto.",
    carrera: ObjectId("61787209f57911dc05a94ea1"),
  },
  {
    _id: ObjectId("6178d9dadf2ad2987a73e85e"),
    nombre: "Diseño de software",
    descripcion:
      "Los estudiantes diseñan software usable y basado en componentes mediante diferentes modelos de manera consciente y con apertura; verifican el cumplimiento de los requisitos en la solución y que sus modelos sean coherentes entre sí.",
    carrera: ObjectId("61787209f57911dc05a94ea1"),
  },

  //Lic. Estadística
  {
    _id: ObjectId("6178da22750cab8a12935b5a"),
    nombre: "Introducción a la programación estadística",
    descripcion:
      "Los desarrollos en metodología estadística se deben implementar computacionalmente, esto implica el desarrollo de código en algún lenguaje de programación, y en consecuencia el estadístico debe tener las competencias y habilidades en programación, así como el conocimiento y entendimiento de los principios básicos del pensamiento algorítmico.",
    carrera: ObjectId("61787590512d6b78b60ebc24"),
  },
  {
    _id: ObjectId("6178da489988045d83008909"),
    nombre: "Álgebra lineal aplicada a la estadística II",
    descripcion:
      "Se hace énfasis en el uso de la matemática, en este caso de la teoría sobre espacios vectoriales, transformaciones lineales y valores y vectores propios, como herramienta de análisis para la estadística, proporcionando a los estudiantes habilidades para la resolución de problemas, constituyendo un conjunto sólido de saberes matemáticos.",
    carrera: ObjectId("61787590512d6b78b60ebc24"),
  },
  {
    _id: ObjectId("6178da588ce83ffc8c205d24"),
    nombre: "Seminario de aplicaciones estadísticas",
    descripcion:
      "El estudiante tendrá la oportunidad de buscar, identificar, discernir y conocer con el apoyo del profesor a cargo y expositores invitados, prácticas y experiencias del desarrollo de la estadística en diferentes campos del conocimiento científico.",
    carrera: ObjectId("61787590512d6b78b60ebc24"),
  },
  {
    _id: "44539472-df29-4237-b466-0f94e07d31a4",
    nombre: "Modelos de regresion lineal y no lineal",
    descripcion:
      "Da inicio a la modelación estadística, siendo esencial para el estudiante el estudio y análisis de la relación entre variables, iniciando con la regresión lineal simple, siguiendo con la regresión lineal múltiple, hasta llegar a la regresión no lineal.",
    carrera: ObjectId("61787590512d6b78b60ebc24"),
  },

  //Lic. en Tecnologías Computacionales
  {
    _id: ObjectId("6178daa6271e03e3ed2bf430"),
    nombre: "Sistemas Operativos",
    descripcion:
      "Permitirá que el estudiante conozca los componentes de un sistema operativo, con esto podrá identificar sus funciones a fin de que pueda utilizarlo de forma eficiente y optimice sus recursos.",
    carrera: ObjectId("617875acb9057cd74bce5068"),
  },
  {
    _id:ObjectId("6178dac19a618294e62c1f44"),
    nombre: "Ingeniería de software",
    descripcion:
      "El estudiante conoce diversos aspectos importantes del desarrollo, especialmente lo relativo a los requerimientos del usuario. Al mismo tiempo se introduce a las metodologías de análisis y diseño orientadas a objetos usando UML.",
    carrera: ObjectId("617875acb9057cd74bce5068"),
  },
]);

db.temas.insertMany([
  //Habilidades de comunicación
  {
    _id: ObjectId("6178dae2b465244de051804c"),
    nombre: "El ensayo",
    descripcion:
      "Que el estudiante conozca los conceptos básicos sobre un ensayo.",
    materia: ObjectId("6178d9388c9c391890f678aa"),
  },
  {
    _id: ObjectId("618c4acfc82ba916a614428f"),
    nombre: "Habilidades sociales",
    descripcion:
      "Que el estudiante conozca los conceptos básicos sobre las habilidades sociales.",
    materia: ObjectId("6178d9388c9c391890f678aa"),
  },
  {
    _id: ObjectId("618c4ca9723f33fc2ae92fd0"),
    nombre: "La comunicación",
    descripcion:
      "Que el estudiante conozca los conceptos básicos sobre la comunicación.",
    materia: ObjectId("6178d9388c9c391890f678aa"),
  },

  {
    _id: ObjectId("618c4d2bda986d69cf2e2168"),
    nombre: "El problema",
    descripcion:
      "Que el estudiante conozca los conceptos básicos sobre el problema.",
    materia: ObjectId("6178d98ac42c26109e227277"),
  },
  {
    _id: ObjectId("618c4d91f6324098569f7e49"),
    nombre: "Pasos para la resolución de un problema",
    descripcion:
      "Que el estudiante conozca los conceptos básicos sobre cómo resolver un problema.",
    materia: ObjectId("6178d98ac42c26109e227277"),
  },
]);

db.estudiantes.insertMany([
  {
    _id: ObjectId("6178db2ca64a62f62989cf93"),
    nombres: "Abizair",
    apellidos: "Suarez Martinez",
    usuario: "abizair",
    correo: "abizairsm@gmail.com",
    contrasenia: "$2a$10$a.0vJ8kWX38JHz7O5dJtSe.rbuJMLBsqlaOXv8U4quNsH8fU3STqy", // = abizair
    biografia: "Hola, soy estudiante de Lic. en Ingeniería de Software.",
    carrera: ObjectId("61787209f57911dc05a94ea1"),
    activo: true,
  },
  {
    _id: ObjectId("618c5035e51edf705ef5350d"),
    nombres: "Ruben",
    apellidos: "Rivera Bajaras",
    usuario: "ruben123",
    correo: "ruben123@gmail.com",
    contrasenia: "$2a$10$Nbof66F9.wntnQMq6.VNPORbAoUH/Czf6mJibIMk2/A2db4QAfuBO",
    biografia: "Hola, soy estudiante de Lic. en Estadística.",
    carrera: ObjectId("61787590512d6b78b60ebc24"),
    activo: true,
  },
]);