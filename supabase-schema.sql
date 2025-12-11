-- ============================================
-- SCHEMA PARA TABLA DE CONTACTOS
-- ============================================
-- Ejecuta este SQL en tu proyecto de Supabase
-- Dashboard → SQL Editor → New Query → Pega y ejecuta

-- Crear tabla contacts
CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);

-- Habilitar Row Level Security (RLS)
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Política para permitir inserts desde el backend (usando service_role)
-- Esta política permite que el backend inserte datos sin restricciones
CREATE POLICY "Enable insert for service role"
ON contacts FOR INSERT
TO service_role
WITH CHECK (true);

-- (Opcional) Política para que puedas ver los datos desde el dashboard
CREATE POLICY "Enable read for authenticated users"
ON contacts FOR SELECT
TO authenticated
USING (true);

-- ============================================
-- VERIFICACIÓN
-- ============================================
-- Ejecuta esto para verificar que la tabla se creó correctamente:
-- SELECT * FROM contacts LIMIT 5;

-- ============================================
-- FUNCIONES ÚTILES
-- ============================================

-- Función para obtener estadísticas de mensajes
CREATE OR REPLACE FUNCTION get_contact_stats()
RETURNS TABLE (
  total_contacts BIGINT,
  today_contacts BIGINT,
  week_contacts BIGINT,
  month_contacts BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    COUNT(*)::BIGINT as total_contacts,
    COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE)::BIGINT as today_contacts,
    COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE - INTERVAL '7 days')::BIGINT as week_contacts,
    COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE - INTERVAL '30 days')::BIGINT as month_contacts
  FROM contacts;
END;
$$ LANGUAGE plpgsql;

-- Usar la función:
-- SELECT * FROM get_contact_stats();

-- ============================================
-- CONSULTAS ÚTILES
-- ============================================

-- Ver todos los mensajes ordenados por fecha
-- SELECT id, name, email, LEFT(message, 50) as message_preview, created_at
-- FROM contacts
-- ORDER BY created_at DESC;

-- Ver mensajes de hoy
-- SELECT * FROM contacts
-- WHERE created_at >= CURRENT_DATE
-- ORDER BY created_at DESC;

-- Buscar por email
-- SELECT * FROM contacts
-- WHERE email ILIKE '%ejemplo.com%'
-- ORDER BY created_at DESC;

-- Contar mensajes por día (últimos 30 días)
-- SELECT
--   DATE(created_at) as date,
--   COUNT(*) as count
-- FROM contacts
-- WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
-- GROUP BY DATE(created_at)
-- ORDER BY date DESC;
