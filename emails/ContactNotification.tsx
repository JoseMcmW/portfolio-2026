import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Hr,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface ContactNotificationEmailProps {
  name: string;
  email: string;
  message: string;
}

export const ContactNotificationEmail = ({
  name,
  email,
  message,
}: ContactNotificationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Nuevo mensaje de contacto desde tu portfolio</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section>
            <svg width="70" height="70" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 15 L34 15 L34 68 Q34 82 50 82 Q66 82 66 68 L66 45 Q66 32 53 32 L53 44 Q54 44 54 45 L54 68 Q54 70 50 70 Q46 70 46 68 L46 15 L22 15 Z" fill='#221F20'/>
              <circle cx="60" cy="20" r="6" fill='#221F20'/>
            </svg>
          </Section>
          <Heading style={h1}>Nuevo mensaje desde el portfolio</Heading>

          <Text style={text}>
            Has recibido un nuevo mensaje de contacto desde tu portfolio web.
          </Text>

          <Hr style={hr} />

          <Section style={informationSection}>
            <Text style={informationLabel}>Nombre:</Text>
            <Text style={informationValue}>{name}</Text>
          </Section>

          <Section style={informationSection}>
            <Text style={informationLabel}>Email:</Text>
            <Text style={informationValue}>{email}</Text>
          </Section>

          <Section style={informationSection}>
            <Text style={informationLabel}>Mensaje:</Text>
            <Text style={messageValue}>{message}</Text>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            Este email fue generado automáticamente desde tu formulario de contacto.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default ContactNotificationEmail;

// Styles
const main = {
  backgroundColor: '#221F20',
  fontFamily: 'Georgia, "Times New Roman", serif', // Fuente segura
};

const container = {
  backgroundColor: '#F2EDEB',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  maxWidth: '600px',
};

const h1 = {
  color: '#1d1c1d',
  fontSize: '28px',
  fontWeight: '700',
  margin: '40px 0',
  padding: '0 48px',
  fontFamily: 'Georgia, "Times New Roman", serif', // Serif para títulos
};

const text = {
  color: '#484848',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '16px 0',
  padding: '0 48px',
  fontFamily: 'Georgia, "Times New Roman", serif',
};

const hr = {
  borderColor: '#221F20',
  margin: '20px 48px',
  width: '80%',
};

const informationSection = {
  padding: '0 48px',
  marginBottom: '16px',
};

const informationLabel = {
  color: '#8898aa',
  fontSize: '12px',
  fontWeight: '600',
  textTransform: 'uppercase' as const,
  margin: '0 0 4px',
  letterSpacing: '0.5px',
  fontFamily: 'Georgia, "Times New Roman", serif',
};

const informationValue = {
  color: '#1d1c1d',
  fontSize: '16px',
  fontWeight: '500',
  margin: '0',
  fontFamily: 'Georgia, "Times New Roman", serif', // Serif para valores destacados
};

const messageValue = {
  color: '#484848',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0',
  padding: '16px',
  backgroundColor: '#f6f9fc',
  borderRadius: '4px',
  whiteSpace: 'pre-wrap' as const,
  fontFamily: 'Georgia, "Times New Roman", serif',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
  padding: '0 48px',
  marginTop: '32px',
  fontFamily: 'Georgia, "Times New Roman", serif',
};
