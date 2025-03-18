import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://ngzzjggxwhkelvjnsvru.supabase.co';
const supabaseKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5nenpqZ2d4d2hrZWx2am5zdnJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE4ODYxMDQsImV4cCI6MjA1NzQ2MjEwNH0.J1kgC3f7Xruqq0T-jXoWqW5aSknGKygVjVl2fCOVfr8';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
