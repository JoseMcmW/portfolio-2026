# Shared Utilities

This directory contains pure utility functions, constants, configurations, and validation schemas used throughout the application.

## Files Overview

### `constants.ts`
Application-wide constants including:
- **Social Links**: Centralized social media links for home and footer
- **CV Links**: Download links for CV in different languages
- **Footer Info**: Copyright, location, and background text
- **Navigation Sections**: App navigation structure
- **Animation Timings**: Standard animation durations
- **Validation Constants**: Form validation limits
- **File Limits**: File size and type restrictions

### `validation.ts`
Zod validation schemas and helper functions:
- **contactFormSchema**: Zod schema for contact form validation
- **isValidEmail**: Email validation helper
- **isValidName**: Name validation helper
- **isValidMessage**: Message validation helper
- **validateContactForm**: Complete form validation function

### `config.ts`
Declarative configurations (no execution):
- **gsapConfig**: GSAP animation configurations for different features
- **themeConfig**: Theme settings and color schemes
- **appConfig**: Application-wide settings (animations, breakpoints, z-index)
- **apiConfig**: API configuration (base URL, timeout, retry)

### `helpers.ts`
Pure utility functions without state or side effects:

#### String Utilities
- `formatString`: Trim and normalize whitespace
- `truncateString`: Truncate with ellipsis
- `capitalize`: Capitalize first letter
- `toKebabCase`: Convert to kebab-case
- `toCamelCase`: Convert to camelCase

#### Function Utilities
- `debounce`: Limit function call frequency
- `throttle`: Ensure function called at most once per interval

#### Math Utilities
- `clamp`: Clamp value between min and max
- `lerp`: Linear interpolation
- `mapRange`: Map value from one range to another

#### Browser Utilities
- `prefersReducedMotion`: Check user motion preferences
- `isTouchDevice`: Detect touch device
- `getCurrentBreakpoint`: Get current responsive breakpoint
- `isBrowser`: Check if running in browser

#### Storage Utilities
- `getFromStorage`: Safely get from localStorage
- `setToStorage`: Safely set to localStorage
- `removeFromStorage`: Safely remove from localStorage

#### Data Utilities
- `safeJsonParse`: Parse JSON with fallback
- `isDefined`: Check if value is not null/undefined
- `removeUndefined`: Remove null/undefined from object
- `deepClone`: Deep clone an object
- `generateId`: Generate random ID string

#### Async Utilities
- `delay`: Promise-based delay

#### Date Utilities
- `formatDate`: Format date to readable string

### `animations.ts`
GSAP animation utility functions:

#### Animation Configs
- `fadeInConfig`: Fade-in animation
- `fadeOutConfig`: Fade-out animation
- `slideUpConfig`: Slide up animation
- `slideDownConfig`: Slide down animation
- `slideLeftConfig`: Slide left animation
- `slideRightConfig`: Slide right animation
- `scaleConfig`: Scale animation
- `staggerConfig`: Stagger animation
- `revealConfig`: Reveal animation for text/elements
- `rotateConfig`: Rotation animation

#### Scroll Utilities
- `scrollTriggerConfig`: ScrollTrigger configuration
- `parallaxConfig`: Parallax scroll configuration

#### Animation Helpers
- `getAnimationDuration`: Get duration respecting user preferences
- `shouldDisableAnimations`: Check if animations should be disabled
- `getSafeAnimationConfig`: Get config respecting user preferences

#### Constants
- `easings`: Collection of GSAP easing functions
- `durations`: Standard animation durations

### `index.ts`
Barrel export for easy imports from all utility modules.

## Usage Examples

### Using Constants
```typescript
import { socialLinks, validation } from '@/shared/utils';

// Use social links
socialLinks.forEach(link => console.log(link.name));

// Use validation constants
const isValid = name.length >= validation.minNameLength;
```

### Using Validation
```typescript
import { contactFormSchema, validateContactForm } from '@/shared/utils';

// Validate with Zod schema
const result = contactFormSchema.safeParse(formData);

// Or use helper function
const validation = validateContactForm(formData);
if (!validation.isValid) {
  console.error(validation.errors);
}
```

### Using Helpers
```typescript
import { debounce, clamp, formatString } from '@/shared/utils';

// Debounce a function
const debouncedSearch = debounce(searchFunction, 300);

// Clamp a value
const value = clamp(userInput, 0, 100);

// Format a string
const clean = formatString('  hello   world  '); // "hello world"
```

### Using Animation Utilities
```typescript
import { fadeInConfig, slideUpConfig, easings } from '@/shared/utils';

// Use predefined configs
gsap.from('.element', fadeInConfig(0.8, 0.2));

// Use with custom easing
gsap.to('.element', {
  ...slideUpConfig(1.0),
  ease: easings.backOut
});
```

### Using Configurations
```typescript
import { gsapConfig, themeConfig, appConfig } from '@/shared/utils';

// Use GSAP config
gsap.to('.hero', gsapConfig.hero);

// Use theme config
const defaultTheme = themeConfig.defaultTheme;

// Use app config
const modalZIndex = appConfig.zIndex.modal;
```

## Principles

1. **Pure Functions**: All helpers are pure functions without side effects
2. **No State**: Utilities don't maintain internal state
3. **Type Safety**: All functions are fully typed with TypeScript
4. **Declarative Configs**: Configurations export options, not executable code
5. **Accessibility**: Respects user preferences (reduced motion, etc.)
6. **Reusability**: Functions are generic and reusable across features

## Adding New Utilities

When adding new utilities:

1. Keep functions pure (no side effects)
2. Add proper TypeScript types
3. Document with JSDoc comments
4. Export from the appropriate file
5. Update this README with usage examples
6. Ensure utilities are generic (not feature-specific)
