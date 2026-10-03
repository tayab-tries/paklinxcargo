import { createClient } from '@supabase/supabase-js';

export interface AdminQuoteRecord {
  id: string;
  quote_reference: string;
  sender_name: string;
  sender_phone?: string;
  sender_email?: string;
  contact_preference: string;
  origin_city: string;
  destination_country: string;
  destination_city?: string;
  cargo_type: string;
  estimated_weight_kg: number;
  package_count: number;
  length_cm?: number;
  width_cm?: number;
  height_cm?: number;
  cargo_description: string;
  additional_notes?: string;
  source_page?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  status: 'new' | 'contacted' | 'quoted' | 'converted' | 'archived';
  internal_notes?: string;
  assigned_admin_id?: string;
  admin_notification_status: string;
  customer_notification_status: string;
  email_attempt_count: number;
  created_at: string;
  isPossibleDuplicate?: boolean;
}

export async function getAdminQuotes(): Promise<AdminQuoteRecord[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

  if (!supabaseUrl || !serviceRoleKey) {
    // Return mock static leads for admin preview when DB is unconfigured
    return [
      {
        id: 'qte-mock-001',
        quote_reference: 'QTE-2026-X8K9M2P1',
        sender_name: 'Muhammad Tariq',
        sender_phone: '+92 300 5551234',
        sender_email: 'tariq@example.com',
        contact_preference: 'whatsapp',
        origin_city: 'lahore',
        destination_country: 'uk',
        destination_city: 'London',
        cargo_type: 'air_freight',
        estimated_weight_kg: 35,
        package_count: 2,
        length_cm: 40,
        width_cm: 30,
        height_cm: 25,
        cargo_description: '2 boxes of personal garments and books',
        status: 'new',
        admin_notification_status: 'sent',
        customer_notification_status: 'sent',
        email_attempt_count: 1,
        created_at: new Date().toISOString(),
        isPossibleDuplicate: false,
      },
      {
        id: 'qte-mock-002',
        quote_reference: 'QTE-2026-Y3M7N4K9',
        sender_name: 'Shahid Textile Mills',
        sender_phone: '+92 321 8884321',
        sender_email: 'export@shahidtextile.com',
        contact_preference: 'email',
        origin_city: 'karachi',
        destination_country: 'uae',
        destination_city: 'Dubai',
        cargo_type: 'commercial_freight',
        estimated_weight_kg: 450,
        package_count: 12,
        cargo_description: 'Commercial cotton garment samples and fabric rolls',
        status: 'contacted',
        admin_notification_status: 'sent',
        customer_notification_status: 'sent',
        email_attempt_count: 1,
        created_at: new Date(Date.now() - 86400000).toISOString(),
        isPossibleDuplicate: false,
      },
    ];
  }

  try {
    const supabase = createClient(supabaseUrl, serviceRoleKey);
    const { data, error } = await supabase
      .from('quotes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) {
      console.warn('Error fetching quotes from Supabase:', error?.message);
      return [];
    }

    // Flag soft duplicate warnings (same phone or route submitted within 30 mins)
    const records: AdminQuoteRecord[] = (data as AdminQuoteRecord[]).map((q) => ({
      ...q,
      isPossibleDuplicate: false,
    }));

    for (let i = 0; i < records.length; i++) {
      for (let j = i + 1; j < records.length; j++) {
        const timeDiffMs = Math.abs(
          new Date(records[i].created_at).getTime() - new Date(records[j].created_at).getTime()
        );
        if (timeDiffMs <= 30 * 60 * 1000) {
          const samePhone = records[i].sender_phone && records[i].sender_phone === records[j].sender_phone;
          const sameRoute = records[i].origin_city === records[j].origin_city && records[i].destination_country === records[j].destination_country;
          if (samePhone || sameRoute) {
            records[i].isPossibleDuplicate = true;
            records[j].isPossibleDuplicate = true;
          }
        }
      }
    }

    return records;
  } catch (err) {
    console.error('getAdminQuotes exception:', err);
    return [];
  }
}

export async function getAdminQuoteById(id: string): Promise<AdminQuoteRecord | null> {
  const quotes = await getAdminQuotes();
  return quotes.find((q) => q.id === id) || null;
}
