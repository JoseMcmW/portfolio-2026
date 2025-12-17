# Implementation Plan

- [x] 1. Configuración de estructura base y servicios compartidos
  - Crear estructura de carpetas `shared/`, `features/` con organización simplificada
  - Mover componentes UI existentes desde `src/components/ui/` a `shared/components/ui/`
  - Crear `shared/utils/config.ts` centralizando configuraciones declarativas (GSAP, tema)
  - Establecer `shared/services/` para infraestructura compartida (API, email)
  - Crear tipos base en `shared/types/` para interfaces comunes
  - _Requirements: 1.1, 1.2, 6.3, 6.6_

- [x] 2. Migración del feature de tema
  - Mover `src/store/themeStore.ts` a `shared/stores/themeStore.ts`
  - Crear `features/theme/components/ThemeToggle.tsx` moviendo desde shared/ui
  - Implementar `features/theme/hooks/useTheme.ts` para lógica de tema
  - Crear barrel export en `features/theme/index.ts`
  - Actualizar imports en componentes que usan el tema
  - _Requirements: 4.1, 4.2, 2.1, 2.6_

- [x] 3. Migración del feature de home
  - Extraer componente `features/home/components/Logo.tsx` desde Home.tsx
  - Crear `features/home/components/HeroContent.tsx` con contenido principal
  - Implementar `features/home/components/SocialLinks.tsx` con enlaces sociales
  - Crear `features/home/hooks/useHeroAnimations.ts` para lógica GSAP específica
  - Mover `LightPillar` a `shared/components/ui/` si no está ya
  - Crear barrel export en `features/home/index.ts`
  - _Requirements: 2.1, 2.6, 5.1, 5.2_

- [x] 4. Migración del feature de footer
  - Extraer `features/footer/components/FooterContent.tsx` desde Footer.tsx

  - Crear `features/footer/components/SocialLinks.tsx` reutilizando lógica de home
  - Implementar `features/footer/hooks/useFooterAnimations.ts` para animaciones GSAP
  - Centralizar datos de redes sociales en `shared/utils/constants.ts`
  - Crear barrel export en `features/footer/index.ts`
  - _Requirements: 2.1, 2.6, 6.1, 6.3_

- [x] 5. Migración del feature de about
  - Extraer `features/about/components/Timeline.tsx` con lógica de timeline
  - Crear `features/about/components/ExperienceCard.tsx` para tarjetas individuales
  - Implementar `features/about/hooks/useTimelineAnimations.ts` para animaciones complejas GSAP
  - Mover datos de experiencias a `features/about/data/experiences.ts`
  - Crear tipos en `features/about/types.ts` para interface Experience
  - Crear barrel export en `features/about/index.ts`
  - _Requirements: 2.1, 2.6, 7.1, 7.2_

- [x] 6. Migración del feature de contact
  - Extraer `features/contact/components/ContactForm.tsx` desde Contact.tsx
  - Crear `features/contact/components/SubmitButton.tsx` con lógica de estado
  - Implementar `features/contact/hooks/useContactForm.ts` para manejo de formulario
  - Crear `features/contact/hooks/useFormValidation.ts` para validaciones Zod
  - Mover servicio de contacto a `shared/services/email.ts` (infraestructura)
  - Crear tipos en `shared/types/api.ts` para ContactFormData y FormState
  - Crear barrel export en `features/contact/index.ts`
  - _Requirements: 2.1, 2.4, 3.1, 3.5, 3.6_

- [x] 7. Migración del feature de projects
  - Extraer `features/projects/components/ProjectCard.tsx` usando TiltedCard

  - Crear `features/projects/components/ProjectModal.tsx` con Modal compartido
  - Implementar `features/projects/components/TechLogos.tsx` con LogoLoop
  - Crear `features/projects/hooks/useProjectModal.ts` para estado del modal
  - Mover datos a `features/projects/data/projects.ts` y `techLogos.ts`
  - Crear tipos en `features/projects/types.ts` para Project y TechLogo interfaces
  - Crear barrel export en `features/projects/index.ts`
  - _Requirements: 2.1, 2.3, 4.1, 7.1, 7.2_

- [x] 8. Refactorización de views como orquestadores
  - Refactorizar `src/views/Home/Home.tsx` para usar solo features de home y theme
  - Refactorizar `src/views/About/About.tsx` para usar solo features de about
  - Refactorizar `src/views/Contact/Contact.tsx` para usar solo features de contact
  - Refactorizar `src/views/Projects/Projects.tsx` para usar solo features de projects
  - Refactorizar `src/views/Footer/Footer.tsx` para usar solo features de footer
  - Eliminar toda lógica de negocio de las views, mantener solo composición
  - _Requirements: 1.3, 8.1, 8.2_

- [x] 9. Implementación de hooks compartidos de infraestructura
  - Crear `shared/hooks/useGSAP.ts` para configuración base de GSAP (genérico)

  - Implementar `shared/hooks/useScrollTrigger.ts` para scroll triggers reutilizables
  - Crear `shared/hooks/useLocalStorage.ts` para manejo de localStorage
  - Asegurar que hooks compartidos no conozcan features específicos ni UI concreta
  - _Requirements: 2.5, 6.1, 6.2_

- [x] 10. Configuración de servicios de infraestructura compartida

  - Crear `shared/services/api.ts` con clase base ApiService para HTTP
  - Implementar `shared/services/email.ts` moviendo lógica desde api/contact.ts
  - Configurar manejo centralizado de errores en servicios
  - Asegurar que servicios solo manejen infraestructura, no lógica de dominio
  - _Requirements: 3.1, 3.2, 3.3, 3.5_

- [x] 11. Implementación de utilidades y configuraciones centralizadas

  - Crear `shared/utils/constants.ts` con constantes de la aplicación
  - Implementar `shared/utils/validation.ts` con esquemas Zod centralizados
  - Crear `shared/utils/config.ts` con configuraciones declarativas (no ejecutivas)
  - Implementar helpers puros sin estado ni efectos secundarios
  - _Requirements: 6.1, 6.2, 6.5, 6.6_

- [x] 12. Optimización de imports y barrel exports
  - Crear barrel exports optimizados en cada feature (`features/*/index.ts`)
  - Implementar barrel export principal en `shared/index.ts`
  - Optimizar imports en views para usar barrel exports
  - Configurar tree-shaking para eliminar código no utilizado
  - _Requirements: 5.4, 8.3_

- [x] 13. Limpieza y verificación final
  - Eliminar archivos obsoletos y código duplicado
  - Verificar que todas las animaciones GSAP funcionen correctamente
  - Confirmar que el formulario de contacto y API funcionen igual que antes
  - Validar que el modal de proyectos y estado funcionen correctamente
  - Probar cambio de tema y persistencia en localStorage
  - Verificar que todas las funcionalidades visuales se mantengan intactas
  - _Requirements: 8.1, 8.2, 8.3, 8.4_
