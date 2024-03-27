
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient('https://gtzlvlopqwdjxlfzgkrn.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0emx2bG9wcXdkanhsZnpna3JuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE1MTg5OTEsImV4cCI6MjAyNzA5NDk5MX0.IH8HBOWs_AdB12FtZ0svlNDpohfXxdaVRTz2KhtGihA')