import jsPDF from 'jspdf';
import { HANDBOOK_CHAPTERS, HANDBOOK_METADATA } from '../data/handbook';
import { OFFICIAL_SOURCES } from '../data/sources';

export function exportHandbookToPDF(playerName: string = 'Người Chơi Xuất Sắc') {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - margin) {
      doc.addPage();
      y = margin;
      renderPageHeader();
    }
  };

  const renderPageHeader = () => {
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text('AI LÀ ĐÀO LỬA • CẨM NANG PHÒNG CHỐNG LỪA ĐẢO TRỰC TUYẾN 2026', margin, 10);
    doc.setDrawColor(203, 213, 225);
    doc.line(margin, 12, pageWidth - margin, 12);
  };

  // COVER / HEADER BLOCK
  doc.setFillColor(15, 23, 42); // Navy 900
  doc.rect(margin, y, contentWidth, 38, 'F');

  doc.setTextColor(250, 204, 21); // Amber 400
  doc.setFontSize(16);
  doc.text('AI LA DAO LUA - AN TOAN KHONG GIAN MANG', margin + 6, y + 12);

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.text('CAM NANG PHONG CHONG LUA DAO TRUC TUYEN 2026', margin + 6, y + 21);

  doc.setFontSize(8.5);
  doc.setTextColor(148, 163, 184);
  doc.text(`Nguoi so huu: ${playerName} • Ngay cap: ${new Date().toLocaleDateString('vi-VN')}`, margin + 6, y + 30);

  y += 46;

  // Introduction
  doc.setTextColor(30, 41, 59);
  doc.setFontSize(10);
  const introText = [
    'Tai lieu du lieu chinh thuc duoc doi chieu theo can cu phap luat:',
    '- Luat An ninh mang Viet Nam so 24/2018/QH14',
    '- Luat Bao ve quyen loi nguoi tieu dung so 19/2023/QH15',
    '- Luat Bao ve du lieu ca nhan so 91/2025/QH15',
    '- Canh bao 25 kich ban toi pham mang - Bo Cong an (mps.gov.vn)'
  ];
  introText.forEach(line => {
    checkPageBreak(7);
    doc.text(line, margin, y);
    y += 5.5;
  });

  y += 4;
  doc.setDrawColor(226, 232, 240);
  doc.line(margin, y, pageWidth - margin, y);
  y += 6;

  // CHAPTERS
  HANDBOOK_CHAPTERS.forEach((chapter) => {
    checkPageBreak(25);

    // Chapter Header
    doc.setFillColor(30, 58, 138); // Blue 900
    doc.rect(margin, y, contentWidth, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.text(`CHUONG ${chapter.id}: ${chapter.title.toUpperCase()}`, margin + 3, y + 5.5);
    y += 12;

    // Summary
    doc.setTextColor(71, 85, 105);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'italic');
    const summaryLines = doc.splitTextToSize(`* ${chapter.summary}`, contentWidth);
    doc.text(summaryLines, margin, y);
    y += summaryLines.length * 4.5 + 3;
    doc.setFont('helvetica', 'normal');

    // Content Items
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(8.5);
    chapter.content.forEach((item) => {
      const itemLines = doc.splitTextToSize(`• ${item}`, contentWidth - 4);
      checkPageBreak(itemLines.length * 4.2 + 2);
      doc.text(itemLines, margin + 2, y);
      y += itemLines.length * 4.2 + 1.8;
    });

    // Key Tips
    if (chapter.tips.length > 0) {
      checkPageBreak(12);
      doc.setFillColor(254, 243, 199); // Amber 100
      const tipBoxHeight = chapter.tips.length * 4.5 + 4;
      doc.rect(margin, y, contentWidth, tipBoxHeight, 'F');
      doc.setTextColor(146, 64, 14); // Amber 800
      doc.setFontSize(8);
      let tipY = y + 4;
      chapter.tips.forEach(t => {
        const tLines = doc.splitTextToSize(`[!] ${t}`, contentWidth - 6);
        doc.text(tLines, margin + 3, tipY);
        tipY += tLines.length * 4;
      });
      y += tipBoxHeight + 5;
    }

    y += 3;
  });

  // OFFICIAL DIRECTORY OF HOTLINES
  checkPageBreak(40);
  doc.setFillColor(15, 23, 42);
  doc.rect(margin, y, contentWidth, 8, 'F');
  doc.setTextColor(250, 204, 21);
  doc.setFontSize(10);
  doc.text('DANH BA KHAN CAP TIEP NHAN TO GIAC LUA DAO', margin + 3, y + 5.5);
  y += 12;

  const hotlines = [
    '• Tong dai phan anh cuoc goi rac, cuoc goi lua dao: 156 hoac 5656 (Mien phi 24/7)',
    '• Tong dai Quoc gia Bao ve Tre em (Bat coc online, tong tien): 111 (Mien phi)',
    '• Cong tiep nhan bao cao trang web lua dao quoc gia: canhbao.khonggianmang.vn',
    '• Cong thong tin Bo Cong an (Trinh bao toi pham cong nghe cao A05): mps.gov.vn',
    '• Cổng van ban Chinh phu (Tra cuu Luat An ninh mang & Du lieu ca nhan): vanban.chinhphu.vn'
  ];

  doc.setTextColor(30, 41, 59);
  doc.setFontSize(8.5);
  hotlines.forEach(h => {
    checkPageBreak(6);
    doc.text(h, margin, y);
    y += 5.5;
  });

  // REFERENCES
  y += 4;
  checkPageBreak(25);
  doc.setTextColor(100, 116, 139);
  doc.setFontSize(8);
  doc.text('CAN CU TAI LIEU VA NGUON DU LIEU GOC:', margin, y);
  y += 5;

  Object.values(OFFICIAL_SOURCES).forEach(src => {
    checkPageBreak(5);
    doc.text(`[${src.code}] ${src.title} - ${src.authority}`, margin, y);
    y += 4.5;
  });

  doc.save(`Cam_Nang_Phong_Chong_Lua_Dao_2026_${playerName.replace(/\s+/g, '_')}.pdf`);
}
