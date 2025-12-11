import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';
import { render } from '@react-email/components';
import ContactNotificationEmail from '../emails/ContactNotification';
import ContactConfirmationEmail from '../emails/ContactConfirmation';

// Validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email({ message: 'Email inválido' }),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
});

// Initialize services
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

// Configure Gmail SMTP transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
  tls: {
    // Deshabilitar verificación de certificados (solo para desarrollo)
    rejectUnauthorized: false,
  },
});

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed',
    });
  }

  try {
    // 1. Parse and validate request body
    const body = req.body;
    const validationResult = contactSchema.safeParse(body);

    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: validationResult.error.format(),
      });
    }

    const { name, email, message } = validationResult.data;

    // 2. Save to Supabase (optional in development)
    if (process.env.SUPABASE_URL && !process.env.SUPABASE_URL.includes('your-project')) {
      const { error: dbError } = await supabase
        .from('contacts')
        .insert([
          {
            name,
            email,
            message,
            created_at: new Date().toISOString(),
          },
        ]);

      if (dbError) {
        console.error('Supabase error:', dbError);
        return res.status(500).json({
          success: false,
          error: 'Failed to save contact to database',
        });
      }
    } else {
      console.log('⚠️  Supabase not configured - skipping database save');
      console.log('📝 Contact data:', { name, email, message });
    }

    // 3. Send confirmation email to user
    const confirmationEmailHtml = await render(
      ContactConfirmationEmail({ name })
    );

    try {
      await transporter.sendMail({
        from: process.env.GMAIL_EMAIL,
        to: email,
        subject: 'Gracias por tu mensaje',
        html: confirmationEmailHtml,
      });
    } catch (confirmationError) {
      console.error('Confirmation email error:', confirmationError);
      // Don't fail the request if confirmation email fails
    }

    // 4. Send notification email to you
    const notificationEmailHtml = await render(
      ContactNotificationEmail({ name, email, message })
    );

    try {
      await transporter.sendMail({
        from: process.env.GMAIL_EMAIL,
        to: process.env.GMAIL_EMAIL,
        subject: 'Nuevo mensaje desde el portfolio',
        html: notificationEmailHtml,
        replyTo: email, // Allow direct reply to the sender
      });
    } catch (notificationError) {
      console.error('Notification email error:', notificationError);
      // Don't fail the request if notification email fails
    }

    // 5. Return success response
    return res.status(200).json({
      success: true,
      message: 'Message sent successfully!',
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
}
