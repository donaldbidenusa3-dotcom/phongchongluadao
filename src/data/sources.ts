export interface SourceInfo {
  code: string;
  title: string;
  authority: string;
  url: string;
  description: string;
  effectiveDate?: string;
}

export const OFFICIAL_SOURCES: Record<string, SourceInfo> = {
  'MPS-2026': {
    code: 'MPS-2026',
    title: 'Nâng cao cảnh giác trước 25 kịch bản lừa đảo trên không gian mạng năm 2026',
    authority: 'Bộ Công an (mps.gov.vn)',
    url: 'https://mps.gov.vn/bai-viet/nang-cao-canh-giac-truoc-25-kich-ban-lua-dao-tren-khong-gian-mang-nam-2026-1788865614',
    description: 'Tài liệu cảnh báo toàn diện của Bộ Công an về 25 kịch bản tội phạm mạng tinh vi thường xuyên xuất hiện.',
    effectiveDate: 'Cập nhật năm 2026'
  },
  'MPS-VNEID': {
    code: 'MPS-VNEID',
    title: 'Cảnh báo thủ đoạn lừa đảo cài ứng dụng VNeID giả mạo',
    authority: 'Bộ Công an (mps.gov.vn)',
    url: 'https://mps.gov.vn/bai-viet/canh-bao-thu-doan-lua-dao-cai-ung-dung-vneid-gia-mao-d22-t45880',
    description: 'Cảnh báo đối tượng mạo danh cán bộ phường/công an dụ dỗ nạn nhân tải file APK giả mạo VNeID có mã độc để chiếm quyền điện thoại.',
    effectiveDate: 'Cập nhật 2025-2026'
  },
  'MPS-ID': {
    code: 'MPS-ID',
    title: 'Cảnh báo mạo danh cán bộ Công an yêu cầu cập nhật thông tin căn cước',
    authority: 'Bộ Công an (mps.gov.vn)',
    url: 'https://www.mps.gov.vn/bai-viet/canh-bao-thu-doan-mao-danh-cong-an-goi-dien-chuan-hoa-thong-tin-can-cuoc-tre-em-de-lua-dao-1770194791',
    description: 'Thủ đoạn gọi video, giả mạo quy trình chuẩn hóa định danh, yêu cầu quay khuôn mặt đọc số để thu thập sinh trắc học và mã OTP.',
    effectiveDate: 'Cập nhật 2025-2026'
  },
  'MPS-2025': {
    code: 'MPS-2025',
    title: 'Cảnh báo thủ đoạn tống tiền trực tuyến / bắt cóc online',
    authority: 'Bộ Công an (mps.gov.vn)',
    url: 'https://mps.gov.vn/bai-viet/canh-bao-toi-pham-lua-dao-bang-thu-doan-tong-tien-truc-tuyen-1764129007',
    description: 'Chiêu thức đe dọa người trẻ tuổi, học sinh sinh viên tự cách ly vào khách sạn, ngắt liên lạc gia đình để dàn cảnh tống tiền người thân.',
    effectiveDate: 'Ban hành 2025'
  },
  'MPS-REFUND': {
    code: 'MPS-REFUND',
    title: 'Cảnh báo thủ đoạn lừa đảo mới khi mua hàng online',
    authority: 'Bộ Công an (mps.gov.vn)',
    url: 'https://mps.gov.vn/bai-viet/xuat-hien-thu-doan-lua-dao-moi-khi-mua-hang-online-1790562304',
    description: 'Giả mạo nhân viên sàn thương mại điện tử, báo lỗi đơn hàng, yêu cầu quét QR hoàn tiền hoặc chia sẻ màn hình để chiếm đoạt tài khoản.',
    effectiveDate: 'Cập nhật 2025-2026'
  },
  'MPS-MISTAKE': {
    code: 'MPS-MISTAKE',
    title: 'Cảnh giác thủ đoạn lừa đảo và quy trình xử lý an toàn khi chuyển nhầm tiền',
    authority: 'Bộ Công an (mps.gov.vn)',
    url: 'https://mps.gov.vn/bai-viet/canh-giac-thu-doan-lua-dao-va-quy-trinh-xu-ly-an-toan-khi-chuyen-nham-tien-qua-tai-khoan-1770361075',
    description: 'Thủ đoạn cố tình chuyển nhầm tiền rồi đòi lãi cắt cổ hoặc ép nạn nhân chuyển tiền vòng sang tài khoản thứ ba để rửa tiền.',
    effectiveDate: 'Cập nhật 2025-2026'
  },
  'LAW-CYBER': {
    code: 'LAW-CYBER',
    title: 'Luật An ninh mạng Việt Nam số 24/2018/QH14',
    authority: 'Cổng thông tin điện tử Chính phủ (vanban.chinhphu.vn)',
    url: 'https://vanban.chinhphu.vn/?classid=1&docid=206114&pageid=27160',
    description: 'Quy định về bảo vệ an ninh mạng đối với hệ thống thông tin quan trọng về an ninh quốc gia, phòng ngừa, xử lý hành vi xâm phạm an ninh mạng.',
    effectiveDate: 'Có hiệu lực từ ngày 01/01/2019'
  },
  'LAW-CONSUMER': {
    code: 'LAW-CONSUMER',
    title: 'Luật Bảo vệ quyền lợi người tiêu dùng số 19/2023/QH15',
    authority: 'Cổng thông tin điện tử Chính phủ (vanban.chinhphu.vn)',
    url: 'https://vanban.chinhphu.vn/?classid=1&docid=208363&orggroupid=1&pageid=27160&previousPage=other+articles',
    description: 'Quy định quyền và nghĩa vụ của người tiêu dùng, trách nhiệm của tổ chức, cá nhân kinh doanh đối với người tiêu dùng trong giao dịch điện tử.',
    effectiveDate: 'Có hiệu lực từ ngày 01/07/2024'
  },
  'LAW-DATA': {
    code: 'LAW-DATA',
    title: 'Luật Bảo vệ dữ liệu cá nhân số 91/2025/QH15',
    authority: 'Cổng thông tin điện tử Chính phủ (vanban.chinhphu.vn)',
    url: 'https://vanban.chinhphu.vn/?classid=1&docid=214590&pageid=27160&typegroup=',
    description: 'Luật khung quy định về nguyên tắc bảo vệ, quyền của chủ thể dữ liệu cá nhân và các biện pháp bảo vệ dữ liệu cá nhân tại Việt Nam.',
    effectiveDate: 'Được Quốc hội thông qua 2025, có hiệu lực từ 01/01/2026'
  }
};
