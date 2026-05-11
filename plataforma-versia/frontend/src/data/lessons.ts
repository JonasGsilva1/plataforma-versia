export const lessonsData: Record<number, any> = {
  1: {
    courseId: 1,
    courseTitle: "Liderança Estratégica 4.0",
    moduleTitle: "Módulo 1",
    lesson: { id: 1, title: "Introdução à Liderança 4.0", duration: "15min", videoUrl: "https://images.unsplash.com/photo-1770240366266-57290c83cd5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWFkZXJzaGlwJTIwZGV2ZWxvcG1lbnQlMjBtZW50b3IlMjBjb2FjaGluZ3xlbnwxfHx8fDE3NzQyMzQ0ODV8MA&ixlib=rb-4.1.0&q=80&w=1080" },
    progress: 65,
    lessons: [
      { id: 1, title: "Introdução à Liderança 4.0", duration: "15min", completed: true, current: true },
      { id: 2, title: "O Papel do Líder na Era Digital", duration: "20min", completed: true },
      { id: 3, title: "Estilos de Liderança Contemporâneos", duration: "25min", completed: true },
      { id: 4, title: "Autoconhecimento e Inteligência Emocional", duration: "30min", completed: false },
      { id: 5, title: "Comunicação Assertiva", duration: "20min", completed: false },
      { id: 6, title: "Técnicas de Persuasão", duration: "25min", completed: false },
    ],
    materials: [
      { name: "Slides da Aula.pdf", size: "2.5 MB" },
      { name: "Exercícios Práticos.pdf", size: "1.2 MB" },
      { name: "Material Complementar.pdf", size: "3.8 MB" },
    ]
  }
};
