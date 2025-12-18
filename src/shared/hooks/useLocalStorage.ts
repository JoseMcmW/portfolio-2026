import { useState, useEffect, useCallback } from 'react'

/**
 * Options for useLocalStorage hook
 */
export interface UseLocalStorageOptions<T> {
  /**
   * Custom serializer function (default: JSON.stringify)
   */
  serializer?: (value: T) => string

  /**
   * Custom deserializer function (default: JSON.parse)
   */
  deserializer?: (value: string) => T

  /**
   * Sync state across tabs/windows
   */
  syncData?: boolean
}

/**
 * Generic hook for localStorage management (infrastructure level)
 * Does not know about specific features or UI components
 *
 * @param key - The localStorage key
 * @param defaultValue - Default value if key doesn't exist
 * @param options - Optional configuration
 * @returns [storedValue, setValue, removeValue]
 */
export const useLocalStorage = <T>(
  key: string,
  defaultValue: T,
  options: UseLocalStorageOptions<T> = {}
): [T, (value: T | ((val: T) => T)) => void, () => void] => {
  const {
    serializer = JSON.stringify,
    deserializer = JSON.parse,
    syncData = true
  } = options

  // Initialize state with value from localStorage or default
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return defaultValue
    }

    try {
      const item = window.localStorage.getItem(key)
      return item ? deserializer(item) : defaultValue
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error)
      return defaultValue
    }
  })

  /**
   * Set value in state and localStorage
   */
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        // Allow value to be a function for same API as useState
        const valueToStore = value instanceof Function ? value(storedValue) : value

        setStoredValue(valueToStore)

        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, serializer(valueToStore))

          // Dispatch custom event for cross-tab synchronization
          if (syncData) {
            window.dispatchEvent(
              new CustomEvent('local-storage-change', {
                detail: { key, value: valueToStore }
              })
            )
          }
        }
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error)
      }
    },
    [key, storedValue, serializer, syncData]
  )

  /**
   * Remove value from localStorage
   */
  const removeValue = useCallback(() => {
    try {
      setStoredValue(defaultValue)

      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key)

        // Dispatch custom event for cross-tab synchronization
        if (syncData) {
          window.dispatchEvent(
            new CustomEvent('local-storage-change', {
              detail: { key, value: null }
            })
          )
        }
      }
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error)
    }
  }, [key, defaultValue, syncData])

  // Listen for changes in other tabs/windows
  useEffect(() => {
    if (!syncData || typeof window === 'undefined') {
      return
    }

    const handleStorageChange = (e: StorageEvent | CustomEvent) => {
      // Handle native storage event (from other tabs)
      if (e instanceof StorageEvent) {
        if (e.key === key && e.newValue !== null) {
          try {
            setStoredValue(deserializer(e.newValue))
          } catch (error) {
            console.warn(`Error parsing localStorage value for key "${key}":`, error)
          }
        }
      }

      // Handle custom event (from same tab)
      if (e instanceof CustomEvent) {
        const { key: eventKey, value } = e.detail
        if (eventKey === key) {
          setStoredValue(value ?? defaultValue)
        }
      }
    }

    // Listen to both native storage events and custom events
    window.addEventListener('storage', handleStorageChange as EventListener)
    window.addEventListener('local-storage-change', handleStorageChange as EventListener)

    return () => {
      window.removeEventListener('storage', handleStorageChange as EventListener)
      window.removeEventListener('local-storage-change', handleStorageChange as EventListener)
    }
  }, [key, defaultValue, deserializer, syncData])

  return [storedValue, setValue, removeValue]
}
