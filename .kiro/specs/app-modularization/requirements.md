# Requirements Document

## Introduction

Esta especificación define los requerimientos para modularizar y hacer escalable la aplicación de portfolio personal. Actualmente, toda la lógica de negocio, manejo de estado, y presentación está concentrada en los componentes de las views, lo cual dificulta el mantenimiento, testing, y escalabilidad del código. 

### Arquitectura Recomendada: Feature-Driven Architecture con Clean Architecture

Se implementará una **Feature-Driven Architecture** combinada con principios de **Clean Architecture**, organizando el código por características/funcionalidades en lugar de por tipo de archivo. Esta arquitectura es ideal para aplicaciones React escalables.

**Estructura propuesta (optimizada para claridad y mantenibilidad):**
```
src/
├── shared/                    # Código compartido entre features
│   ├── components/           # Solo componentes UI puros y reutilizables
│   │   └── ui/              # Modal, TiltedCard, CustomCursor, etc.
│   ├── hooks/               # Hooks reutilizables globales
│   │   ├── useGSAP.ts       # Hook para animaciones GSAP
│   │   ├── useScrollTrigger.ts # Hook para scroll triggers
│   │   └── useLocalStorage.ts  # Hook para localStorage
│   ├── services/            # Servicios compartidos (API, email, etc.)
│   │   ├── api.ts           # Configuración base de API
│   │   └── email.ts         # Servicios de email
│   ├── stores/              # Estado global (Zustand stores)
│   │   └── themeStore.ts    # Store de tema (ya existe)
│   ├── types/               # Tipos TypeScript compartidos
│   │   ├── api.ts           # Tipos de API
│   │   └── common.ts        # Tipos comunes
│   └── utils/               # Utilidades, constantes y configuraciones
│       ├── constants.ts     # Constantes de la app
│       ├── animations.ts    # Utilidades de animación GSAP
│       ├── validation.ts    # Esquemas de validación
│       └── config.ts        # Configuraciones (GSAP, tema, etc.)
├── features/                 # Features organizadas por dominio
│   ├── home/                # Feature de página principal
│   │   ├── components/      # Logo, HeroContent, SocialLinks
│   │   ├── hooks/           # useHeroAnimations
│   │   └── index.ts         # Barrel export
│   ├── about/               # Feature de página about
│   │   ├── components/      # Timeline, ExperienceCard
│   │   ├── hooks/           # useTimelineAnimations
│   │   ├── data/            # experiences.ts (datos de experiencia)
│   │   └── index.ts         # Barrel export
│   ├── contact/             # Feature de contacto
│   │   ├── components/      # ContactForm, SubmitButton
│   │   ├── hooks/           # useContactForm, useFormValidation
│   │   └── index.ts         # Barrel export
│   ├── projects/            # Feature de proyectos
│   │   ├── components/      # ProjectCard, ProjectModal, TechLogos
│   │   ├── hooks/           # useProjectModal
│   │   ├── data/            # projects.ts, techLogos.ts
│   │   └── index.ts         # Barrel export
│   ├── footer/              # Feature de footer
│   │   ├── components/      # FooterContent, SocialLinks
│   │   ├── hooks/           # useFooterAnimations
│   │   └── index.ts         # Barrel export
│   └── theme/               # Feature de tema
│       ├── components/      # ThemeToggle
│       ├── hooks/           # useTheme
│       └── index.ts         # Barrel export
└── views/                   # Views como orquestadores simples
    ├── Home/                # Solo orquesta features
    ├── About/               # Solo orquesta features
    ├── Contact/             # Solo orquesta features
    ├── Projects/            # Solo orquesta features
    ├── Footer/              # Solo orquesta features
    └── index.ts             # Barrel export
```

**Principios de esta estructura:**
- **Simplicidad sobre exhaustividad**: Menos carpetas, más claridad
- **Sin duplicación de servicios**: Solo `shared/services/` para infraestructura compartida (HTTP, email, integraciones externas). La lógica de dominio vive en hooks de cada feature
- **UI puro en shared**: Solo componentes reutilizables sin lógica de negocio
- **Configuración declarativa**: `shared/utils/config.ts` solo exporta opciones, no ejecuta código de librerías
- **Utilidades sin efectos**: `shared/utils/` contiene helpers puros sin estado ni efectos secundarios
- **Hooks compartidos genéricos**: Los hooks en `shared/hooks/` no conocen features ni UI concreta, solo proveen infraestructura reutilizable
- **Features enfocados**: Solo lo esencial por dominio, con hooks específicos que contienen la lógica core del feature

El objetivo es implementar una arquitectura modular que separe responsabilidades, mejore la reutilización de código, y facilite el crecimiento futuro de la aplicación mediante una migración incremental y segura.

## Requirements

### Requirement 1

**User Story:** Como desarrollador, quiero una arquitectura de capas bien definida, para que el código sea más mantenible y escalable.

#### Acceptance Criteria

1. WHEN se implemente la nueva arquitectura THEN el sistema SHALL tener capas claramente separadas: presentación, lógica de negocio, servicios, y datos
2. WHEN se organice el código THEN cada capa SHALL tener responsabilidades específicas y bien definidas
3. WHEN se implemente la separación de responsabilidades THEN los componentes de UI SHALL solo manejar presentación y eventos de usuario
4. IF se necesita lógica de negocio THEN esta SHALL estar en hooks personalizados o servicios dedicados

### Requirement 2

**User Story:** Como desarrollador, quiero hooks personalizados reutilizables, para que la lógica de negocio esté separada de los componentes de presentación.

#### Acceptance Criteria

1. WHEN se extraiga lógica de los componentes THEN se SHALL crear hooks personalizados para cada funcionalidad específica
2. WHEN se implemente un hook personalizado THEN este SHALL ser reutilizable en múltiples componentes
3. WHEN se maneje estado local complejo THEN se SHALL usar hooks personalizados en lugar de useState directo en componentes
4. WHEN se integre con APIs THEN se SHALL crear hooks específicos para cada endpoint o funcionalidad
5. WHEN se creen hooks compartidos THEN estos SHALL ser genéricos y no conocer features ni UI concreta
6. WHEN se creen hooks por feature THEN estos SHALL contener la lógica core específica del dominio

### Requirement 3

**User Story:** Como desarrollador, quiero servicios dedicados para manejo de APIs y datos, para que la comunicación con el backend esté centralizada y sea consistente.

#### Acceptance Criteria

1. WHEN se comunique con APIs THEN se SHALL usar servicios dedicados en lugar de fetch directo en componentes
2. WHEN se implemente un servicio THEN este SHALL manejar todas las operaciones relacionadas con una entidad específica
3. WHEN ocurra un error en una API THEN el servicio SHALL manejar el error de manera consistente
4. WHEN se necesite transformar datos THEN los servicios SHALL incluir funciones de transformación y validación
5. WHEN se creen servicios THEN estos SHALL representar infraestructura compartida (HTTP, email, integraciones externas)
6. WHEN se necesite lógica de dominio THEN esta SHALL vivir en hooks de cada feature, no en servicios compartidos

### Requirement 4

**User Story:** Como desarrollador, quiero un sistema de manejo de estado global mejorado, para que el estado de la aplicación sea predecible y fácil de debuggear.

#### Acceptance Criteria

1. WHEN se maneje estado global THEN se SHALL usar Zustand con stores específicos por dominio
2. WHEN se actualice el estado THEN las acciones SHALL estar claramente definidas y tipadas
3. WHEN se persista estado THEN se SHALL usar middleware de persistencia de manera consistente
4. IF se necesita estado derivado THEN se SHALL usar selectores optimizados

### Requirement 5

**User Story:** Como desarrollador, quiero componentes UI reutilizables y bien organizados, para que la interfaz sea consistente y fácil de mantener.

#### Acceptance Criteria

1. WHEN se cree un componente UI THEN este SHALL ser reutilizable y no contener lógica de negocio
2. WHEN se implemente un componente THEN SHALL tener props bien tipadas y documentadas
3. WHEN se necesite variaciones de un componente THEN se SHALL usar un sistema de variantes consistente
4. WHEN se organicen componentes THEN SHALL estar categorizados por tipo y funcionalidad

### Requirement 6

**User Story:** Como desarrollador, quiero utilidades y helpers centralizados, para que las funciones comunes estén disponibles en toda la aplicación.

#### Acceptance Criteria

1. WHEN se necesiten funciones de utilidad THEN estas SHALL estar en módulos dedicados y reutilizables
2. WHEN se implemente una utilidad THEN SHALL estar bien tipada y documentada
3. WHEN se manejen constantes THEN estas SHALL estar centralizadas en archivos de configuración
4. WHEN se validen datos THEN se SHALL usar esquemas de validación centralizados
5. WHEN se creen utilidades THEN estas SHALL ser helpers puros sin estado ni efectos secundarios
6. WHEN se configure una librería THEN la configuración SHALL ser declarativa (exportar opciones) no ejecutiva (ejecutar código)

### Requirement 7

**User Story:** Como desarrollador, quiero un sistema de tipos robusto, para que el código sea más seguro y autodocumentado.

#### Acceptance Criteria

1. WHEN se definan tipos THEN estos SHALL estar organizados por dominio y reutilizables
2. WHEN se cree una interfaz THEN SHALL ser específica y bien documentada
3. WHEN se usen tipos genéricos THEN SHALL mejorar la reutilización sin sacrificar type safety
4. WHEN se integre con APIs THEN los tipos SHALL reflejar exactamente la estructura de datos esperada

### Requirement 8

**User Story:** Como desarrollador, quiero mantener la funcionalidad existente durante la refactorización, para que no se pierda ninguna característica actual.

#### Acceptance Criteria

1. WHEN se refactorice un componente THEN SHALL mantener exactamente la misma funcionalidad
2. WHEN se mueva lógica a hooks THEN el comportamiento del usuario SHALL permanecer idéntico
3. WHEN se implementen servicios THEN las llamadas a API SHALL funcionar exactamente igual
4. WHEN se complete la refactorización THEN todas las animaciones y efectos visuales SHALL funcionar como antes

### Requirement 9

**User Story:** Como desarrollador, quiero una migración incremental por fases, para que no se pierdan datos ni ocurran errores durante la refactorización.

#### Acceptance Criteria

1. WHEN se inicie la migración THEN se SHALL seguir un enfoque incremental por fases bien definidas
2. WHEN se complete cada fase THEN la aplicación SHALL funcionar completamente sin errores
3. WHEN se migre un feature THEN se SHALL mantener compatibilidad con el código existente hasta completar toda la migración
4. IF ocurre un error en una fase THEN se SHALL poder revertir fácilmente al estado anterior
5. WHEN se implemente una nueva estructura THEN se SHALL coexistir temporalmente con la estructura antigua
6. WHEN se valide cada fase THEN se SHALL verificar que todas las funcionalidades existentes sigan operando correctamente

**Fases de migración propuestas (simplificadas y pragmáticas):**
- **Fase 1:** Configuración de estructura base
  - Crear carpetas `shared/`, `features/` con estructura simplificada
  - Mover componentes UI existentes a `shared/components/ui/`
  - Crear `shared/utils/config.ts` centralizando todas las configuraciones
  - Establecer `shared/services/` para servicios compartidos únicamente
- **Fase 2:** Migración del feature de tema (más simple)
  - Mover `themeStore.ts` a `shared/stores/`
  - Crear `features/theme/` con `ThemeToggle` y hook `useTheme`
  - Centralizar lógica de tema en un solo lugar
- **Fase 3:** Migración del feature de home (presentación + animaciones)
  - Extraer componentes principales: Logo, HeroContent, SocialLinks
  - Crear hook `useHeroAnimations` para lógica GSAP
  - Mantener `LightPillar` como componente shared/ui
- **Fase 4:** Migración del feature de footer (simple)
  - Extraer componentes de footer
  - Crear hook `useFooterAnimations` para GSAP
  - Centralizar datos de redes sociales en `shared/utils/constants.ts`
- **Fase 5:** Migración del feature de about (animaciones complejas)
  - Extraer Timeline y ExperienceCard
  - Crear hook `useTimelineAnimations` para lógica GSAP compleja
  - Mover datos de experiencias a `features/about/data/`
- **Fase 6:** Migración del feature de contact (API + validaciones)
  - Extraer ContactForm y SubmitButton
  - Usar `shared/services/` para API de contacto (no duplicar)
  - Crear hooks para formularios y validaciones
- **Fase 7:** Migración del feature de projects (estado + modales)
  - Extraer ProjectCard, ProjectModal, TechLogos
  - Crear hook `useProjectModal` para estado
  - Mover datos a `features/projects/data/`
- **Fase 8:** Refactorización de views como orquestadores
  - Convertir views en composiciones simples de features
  - Eliminar toda lógica de negocio de views
  - Mantener solo importación y composición
- **Fase 9:** Limpieza final
  - Eliminar archivos obsoletos y código duplicado
  - Optimizar barrel exports
  - Verificar funcionalidad completa