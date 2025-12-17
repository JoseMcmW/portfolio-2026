# Design Document

## Overview

Este documento describe el diseño técnico detallado para la modularización de la aplicación de portfolio personal. La arquitectura propuesta implementa Feature-Driven Architecture con principios de Clean Architecture, optimizada para claridad y mantenibilidad en lugar de exhaustividad.

La migración será incremental y segura, manteniendo toda la funcionalidad existente mientras se refactoriza gradualmente hacia una estructura más escalable y mantenible.

## Architecture

### Architectural Patterns

**Feature-Driven Architecture (FDA)**
- Organización por características de negocio en lugar de por tipo técnico
- Cada feature encapsula su propia lógica, componentes y datos
- Facilita el desarrollo paralelo y la escalabilidad

**Clean Architecture Principles**
- Separación clara de responsabilidades por capas
- Dependencias dirigidas hacia adentro (hacia la lógica de negocio)
- Infraestructura y UI como detalles externos

**Layered Architecture**
```
┌─────────────────────────────────────┐
│              Views Layer            │  ← Orquestadores simples
├─────────────────────────────────────┤
│            Features Layer           │  ← Lógica de dominio
├─────────────────────────────────────┤
│             Shared Layer            │  ← Infraestructura compartida
└─────────────────────────────────────┘
```

### Directory Structure Design

```
src/
├── shared/                    # Infraestructura compartida
│   ├── components/ui/         # Componentes UI puros y reutilizables
│   ├── hooks/                # Hooks de infraestructura genérica
│   ├── services/             # Servicios de infraestructura (API, email)
│   ├── stores/               # Estado global (Zustand)
│   ├── types/                # Tipos compartidos
│   └── utils/                # Utilidades puras y configuraciones
├── features/                 # Características de negocio
│   ├── home/                 # Feature de página principal
│   ├── about/                # Feature de experiencia profesional
│   ├── contact/              # Feature de formulario de contacto
│   ├── projects/             # Feature de portafolio de proyectos
│   ├── footer/               # Feature de pie de página
│   └── theme/                # Feature de manejo de tema
└── views/                    # Orquestadores de features
```

## Components and Interfaces

### Shared Layer Components

#### UI Components (`shared/components/ui/`)
```typescript
// Componentes existentes que se mantendrán
export interface UIComponents {
  CustomCursor: React.ComponentType
  Modal: React.ComponentType<ModalProps>
  TiltedCard: React.ComponentType<TiltedCardProps>
  ScrollVelocity: React.ComponentType<ScrollVelocityProps>
  LogoLoop: React.ComponentType<LogoLoopProps>
  LightPillar: React.ComponentType<LightPillarProps>
  SplashScreen: React.ComponentType<SplashScreenProps>
}
```

#### Shared Hooks (`shared/hooks/`)
```typescript
// Hook genérico para GSAP (infraestructura)
export const useGSAP = (config: GSAPConfig) => {
  // Configuración base de GSAP sin conocer UI específica
}

// Hook genérico para ScrollTrigger
export const useScrollTrigger = (options: ScrollTriggerOptions) => {
  // Lógica reutilizable de scroll triggers
}

// Hook para localStorage
export const useLocalStorage = <T>(key: string, defaultValue: T) => {
  // Manejo genérico de localStorage
}
```

#### Services (`shared/services/`)
```typescript
// Servicio de API base
export class ApiService {
  private baseURL: string
  
  async request<T>(endpoint: string, options?: RequestOptions): Promise<T>
  handleError(error: unknown): never
}

// Servicio de email (infraestructura)
export class EmailService {
  async sendContactEmail(data: ContactData): Promise<void>
  async sendConfirmationEmail(email: string, name: string): Promise<void>
}
```

### Feature Layer Components

#### Home Feature (`features/home/`)
```typescript
// Componentes específicos del home
export const Logo: React.FC<LogoProps> = ({ theme }) => {
  // Renderizado del logo con tema
}

export const HeroContent: React.FC = () => {
  // Contenido principal del hero
}

export const SocialLinks: React.FC = () => {
  // Enlaces sociales verticales
}

// Hook específico para animaciones del home
export const useHeroAnimations = () => {
  const { animateIn, animateOut } = useGSAP(heroAnimationConfig)
  
  return {
    animateHeroEntry: () => animateIn('.hero-content'),
    animateSocialLinks: () => animateIn('.social-links')
  }
}
```

#### About Feature (`features/about/`)
```typescript
// Tipos específicos del about
export interface Experience {
  title: string
  company: string
  location: string
  period: string
  achievements: string[]
}

// Componentes del about
export const Timeline: React.FC<TimelineProps> = ({ experiences }) => {
  const { animateTimeline } = useTimelineAnimations()
  // Renderizado del timeline
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience }) => {
  // Tarjeta individual de experiencia
}

// Hook complejo para animaciones del timeline
export const useTimelineAnimations = () => {
  const gsap = useGSAP(timelineConfig)
  
  return {
    animateTimeline: (timelineRef: RefObject<HTMLElement>) => {
      // Lógica compleja de animación del timeline
    },
    animateExperienceCards: (cardRefs: RefObject<HTMLElement>[]) => {
      // Animación de las tarjetas de experiencia
    }
  }
}

// Datos de experiencias
export const experiences: Experience[] = [
  // Array de experiencias profesionales
]
```

#### Contact Feature (`features/contact/`)
```typescript
// Tipos del formulario de contacto
export interface ContactFormData {
  name: string
  email: string
  message: string
}

export interface FormState {
  errors?: Partial<Record<keyof ContactFormData, string>>
  success?: boolean
  message?: string
  data?: ContactFormData
}

// Componentes del contact
export const ContactForm: React.FC = () => {
  const { formState, handleSubmit, isSubmitting } = useContactForm()
  // Renderizado del formulario
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ isSubmitting }) => {
  // Botón de envío con estados
}

// Hooks del contact
export const useContactForm = () => {
  const [state, formAction] = useActionState(submitContactForm, initialState)
  
  return {
    formState: state,
    handleSubmit: formAction,
    isSubmitting: state.isSubmitting
  }
}

export const useFormValidation = () => {
  // Lógica de validación con Zod
}
```

#### Projects Feature (`features/projects/`)
```typescript
// Tipos de proyectos
export interface Project {
  title: string
  description: string
  imageSrc: string
  altText: string
  stack: string[]
}

export interface TechLogo {
  node: React.ReactNode
  title: string
  href: string
}

// Componentes de projects
export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  // Tarjeta de proyecto con TiltedCard
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  // Modal con detalles del proyecto
}

export const TechLogos: React.FC = () => {
  // Carrusel de logos de tecnologías
}

// Hook para manejo del modal
export const useProjectModal = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  
  return {
    selectedProject,
    openModal: setSelectedProject,
    closeModal: () => setSelectedProject(null),
    isOpen: !!selectedProject
  }
}

// Datos de proyectos y tecnologías
export const projects: Project[] = [
  // Array de proyectos
]

export const techLogos: TechLogo[] = [
  // Array de logos de tecnologías
]
```

### Views Layer (Orquestadores)

```typescript
// Home View - Solo composición
export const Home: React.FC = () => {
  return (
    <section id="home" className="flex flex-col min-h-screen">
      <div className="flex justify-between">
        <Logo />
        <ThemeToggle />
      </div>
      <div className="flex-1 flex flex-row items-center">
        <SocialLinks />
        <HeroContent />
      </div>
      <LightPillar />
    </section>
  )
}

// About View - Solo composición
export const About: React.FC = () => {
  return (
    <section id="about" className="min-h-screen">
      <AboutHeader />
      <Timeline experiences={experiences} />
    </section>
  )
}

// Contact View - Solo composición
export const Contact: React.FC = () => {
  return (
    <div id="contact" className="min-h-90vh">
      <ContactHeader />
      <ContactForm />
    </div>
  )
}
```

## Data Models

### Theme Management
```typescript
// Store de tema (ya existente, se mantiene)
interface ThemeStore {
  theme: 'light' | 'dark'
  toggleTheme: () => void
  setTheme: (theme: 'light' | 'dark') => void
}
```

### Contact Data Flow
```typescript
// Flujo de datos del contacto
ContactForm → useContactForm → EmailService → API → Database
     ↓              ↓              ↓         ↓        ↓
  Validation → FormState → Response → Success → Confirmation
```

### Animation Configuration
```typescript
// Configuraciones de animación (declarativas)
export const animationConfigs = {
  hero: {
    duration: 1.2,
    ease: 'power2.out',
    stagger: 0.1
  },
  timeline: {
    scrollTrigger: {
      start: 'top 50%',
      end: 'bottom bottom',
      scrub: 1
    }
  },
  footer: {
    yPercent: 100,
    opacity: 0,
    duration: 1.5,
    ease: 'back.out(1.7)'
  }
} as const
```

## Error Handling

### API Error Handling
```typescript
// Manejo centralizado de errores de API
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

// En servicios
export const handleApiError = (error: unknown): never => {
  if (error instanceof Response) {
    throw new ApiError(
      'API request failed',
      error.status,
      error.statusText
    )
  }
  
  if (error instanceof Error) {
    throw new ApiError(error.message, 500)
  }
  
  throw new ApiError('Unknown error occurred', 500)
}
```

### Form Error Handling
```typescript
// Manejo de errores de formulario
export const useFormErrorHandling = () => {
  const displayError = (field: keyof ContactFormData, message: string) => {
    // Mostrar error específico del campo
  }
  
  const clearErrors = () => {
    // Limpiar todos los errores
  }
  
  return { displayError, clearErrors }
}
```

### Animation Error Handling
```typescript
// Manejo de errores de animación
export const useGSAPErrorHandling = () => {
  const safeAnimate = (target: string, props: GSAPTweenVars) => {
    try {
      return gsap.to(target, props)
    } catch (error) {
      console.warn('Animation failed:', error)
      return null
    }
  }
  
  return { safeAnimate }
}
```

## Testing Strategy

### Unit Testing Approach
```typescript
// Testing de hooks personalizados
describe('useContactForm', () => {
  it('should validate form data correctly', () => {
    // Test de validación
  })
  
  it('should handle submission errors', () => {
    // Test de manejo de errores
  })
})

// Testing de servicios
describe('EmailService', () => {
  it('should send contact email successfully', async () => {
    // Test de envío de email
  })
  
  it('should handle API errors gracefully', async () => {
    // Test de manejo de errores
  })
})
```

### Integration Testing
```typescript
// Testing de integración entre features
describe('Contact Feature Integration', () => {
  it('should complete full contact flow', async () => {
    // Test del flujo completo de contacto
  })
})
```

### Animation Testing
```typescript
// Testing de animaciones
describe('Timeline Animations', () => {
  it('should animate timeline elements correctly', () => {
    // Test de animaciones GSAP
  })
  
  it('should handle missing elements gracefully', () => {
    // Test de robustez
  })
})
```

### Migration Testing Strategy
```typescript
// Testing durante la migración
describe('Migration Phase Testing', () => {
  it('should maintain existing functionality after each phase', () => {
    // Verificar que la funcionalidad se mantiene
  })
  
  it('should allow rollback if needed', () => {
    // Verificar capacidad de rollback
  })
})
```

## Performance Considerations

### Code Splitting
```typescript
// Lazy loading de features
const Home = lazy(() => import('../features/home'))
const About = lazy(() => import('../features/about'))
const Contact = lazy(() => import('../features/contact'))
const Projects = lazy(() => import('../features/projects'))
```

### Bundle Optimization
- Barrel exports optimizados para tree-shaking
- Lazy loading de componentes pesados
- Memoización de componentes que no cambian frecuentemente

### Animation Performance
- Uso de `will-change` para animaciones GSAP
- Cleanup automático de ScrollTriggers
- Throttling de eventos de scroll

### State Management Optimization
- Selectores optimizados en Zustand stores
- Evitar re-renders innecesarios con React.memo
- Lazy initialization de estado pesado