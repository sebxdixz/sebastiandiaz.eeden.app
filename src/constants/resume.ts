export interface EducationEntry {
  institution: string;
  period: string;
  degree: string;
  title: string;
  highlights: string[];
}

export interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  location?: string;
  highlights: string[];
}

export interface CertificationEntry {
  provider: string;
  name: string;
  period: string;
}

export const PROFILE_META = {
  location: 'Las Hualtatas, Vitacura, Santiago, Chile',
  phone: '(+56 9) 3590 0264',
  email: 'sdiazdelafuente9@gmail.com',
  academicEmail: 'sebastiandiaz@alumnos.uai.cl',
};

export const CORE_SKILLS = [
  'LangGraph Multi-Agent Systems',
  'LLM Orchestration',
  'Structured Output con Pydantic',
  'RAGAS Evaluation Pipelines',
  'Python + APIs RESTful',
  'ETL/ELT para Retail',
  'Docker + Kubernetes',
];

export const EDUCATION: EducationEntry[] = [
  {
    institution: 'Universidad Adolfo Ibanez',
    period: '2020 - 2024',
    degree: 'Licenciatura en Ciencias de la Ingenieria',
    title: 'Ingenieria Civil Informatica',
    highlights: [
      'Profesor y Ayudante en Cubo Educativo, impartiendo clases de programacion y comunicando conceptos tecnicos complejos.',
      'Secretario Ejecutivo de la Federacion Universitaria (UAI), gestionando iniciativas estudiantiles de retencion y bienestar.',
    ],
  },
];

export const EXPERIENCE: ExperienceEntry[] = [
  {
    company: 'Grupo Axo',
    role: 'Data Scientist & Automation Analyst',
    period: 'Enero 2025 - Presente',
    highlights: [
      'Lidero arquitectura de pipelines de datos autonomos para retail internacional, reemplazando analisis manual por flujos de decision automatizados.',
      'Desarrollo APIs RESTful asincronas en Python para exponer modelos predictivos en sistemas legacy.',
      'Diseno orquestaciones ETL/ELT para ingesta masiva y analisis en tiempo real.',
    ],
  },
  {
    company: 'Project Orthogonal',
    role: 'AI Agent Engineer',
    period: 'Diciembre 2025 - Presente',
    highlights: [
      'Disene y orqueste un sistema multi-agente persistente con LangGraph y PostgreSQL para auditorias forenses de facturacion (3-way match).',
      'Implemente Structured Output con Pydantic en modelos LLM, reduciendo la tasa de alucinacion en OCR a menos de 1% en produccion.',
      'Desarrolle Headhunter CLI, un agente autonomo de ventas para prospeccion dinamica y redaccion contextual.',
      'Desplegue infraestructura de inferencia contenerizada con Docker, preparada para orquestacion en Kubernetes.',
    ],
  },
  {
    company: 'Walmart',
    role: 'Data Analytics Intern',
    period: 'Junio 2024 - Diciembre 2024',
    location: 'Santiago, Chile',
    highlights: [
      'Automatice inteligencia de negocios con SQL avanzado, optimizando tiempos de reporte gerencial en un 40%.',
      'Desarrolle scripts de automatizacion agentica con LangChain para optimizar flujos criticos de Recursos Humanos.',
    ],
  },
];

export const CERTIFICATIONS: CertificationEntry[] = [
  {
    provider: 'LangChain Academy',
    name: 'Introduction to Agent Observability & Evaluations',
    period: '2025 - 2026',
  },
  {
    provider: 'LangChain Academy',
    name: 'Certified in Agentic Architectures with LangGraph',
    period: '2025 - 2026',
  },
  {
    provider: 'DeepLearning.AI',
    name: 'Advanced RAG Systems & Evaluation Driven Development',
    period: '2025 - 2026',
  },
  {
    provider: 'Cloud Native Computing',
    name: 'Deploying Scalable AI Services with Kubernetes',
    period: '2025 - 2026',
  },
];
