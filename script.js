document.addEventListener('DOMContentLoaded', () => {
  // 1. Scroll Reveal Animation
  const reveals = document.querySelectorAll('.reveal');

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 100;

    reveals.forEach((reveal) => {
      const elementTop = reveal.getBoundingClientRect().top;
      if (elementTop < windowHeight - elementVisible) {
        reveal.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Trigger on load

  // 2. Navbar Scroll Effect
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 3. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');

  mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Close mobile menu when clicking a link
  const navItems = document.querySelectorAll('.nav-links a');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });

  // 4. Interactive Accordion for Hukum Section
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const content = item.querySelector('.accordion-content');
    
    // Set initial max-height for active item (if any)
    if (item.classList.contains('active')) {
      setTimeout(() => {
        content.style.maxHeight = content.scrollHeight + 'px';
      }, 50);
    }

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all accordion items
      accordionItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        otherItem.querySelector('.accordion-content').style.maxHeight = null;
      });

      // If the clicked item was not active, open it
      if (!isActive) {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  // 5. Smooth Scrolling for Navigation Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // 6. Animated Stats Counter
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsAnimated = false;

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const startTime = performance.now();

    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      const current = Math.round(easedProgress * target);
      
      el.textContent = current.toLocaleString('id-ID');

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  };

  const checkStatsVisible = () => {
    if (statsAnimated) return;
    
    const statsRow = document.querySelector('.stats-row');
    if (!statsRow) return;

    const rect = statsRow.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      statsAnimated = true;
      statNumbers.forEach((el, index) => {
        setTimeout(() => animateCounter(el), index * 200);
      });
    }
  };

  window.addEventListener('scroll', checkStatsVisible);
  checkStatsVisible(); // Check on load

  // 7. Interactive Floor Plan - Room Click
  const roomData = {
    gudang: {
      title: 'Gudang',
      risk: 'SEDANG',
      riskClass: 'risk-sedang',
      bahaya: 'Penyimpanan barang di rak tinggi. Risiko tertimpa benda jatuh saat pengambilan material.',
      pencegahan: 'SOP penyusunan palet hierarkis, inspeksi rak berkala, pembatasan tinggi tumpukan.',
      apd: 'Helm Safety, Sepatu Safety, Sarung Tangan',
      petugas: 'Kepala Gudang — Yusuf Ramadan'
    },
    produksi: {
      title: 'Area Produksi',
      risk: 'TINGGI',
      riskClass: 'risk-tinggi',
      bahaya: 'Mesin berat dan conveyor beroperasi terus-menerus. Risiko anggota tubuh terjepit atau terpotong.',
      pencegahan: 'Sertifikasi operator wajib, guard rel mesin, prosedur LOTO, sensor keamanan.',
      apd: 'Helm, Sarung Tangan, Sepatu Safety, Earplug',
      petugas: 'Kepala Produksi — Dewi Lestari'
    },
    perakitan: {
      title: 'Area Perakitan',
      risk: 'SEDANG',
      riskClass: 'risk-sedang',
      bahaya: 'Alat pneumatik dan robotik perakitan. Benturan benda keras & kebisingan tinggi >85 dB.',
      pencegahan: 'Pemasangan sensor gerak, peredam suara, SOP peralatan ketat.',
      apd: 'Earplug/Earmuff, Sarung Tangan, Helm',
      petugas: 'Kepala Perakitan — Agus Kurniawan'
    },
    panel: {
      title: 'Ruang Panel Listrik',
      risk: 'TINGGI',
      riskClass: 'risk-tinggi',
      bahaya: 'Panel distribusi tegangan tinggi. Risiko tersengat listrik mematikan dan arc flash.',
      pencegahan: 'Prosedur LOTO (Lockout/Tagout) ketat, akses terbatas hanya teknisi bersertifikat.',
      apd: 'Sarung Tangan Isolasi, Pelindung Wajah, Sepatu Isolasi',
      petugas: 'Direktur K3 & HSE — Ahmad Fauzi, S.K.M.'
    },
    kantor: {
      title: 'Kantor Utama',
      risk: 'RENDAH',
      riskClass: 'risk-rendah',
      bahaya: 'Instalasi kabel elektronik. Risiko korsleting dan tersengat arus listrik ringan.',
      pencegahan: 'Inspeksi rutin instalasi kabel terpusat, APAR tersedia di setiap lantai.',
      apd: 'Tidak diperlukan APD khusus',
      petugas: 'Kepala Administrasi — Rudi Hartono'
    },
    painting: {
      title: 'Ruang Painting',
      risk: 'TINGGI',
      riskClass: 'risk-tinggi',
      bahaya: 'Partikel cat dan cairan thinner. Intoksikasi pernapasan, iritasi mata, dan risiko ledakan.',
      pencegahan: 'Bilik tertutup dengan exhaust filter, ventilasi wajib, larangan api terbuka.',
      apd: 'Masker Respirator, Sarung Tangan Kimia, Goggles',
      petugas: 'Kepala Produksi — Dewi Lestari'
    },
    las: {
      title: 'Area Pengelasan',
      risk: 'TINGGI',
      riskClass: 'risk-tinggi',
      bahaya: 'Percikan material panas & sinar UV. Luka bakar lokal dan kebutaan sementara.',
      pencegahan: 'Tirai las pelindung UV, zona aman terdelimitasi, pemeriksaan alat harian.',
      apd: 'Kacamata Las, Sarung Tangan, Celemek Tahan Panas, Wearpack',
      petugas: 'Kepala Bengkel — Fitri Handayani'
    },
    cuci: {
      title: 'Pencucian Komponen',
      risk: 'SEDANG',
      riskClass: 'risk-sedang',
      bahaya: 'Cairan solvent & pelarut karat asam. Luka bakar kimiawi dan keracunan kulit.',
      pencegahan: 'Penyimpanan B3 sesuai standar, Eye Wash Station tersedia, ventilasi aktif.',
      apd: 'Celemek Kimia, Goggles, Sarung Tangan',
      petugas: 'Kepala QC — Sari Rahayu'
    },
    bengkel: {
      title: 'Bengkel Servis',
      risk: 'SEDANG',
      riskClass: 'risk-sedang',
      bahaya: 'Oli mesin dan cairan pelumas bekas. Risiko tergelincir di area kerja.',
      pencegahan: 'Pembersihan tumpahan instan, lantai anti-slip, spill kit tersedia.',
      apd: 'Masker, Sarung Tangan, Wearpack Safety',
      petugas: 'Kepala Bengkel — Fitri Handayani'
    },
    logistik: {
      title: 'Logistik Luar',
      risk: 'TINGGI',
      riskClass: 'risk-tinggi',
      bahaya: 'Pergerakan forklift & truk pengangkut berat. Risiko tertabrak kendaraan — fatalitas.',
      pencegahan: 'Pemisahan jalur pedestrian, batas kecepatan 15 km/h, klakson wajib.',
      apd: 'Rompi Reflektif, Helm Safety, Sepatu Safety',
      petugas: 'Kepala Gudang — Yusuf Ramadan'
    },
    engineering: {
      title: 'Ruang Engineering (R&D)',
      risk: 'RENDAH',
      riskClass: 'risk-rendah',
      bahaya: 'Ergonomi buruk akibat duduk terlalu lama, paparan radiasi monitor ringan.',
      pencegahan: 'Kursi ergonomis, aturan jeda istirahat 20-20-20, pencahayaan layar optimal.',
      apd: 'Tidak diperlukan APD khusus',
      petugas: 'Kepala Engineering — Budi Santoso'
    },
    meeting: {
      title: 'Ruang Meeting Utama',
      risk: 'RENDAH',
      riskClass: 'risk-rendah',
      bahaya: 'Jalur evakuasi terhalang jika overkapasitas (>50 orang) saat keadaan darurat.',
      pencegahan: 'Pembatasan kapasitas peserta, poster jalur evakuasi jelas, detektor asap aktif.',
      apd: 'Tidak diperlukan APD khusus',
      petugas: 'Kepala HRD — Ratna Sari'
    },
    server: {
      title: 'Ruang Server IT',
      risk: 'SEDANG',
      riskClass: 'risk-sedang',
      bahaya: 'Kebakaran elektrikal tingkat tinggi, kebisingan server konstan, dan suhu sangat rendah.',
      pencegahan: 'Pemadam api gas (FM-200), kontrol suhu & kelembaban otomatis, akses kartu terbatas.',
      apd: 'Jaket insulasi (bagi teknisi piket)',
      petugas: 'Manajer IT — Hendra Wijaya'
    },
    pantry: {
      title: 'Area Istirahat & Pantry',
      risk: 'RENDAH',
      riskClass: 'risk-rendah',
      bahaya: 'Risiko tersiram air mendidih dari dispenser dan tergelincir akibat tumpahan minuman.',
      pencegahan: 'Penggunaan lantai tekstur anti-slip, instruksi pemakaian alat dapur, kebersihan rutin.',
      apd: 'Tidak diperlukan APD khusus',
      petugas: 'General Affair — Siti Aminah'
    }
  };

  const floorRooms = document.querySelectorAll('.floor-room');
  const detailPanel = document.getElementById('roomDetailPanel');
  const detailTitle = document.getElementById('roomDetailTitle');
  const detailBadge = document.getElementById('roomDetailBadge');
  const detailBody = document.getElementById('roomDetailBody');

  floorRooms.forEach(room => {
    room.addEventListener('click', () => {
      const roomId = room.getAttribute('data-room');
      const data = roomData[roomId];
      if (!data) return;

      // Remove active from all rooms
      floorRooms.forEach(r => r.classList.remove('active-room'));
      room.classList.add('active-room');

      // Update panel
      detailPanel.classList.add('active');
      detailTitle.textContent = data.title;
      detailBadge.textContent = data.risk;
      detailBadge.className = 'room-detail-badge risk-badge ' + data.riskClass;
      detailBadge.style.display = 'inline-block';

      detailBody.innerHTML = `
        <div class="room-detail-item">
          <div class="room-detail-label">Potensi Bahaya</div>
          <div class="room-detail-value">${data.bahaya}</div>
        </div>
        <div class="room-detail-item">
          <div class="room-detail-label">Tindakan Pencegahan</div>
          <div class="room-detail-value">${data.pencegahan}</div>
        </div>
        <div class="room-detail-item">
          <div class="room-detail-label">APD Wajib</div>
          <div class="room-detail-value">${data.apd}</div>
        </div>
        <div class="room-detail-item">
          <div class="room-detail-label">Penanggung Jawab</div>
          <div class="room-detail-value">${data.petugas}</div>
        </div>
      `;
    });
  });

  // 8. Floor Tab Switching
  const floorTabs = document.querySelectorAll('.floor-tab');
  const floorContainers = document.querySelectorAll('.floor-svg-container');

  floorTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs and containers
      floorTabs.forEach(t => t.classList.remove('active'));
      floorContainers.forEach(c => c.classList.remove('active'));

      // Add active class to clicked tab and corresponding container
      tab.classList.add('active');
      const targetId = tab.getAttribute('data-target');
      document.getElementById(targetId).classList.add('active');

      // Reset detail panel
      floorRooms.forEach(r => r.classList.remove('active-room'));
      detailPanel.classList.remove('active');
      detailTitle.textContent = 'Pilih Ruangan';
      detailBadge.style.display = 'none';
      detailBody.innerHTML = '<p class="room-detail-hint"><i class="fa-solid fa-hand-pointer"></i> Klik pada salah satu ruangan di denah untuk melihat detail potensi bahaya.</p>';
    });
  });
});

