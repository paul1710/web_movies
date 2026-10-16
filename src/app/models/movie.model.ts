export interface Movie {
  id: number;
  title: string;
  year: number;
  genre: string;
  rating: number;
  duration: string;
  synopsis: string;
  director: string;
  cast: string[];
  poster: string;
}

export const MOCK_MOVIES: Movie[] = [
  {
    id: 1,
    title: 'Nébula Eterna',
    year: 2025,
    genre: 'Ciencia ficción',
    rating: 8.7,
    duration: '2h 18m',
    synopsis:
      'Una astronauta varada en los confines de la galaxia descubre una nebulosa que guarda los recuerdos de civilizaciones extintas — y una señal que parece dirigida solo a ella.',
    director: 'Lucía Ferrer',
    cast: ['Ana Solís', 'Marco Rey', 'Iben Okafor'],
    poster: '/posters/nebula.jpg',
  },
  {
    id: 2,
    title: 'Lluvia Roja',
    year: 2024,
    genre: 'Thriller',
    rating: 8.2,
    duration: '1h 57m',
    synopsis:
      'Un detective a punto de jubilarse sigue la pista de un asesino que solo actúa cuando llueve. Cada pista lo acerca más a un secreto de su propio pasado.',
    director: 'Damián Ríos',
    cast: ['Jorge Salas', 'Vera Lindt', 'Tomás Aguilar'],
    poster: '/posters/noir.jpg',
  },
  {
    id: 3,
    title: 'El Reino del Alba',
    year: 2025,
    genre: 'Fantasía',
    rating: 9.1,
    duration: '2h 41m',
    synopsis:
      'Una jinete exiliada cruza los campos dorados para reclamar el trono de un reino sitiado por una oscuridad que devora la luz del sol.',
    director: 'Sofía Andrade',
    cast: ['Elena Mar', 'Roderic Vane', 'Milo Ash'],
    poster: '/posters/fantasy.jpg',
  },
  {
    id: 4,
    title: 'La Casa de la Colina',
    year: 2023,
    genre: 'Terror',
    rating: 7.8,
    duration: '1h 44m',
    synopsis:
      'Una familia hereda una mansión victoriana donde cada noche se enciende una sola ventana. Nadie recuerda haberla encendido jamás.',
    director: 'Ruth Calloway',
    cast: ['Nadia Frost', 'Óscar Beltrán', 'Liv Marsh'],
    poster: '/posters/horror.jpg',
  },
  {
    id: 5,
    title: 'Bolt y yo',
    year: 2024,
    genre: 'Animación',
    rating: 8.9,
    duration: '1h 38m',
    synopsis:
      'Un niño inventor y su robot defectuoso emprenden un vuelo imposible sobre la ciudad flotante para salvar el amanecer del mundo.',
    director: 'Pau Cabrera',
    cast: ['Voces: Nico Luna', 'Voces: Ada Bright', 'Voces: Kenji Mori'],
    poster: '/posters/animation.jpg',
  },
  {
    id: 6,
    title: 'Impacto Final',
    year: 2025,
    genre: 'Acción',
    rating: 7.5,
    duration: '2h 05m',
    synopsis:
      'Un doble de riesgo retirado tiene 90 minutos para cruzar el desierto y detener un convoy antes de que desaparezca la única prueba que puede limpiar su nombre.',
    director: 'Rex Dalton',
    cast: ['Cole Turner', 'Mía Vargas', 'Bruno Hale'],
    poster: '/posters/action.jpg',
  },
  {
    id: 7,
    title: 'París a Medianoche',
    year: 2024,
    genre: 'Romance',
    rating: 8.0,
    duration: '1h 52m',
    synopsis:
      'Dos desconocidos que huyen de sus propias bodas coinciden en una azotea parisina y pactan una sola noche sin mentiras.',
    director: 'Claire Dubois',
    cast: ['Emma Laurent', 'Théo Marchand'],
    poster: '/posters/romance.jpg',
  },
  {
    id: 8,
    title: 'El Maleficio',
    year: 2023,
    genre: 'Terror',
    rating: 7.2,
    duration: '1h 49m',
    synopsis:
      'Una antropóloga documenta un ritual olvidado en un pueblo remoto y descubre que la cámara graba cosas que sus ojos no ven.',
    director: 'Ruth Calloway',
    cast: ['Iris Duarte', 'Sam Crowe'],
    poster: '/posters/horror.jpg',
  },
  {
    id: 9,
    title: 'Órbita Cero',
    year: 2024,
    genre: 'Ciencia ficción',
    rating: 8.4,
    duration: '2h 12m',
    synopsis:
      'La tripulación de la primera estación orbital privada queda incomunicada justo cuando detectan un objeto que no figura en ningún registro.',
    director: 'Lucía Ferrer',
    cast: ['Ana Solís', 'Dev Patel', 'Yara Kim'],
    poster: '/posters/nebula.jpg',
  },
  {
    id: 10,
    title: 'El Intercambio',
    year: 2025,
    genre: 'Crimen',
    rating: 8.8,
    duration: '2h 02m',
    synopsis:
      'Un mensajero anónimo entrega maletines sin hacer preguntas. Cuando uno de ellos llega abierto, descubre que transportaba algo mucho peor que dinero.',
    director: 'Damián Ríos',
    cast: ['Jorge Salas', 'Petra Novak', 'Elías Ford'],
    poster: '/posters/crime.jpg',
  },
  {
    id: 11,
    title: 'Furia en el Asfalto',
    year: 2023,
    genre: 'Acción',
    rating: 7.9,
    duration: '1h 58m',
    synopsis:
      'Una piloto de carreras clandestinas se infiltra en el cartel que destruyó a su familia, una carrera mortal a la vez.',
    director: 'Rex Dalton',
    cast: ['Mía Vargas', 'Dre Coleman'],
    poster: '/posters/action.jpg',
  },
  {
    id: 12,
    title: 'Cartas desde el Faro',
    year: 2022,
    genre: 'Romance',
    rating: 7.6,
    duration: '1h 47m',
    synopsis:
      'Un farero solitario responde por error una carta que nunca debió llegarle, iniciando una correspondencia que cambiará dos vidas.',
    director: 'Claire Dubois',
    cast: ['Théo Marchand', 'Ingrid Sørensen'],
    poster: '/posters/romance.jpg',
  },
];
