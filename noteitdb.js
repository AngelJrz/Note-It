var connection = connect("mongodb://noteitdb_user:pa55word123@localhost/admin");

db = connection.getSiblingDB('noteitdb')

db.carreras.insertMany([
    {
        id: "2ae97db8-5daa-43ac-8460-c5ebbde3dead",
        nombre: "Lic. en Ingeniería de Software",
        descripcion: "Formar profesionistas que cubran las necesidades que demanda la sociedad en materia de Ingeniería de Software, proponiendo soluciones que involucren la abstracción, análisis, diseño, implementación y prueba de software, así como la selección de metodologías y herramientas a emplear. Todo esto en un ambiente de tolerancia, respeto y honestidad hacia el cliente y su información, empleando los recursos de manera responsable y puntual."
    },
    {
        id: "6dff9c24-c11b-4f17-bde7-c364be2637bb",
        nombre: "Lic. Estadística",
        descripcion: "Formar profesionistas con conocimientos sólidos en la disciplina Estadística bajo un enfoque metodológico, utilizando software y herramientas computacionales de manera eficiente, con aplicación en diversos ámbitos del conocimiento y fomentando el trabajo multidisciplinario e interdisciplinario."
    },
    {
        id: "41b00818-8d98-4e72-98be-cdaa897e5015",
        nombre: "Lic. en Tecnologías Computacionales",
        descripcion: "Formar profesionales en Tecnologías Computacionales de manera integral, ética, proactiva y de calidad, que tengan las competencias para proponer soluciones sustentables basadas en tecnologías computacionales que satisfagan necesidades sociales y contribuyan al desarrollo económico y social de la región y del país."
    },
    {
        id: "2c24d6a8-fce5-46d0-879d-42be615d4a26",
        nombre: "Lic. Ciencias y Técnicas Estadísticas",
        descripcion: "Formar profesionales responsables, honestos, versátiles, con alto sentido del trabajo en equipo y con valores éticos universales, conocimientos sólidos en la disciplina profesional de la estadística a nivel de comprensión, para que tengan la capacidad de generarlos y aplicarlos en la toma de decisiones, con habilidades y actitudes para brindar servicios de consultoría y asesoría estadística."
    },
    {
        id: "c6693b90-65fe-4acc-b02e-d322c81a9d94",
        nombre: "Lic. en Redes y Servicios de Cómputo",
        descripcion: "Formar profesionales en Redes y Servicios de Cómputo de manera integral, ética, proactiva y de calidad, que tengan las competencias para proponer soluciones sustentables basadas en tecnologías computacionales que satisfagan necesidades sociales y contribuyan al desarrollo económico y social de la región y del país."
    }
])

db.materias.insertMany([
    //Ingeniería de software
    {
        id: "47135244-8d68-4702-b827-b375f2b89ced",
        nombre: "Habilidades de comunicación",
        descripcion: "Se basa en el análisis, selección y práctica de técnicas para la mejor expresión y comunicación de ideas, tanto oral como escrita. El desempeño de la unidad de competencia se evidencia mediante exposiciones, tareas y prácticas; suficientes, pertinentes y puntuales; y mediante un examen escrito, suficiente.",
        carrera: "2ae97db8-5daa-43ac-8460-c5ebbde3dead"
    },
    {
        id: "10aee095-006e-460e-a5d9-0e92e91cb5af",
        nombre: "Laboratorio de resolución de problemas",
        descripcion: "El estudiante se enfrenta por primera vez a las tareas de resolución de problemas, diseñando alternativas de software a través del empleo de diversos métodos ayudándose de las herramientas correspondientes.",
        carrera: "2ae97db8-5daa-43ac-8460-c5ebbde3dead"
    },
    {
        id: "e3fe1b99-2ffa-4f1e-b17e-3c984d2fec5c",
        nombre: "Introducción a la programación",
        descripcion: "Brinda competencias necesarias para resolver problemas algorítmicos, que permitirán resolver problemas con un enfoque teórico-metodológicos a través de la construcción de sistemas de software.",
        carrera: "2ae97db8-5daa-43ac-8460-c5ebbde3dead"
    },
    {
        id: "024dad66-2a4f-4364-844b-513aa187feb9",
        nombre: "Requerimientos de software",
        descripcion: "La identificación de requerimientos es la primera fase en el proceso de desarrollo de software, en la cual se describen las necesidades del cliente, es decir, las funcionalidades que debe cubrir el software a desarrollar, además de los criterios de calidad, siguiendo de manera sistemática una serie de actividades para generar una especificación, que será la base para el desarrollo del producto.",
        carrera: "2ae97db8-5daa-43ac-8460-c5ebbde3dead"
    },
    {
        id: "936ed7d3-70b7-44ee-9e55-03e0bdd000b0",
        nombre: "Diseño de software",
        descripcion: "Los estudiantes diseñan software usable y basado en componentes mediante diferentes modelos de manera consciente y con apertura; verifican el cumplimiento de los requisitos en la solución y que sus modelos sean coherentes entre sí.",
        carrera: "2ae97db8-5daa-43ac-8460-c5ebbde3dead"
    },

    //Lic. Estadística
    {
        id: "e8a93b3c-10dd-4947-b348-eb710a5aaf7c",
        nombre: "Introducción a la programación estadística",
        descripcion: "Los desarrollos en metodología estadística se deben implementar computacionalmente, esto implica el desarrollo de código en algún lenguaje de programación, y en consecuencia el estadístico debe tener las competencias y habilidades en programación, así como el conocimiento y entendimiento de los principios básicos del pensamiento algorítmico.",
        carrera: "6dff9c24-c11b-4f17-bde7-c364be2637bb"
    },
    {
        id: "f175522e-8fe4-45c4-bbc3-994071db7c2c",
        nombre: "Álgebra lineal aplicada a la estadística II",
        descripcion: "Se hace énfasis en el uso de la matemática, en este caso de la teoría sobre espacios vectoriales, transformaciones lineales y valores y vectores propios, como herramienta de análisis para la estadística, proporcionando a los estudiantes habilidades para la resolución de problemas, constituyendo un conjunto sólido de saberes matemáticos.",
        carrera: "6dff9c24-c11b-4f17-bde7-c364be2637bb"
    },
    {
        id: "eca280f5-3ed7-4063-a1b8-6e76f1527e3d",
        nombre: "Seminario de aplicaciones estadísticas",
        descripcion: "El estudiante tendrá la oportunidad de buscar, identificar, discernir y conocer con el apoyo del profesor a cargo y expositores invitados, prácticas y experiencias del desarrollo de la estadística en diferentes campos del conocimiento científico.",
        carrera: "6dff9c24-c11b-4f17-bde7-c364be2637bb"
    },
    {
        id: "44539472-df29-4237-b466-0f94e07d31a4",
        nombre: "Modelos de regresion lineal y no lineal",
        descripcion: "Da inicio a la modelación estadística, siendo esencial para el estudiante el estudio y análisis de la relación entre variables, iniciando con la regresión lineal simple, siguiendo con la regresión lineal múltiple, hasta llegar a la regresión no lineal.",
        carrera: "6dff9c24-c11b-4f17-bde7-c364be2637bb"
    },

    //Lic. en Tecnologías Computacionales
    {
        id: "fe20628b-3625-4b74-9b62-428488788dea",
        nombre: "Sistemas Operativos",
        descripcion: "Permitirá que el estudiante conozca los componentes de un sistema operativo, con esto podrá identificar sus funciones a fin de que pueda utilizarlo de forma eficiente y optimice sus recursos.",
        carrera: "41b00818-8d98-4e72-98be-cdaa897e5015"
    },
    {
        id: "d556d9e4-8c4b-4ef5-aa51-e09149ed6b51",
        nombre: "Ingeniería de software",
        descripcion: "El estudiante conoce diversos aspectos importantes del desarrollo, especialmente lo relativo a los requerimientos del usuario. Al mismo tiempo se introduce a las metodologías de análisis y diseño orientadas a objetos usando UML.",
        carrera: "41b00818-8d98-4e72-98be-cdaa897e5015"
    },
])

db.temas.insertMany([
  //Habilidades de comunicación
  {
    id: "6e12d56b-eb40-4fb5-9465-350342cc4855",
    nombre: "El ensayo",
    descripcion:
      "Que el estudiante conozca los conceptos básicos sobre un ensayo.",
    materia: "47135244-8d68-4702-b827-b375f2b89ced",
  },
]);

db.estudiantes.insertMany([
  {
    id: "3ab8d1f7-10f5-4060-b757-096d7d868491",
    nombres: "Abizair",
    apellidos: "Suarez Martinez",
    usuario: "abizair",
    correo: "abizairsm@gmail.com",
    contrasenia: "mipassword",
    biografia: "Hola, soy estudiante de Lic. en Ingeniería de Software.",
    carrera: "2ae97db8-5daa-43ac-8460-c5ebbde3dead",
    activo: true
  },
]);

/**
2ae97db8-5daa-43ac-8460-c5ebbde3dead
6dff9c24-c11b-4f17-bde7-c364be2637bb
41b00818-8d98-4e72-98be-cdaa897e5015
2c24d6a8-fce5-46d0-879d-42be615d4a26
c6693b90-65fe-4acc-b02e-d322c81a9d94
0bc24488-d76e-4d05-85d1-5bb2096057cc
53835468-a57c-4569-a5e1-520d47082380
50cbd5bd-2331-4c5a-9b17-f3addd79ecd3
21bd65d0-7510-47a0-bbce-4b7a1181f705
3ab8d1f7-10f5-4060-b757-096d7d868491
 */

/**
47135244-8d68-4702-b827-b375f2b89ced
10aee095-006e-460e-a5d9-0e92e91cb5af
e3fe1b99-2ffa-4f1e-b17e-3c984d2fec5c
024dad66-2a4f-4364-844b-513aa187feb9
936ed7d3-70b7-44ee-9e55-03e0bdd000b0
e8a93b3c-10dd-4947-b348-eb710a5aaf7c
f175522e-8fe4-45c4-bbc3-994071db7c2c
eca280f5-3ed7-4063-a1b8-6e76f1527e3d
44539472-df29-4237-b466-0f94e07d31a4
fe20628b-3625-4b74-9b62-428488788dea
d556d9e4-8c4b-4ef5-aa51-e09149ed6b51
53e4ca43-a48a-4f21-b0cd-9a9bdf022f6a
a8fafdd6-29cd-46f7-b117-febee637abb7
9b23dfc3-f743-4199-bfec-f8da83013cbf
de9df629-0f77-4c2b-ac32-ecf9ae95e85b
6893b871-f7a2-44e0-89d7-87220639096c
3189e09a-77d0-4673-bfee-da7484f9ce1d
dfd1113f-e1e6-4ca0-bb87-d4265a8d70d6
4558d660-56ff-42c3-8005-f7a441f53d83
82aa5387-be6f-4edc-a275-702e75b8e4c3
 */

/**
 6e12d56b-eb40-4fb5-9465-350342cc4855
59d18af9-ae1b-466d-9647-d7d3b3ec55e8
daacfb36-8fec-4fa6-994b-c1a55b5e9fee
28f556db-6626-4850-a6ed-fb51fcf7235f
7bbaaad5-b96a-45a2-88b3-c619fb3e6728
a5876527-866c-4aae-aa15-cbb4eafa443a
6c4ce41e-4ca9-4684-ad10-24d12859f84a
c90a4a80-1444-49fe-bff2-1bbefd72b8d1
116b98e8-c1b3-4f79-a418-7c5db9ee3ce5
c913d272-419d-464d-b25a-8e00781af2d8
 */