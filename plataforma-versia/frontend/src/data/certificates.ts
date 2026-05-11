export const certificatesData = {
  certificates: [
    {
      id: 1,
      course: "Compliance e Ética Empresarial",
      date: "15 de Março, 2026",
      instructor: "Juliana Oliveira",
      hours: "4h",
    },
    {
      id: 2,
      course: "Gestão de Projetos Ágeis",
      date: "28 de Fevereiro, 2026",
      instructor: "Beatriz Alves",
      hours: "9h",
    },
    {
      id: 3,
      course: "Data Analytics Fundamentals",
      date: "10 de Janeiro, 2026",
      instructor: "Carlos Mendes",
      hours: "8h",
    },
  ],
  badges: [
    { name: "Primeira Conquista", description: "Complete seu primeiro curso", iconName: "Trophy", color: "from-yellow-400 to-orange-500", earned: true },
    { name: "Estudante Dedicado", description: "5 cursos concluídos", iconName: "Target", color: "from-[#63E3FF] to-[#2FA7FF]", earned: true },
    { name: "Maratonista", description: "10 horas em uma semana", iconName: "Zap", color: "from-[#7A2CFF] to-[#E548FF]", earned: true },
    { name: "Líder em Formação", description: "Complete trilha de Liderança", iconName: "Award", color: "from-purple-400 to-pink-500", earned: false },
  ],
  stats: [
    { label: "Total de Certificados", value: "12", iconName: "Award", change: "+3 este mês" },
    { label: "Horas de Estudo", value: "156h", iconName: "Target", change: "+24h este mês" },
    { label: "Cursos Concluídos", value: "12", iconName: "Trophy", change: "83% concluídos" },
    { label: "Sequência Atual", value: "15 dias", iconName: "Zap", change: "Novo recorde!" },
  ],
  timeline: [
    { date: "15 Mar", event: "Certificado obtido", course: "Compliance e Ética", type: "certificate" },
    { date: "10 Mar", event: "Curso iniciado", course: "Liderança Estratégica 4.0", type: "started" },
    { date: "28 Fev", event: "Certificado obtido", course: "Gestão de Projetos Ágeis", type: "certificate" },
    { date: "20 Fev", event: "Badge conquistada", course: "Estudante Dedicado", type: "badge" },
    { date: "10 Jan", event: "Certificado obtido", course: "Data Analytics", type: "certificate" },
  ]
};
