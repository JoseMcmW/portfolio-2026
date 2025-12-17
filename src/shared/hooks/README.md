# Shared Infrastructure Hooks

This directory contains generic, reusable hooks that provide infrastructure-level functionality. These hooks are designed to be feature-agnostic and do not contain any business logic or knowledge of specific UI components.

## Available Hooks

### `useGSAP`

A generic hook for managing GSAP animations with automatic cleanup.

**Features:**
- Automatic cleanup of animations on unmount
- Context-based animation management
- Support for all GSAP animation methods (to, from, fromTo, set, timeline)

**Example Usage:**
```typescript
import { useGSAP } from '@/shared/hooks'

const MyComponent = () => {
  const { to, from, timeline } = useGSAP()

  useEffect(() => {
    // Animate element
    to('.my-element', {
      opacity: 1,
      duration: 1,
      ease: 'power2.out'
    })

    // Create timeline
    const tl = timeline()
    tl?.to('.element1', { x: 100 })
      .to('.element2', { y: 50 })
  }, [to, from, timeline])

  return <div className="my-element">Content</div>
}
```

### `useScrollTrigger`

A generic hook for managing GSAP ScrollTrigger instances with automatic cleanup.

**Features:**
- Automatic cleanup of ScrollTriggers on unmount
- Support for creating ScrollTriggers with or without animations
- Utility methods for refreshing and managing ScrollTriggers

**Example Usage:**
```typescript
import { useScrollTrigger } from '@/shared/hooks'
import { useRef } from 'react'

const MyComponent = () => {
  const elementRef = useRef<HTMLDivElement>(null)
  const { create, createWithAnimation } = useScrollTrigger(elementRef)

  useEffect(() => {
    // Create ScrollTrigger with animation
    createWithAnimation(
      '.my-element',
      { opacity: 1, y: 0 },
      {
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: true
      }
    )

    // Or create ScrollTrigger without animation
    create({
      start: 'top center',
      onEnter: () => console.log('Entered viewport'),
      onLeave: () => console.log('Left viewport')
    })
  }, [create, createWithAnimation])

  return <div ref={elementRef}>Content</div>
}
```

### `useLocalStorage`

A generic hook for managing localStorage with React state synchronization.

**Features:**
- Automatic synchronization with localStorage
- Cross-tab/window synchronization
- Type-safe with TypeScript generics
- Custom serialization/deserialization support
- SSR-safe (works with server-side rendering)

**Example Usage:**
```typescript
import { useLocalStorage } from '@/shared/hooks'

const MyComponent = () => {
  const [user, setUser, removeUser] = useLocalStorage('user', {
    name: '',
    email: ''
  })

  const handleSave = () => {
    setUser({ name: 'John', email: 'john@example.com' })
  }

  const handleClear = () => {
    removeUser()
  }

  return (
    <div>
      <p>Name: {user.name}</p>
      <button onClick={handleSave}>Save</button>
      <button onClick={handleClear}>Clear</button>
    </div>
  )
}
```

**Advanced Usage with Custom Serialization:**
```typescript
const [data, setData] = useLocalStorage(
  'my-data',
  { count: 0 },
  {
    serializer: (value) => btoa(JSON.stringify(value)), // Base64 encode
    deserializer: (value) => JSON.parse(atob(value)),   // Base64 decode
    syncData: true // Enable cross-tab sync (default: true)
  }
)
```

## Design Principles

1. **Generic and Reusable**: These hooks are designed to work in any context without knowledge of specific features or UI components.

2. **Infrastructure Level**: They provide low-level functionality that can be composed into higher-level feature-specific hooks.

3. **Automatic Cleanup**: All hooks handle cleanup automatically to prevent memory leaks.

4. **Type-Safe**: Full TypeScript support with proper type inference.

5. **Error Handling**: Graceful error handling with console warnings for debugging.

## Usage Guidelines

- Use these hooks directly in feature-specific hooks or components
- Do not add feature-specific logic to these hooks
- Keep them generic and focused on infrastructure concerns
- If you need feature-specific behavior, create a custom hook in the feature directory that uses these hooks

## Examples in the Codebase

- `features/home/hooks/useHeroAnimations.ts` - Uses `useGSAP` for hero animations
- `features/about/hooks/useTimelineAnimations.ts` - Uses `useGSAP` and `useScrollTrigger` for timeline
- `features/footer/hooks/useFooterAnimations.ts` - Uses `useGSAP` and `useScrollTrigger` for footer
