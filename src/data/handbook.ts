import { HandbookChapter } from '../types/game';

export const HANDBOOK_METADATA = {
  title: 'CẨM NANG PHÒNG CHỐNG LỪA ĐẢO TRỰC TUYẾN',
  subtitle: 'Nhận diện lừa đảo – Bảo vệ chính mình – An toàn trên không gian số',
  edition: 'Ấn bản Toàn diện 2026',
  publishedDate: 'Tháng 03/2026',
  legalBasis: [
    'Luật An ninh mạng Việt Nam số 24/2018/QH14',
    'Luật Bảo vệ quyền lợi người tiêu dùng số 19/2023/QH15',
    'Luật Bảo vệ dữ liệu cá nhân số 91/2025/QH15',
    'Cảnh báo 25 kịch bản tội phạm mạng - Cục An ninh mạng và phòng, chống tội phạm sử dụng công nghệ cao (A05) - Bộ Công an'
  ]
};

export const HANDBOOK_CHAPTERS: HandbookChapter[] = [
  {
    id: 1,
    title: '20 Dấu hiệu nhận biết lừa đảo trực tuyến phổ biến',
    icon: 'AlertTriangle',
    summary: 'Nhận diện ngay lập tức các tín hiệu đỏ trong mọi cuộc gọi, tin nhắn và quảng cáo bất thường.',
    content: [
      '1. Hối thúc khẩn cấp, tạo áp lực thời gian (5 phút, 10 phút, ngay lập tức) để nạn nhân hoảng loạn.',
      '2. Yêu cầu tuyệt đối giữ bí mật, không được chia sẻ với người thân, gia đình hoặc bạn bè.',
      '3. Tự xưng là cán bộ Công an, Viện kiểm sát, Tòa án làm việc qua điện thoại hoặc mạng xã hội.',
      '4. Yêu cầu chuyển tiền vào "Tài khoản an toàn", "Tài khoản chứng minh vô tội", "Tài khoản tạm giữ".',
      '5. Gửi đường link lạ bắt đăng nhập tài khoản ngân hàng, tài khoản mạng xã hội hoặc ví điện tử.',
      '6. Yêu cầu cung cấp mã OTP, mật khẩu đăng nhập, mã PIN hoặc mã CVV ở mặt sau thẻ.',
      '7. Lời hứa việc nhẹ lương cao, kiếm tiền online bằng cách bấm like, xem video, làm nhiệm vụ nạp tiền.',
      '8. Cam kết đầu tư lợi nhuận siêu khủng (1% - 5%/ngày, 30% - 100%/tháng), bao lỗ, thắng chắc 100%.',
      '9. Yêu cầu nộp "phí giải ngân", "phí kích hoạt hồ sơ", "phí bảo hiểm khoản vay" trước khi nhận tiền.',
      '10. Gửi file cài đặt ứng dụng đuôi lạ (.apk) qua Zalo/Telegram thay vì tải từ Google Play hoặc App Store.',
      '11. Yêu cầu cấp "Quyền trợ năng (Accessibility)" hoặc quyền "Đọc tin nhắn SMS" trên điện thoại.',
      '12. Hướng dẫn bật tính năng "Chia sẻ màn hình" qua Zalo, Messenger hoặc cài phần mềm điều khiển từ xa.',
      '13. Thông báo trúng thưởng lớn bất ngờ từ chương trình mà bạn không hề tham gia, yêu cầu nộp lệ phí nhận quà.',
      '14. Người quen trên mạng nhắn tin mượn tiền gấp nhưng từ chối gọi điện thoại viễn thông thông thường.',
      '15. Cuộc gọi video người thân nhưng hình ảnh chập chờn, cử động miệng đơ cứng, ngắt máy sau vài giây (Deepfake).',
      '16. Người mua hàng gửi link "nhận tiền" hoặc ảnh biên lai chuyển khoản giả đòi giao hàng ngay.',
      '17. Mối quan hệ tình cảm online phát triển chóng mặt rồi dẫn dụ góp vốn đầu tư tiền số, sàn forex.',
      '18. Chiêu thức dán đè mã QR thanh toán tại quầy thu ngân cửa hàng bằng mã cá nhân của kẻ gian.',
      '19. Tin nhắn SMS giả mạo Brandname ngân hàng báo tài khoản bị khóa kèm đường link giả mạo.',
      '20. Dịch vụ online nhận "thu hồi tiền treo", "lấy lại tiền lừa đảo" nhưng đòi nộp phí trước.'
    ],
    tips: [
      'Ghi nhớ quy tắc: Càng hối hả, càng áp lực thì khả năng lừa đảo càng cao.',
      'Mọi giao dịch liên quan đến tiền bạc đều cần ít nhất một bước xác thực độc lập ngoài đời thực.'
    ],
    sources: ['MPS-2026', 'MPS-2025']
  },
  {
    id: 2,
    title: 'Những nguyên tắc thép bảo vệ tài khoản ngân hàng',
    icon: 'ShieldCheck',
    summary: 'Xây dựng lá chắn bất khả xâm phạm cho tài sản số và hạn mức giao dịch ngân hàng.',
    content: [
      'Tài khoản ngân hàng là tài sản định danh trực tiếp của công dân. Mọi sơ hở đều có thể dẫn đến mất trắng toàn bộ số dư trong chớp mắt.',
      '1. Không bao giờ chia sẻ tên đăng nhập, mật khẩu Internet Banking, mã Smart OTP hoặc mã PIN thẻ với bất kỳ ai (kể cả nhân viên ngân hàng).',
      '2. Đặt hạn mức chuyển khoản phù hợp theo ngày: Chỉ duy trì hạn mức vừa đủ chi tiêu thường nhật trên app. Khi cần chuyển khoản lớn mới kích hoạt tạm thời.',
      '3. Cài đặt xác thực sinh trắc học (khuôn mặt/vân tay) theo Quyết định 2345/QĐ-NHNN cho các giao dịch trên 10 triệu đồng hoặc tổng giao dịch trong ngày vượt 20 triệu đồng.',
      '4. Tuyệt đối không cho thuê, mượn hoặc bán tài khoản ngân hàng: Hành vi này có thể bị xử lý hình sự về tội tiếp tay rửa tiền theo Điều 291 Bộ luật Hình sự.',
      '5. Chủ động kiểm tra số dư và thông báo biến động số dư tức thời qua tin nhắn OTT trong ứng dụng thay vì chỉ tin vào ảnh chụp biên lai của đối tác.'
    ],
    tips: [
      'Ngân hàng không bao giờ gọi điện yêu cầu khách hàng cung cấp mã OTP hay mật khẩu dưới bất kỳ lý do gì.',
      'Nếu nghi ngờ lộ mật khẩu, dùng tính năng "Khóa thẻ / Khóa dịch vụ khẩn cấp" ngay trên ứng dụng.'
    ],
    sources: ['MPS-2026', 'Ngân hàng Nhà nước Việt Nam']
  },
  {
    id: 3,
    title: 'Cách bảo vệ mật khẩu và mã OTP tuyệt đối',
    icon: 'Key',
    summary: 'Chìa khóa bảo mật hai lớp và kỹ thuật đặt mật khẩu chống dò quét tự động.',
    content: [
      'Mật khẩu và mã OTP là hai lớp khóa bảo vệ dữ liệu và tiền bạc của bạn trước các đợt tấn công từ xa.',
      '1. Độ dài và cấu trúc mật khẩu: Sử dụng cụm mật khẩu (Passphrase) từ 12 ký tự trở lên, kết hợp chữ in hoa, chữ thường, số và ký tự đặc biệt.',
      '2. Nguyên tắc độc lập: Không bao giờ dùng chung một mật khẩu cho email chính, tài khoản ngân hàng, mạng xã hội và các trang mua sắm.',
      '3. Bản chất của mã OTP: OTP (One-Time Password) là mật khẩu sử dụng một lần có thời hạn vài chục giây để ký duyệt lệnh thanh toán. Không đọc mã này cho người khác.',
      '4. Cảnh giác với OTP giả mạo: Đọc kỹ nội dung tin nhắn gửi kèm mã OTP xem đó là mã "Đăng ký dịch vụ mới", "Đổi thiết bị" hay "Chuyển tiền" trước khi nhập.',
      '5. Sử dụng ứng dụng xác thực chuyên dụng (Google Authenticator, Microsoft Authenticator) thay vì nhận OTP qua SMS truyền thống.'
    ],
    tips: [
      'Không lưu mật khẩu trong ghi chú điện thoại, không chụp ảnh màn hình lưu trong thư viện ảnh.',
      'Sử dụng trình quản lý mật khẩu uy tín (Bitwarden, 1Password hoặc Keychain hệ thống).'
    ],
    sources: ['MPS-2026', 'NCSC Việt Nam']
  },
  {
    id: 4,
    title: 'Cách nhận diện website và ứng dụng giả mạo',
    icon: 'Globe',
    summary: 'Phân biệt tên miền chính thống, bẫy Phishing và mã độc đội lốt ứng dụng.',
    content: [
      'Kẻ tấn công thường tạo các website và ứng dụng có giao diện giống hệt trang thật để đánh lừa thị giác người dùng.',
      '1. Kiểm tra kỹ tên miền trên thanh địa chỉ: Chú ý các ký tự thay thế tinh vi như ký tự l thay bằng 1, o thay bằng 0, thêm bớt từ (vietcombank.com.vn khác vietcomrbank.com hay vietcombank-ebank.xyz).',
      '2. Nhận diện trang cơ quan nhà nước Việt Nam: Các cổng dịch vụ công và cơ quan nhà nước luôn sử dụng tên miền cấp quốc gia có phần đuôi kết thúc bằng ".gov.vn".',
      '3. Hiểu đúng về biểu tượng ổ khóa HTTPS: HTTPS chỉ chứng minh dữ liệu được mã hóa giữa máy bạn và máy chủ, không chứng minh trang web đó không phải là trang lừa đảo.',
      '4. Nguy cơ từ file cài đặt ứng dụng APK: Kẻ gian thường gửi link tải file .apk để cài ứng dụng mạo danh Bộ Công an, Thuế điện tử hoặc VNeID giả mạo chứa mã độc gián điệp.',
      '5. Cảnh báo quyền truy cập nguy hiểm: Không bao giờ cấp "Quyền trợ năng" (Accessibility Services) cho ứng dụng không rõ nguồn gốc.'
    ],
    tips: [
      'Chỉ cài đặt ứng dụng từ Google Play Store và Apple App Store chính thức.',
      'Kiểm tra chứng nhận tín nhiệm mạng tại tinnhiemmang.vn.'
    ],
    sources: ['MPS-VNEID', 'Cục An toàn thông tin']
  },
  {
    id: 5,
    title: 'Cách nhận diện và đối phó cuộc gọi giả danh Công an',
    icon: 'PhoneCall',
    summary: 'Quy trình chuẩn mực của cơ quan pháp luật và kỹ năng xử lý khi bị đe dọa.',
    content: [
      'Thủ đoạn giả danh cán bộ Công an, Viện kiểm sát, Tòa án thông báo liên quan đến đường dây ma túy, rửa tiền xuyên quốc gia là kịch bản rất phổ biến.',
      '1. Nguyên tắc làm việc của cơ quan Công an: Cơ quan Công an các cấp khi làm việc với công dân BẮT BUỘC phải gửi Giấy mời hoặc Giấy triệu tập trực tiếp đến địa phương hoặc nơi cư trú.',
      '2. Tuyệt đối không làm việc qua điện thoại: Không có việc điều tra vụ án, lấy lời khai hoặc ra quyết định tố tụng qua Zalo hay cuộc gọi thông thường.',
      '3. Không có "Tài khoản an toàn": Cơ quan nhà nước không bao giờ yêu cầu người dân chuyển tiền vào tài khoản ngân hàng để "chứng minh tài sản" hay "kiểm tra nguồn tiền".',
      '4. Không gửi Lệnh bắt, Lệnh triệu tập qua mạng xã hội: Tất cả các văn bản tố tụng gửi qua ảnh chụp Zalo, Facebook đều là văn bản giả mạo con dấu.',
      '5. Kỹ năng đối phó: Khi nhận cuộc gọi tự xưng Công an dọa bắt giữ, hãy bình tĩnh nói "Tôi sẽ đến trực tiếp trụ sở Công an phường/quận nơi cư trú để làm việc" rồi cúp máy.'
    ],
    tips: [
      'Kẻ lừa đảo luôn dọa bắt khẩn cấp và cấm kể cho gia đình. Hãy nhớ: Càng cấm kể càng phải báo người thân ngay lập tức.',
      'Ghi âm cuộc gọi và lưu số điện thoại để phản ánh qua đầu số 156.'
    ],
    sources: ['MPS-2026', 'MPS-2025', 'Bộ Công an']
  },
  {
    id: 6,
    title: 'Cách nhận diện công nghệ giả mạo AI và Deepfake',
    icon: 'Cpu',
    summary: 'Bóc trần hình ảnh, khuôn mặt và giọng nói giả lập được sinh bởi trí tuệ nhân tạo.',
    content: [
      'Công nghệ AI tạo sinh cho phép tội phạm tái tạo giọng nói (DeepVoice) và khuôn mặt (Deepfake) người thân chỉ từ vài giây âm thanh hoặc hình ảnh trên mạng.',
      '1. Dấu hiệu trong cuộc gọi video Deepfake: Khuôn mặt có viền mờ xung quanh cằm và tóc; chớp mắt bất thường hoặc không chớp mắt; khẩu hình miệng không khớp tự nhiên với âm thanh.',
      '2. Chiêu trò "mạng chập chờn": Đối tượng thường chỉ bật video trong 3 - 5 giây, viện cớ đang ở nơi sóng yếu hoặc camera hỏng rồi tắt đi để chuyển sang nhắn tin.',
      '3. DeepVoice nhái giọng người thân: Giọng nói nghe rất giống nhưng âm sắc thường đều đều, thiếu cảm xúc tự nhiên, xen lẫn tiếng ồn nền bất thường (tiếng còi hú, tạp âm) để che giấu khuyết điểm.',
      '4. Kỹ thuật xác minh bằng câu hỏi mật: Hỏi đối phương những sự kiện riêng tư chỉ hai người trong gia đình biết (ví dụ: "Hôm qua con mèo nhà mình ăn gì?", "Biệt danh thời nhỏ của em là gì?").',
      '5. Không tin một kênh duy nhất: Bắt buộc gọi lại bằng cuộc gọi thoại thông thường vào số điện thoại viễn thông gốc của người thân.'
    ],
    tips: [
      'Tạo "Mật khẩu an toàn gia đình" (Family Safe Word) gồm 1 cụm từ bí mật mà gia đình chỉ dùng khi có tình huống khẩn cấp thật sự.',
      'Hạn chế đăng tải các đoạn video nói chuyện rõ mặt, rõ giọng của con trẻ lên mạng xã hội công khai.'
    ],
    sources: ['MPS-2026', 'Bộ Công an']
  },
  {
    id: 7,
    title: 'Cẩm nang mua sắm và thanh toán online an toàn',
    icon: 'ShoppingCart',
    summary: 'Bảo vệ ví tiền khi mua sắm trên sàn thương mại điện tử và mạng xã hội.',
    content: [
      'Mua bán trực tuyến phát triển mạnh đi kèm hàng loạt bẫy lừa đảo đơn hàng giả, shipper giả mạo và hoàn tiền ảo.',
      '1. Không giao dịch ngoài sàn: Giữ toàn bộ quá trình trao đổi, đặt hàng và thanh toán trong ứng dụng chính thức (Shopee, TikTok Shop, Lazada). Kẻ gian thường dụ sang Zalo/Telegram để né tránh sự kiểm duyệt.',
      '2. Cảnh giác chiêu trò "Ship hàng nhưng chưa đặt": Nhận bưu kiện COD giá trị nhỏ vài chục nghìn đồng nhưng bên trong là rác hoặc tờ giấy trắng.',
      '3. Thận trọng với hàng giảm giá 70 - 90%: Giá rẻ bất thường là mồi câu kinh điển để gom tiền đặt cọc rồi chặn liên lạc.',
      '4. Kiểm tra mã đặt chỗ vé máy bay/khách sạn: Khi mua qua đại lý, luôn lấy mã PNR và tự tra cứu trên website chính thức của hãng hàng không trước khi thanh toán.',
      '5. Kiểm tra mã QR tại quầy thanh toán: Trước khi quét mã QR tại các cửa hàng ăn uống, mua sắm, luôn ngước nhìn đối chiếu tên chủ tài khoản thụ hưởng hiển thị với tên quán.'
    ],
    tips: [
      'Luôn quay video mở hộp hàng liền mạch từ lúc còn nguyên niêm phong để làm bằng chứng khiếu nại.',
      'Chỉ chuyển khoản khi kiểm tra đúng tên doanh nghiệp hoặc người bán uy tín.'
    ],
    sources: ['MPS-REFUND', 'LAW-CONSUMER']
  },
  {
    id: 8,
    title: 'Cách nhận diện bẫy việc làm và đầu tư tài chính ảo',
    icon: 'TrendingUp',
    summary: 'Phòng tránh bẫy cộng tác viên nạp tiền và các mô hình đa cấp tiền số trá hình.',
    content: [
      'Hai cái bẫy cướp đi nhiều tiền nhất của người dân là "Cộng tác viên nhiệm vụ online" và "Sàn đầu tư tài chính quốc tế cam kết sinh lời".',
      '1. Mô hình lừa đảo cộng tác viên: Dụ nạn nhân làm nhiệm vụ đơn giản (like video, đánh giá app, chốt đơn hàng) với hoa hồng hấp dẫn. Các đơn đầu cho rút tiền thật, đơn sau bắt nạp tiền lớn rồi chiếm đoạt.',
      '2. Tuyển dụng chính thống không thu phí: Doanh nghiệp đàng hoàng không bao giờ bắt ứng viên nộp tiền giữ chỗ, tiền mua hồ sơ hay nộp cọc trước khi phỏng vấn.',
      '3. Bẫy sàn đầu tư tài chính Forex/Crypto ảo: Các sàn giao dịch không được Ngân hàng Nhà nước cấp phép, tự vẽ ra biểu đồ nến xanh đỏ có thể can thiệp thao túng kết quả theo ý muốn của chủ sàn.',
      '4. Chiêu trò "Bao lỗ - Cam kết lãi khủng": Không có kênh đầu tư hợp pháp nào đảm bảo sinh lời 3% mỗi ngày hay 30% mỗi tháng mà không có rủi ro.',
      '5. Hội nhóm chuyên gia đọc lệnh: Những hình ảnh khoe xe sang, cọc tiền và bảng lãi hàng tỷ đồng trên mạng 99% là hình ảnh thuê mượn hoặc dàn dựng để lừa con mồi vào tròng.'
    ],
    tips: [
      'Bất kỳ công việc nào yêu cầu "nạp tiền để kiếm tiền" đều là bẫy lừa đảo.',
      'Tra cứu các công ty chứng khoán, quản lý quỹ được cấp phép trên trang ssc.gov.vn của Ủy ban Chứng khoán Nhà nước.'
    ],
    sources: ['MPS-2026', 'Cục An ninh mạng A05']
  },
  {
    id: 9,
    title: 'Bảo vệ dữ liệu cá nhân và quyền riêng tư theo pháp luật',
    icon: 'Lock',
    summary: 'Tuân thủ Luật Bảo vệ dữ liệu cá nhân số 91/2025/QH15 và kỹ năng bảo vệ danh tính.',
    content: [
      'Dữ liệu cá nhân là tài sản vô giá trong kỷ nguyên trí tuệ nhân tạo. Lộ dữ liệu là nguồn gốc của mọi cuộc gọi lừa đảo.',
      '1. Các dữ liệu nhạy cảm hàng đầu: Số CCCD, mã số thuế, số thẻ ngân hàng, dữ liệu sinh trắc học khuôn mặt/mống mắt, lịch sử vị trí di chuyển và thông tin người phụ thuộc.',
      '2. Quy định của Luật Bảo vệ dữ liệu cá nhân: Mọi tổ chức, cá nhân khi thu thập, xử lý dữ liệu phải có sự đồng ý rõ ràng của chủ thể dữ liệu và phải sử dụng đúng mục đích công bố.',
      '3. Không tùy tiện chia sẻ giấy tờ: Không gửi ảnh CCCD vào các hội nhóm chat đông người; khi cần cung cấp bản photo, hãy dùng bút ghi đè dòng chữ chéo: "Chỉ dùng cho mục đích mở thẻ tại ngân hàng X ngày..."',
      '4. Hạn chế check-in lộ liễu: Không đăng tải ảnh vé máy bay, vé sự kiện có mã vạch/QR code, không chia sẻ thẻ học sinh có số định danh cá nhân.',
      '5. Định kỳ rà soát các ứng dụng liên kết: Vào phần cài đặt tài khoản Google/Facebook để hủy quyền truy cập của các trò chơi, ứng dụng trắc nghiệm cũ không còn sử dụng.'
    ],
    tips: [
      'Dữ liệu cá nhân của bạn bè, đồng nghiệp cũng cần được tôn trọng: Không chuyển giao số điện thoại người khác cho bên tiếp thị quảng cáo.',
      'Kích hoạt tính năng thông báo mỗi khi tài khoản được đăng nhập từ một địa chỉ IP mới.'
    ],
    sources: ['LAW-DATA', 'Bộ Thông tin và Truyền thông']
  },
  {
    id: 10,
    title: 'Cần làm gì ngay khi phát hiện mình vừa bị lừa đảo?',
    icon: 'LifeBuoy',
    summary: 'Quy trình xử lý tình huống khẩn cấp trong "Giờ Vàng" sau khi chuyển tiền.',
    content: [
      'Nếu lỡ sập bẫy và thực hiện giao dịch chuyển tiền, hành động nhanh chóng và chính xác trong 15 - 30 phút đầu có thể cứu vãn tài sản của bạn.',
      'Bước 1: Ngắt kết nối và cô lập rủi ro. Nếu đã lỡ cài app lạ, lập tức bật Chế độ máy bay, tắt Wi-Fi/4G và ngắt toàn bộ kết nối mạng trên điện thoại.',
      'Bước 2: Dùng một thiết bị sạch khác gọi ngay đường dây nóng ngân hàng. Yêu cầu nhân viên khóa khẩn cấp tài khoản, khóa dịch vụ ngân hàng điện tử và yêu cầu tra soát giao dịch vừa thực hiện.',
      'Bước 3: Đổi toàn bộ mật khẩu tài khoản quan trọng (Email khôi phục, tài khoản ngân hàng, mạng xã hội) từ một máy tính hoặc điện thoại an toàn.',
      'Bước 4: Cảnh báo người thân và bạn bè ngay lập tức để ngăn kẻ xấu dùng tài khoản của bạn đi vay mượn tiếp.',
      'Bước 5: Cảnh giác với chiêu trò lừa đảo lần hai: Tuyệt đối không tin vào các hội nhóm "Hỗ trợ thu hồi vốn treo", "Luật sư lấy lại tiền" trên mạng vì đó là cạm bẫy tiếp theo của tội phạm.'
    ],
    tips: [
      'Giữ bình tĩnh: Sự hoảng loạn chỉ khiến bạn tiếp tục đưa ra các quyết định sai lầm.',
      'Không xóa bất kỳ đoạn tin nhắn hay lịch sử cuộc gọi nào.'
    ],
    sources: ['MPS-2026', 'MPS-MISTAKE']
  },
  {
    id: 11,
    title: 'Cách thu thập và bảo lưu chứng cứ lừa đảo điện tử',
    icon: 'FileText',
    summary: 'Thu thập chứng cứ đúng chuẩn để cung cấp cho cơ quan điều tra phá án.',
    content: [
      'Chứng cứ điện tử đóng vai trò quyết định trong việc xác định đối tượng và dòng tiền phục vụ công tác khởi tố vụ án hình sự.',
      '1. Chụp ảnh màn hình toàn bộ tin nhắn: Chụp đầy đủ toàn bộ diễn biến cuộc trò chuyện từ đầu đến cuối, hiển thị rõ ngày giờ gửi, tên hiển thị và ID tài khoản của đối tượng.',
      '2. Sao lưu chứng từ giao dịch ngân hàng: Tải file sao kê điện tử có mã tham chiếu giao dịch (FT Code / Transaction ID), tên ngân hàng thụ hưởng, số tài khoản nhận và tên chủ tài khoản nhận.',
      '3. Lưu giữ các đường link và số điện thoại: Ghi lại đầy đủ các URL trang web giả mạo, số điện thoại đã gọi đến, tài khoản Telegram, Zalo hoặc nhóm chat.',
      '4. Ghi âm hoặc xuất file ghi âm cuộc gọi: Nếu có tính năng ghi âm cuộc gọi, hãy lưu trữ file âm thanh gốc mà không cắt ghép chỉnh sửa.',
      '5. Lập bảng tóm tắt dòng thời gian sự việc: Ghi rõ thời điểm tiếp xúc đầu tiên, các mốc chuyển tiền, số tiền từng đợt và nội dung chuyển khoản để cán bộ thụ lý dễ dàng nắm bắt.'
    ],
    tips: [
      'Sao lưu toàn bộ file chứng cứ ra ổ cứng di động hoặc Google Drive an toàn để phòng trường hợp điện thoại bị hỏng hoặc mất.',
      'Không tự ý công khai chứng cứ lên mạng xã hội kèm thông tin cá nhân của người khác.'
    ],
    sources: ['MPS-2026', 'Bộ luật Tố tụng Hình sự']
  },
  {
    id: 12,
    title: 'Các kênh chính thức tiếp nhận hỗ trợ và trình báo',
    icon: 'HelpCircle',
    summary: 'Danh bạ đường dây nóng, cổng tố giác tội phạm và cơ quan chức năng có thẩm quyền.',
    content: [
      'Khi xảy ra vụ việc lừa đảo hoặc phát hiện dấu hiệu tội phạm mạng, hãy liên hệ ngay các cơ quan chức năng sau:',
      '1. Cơ quan Công an cấp gần nhất: Trực tiếp đến Công an xã/phường/thị trấn hoặc Công an quận/huyện nơi bạn cư trú để nộp Đơn trình báo kèm theo toàn bộ chứng cứ thu thập được.',
      '2. Cục An ninh mạng và phòng, chống tội phạm sử dụng công nghệ cao (A05) - Bộ Công an: Địa chỉ: 47 Phạm Văn Đồng, Cầu Giấy, Hà Nội. Website: mps.gov.vn.',
      '3. Tổng đài tiếp nhận phản ánh cuộc gọi rác, cuộc gọi có dấu hiệu lừa đảo: Đầu số 156 hoặc gửi tin nhắn miễn phí đến 156/5656 theo cú pháp của Bộ TT&TT.',
      '4. Cổng tiếp nhận phản ánh trang web giả mạo, lừa đảo trực tuyến: canhbao.khonggianmang.vn (Trung tâm Giám sát an toàn không gian mạng quốc gia - NCSC).',
      '5. Tổng đài Quốc gia Bảo vệ Trẻ em: Đầu số 111 (miễn phí 24/7) khi trẻ em hoặc học sinh sinh viên bị đe dọa, tống tiền hoặc bắt cóc online.',
      '6. Đường dây nóng các Ngân hàng thương mại: Lưu sẵn số hotline khẩn cấp in trên mặt sau thẻ ATM của ngân hàng bạn sử dụng để gọi ngay lập tức.'
    ],
    tips: [
      'Việc trình báo kịp thời không chỉ giúp bạn có cơ hội truy hồi tài sản mà còn ngăn chặn kẻ gian tiếp tục lừa gạt thêm nhiều người dân khác.',
      'Mọi thủ tục trình báo tại cơ quan Công an đều hoàn toàn miễn phí.'
    ],
    sources: ['MPS-2026', 'Bộ Công an', 'NCSC']
  }
];
