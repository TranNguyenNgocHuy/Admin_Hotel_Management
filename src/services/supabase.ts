import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://qupwdlqxrmtwqxjywktb.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1cHdkbHF4cm10d3F4anl3a3RiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ0MDI2NjksImV4cCI6MjAzOTk3ODY2OX0.WYxCxIQow3DqbhRRayyd0rhqF23sV5B8_Lbr-2MDQVw'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
