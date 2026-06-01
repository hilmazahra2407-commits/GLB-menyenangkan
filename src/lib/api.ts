import { supabase } from './supabase';

export interface Materi {
  id: number;
  judul: string;
  deskripsi: string;
  konten: string;
  file_url?: string;
}

export interface Referensi {
  id: number;
  materi_id: number;
  judul: string;
  tipe: 'artikel' | 'video' | 'buku_jurnal' | 'website';
  url: string;
  deskripsi: string;
}

export interface PertanyaanKuis {
  id: number;
  kuis_id: number;
  pertanyaan: string;
  opsi_a: string;
  opsi_b: string;
  opsi_c: string;
  opsi_d: string;
  jawaban_benar: string;
  kode_unik?: string;
  level_title?: string;
  tujuan?: string;
  clue?: string;
}

export interface HasilKuis {
  id?: number;
  user_id: string;
  user_name?: string;
  kuis_id: number;
  skor: number;
  total_benar: number;
  total_salah: number;
}

// Fetch all materi
export async function getMateri() {
  const { data, error } = await supabase.from('materi').select('*').order('id', { ascending: true });
  if (error) {
    console.error("Error fetching materi:", error);
    return [];
  }
  return data as Materi[];
}

// Fetch all referensi
export async function getReferensi() {
  const { data, error } = await supabase.from('referensi_belajar').select('*').order('id', { ascending: true });
  if (error) {
    console.error("Error fetching referensi:", error);
    return [];
  }
  return data as Referensi[];
}

// Fetch kuis questions
export async function getPertanyaanKuis(kuisId: number = 1) {
  const { data, error } = await supabase.from('pertanyaan_kuis').select('*').eq('kuis_id', kuisId);
  if (error) {
    console.error("Error fetching kuis:", error);
    return [];
  }
  return data as PertanyaanKuis[];
}

// Save kuis results
export async function saveHasilKuis(hasil: HasilKuis) {
  const { data, error } = await supabase.from('hasil_kuis').insert([hasil]);
  if (error) {
    console.error("Error saving hasil kuis:", error);
    throw error;
  }
  return data;
}

// Fetch kuis results for current user (Riwayat)
export async function getUserHasilKuis(userId: string) {
  const { data, error } = await supabase.from('hasil_kuis').select('*, kuis(judul)').eq('user_id', userId).order('waktu_pengerjaan', { ascending: false });
  if (error) {
    console.error("Error fetching user hasil kuis:", error);
    return [];
  }
  return data;
}

// Fetch Leaderboard (Top 10 scores)
export async function getLeaderboard() {
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  
  const { data, error } = await supabase
    .from('hasil_kuis')
    .select('*, kuis(judul)')
    .gte('waktu_pengerjaan', firstDayOfMonth.toISOString())
    .order('skor', { ascending: false })
    .order('waktu_pengerjaan', { ascending: true })
    .limit(10);
    
  if (error) {
    console.error("Error fetching leaderboard:", error);
    return [];
  }
  return data;
}
