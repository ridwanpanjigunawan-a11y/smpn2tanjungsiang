import React, { useState, useMemo, useEffect } from 'react';
import { 
  Users, 
  AlertTriangle, 
  ShieldAlert, 
  Search, 
  Plus, 
  Printer, 
  Trash2, 
  TrendingUp, 
  UserX,
  Award, 
  ChevronRight, 
  X, 
  School,
  FileSpreadsheet,
  CheckCircle2,
  Bookmark,
  Calendar,
  Building,
  UserCheck,
  ClipboardList,
  Upload
} from 'lucide-react';
import { 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  AreaChart, 
  Area 
} from 'recharts';

// --- INITIAL SCHOOL PROFILE WITH EMBEDDED OFFICIAL LOGO ---
const OFFICIAL_LOGO_BASE64 = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCAAYABgBAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPxA=";

const OFFICIAL_LOGO_BASE64_FULL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCAAYABgBAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPxA=";

const INITIAL_SCHOOL_PROFILE = {
  name: 'SMP Negeri 2 Tanjungsiang',
  address: 'Jl. Pendidikan No. 45, Kecamatan Tanjungsiang, Kabupaten Subang, Jawa Barat',
  principal: 'H. Suherman, SE., M.Pd.',
  principalNip: '19751016 2011011001',
  vicePrincipal: 'Ridwan Panji Gunawan, S.Pd.',
  vicePrincipalNip: '199102242023211007',
  logoUrl: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCAAYABgBAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPxA="
};

// --- INITIAL FULL STUDENTS DATA (Dikosongkan sesuai permintaan) ---
const INITIAL_STUDENTS = [];

// --- OFFICIAL VIOLATION TYPES CATALOG (D.1 - D.51) ---
const VIOLATION_TYPES = [
  { id: 'd1', code: 'D.1', category: 'Ringan', points: 5, name: 'Terlambat' },
  { id: 'd2', code: 'D.2', category: 'Sedang', points: 10, name: 'Siswa tidak masuk tanpa keterangan' },
  { id: 'd3', code: 'D.3', category: 'Sedang', points: 10, name: 'Siswa tidak masuk dengan membuat keterangan palsu' },
  { id: 'd4', code: 'D.4', category: 'Ringan', points: 5, name: 'Siswa tidak mengikuti jam pelajaran tertentu' },
  { id: 'd5', code: 'D.5', category: 'Ringan', points: 5, name: 'Siswa keluar ketika proses belajar mengajar berlangsung dan tidak kembali sampai dengan waktu sekolah usai' },
  { id: 'd6', code: 'D.6', category: 'Sedang', points: 10, name: 'Siswa tidak ikut upacara bendera' },
  { id: 'd7', code: 'D.7', category: 'Sedang', points: 10, name: 'Siswa meninggalkan pelajaran atau sekolah dengan ijin palsu' },
  { id: 'd8', code: 'D.8', category: 'Ringan', points: 2, name: 'Memakai seragam tidak sesuai aturan' },
  { id: 'd9', code: 'D.9', category: 'Ringan', points: 3, name: 'Tidak memakai seragam sekolah sesuai jadwal' },
  { id: 'd10', code: 'D.10', category: 'Ringan', points: 5, name: 'Siswa berhias berlebihan' },
  { id: 'd11', code: 'D.11', category: 'Sedang', points: 10, name: 'Siswa putra memakai gelang, kalung, anting' },
  { id: 'd12', code: 'D.12', category: 'Sedang', points: 10, name: 'Memakai tindik dibagian wajah atau tubuh lain' },
  { id: 'd13', code: 'D.13', category: 'Berat', points: 20, name: 'Memakai tatto dan atau atribut yang tidak wajar dikenakan bagi pelajar' },
  { id: 'd14', code: 'D.14', category: 'Berat', points: 50, name: 'Berduaan, bermesraan dan pacaran (melakukan tindakan asusila dan melanggar nilai kesopanan)' },
  { id: 'd15', code: 'D.15', category: 'Berat', points: 75, name: 'Melawan Kepala sekolah, guru, karyawan dengan ancaman' },
  { id: 'd16', code: 'D.16', category: 'Berat', points: 100, name: 'Melawan Kepala Sekolah, guru, karyawan dengan pemukulan' },
  { id: 'd17', code: 'D.17', category: 'Berat', points: 75, name: 'Melakukan tindakan Intimidasi/Bullying sesama siswa dengan kekerasan' },
  { id: 'd18', code: 'D.18', category: 'Sedang', points: 15, name: 'Melakukan tindakan tidak menyenangkan sesama siswa' },
  { id: 'd19', code: 'D.19', category: 'Sedang', points: 20, name: 'Membawa Gawai/HP ke sekolah tanpa ijin pihak sekolah' },
  { id: 'd20', code: 'D.20', category: 'Berat', points: 50, name: 'Mencemarkan nama Kepala Sekolah, Guru, Karyawan dan Sekolah' },
  { id: 'd21', code: 'D.21', category: 'Berat', points: 100, name: 'Diketahui hamil/menikah' },
  { id: 'd22', code: 'D.22', category: 'Sedang', points: 15, name: 'Mengotori/mencoret-coret benda milik sekolah, guru, karyawan, teman atau lingkungan orang lain' },
  { id: 'd23', code: 'D.23', category: 'Berat', points: 50, name: 'Merusak atau mengambil barang milik orang lain' },
  { id: 'd24', code: 'D.24', category: 'Sedang', points: 15, name: 'Membawa dan atau menggunakan benda yang tidak ada kaitannya dengan proses belajar mengajar kecuali ada ijin' },
  { id: 'd25', code: 'D.25', category: 'Ringan', points: 5, name: 'Memakai sandal atau sepatu sandal saat pelajaran berlangsung kecuali ada ijin dari sekolah' },
  { id: 'd26', code: 'D.26', category: 'Sedang', points: 20, name: 'Setiap melompat pagar sekolah untuk keluar/masuk' },
  { id: 'd27', code: 'D.27', category: 'Ringan', points: 3, name: 'Membuang sampah tidak pada tempatnya' },
  { id: 'd28', code: 'D.28', category: 'Ringan', points: 3, name: 'Merusak tanaman dengan sengaja' },
  { id: 'd29', code: 'D.29', category: 'Berat', points: 50, name: 'Membawa rokok ke sekolah' },
  { id: 'd30', code: 'D.30', category: 'Berat', points: 75, name: 'Menghisap rokok di sekolah' },
  { id: 'd31', code: 'D.31', category: 'Berat', points: 65, name: 'Memiliki, Membawa dan atau Mempergunakan buku, majalah, kaset, VCD, DVD, CD, Handphone yang berisi porno' },
  { id: 'd32', code: 'D.32', category: 'Ringan', points: 5, name: 'Memakai sepatu tidak sesuai ketentuan' },
  { id: 'd33', code: 'D.33', category: 'Berat', points: 100, name: 'Membawa senjata tajam/senjata api/bahan peledak tanpa ijin' },
  { id: 'd34', code: 'D.34', category: 'Berat', points: 100, name: 'Memperjualbelikan senjata tajam/senjata api/bahan peledak' },
  { id: 'd35', code: 'D.35', category: 'Berat', points: 100, name: 'Menggunakan senjata tajam/senjata api/bahan peledak untuk mengancam, melukai orang lain' },
  { id: 'd36', code: 'D.36', category: 'Berat', points: 100, name: 'Menggunakan napza dan atau minuman terlarang' },
  { id: 'd37', code: 'D.37', category: 'Berat', points: 100, name: 'Membawa napza dan atau minuman terlarang' },
  { id: 'd38', code: 'D.38', category: 'Berat', points: 100, name: 'Mengedarkan/memperjualbelikan napza, minuman keras di dalam atau di luar sekolah' },
  { id: 'd39', code: 'D.39', category: 'Berat', points: 100, name: 'Indikasi / Berkelahi/tawuran dengan siswa sekolah lain' },
  { id: 'd40', code: 'D.40', category: 'Berat', points: 100, name: 'Berkelahi antar siswa SMPN 2 TANJUNGSIANG' },
  { id: 'd41', code: 'D.41', category: 'Berat', points: 100, name: 'Tersangkut Tindak Pidana Lainnya' },
  { id: 'd42', code: 'D.42', category: 'Sedang', points: 10, name: 'Tidak mengikuti pembiasaan Sekolah' },
  { id: 'd43', code: 'D.43', category: 'Ringan', points: 5, name: 'Mewarnai Rambut (laki laki), Kuku panjang, rambut siswa laki-laki tidak sesuai ketentuan' },
  { id: 'd44', code: 'D.44', category: 'Ringan', points: 5, name: 'Siswa perempuan mengenakan hijap tapi rambut keliatan di luar hijab' },
  { id: 'd45', code: 'D.45', category: 'Sedang', points: 25, name: 'Siswa menjadi provokator untuk melawan kepala sekolah, guru, dan karyawan' },
  { id: 'd46', code: 'D.46', category: 'Sedang', points: 10, name: 'Siswa bermain menggunakan pakaian/atribut sekolah' },
  { id: 'd47', code: 'D.47', category: 'Sedang', points: 10, name: 'Siswa menggunakan atribut sekolah lain' },
  { id: 'd48', code: 'D.48', category: 'Ringan', points: 5, name: 'Siswa tidak menggunakan atribut sesuai aturan (topi, gesper, logo sekolah, logo kelas, dasi, bendera, kaos kaki hitam/putih, ring, kacu, nametag, logo osis, gudep, dan logo pramuka)' },
  { id: 'd49', code: 'D.49', category: 'Sedang', points: 10, name: 'Siswa membawa alat makeup ke sekolah' },
  { id: 'd50', code: 'D.50', category: 'Sedang', points: 15, name: 'Mengeluarkan kata-kata kasar, jorok, atau porno' },
  { id: 'd51', code: 'D.51', category: 'Berat', points: 50, name: 'Menggunakan atau mengambil fasilitas sekolah tanpa izin' }
];

// --- OFFICIAL ACHIEVEMENT TYPES CATALOG (A.1-C.3) ---
const ACHIEVEMENT_TYPES = [
  { id: 'a1', code: 'A.1', category: 'Kedisiplinan', points: 20, name: 'Penampilan selalu rapih' },
  { id: 'a2', code: 'A.2', category: 'Kedisiplinan', points: 20, name: 'Berperilaku santun dan sopan' },
  { id: 'a3', code: 'A.3', category: 'Kedisiplinan', points: 20, name: 'Kehadiran di Kelas 100%' },
  { id: 'a4', code: 'A.4', category: 'Akademik', points: 30, name: 'Peringkat 1 – 5' },
  { id: 'a5', code: 'A.5', category: 'Akademik', points: 20, name: 'Peringkat 6 – 10' },
  { id: 'a6', code: 'A.6', category: 'Organisasi', points: 20, name: 'Pengurus Kelas' },
  { id: 'b1', code: 'B.1', category: 'Organisasi', points: 50, name: 'Ketua OSIS / MPK / Ketua Organisasi' },
  { id: 'b2', code: 'B.2', category: 'Prestasi', points: 25, name: 'Prestasi Tingkat Sekolah' },
  { id: 'b3', code: 'B.3', category: 'Organisasi', points: 30, name: 'Pengurus OSIS dan Ekskul' },
  { id: 'b4', code: 'B.4', category: 'Prestasi', points: 30, name: 'Prestasi Tingkat Kecamatan' },
  { id: 'b5', code: 'B.5', category: 'Prestasi', points: 40, name: 'Prestasi Tingkat Kabupaten/Kota' },
  { id: 'b6', code: 'B.6', category: 'Prestasi', points: 60, name: 'Prestasi Tingkat Provinsi' },
  { id: 'b7', code: 'B.7', category: 'Prestasi', points: 75, name: 'Prestasi Tingkat Nasional' },
  { id: 'b8', code: 'B.8', category: 'Prestasi', points: 85, name: 'Prestasi Tingkat Internasional' },
  { id: 'c1', code: 'C.1', category: 'Kegiatan', points: 10, name: 'Mengikuti kegiatan yang diadakan sekolah' },
  { id: 'c2', code: 'C.2', category: 'Lingkungan', points: 10, name: 'Melakukan kegiatan pelestarian lingkungan' },
  { id: 'c3', code: 'C.3', category: 'Lingkungan', points: 10, name: 'Berpartisipasi dalam peringatan hari lingkungan' }
];

const INITIAL_VIOLATIONS = [];
const INITIAL_ACHIEVEMENTS = [];

const getSanctionStatus = (totalViolationPoints, totalAchievementPoints) => {
  const netPoints = Math.max(0, totalViolationPoints - totalAchievementPoints);
  if (totalViolationPoints === 0 && totalAchievementPoints === 0) return { label: 'Aman / Sempurna', color: 'bg-emerald-100 text-emerald-800 border-emerald-300', level: 'safe', sp: '-' };
  if (netPoints <= 0) return { label: 'Sangat Baik (Prestasi Menutup Pelanggaran)', color: 'bg-emerald-100 text-emerald-800 border-emerald-300', level: 'safe', sp: 'Apresiasi Khusus' };
  if (netPoints <= 15) return { label: 'Peringatan Lisan', color: 'bg-blue-100 text-blue-800 border-blue-300', level: 'info', sp: 'Peringatan Lisan' };
  if (netPoints <= 30) return { label: 'SP 1 - Pemanggilan Orang Tua', color: 'bg-amber-100 text-amber-800 border-amber-300', level: 'warning', sp: 'Surat Peringatan I' };
  if (netPoints <= 50) return { label: 'SP 2 - Skorsing 3 Hari', color: 'bg-orange-100 text-orange-800 border-orange-300', level: 'danger', sp: 'Surat Peringatan II' };
  return { label: 'SP 3 - Dikembalikan ke Orang Tua', color: 'bg-rose-100 text-rose-800 border-rose-300', level: 'critical', sp: 'Surat Peringatan III' };
};

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const [schoolProfile, setSchoolProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('bk_school_profile');
      return saved ? JSON.parse(saved) : INITIAL_SCHOOL_PROFILE;
    } catch {
      return INITIAL_SCHOOL_PROFILE;
    }
  });

  const [isEditingLogo, setIsEditingLogo] = useState(false);
  const [newLogoInput, setNewLogoInput] = useState('');

  const [students, setStudents] = useState(() => {
    try {
      const saved = localStorage.getItem('bk_students_full');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error("Error loading students:", e);
    }
    return INITIAL_STUDENTS;
  });

  const [violations, setViolations] = useState(() => {
    try {
      const saved = localStorage.getItem('bk_violations_log');
      return saved ? JSON.parse(saved) : INITIAL_VIOLATIONS;
    } catch {
      return INITIAL_VIOLATIONS;
    }
  });

  const [achievements, setAchievements] = useState(() => {
    try {
      const saved = localStorage.getItem('bk_achievements_log');
      return saved ? JSON.parse(saved) : INITIAL_ACHIEVEMENTS;
    } catch {
      return INITIAL_ACHIEVEMENTS;
    }
  });

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState(schoolProfile);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudentForDetail, setSelectedStudentForDetail] = useState(null);

  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [isBulkImportOpen, setIsBulkImportOpen] = useState(false);
  const [bulkText, setBulkText] = useState('');
  const [bulkTargetClass, setBulkTargetClass] = useState('7C');

  const [newStudentData, setNewStudentData] = useState({
    nis: '', nisn: '', name: '', class: '7C', birthPlace: '', birthDate: '', address: ''
  });

  const [violationForm, setViolationForm] = useState({
    studentId: '',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().split(' ')[0].substring(0, 5),
    violationId: '',
    note: '',
    action: '',
    reporter: ''
  });

  const [achievementForm, setAchievementForm] = useState({
    studentId: '',
    date: new Date().toISOString().split('T')[0],
    achievementId: '',
    note: '',
    reward: '',
    supervisor: ''
  });

  useEffect(() => { 
    try {
      localStorage.setItem('bk_school_profile', JSON.stringify(schoolProfile)); 
    } catch(e) { console.error(e); }
  }, [schoolProfile]);

  useEffect(() => { 
    try {
      localStorage.setItem('bk_students_full', JSON.stringify(students)); 
    } catch(e) { alert('Penyimpanan browser penuh!'); }
  }, [students]);

  useEffect(() => { 
    try {
      localStorage.setItem('bk_violations_log', JSON.stringify(violations)); 
    } catch(e) { console.error(e); }
  }, [violations]);

  useEffect(() => { 
    try {
      localStorage.setItem('bk_achievements_log', JSON.stringify(achievements)); 
    } catch(e) { console.error(e); }
  }, [achievements]);

  const studentStats = useMemo(() => {
    return students.map(student => {
      const vLogs = violations.filter(v => v.studentId === student.id);
      const aLogs = achievements.filter(a => a.studentId === student.id);

      const totalViolationPoints = vLogs.reduce((sum, v) => sum + Number(v.points), 0);
      const totalAchievementPoints = aLogs.reduce((sum, a) => sum + Number(a.points), 0);
      
      const netPoints = Math.max(0, totalViolationPoints - totalAchievementPoints);
      const status = getSanctionStatus(totalViolationPoints, totalAchievementPoints);

      return {
        ...student,
        totalViolationPoints,
        totalAchievementPoints,
        netPoints,
        violationCount: vLogs.length,
        achievementCount: aLogs.length,
        status,
        violationHistory: vLogs.sort((a,b) => new Date(b.date) - new Date(a.date)),
        achievementHistory: aLogs.sort((a,b) => new Date(b.date) - new Date(a.date))
      };
    });
  }, [students, violations, achievements]);

  const dashboardMetrics = useMemo(() => {
    const totalStudents = students.length;
    const totalViolationsCount = violations.length;
    const totalAchievementsCount = achievements.length;
    const criticalStudents = studentStats.filter(s => s.netPoints >= 30).length;

    return { totalStudents, totalViolationsCount, totalAchievementsCount, criticalStudents };
  }, [students, violations, achievements, studentStats]);

  const categoryPieData = useMemo(() => {
    const counts = { Ringan: 0, Sedang: 0, Berat: 0 };
    violations.forEach(v => { if (counts[v.category] !== undefined) counts[v.category]++; });
    return [
      { name: 'Ringan', value: counts.Ringan, color: '#10B981' },
      { name: 'Sedang', value: counts.Sedang, color: '#F59E0B' },
      { name: 'Berat', value: counts.Berat, color: '#EF4444' },
    ];
  }, [violations]);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setSchoolProfile(profileForm);
    setIsEditingProfile(false);
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    if (!newStudentData.name || !newStudentData.nis) {
      alert('Nama dan NIS wajib diisi!');
      return;
    }
    const created = { ...newStudentData, id: String(Date.now()) };
    const updated = [created, ...students];
    setStudents(updated);
    setNewStudentData({ nis: '', nisn: '', name: '', class: '7C', birthPlace: '', birthDate: '', address: '' });
    setIsAddStudentOpen(false);
  };

  const handleBulkImport = (e) => {
    e.preventDefault();
    if (!bulkText.trim()) {
      alert('Data teks kosong!');
      return;
    }

    const lines = bulkText.trim().split('\n');
    const newAddedStudents = [];

    lines.forEach((line, index) => {
      const parts = line.split(/,|\t/).map(p => p.trim());
      if (parts.length >= 3) {
        newAddedStudents.push({
          id: `bulk-${Date.now()}-${index}`,
          nis: parts[0] || '-',
          nisn: parts[1] || '-',
          name: parts[2].toUpperCase(),
          class: bulkTargetClass,
          birthPlace: 'Subang',
          birthDate: '2012-01-01',
          address: 'Tanjungsiang'
        });
      } else if (parts.length === 2) {
        newAddedStudents.push({
          id: `bulk-${Date.now()}-${index}`,
          nis: parts[0] || '-',
          nisn: '-',
          name: parts[1].toUpperCase(),
          class: bulkTargetClass,
          birthPlace: 'Subang',
          birthDate: '2012-01-01',
          address: 'Tanjungsiang'
        });
      }
    });

    if (newAddedStudents.length > 0) {
      const updatedStudents = [...newAddedStudents, ...students];
      setStudents(updatedStudents);
      try {
        localStorage.setItem('bk_students_full', JSON.stringify(updatedStudents));
        setBulkText('');
        setIsBulkImportOpen(false);
        alert(`Berhasil menambahkan dan menyimpan ${newAddedStudents.length} siswa ke Kelas ${bulkTargetClass}! Total siswa saat ini: ${updatedStudents.length}`);
      } catch (err) {
        alert('Gagal menyimpan ke penyimpanan lokal browser.');
      }
    } else {
      alert('Format data tidak dikenali.');
    }
  };

  const handleAddViolation = (e) => {
    e.preventDefault();
    if (!violationForm.studentId || !violationForm.violationId) {
      alert('Mohon pilih siswa dan jenis pelanggaran!');
      return;
    }
    const student = students.find(s => s.id === violationForm.studentId);
    const vPreset = VIOLATION_TYPES.find(v => v.id === violationForm.violationId);

    const newLog = {
      id: `LOG-V-${String(Date.now()).slice(-4)}`,
      studentId: student.id,
      studentName: student.name,
      nis: student.nis,
      class: student.class,
      date: violationForm.date,
      time: violationForm.time,
      category: vPreset.category,
      violationName: `${vPreset.code} - ${vPreset.name}`,
      points: vPreset.points,
      note: violationForm.note || '-',
      action: violationForm.action || 'Sesuai Ketentuan BK',
      reporter: violationForm.reporter || 'Tim BK/Kesiswaan'
    };

    setViolations([newLog, ...violations]);
    setViolationForm({ studentId: '', date: new Date().toISOString().split('T')[0], time: '07:30', violationId: '', note: '', action: '', reporter: '' });
    setActiveTab('dashboard');
  };

  const handleAddAchievement = (e) => {
    e.preventDefault();
    if (!achievementForm.studentId || !achievementForm.achievementId) {
      alert('Mohon pilih siswa dan jenis prestasi!');
      return;
    }
    const student = students.find(s => s.id === achievementForm.studentId);
    const aPreset = ACHIEVEMENT_TYPES.find(a => a.id === achievementForm.achievementId);

    const newLog = {
      id: `LOG-A-${String(Date.now()).slice(-4)}`,
      studentId: student.id,
      studentName: student.name,
      nis: student.nis,
      class: student.class,
      date: achievementForm.date,
      category: aPreset.category,
      achievementName: `${aPreset.code} - ${aPreset.name}`,
      points: aPreset.points,
      note: achievementForm.note || '-',
      reward: achievementForm.reward || 'Piagam & Apresiasi Sekolah',
      supervisor: achievementForm.supervisor || 'Pembina / Guru Pendamping'
    };

    setAchievements([newLog, ...achievements]);
    setAchievementForm({ studentId: '', date: new Date().toISOString().split('T')[0], achievementId: '', note: '', reward: '', supervisor: '' });
    setActiveTab('dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans flex flex-col md:flex-row">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-full md:w-64 bg-slate-900 text-slate-100 flex-shrink-0 flex flex-col border-r border-slate-800">
        <div className="p-4 border-b border-slate-800 flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center p-1 overflow-hidden shadow">
            <img src={schoolProfile.logoUrl} alt="Logo Sekolah" className="w-full h-full object-contain" />
          </div>
          <div className="overflow-hidden">
            <h1 className="font-bold text-sm leading-tight truncate">{schoolProfile.name}</h1>
            <p className="text-[10px] text-slate-400">Sistem BK & Kedisiplinan</p>
          </div>
        </div>

        <nav className="p-3 space-y-1 flex-1 text-xs font-medium">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${
              activeTab === 'dashboard' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <TrendingUp size={16} />
            <span>1. Dashboard Profil</span>
          </button>

          <button
            onClick={() => setActiveTab('students')}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${
              activeTab === 'students' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <Users size={16} />
            <span>2. Data Siswa ({students.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('violation-points')}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${
              activeTab === 'violation-points' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <AlertTriangle size={16} />
            <span>3. Poin Pelanggaran</span>
          </button>

          <button
            onClick={() => setActiveTab('achievement-points')}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${
              activeTab === 'achievement-points' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <Award size={16} />
            <span>4. Poin Prestasi</span>
          </button>

          <button
            onClick={() => setActiveTab('follow-up')}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${
              activeTab === 'follow-up' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <ShieldAlert size={16} />
            <span>5. Tindak Lanjut</span>
          </button>

          <div className="pt-2 border-t border-slate-800 my-1 text-[10px] text-slate-500 uppercase px-3 font-semibold">
            Input & Rekap Data
          </div>

          <button
            onClick={() => setActiveTab('add-violation')}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${
              activeTab === 'add-violation' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <Plus size={16} />
            <span>6. Input Pelanggaran</span>
          </button>

          <button
            onClick={() => setActiveTab('add-achievement')}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${
              activeTab === 'add-achievement' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <Plus size={16} />
            <span>7. Input Prestasi</span>
          </button>

          <button
            onClick={() => setActiveTab('reports')}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${
              activeTab === 'reports' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <Printer size={16} />
            <span>8. Laporan, Rekap Pelanggar & Cetak</span>
          </button>
        </nav>
      </aside>

      {/* MAIN BODY AREA */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* HEADER */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 z-10 shadow-xs">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {activeTab === 'dashboard' && '1. Dashboard & Profil Sekolah'}
              {activeTab === 'students' && '2. Master Data Siswa'}
              {activeTab === 'violation-points' && '3. Katalog & Riwayat Poin Pelanggaran'}
              {activeTab === 'achievement-points' && '4. Katalog & Riwayat Poin Prestasi'}
              {activeTab === 'follow-up' && '5. Status & Tindak Lanjut BK'}
              {activeTab === 'add-violation' && '6. Form Catat Pelanggaran Siswa'}
              {activeTab === 'add-achievement' && '7. Form Catat Prestasi Siswa'}
              {activeTab === 'reports' && '8. Laporan Rekapitulasi, Rekap Pelanggar & Cetak Dokumen'}
            </h2>
            <p className="text-xs text-slate-500">Kesiswaan & Bimbingan Konseling • SMP Negeri 2 Tanjungsiang</p>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('add-violation')}
              className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-medium rounded-lg flex items-center space-x-1"
            >
              <Plus size={14} />
              <span>+ Pelanggaran</span>
            </button>
            <button
              onClick={() => setActiveTab('add-achievement')}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium rounded-lg flex items-center space-x-1"
            >
              <Plus size={14} />
              <span>+ Prestasi</span>
            </button>
          </div>
        </header>

        <div className="p-6 max-w-7xl w-full mx-auto space-y-6">

          {/* ==================== MODULE 1: DASHBOARD & SCHOOL PROFILE ==================== */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
                <div className="flex justify-between items-start border-b border-slate-100 pb-4 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative group w-16 h-16 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center p-1 overflow-hidden shadow-inner">
                      <img src={schoolProfile.logoUrl} alt="Logo Sekolah" className="w-full h-full object-contain" />
                      <button
                        onClick={() => {
                          setNewLogoInput(schoolProfile.logoUrl);
                          setIsEditingLogo(true);
                        }}
                        className="absolute inset-0 bg-slate-900/60 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[10px] font-bold rounded-xl"
                      >
                        Ganti Logo
                      </button>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg">{schoolProfile.name}</h3>
                      <p className="text-xs text-slate-500">{schoolProfile.address}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setNewLogoInput(schoolProfile.logoUrl);
                        setIsEditingLogo(true);
                      }}
                      className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-lg"
                    >
                      Edit Logo
                    </button>
                    <button
                      onClick={() => {
                        setProfileForm(schoolProfile);
                        setIsEditingProfile(!isEditingProfile);
                      }}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg"
                    >
                      {isEditingProfile ? 'Batal' : 'Edit Profil'}
                    </button>
                  </div>
                </div>

                {isEditingProfile ? (
                  <form onSubmit={handleSaveProfile} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="font-semibold block mb-1">Nama Sekolah</label>
                      <input type="text" value={profileForm.name} onChange={e => setProfileForm({...profileForm, name: e.target.value})} className="w-full p-2 border rounded" required />
                    </div>
                    <div>
                      <label className="font-semibold block mb-1">Alamat Sekolah</label>
                      <input type="text" value={profileForm.address} onChange={e => setProfileForm({...profileForm, address: e.target.value})} className="w-full p-2 border rounded" required />
                    </div>
                    <div>
                      <label className="font-semibold block mb-1">Kepala Sekolah</label>
                      <input type="text" value={profileForm.principal} onChange={e => setProfileForm({...profileForm, principal: e.target.value})} className="w-full p-2 border rounded" required />
                    </div>
                    <div>
                      <label className="font-semibold block mb-1">NIP Kepala Sekolah</label>
                      <input type="text" value={profileForm.principalNip} onChange={e => setProfileForm({...profileForm, principalNip: e.target.value})} className="w-full p-2 border rounded" required />
                    </div>
                    <div>
                      <label className="font-semibold block mb-1">Wakasek Kesiswaan</label>
                      <input type="text" value={profileForm.vicePrincipal} onChange={e => setProfileForm({...profileForm, vicePrincipal: e.target.value})} className="w-full p-2 border rounded" required />
                    </div>
                    <div>
                      <label className="font-semibold block mb-1">NIP Wakasek Kesiswaan</label>
                      <input type="text" value={profileForm.vicePrincipalNip} onChange={e => setProfileForm({...profileForm, vicePrincipalNip: e.target.value})} className="w-full p-2 border rounded" required />
                    </div>
                    <div className="md:col-span-2 flex justify-end">
                      <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded font-medium">Simpan Perubahan</button>
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <span className="text-slate-400 block text-[11px]">Kepala Sekolah</span>
                      <span className="font-bold text-slate-800">{schoolProfile.principal}</span>
                      <span className="block text-[10px] text-slate-500">NIP: {schoolProfile.principalNip}</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <span className="text-slate-400 block text-[11px]">Wakasek Kesiswaan</span>
                      <span className="font-bold text-slate-800">{schoolProfile.vicePrincipal}</span>
                      <span className="block text-[10px] text-slate-500">NIP: {schoolProfile.vicePrincipalNip}</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <span className="text-slate-400 block text-[11px]">Total Siswa Terdaftar</span>
                      <span className="font-bold text-slate-800 text-base">{dashboardMetrics.totalStudents} Siswa</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <span className="text-slate-400 block text-[11px]">Siswa Kategori SP</span>
                      <span className="font-bold text-rose-600 text-base">{dashboardMetrics.criticalStudents} Siswa</span>
                    </div>
                  </div>
                )}
              </div>

              {/* STATS OVERVIEW */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="bg-white p-5 rounded-xl border border-slate-200 flex items-center space-x-4">
                  <div className="p-3 bg-rose-50 text-rose-600 rounded-lg"><AlertTriangle size={24} /></div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Total Pelanggaran</p>
                    <p className="text-2xl font-bold text-slate-900">{dashboardMetrics.totalViolationsCount}</p>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 flex items-center space-x-4">
                  <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg"><Award size={24} /></div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Total Prestasi</p>
                    <p className="text-2xl font-bold text-slate-900">{dashboardMetrics.totalAchievementsCount}</p>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 flex items-center space-x-4">
                  <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg"><UserCheck size={24} /></div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Status Pembinaan Active</p>
                    <p className="text-2xl font-bold text-slate-900">{dashboardMetrics.criticalStudents} Siswa</p>
                  </div>
                </div>
              </div>

              {/* CHART & QUICK LIST */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white p-5 rounded-xl border border-slate-200 lg:col-span-2">
                  <h4 className="font-bold text-slate-900 text-sm mb-4">Sebaran Kategori Pelanggaran</h4>
                  <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={categoryPieData} innerRadius={50} outerRadius={75} paddingAngle={5} dataKey="value">
                          {categoryPieData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-slate-900 text-sm mb-3">Siswa Poin Tertinggi</h4>
                  <div className="space-y-3">
                    {studentStats.sort((a,b) => b.netPoints - a.netPoints).slice(0, 4).map(s => (
                      <div key={s.id} className="p-3 bg-slate-50 rounded-lg flex justify-between items-center text-xs">
                        <div>
                          <p className="font-bold text-slate-800">{s.name}</p>
                          <p className="text-slate-400">Kelas {s.class}</p>
                        </div>
                        <span className="font-black text-rose-600">{s.netPoints} Pts</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ==================== MODULE 2: DATA SISWA ==================== */}
          {activeTab === 'students' && (
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-3">
                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
                  <input
                    type="text"
                    placeholder="Cari NIS, NISN, Nama Siswa..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm"
                  />
                </div>

                <div className="flex space-x-2 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => setIsBulkImportOpen(true)}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg flex items-center space-x-1"
                  >
                    <Upload size={16} />
                    <span>Import Sekaligus</span>
                  </button>
                  <button
                    onClick={() => setIsAddStudentOpen(true)}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg flex items-center space-x-1"
                  >
                    <Plus size={16} />
                    <span>+ Siswa</span>
                  </button>
                </div>
              </div>

              {/* TABLE DATA SISWA */}
              <div className="bg-white rounded-xl border border-slate-200 overflow-x-auto shadow-xs">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-600 font-semibold text-xs border-b">
                    <tr>
                      <th className="p-3">NIS / NISN</th>
                      <th className="p-3">Nama Lengkap</th>
                      <th className="p-3">Kelas</th>
                      <th className="p-3">Tempat, Tgl Lahir</th>
                      <th className="p-3 text-center">Akumulasi Poin</th>
                      <th className="p-3 text-center">Detail</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                    {studentStats
                      .filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.nis.includes(searchQuery) || s.nisn.includes(searchQuery))
                      .map(student => (
                        <tr key={student.id} className="hover:bg-slate-50">
                          <td className="p-3 font-mono">
                            <span className="font-bold text-slate-800">{student.nis}</span>
                            <span className="block text-[10px] text-slate-400">NISN: {student.nisn}</span>
                          </td>
                          <td className="p-3 font-semibold text-slate-900">{student.name}</td>
                          <td className="p-3 font-medium">Kelas {student.class}</td>
                          <td className="p-3">{student.birthPlace}, {student.birthDate}</td>
                          <td className="p-3 text-center">
                            <span className="font-bold text-rose-600">-{student.totalViolationPoints}</span> / <span className="font-bold text-emerald-600">+{student.totalAchievementPoints}</span>
                          </td>
                          <td className="p-3 text-center">
                            <button
                              onClick={() => setSelectedStudentForDetail(student)}
                              className="px-2.5 py-1 bg-indigo-50 text-indigo-600 rounded font-semibold text-[11px]"
                            >
                              Profil BK
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ==================== MODULE 3: POIN PELANGGARAN ==================== */}
          {activeTab === 'violation-points' && (
            <div className="space-y-6">
              <div className="bg-white p-5 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-900 text-sm mb-3">Katalog Bobot Poin Pelanggaran (D.1 - D.51)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-2">
                  {VIOLATION_TYPES.map(v => (
                    <div key={v.id} className="p-3 border rounded-lg flex justify-between items-center text-xs">
                      <div>
                        <span className="font-mono font-bold text-indigo-600 mr-2">{v.code}</span>
                        <span className={`px-2 py-0.5 text-[9px] font-bold rounded ${
                          v.category === 'Ringan' ? 'bg-emerald-100 text-emerald-800' :
                          v.category === 'Sedang' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                        }`}>{v.category}</span>
                        <p className="font-semibold text-slate-800 mt-1">{v.name}</p>
                      </div>
                      <span className="text-sm font-black text-rose-600 ml-2">+{v.points}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==================== MODULE 4: POIN PRESTASI ==================== */}
          {activeTab === 'achievement-points' && (
            <div className="space-y-6">
              <div className="bg-white p-5 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-900 text-sm mb-3">Katalog Reward Poin Prestasi</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-2">
                  {ACHIEVEMENT_TYPES.map(a => (
                    <div key={a.id} className="p-3 border rounded-lg flex justify-between items-center text-xs">
                      <div>
                        <span className="font-mono font-bold text-indigo-600 mr-2">{a.code}</span>
                        <span className="px-2 py-0.5 text-[9px] font-bold rounded bg-emerald-100 text-emerald-800">{a.category}</span>
                        <p className="font-semibold text-slate-800 mt-1">{a.name}</p>
                      </div>
                      <span className="text-sm font-black text-emerald-600 ml-2">+{a.points}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==================== MODULE 5: TINDAK LANJUT ==================== */}
          {activeTab === 'follow-up' && (
            <div className="space-y-5">
              <div className="bg-white p-5 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-900 text-sm mb-1">Status Pembinaan & Tindak Lanjut Siswa</h3>
                <p className="text-xs text-slate-500 mb-4">Klasifikasi tindakan otomatis berdasarkan skor bersih poin siswa.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {studentStats.filter(s => s.netPoints > 0).map(student => (
                    <div key={student.id} className="p-4 border rounded-xl bg-slate-50/50 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold text-slate-900 text-sm">{student.name}</h4>
                            <p className="text-xs text-slate-500">Kelas {student.class} • NIS: {student.nis}</p>
                          </div>
                          <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full border ${student.status.color}`}>
                            {student.status.sp}
                          </span>
                        </div>

                        <div className="mt-3 flex items-center space-x-4 text-xs">
                          <div>
                            <span className="text-slate-400 block text-[10px]">Poin Pelanggaran</span>
                            <span className="font-bold text-rose-600">+{student.totalViolationPoints}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[10px]">Poin Prestasi</span>
                            <span className="font-bold text-emerald-600">+{student.totalAchievementPoints}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[10px]">Skor Bersih</span>
                            <span className="font-black text-slate-800">{student.netPoints} Pts</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 border-t flex justify-between items-center text-xs">
                        <span className="font-medium text-slate-600">Rekomendasi: <strong>{student.status.label}</strong></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==================== MODULE 6: INPUT PELANGGARAN ==================== */}
          {activeTab === 'add-violation' && (
            <div className="max-w-xl mx-auto bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
              <h3 className="font-bold text-slate-900 text-base mb-4 border-b pb-2">6. Form Catat Pelanggaran Baru</h3>
              <form onSubmit={handleAddViolation} className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold block mb-1">Pilih Siswa *</label>
                  <select
                    value={violationForm.studentId}
                    onChange={e => setViolationForm({...violationForm, studentId: e.target.value})}
                    required className="w-full p-2 border rounded bg-white text-xs"
                  >
                    <option value="">-- Pilih Siswa --</option>
                    {students.map(s => <option key={s.id} value={s.id}>{s.name} (Kelas {s.class}) - NIS: {s.nis}</option>)}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold block mb-1">Tanggal</label>
                    <input type="date" value={violationForm.date} onChange={e => setViolationForm({...violationForm, date: e.target.value})} required className="w-full p-2 border rounded" />
                  </div>
                  <div>
                    <label className="font-semibold block mb-1">Waktu</label>
                    <input type="time" value={violationForm.time} onChange={e => setViolationForm({...violationForm, time: e.target.value})} required className="w-full p-2 border rounded" />
                  </div>
                </div>

                <div>
                  <label className="font-semibold block mb-1">Jenis Pelanggaran *</label>
                  <select
                    value={violationForm.violationId}
                    onChange={e => setViolationForm({...violationForm, violationId: e.target.value})}
                    required className="w-full p-2 border rounded bg-white text-xs"
                  >
                    <option value="">-- Pilih Pelanggaran --</option>
                    {VIOLATION_TYPES.map(v => <option key={v.id} value={v.id}>[{v.code} - {v.category} • +{v.points} Pts] {v.name}</option>)}
                  </select>
                </div>

                <div>
                  <label className="font-semibold block mb-1">Tindakan / Sanksi Langsung</label>
                  <input type="text" placeholder="Misal: Teguran Lisan / Pembinaan" value={violationForm.action} onChange={e => setViolationForm({...violationForm, action: e.target.value})} className="w-full p-2 border rounded" />
                </div>

                <div>
                  <label className="font-semibold block mb-1">Guru Pelapor *</label>
                  <input type="text" placeholder="Nama Guru / Petugas BK" value={violationForm.reporter} onChange={e => setViolationForm({...violationForm, reporter: e.target.value})} required className="w-full p-2 border rounded" />
                </div>

                <div>
                  <label className="font-semibold block mb-1">Catatan Tambahan</label>
                  <textarea rows="3" placeholder="Keterangan kronologis singkat..." value={violationForm.note} onChange={e => setViolationForm({...violationForm, note: e.target.value})} className="w-full p-2 border rounded"></textarea>
                </div>

                <div className="flex justify-end pt-2">
                  <button type="submit" className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded font-medium">Simpan & Catat Pelanggaran</button>
                </div>
              </form>
            </div>
          )}

          {/* ==================== MODULE 7: INPUT PRESTASI ==================== */}
          {activeTab === 'add-achievement' && (
            <div className="max-w-xl mx-auto bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
              <h3 className="font-bold text-slate-900 text-base mb-4 border-b pb-2">7. Form Catat Prestasi Siswa</h3>
              <form onSubmit={handleAddAchievement} className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold block mb-1">Pilih Siswa *</label>
                  <select
                    value={achievementForm.studentId}
                    onChange={e => setAchievementForm({...achievementForm, studentId: e.target.value})}
                    required className="w-full p-2 border rounded bg-white text-xs"
                  >
                    <option value="">-- Pilih Siswa --</option>
                    {students.map(s => <option key={s.id} value={s.id}>{s.name} (Kelas {s.class}) - NIS: {s.nis}</option>)}
                  </select>
                </div>

                <div>
                  <label className="font-semibold block mb-1">Tanggal</label>
                  <input type="date" value={achievementForm.date} onChange={e => setAchievementForm({...achievementForm, date: e.target.value})} required className="w-full p-2 border rounded" />
                </div>

                <div>
                  <label className="font-semibold block mb-1">Jenis Prestasi / Apresiasi *</label>
                  <select
                    value={achievementForm.achievementId}
                    onChange={e => setAchievementForm({...achievementForm, achievementId: e.target.value})}
                    required className="w-full p-2 border rounded bg-white text-xs"
                  >
                    <option value="">-- Pilih Prestasi --</option>
                    {ACHIEVEMENT_TYPES.map(a => <option key={a.id} value={a.id}>[{a.code} - {a.category} • +{a.points} Pts] {a.name}</option>)}
                  </select>
                </div>

                <div>
                  <label className="font-semibold block mb-1">Bentuk Reward / Penghargaan</label>
                  <input type="text" placeholder="Misal: Piagam Sekolah / Beasiswa" value={achievementForm.reward} onChange={e => setAchievementForm({...achievementForm, reward: e.target.value})} className="w-full p-2 border rounded" />
                </div>

                <div>
                  <label className="font-semibold block mb-1">Guru Pembimbing / Pelapor *</label>
                  <input type="text" placeholder="Nama Pembimbing" value={achievementForm.supervisor} onChange={e => setAchievementForm({...achievementForm, supervisor: e.target.value})} required className="w-full p-2 border rounded" />
                </div>

                <div>
                  <label className="font-semibold block mb-1">Catatan</label>
                  <textarea rows="3" placeholder="Keterangan tambahan..." value={achievementForm.note} onChange={e => setAchievementForm({...achievementForm, note: e.target.value})} className="w-full p-2 border rounded"></textarea>
                </div>

                <div className="flex justify-end pt-2">
                  <button type="submit" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-medium">Simpan & Catat Prestasi</button>
                </div>
              </form>
            </div>
          )}

          {/* ==================== MODULE 8: LAPORAN & CETAK ==================== */}
          {activeTab === 'reports' && (
            <div className="space-y-6">
              
              <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-4">
                <div className="flex justify-between items-center border-b pb-3">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">8.A. Rekapitulasi Siswa yang Melanggar</h3>
                    <p className="text-xs text-slate-500">Daftar siswa yang memiliki catatan pelanggaran beserta poin dan status sanksinya.</p>
                  </div>
                  <div className="px-3 py-1 bg-rose-50 text-rose-700 font-bold text-xs rounded-lg">
                    Total Pelanggar: {studentStats.filter(s => s.violationCount > 0).length} Siswa
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-600 font-semibold border-b">
                      <tr>
                        <th className="p-2.5">NIS</th>
                        <th className="p-2.5">Nama Siswa</th>
                        <th className="p-2.5">Kelas</th>
                        <th className="p-2.5 text-center">Jml Kasus</th>
                        <th className="p-2.5 text-center">Poin Pelanggaran</th>
                        <th className="p-2.5 text-center">Poin Prestasi</th>
                        <th className="p-2.5 text-center">Skor Bersih</th>
                        <th className="p-2.5">Status Sanksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {studentStats
                        .filter(s => s.violationCount > 0)
                        .map(student => (
                          <tr key={student.id} className="hover:bg-slate-50">
                            <td className="p-2.5 font-mono font-bold text-slate-800">{student.nis}</td>
                            <td className="p-2.5 font-bold text-slate-900">{student.name}</td>
                            <td className="p-2.5 font-medium">Kelas {student.class}</td>
                            <td className="p-2.5 text-center">
                              <span className="px-2 py-0.5 bg-rose-100 text-rose-800 font-bold rounded-full">{student.violationCount}</span>
                            </td>
                            <td className="p-2.5 text-center font-bold text-rose-600">+{student.totalViolationPoints}</td>
                            <td className="p-2.5 text-center font-bold text-emerald-600">+{student.totalAchievementPoints}</td>
                            <td className="p-2.5 text-center font-black text-slate-900">{student.netPoints}</td>
                            <td className="p-2.5">
                              <span className={`px-2 py-0.5 text-[10px] font-bold rounded border ${student.status.color}`}>
                                {student.status.sp}
                              </span>
                            </td>
                          </tr>
                      ))}
                      {studentStats.filter(s => s.violationCount > 0).length === 0 && (
                        <tr>
                          <td colSpan="8" className="p-6 text-center text-slate-400">Belum ada data siswa yang melakukan pelanggaran.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 flex justify-between items-center print:hidden">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">8.B. Cetak Dokumen & Laporan Resmi BK</h3>
                  <p className="text-xs text-slate-500">Cetak laporan rekapitulasi lengkap beserta lembar pengesahan kepala sekolah dan wakasek kesiswaan.</p>
                </div>
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg flex items-center space-x-2"
                >
                  <Printer size={16} />
                  <span>Cetak Dokumen</span>
                </button>
              </div>

            </div>
          )}

        </div>
      </main>

      {/* MODAL EDIT LOGO SEKOLAH */}
      {isEditingLogo && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-5 space-y-4">
            <h3 className="font-bold text-slate-900 text-sm border-b pb-2">Ubah / Ganti Logo Sekolah</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold block mb-1">Unggah File Gambar Logo (PNG/JPG)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (uploadEvent) => {
                        setNewLogoInput(uploadEvent.target.result);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="w-full p-2 border rounded file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Atau Masukkan URL / Base64 Logo</label>
                <input
                  type="text"
                  value={newLogoInput}
                  onChange={e => setNewLogoInput(e.target.value)}
                  placeholder="https://... atau data:image/..."
                  className="w-full p-2 border rounded font-mono text-[11px]"
                />
              </div>

              {newLogoInput && (
                <div className="p-3 bg-slate-50 border rounded flex items-center space-x-3">
                  <span className="text-slate-500">Pratinjau:</span>
                  <div className="w-12 h-12 bg-white border rounded p-1 flex items-center justify-center">
                    <img src={newLogoInput} alt="Preview" className="w-full h-full object-contain" />
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-2 pt-2">
                <button type="button" onClick={() => setIsEditingLogo(false)} className="px-3 py-1.5 border rounded">Batal</button>
                <button
                  type="button"
                  onClick={() => {
                    if (newLogoInput) {
                      setSchoolProfile(prev => ({ ...prev, logoUrl: newLogoInput }));
                      setIsEditingLogo(false);
                      alert('Logo sekolah berhasil diperbarui!');
                    } else {
                      alert('Pilih atau masukkan logo terlebih dahulu.');
                    }
                  }}
                  className="px-3 py-1.5 bg-indigo-600 text-white rounded font-medium"
                >
                  Simpan Logo Baru
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL ADD STUDENT */}
      {isAddStudentOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-5 space-y-4">
            <h3 className="font-bold text-slate-900 text-sm border-b pb-2">Tambah Master Data Siswa</h3>
            <form onSubmit={handleAddStudent} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold block mb-1">NIS *</label>
                <input type="text" value={newStudentData.nis} onChange={e => setNewStudentData({...newStudentData, nis: e.target.value})} required className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="font-semibold block mb-1">NISN</label>
                <input type="text" value={newStudentData.nisn} onChange={e => setNewStudentData({...newStudentData, nisn: e.target.value})} className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="font-semibold block mb-1">Nama Lengkap Siswa *</label>
                <input type="text" value={newStudentData.name} onChange={e => setNewStudentData({...newStudentData, name: e.target.value})} required className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="font-semibold block mb-1">Kelas *</label>
                <input type="text" value={newStudentData.class} onChange={e => setNewStudentData({...newStudentData, class: e.target.value})} required className="w-full p-2 border rounded" />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button type="button" onClick={() => setIsAddStudentOpen(false)} className="px-3 py-1.5 border rounded">Batal</button>
                <button type="submit" className="px-3 py-1.5 bg-indigo-600 text-white rounded font-medium">Simpan Siswa</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL BULK IMPORT SISWA */}
      {isBulkImportOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-lg w-full p-5 space-y-4">
            <h3 className="font-bold text-slate-900 text-sm border-b pb-2">Import Data Siswa Sekaligus (530+ Data Didukung)</h3>
            <form onSubmit={handleBulkImport} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold block mb-1">Pilih Kelas Tujuan</label>
                <select
                  value={bulkTargetClass}
                  onChange={e => setBulkTargetClass(e.target.value)}
                  className="w-full p-2 border rounded bg-white font-bold"
                >
                  {['7A', '7B', '7C', '7D', '7E', '7F', '8A', '8B', '8C', '8D', '8E', '9A', '9B', '9C', '9D', '9E'].map(c => (
                    <option key={c} value={c}>Kelas {c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold block mb-1">Paste Data (Format: NIS [Tab/Koma] NISN [Tab/Koma] Nama)</label>
                <textarea
                  rows="8"
                  placeholder="Tempel data dari Excel di sini..."
                  value={bulkText}
                  onChange={e => setBulkText(e.target.value)}
                  className="w-full p-2 border rounded font-mono text-[11px]"
                  required
                ></textarea>
                <p className="text-[10px] text-slate-500 mt-1">Anda dapat melakukan import seluruh siswa sekaligus tanpa reset saat halaman dimuat ulang.</p>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button type="button" onClick={() => setIsBulkImportOpen(false)} className="px-3 py-1.5 border rounded">Batal</button>
                <button type="submit" className="px-3 py-1.5 bg-emerald-600 text-white rounded font-medium">Proses Import Siswa</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* STUDENT DETAIL MODAL */}
      {selectedStudentForDetail && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-lg w-full p-5 space-y-4">
            <div className="flex justify-between items-start border-b pb-2">
              <div>
                <h3 className="font-bold text-slate-900 text-base">{selectedStudentForDetail.name}</h3>
                <p className="text-xs text-slate-500">NIS: {selectedStudentForDetail.nis} • Kelas {selectedStudentForDetail.class}</p>
              </div>
              <button onClick={() => setSelectedStudentForDetail(null)} className="text-slate-400 hover:text-slate-700">
                <X size={18} />
              </button>
            </div>

            <div className="text-xs space-y-2">
              <p><strong>NISN:</strong> {selectedStudentForDetail.nisn || '-'}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center text-xs">
              <div className="p-2 bg-rose-50 border border-rose-200 rounded">
                <span className="block text-slate-500">Pelanggaran</span>
                <span className="font-bold text-rose-700 text-lg">+{selectedStudentForDetail.totalViolationPoints} Pts</span>
              </div>
              <div className="p-2 bg-emerald-50 border border-emerald-200 rounded">
                <span className="block text-slate-500">Prestasi</span>
                <span className="font-bold text-emerald-700 text-lg">+{selectedStudentForDetail.totalAchievementPoints} Pts</span>
              </div>
            </div>

            <div className="flex justify-end">
              <button onClick={() => setSelectedStudentForDetail(null)} className="px-3 py-1.5 bg-slate-100 rounded text-xs font-semibold">Tutup</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}