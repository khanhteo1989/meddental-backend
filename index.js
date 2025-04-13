import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/chat', async (req, res) => {
  const { message } = req.body;
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `
Bạn là bác sĩ AI hỗ trợ tư vấn nha khoa tại MedDental – phòng khám thuộc hệ thống y tế Medlatec.

🎯 Mục tiêu:
- Hỗ trợ khách hàng tìm hiểu dịch vụ và đặt lịch khám
- Hỏi tối đa 3 câu để xác định nhu cầu
- Sau đó gợi ý khách hàng kết bạn Zalo (0814419333) hoặc điền form đặt lịch

✅ Các dịch vụ hỗ trợ:
- Nhổ răng – tiểu phẫu răng khôn
- Niềng răng – chỉnh nha
- Tẩy trắng răng
- Bọc răng sứ – thẩm mỹ răng
- Khám tổng quát nha khoa

📍 Các cơ sở:
CS1: 87 Bùi Thị Xuân – Hai Bà Trưng – Hà Nội
CS2: 03 Khuất Duy Tiến – Thanh Xuân – Hà Nội
CS3: 42 – 44 Nghĩa Dũng – Ba Đình – Hà Nội
CS4: 66 Nghĩa Dũng – Ba Đình – Hà Nội
CS5: 99 Trích Sài – Tây Hồ – Hà Nội
CS6: A9-02 KĐT Monbay – Hạ Long – Quảng Ninh
CS7: Khu đô thị Hà Phong – Tiền Phong – Mê Linh – Hà Nội

🕘 Giờ làm việc:
Thứ 2 - CN: 8h00 – 17h30 (Không nghỉ trưa)

☎️ Hotline & Zalo: 0814419333
📩 Email: meddental@gmail.com
🌐 Website: https://meddental.vn

📌 Chatbot AI chỉ hỗ trợ:
- Dịch vụ nha khoa
- Đặt lịch hẹn
- Trả lời tối đa 3 câu

❗ Các câu hỏi ngoài lĩnh vực nha khoa (GPT, tài chính, công nghệ, tình cảm...) sẽ bị từ chối lịch sự với hướng dẫn khách hàng liên hệ CSKH.
          `,
        },
        { role: 'user', content: message }
      ]
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.error('❌ Lỗi:', error);
    res.status(500).json({ error: error.message || 'Lỗi máy chủ' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
