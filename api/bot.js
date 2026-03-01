import TelegramBot from 'node-telegram-bot-api';

const TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8412566173:AAEpJRSA3kMsjwmd7cl4DAdl4jBOvOtTwEg';
const ADMIN_CHAT_ID = process.env.ADMIN_CHAT_ID || '1319315093';

// Serverless function requires webhooks, not polling
const bot = new TelegramBot(TOKEN);

// Note: In Serverless functions, variables in memory (like userStates) are wiped 
// when the edge function sleeps. For a production Vercel deployment of a multi-step bot, 
// you should ideally use Vercel KV or Upstash (Redis). 
// For this simple funnel, if the user completes it quickly, memory might survive the few seconds 
// the Lambda stays warm. It's a quick compromise unless a DB is added.
const userStates = new Map();

export default async function handler(req, res) {
  // If GET request, answer for health check or webhook setup
  if (req.method === 'GET') {
    return res.status(200).send('PixelCode TG Bot is running.');
  }

  // Handle Telegram webhook POST
  if (req.method === 'POST') {
    try {
      const msg = req.body.message;
      if (!msg) return res.status(200).send('OK'); // No message

      const chatId = msg.chat.id;
      const text = msg.text || '';

      // Initialize State
      if (text.startsWith('/start')) {
         userStates.set(chatId, { step: 0, data: {} });
         
         await bot.sendMessage(
           chatId, 
           `Здравствуйте! 👋 Спасибо за обращение в PixelCode.\nЯ помогу вам рассчитать стоимость проекта.\n\nКак вас зовут?`
         );
         return res.status(200).send('OK');
      }

      // Check state
      const state = userStates.get(chatId);
      if (!state) {
         await bot.sendMessage(chatId, 'Напишите /start, чтобы начать диалог.');
         return res.status(200).send('OK');
      }

      if (state.step === 0) {
         state.data.name = text;
         state.step = 1;
         
         await bot.sendMessage(chatId, `Приятно познакомиться, ${text}! Какой тип сайта вам нужен? (Landing, Интернет-магазин, Корпоративный, Другое)`, {
            reply_markup: {
               keyboard: [[{ text: 'Landing / Лендинг' }, { text: 'Интернет-магазин' }], [{ text: 'Корпоративный' }, { text: 'Другое' }]],
               resize_keyboard: true, one_time_keyboard: true
            }
         });
         return res.status(200).send('OK');
      }

      if (state.step === 1) {
         state.data.projectType = text;
         state.step = 2;

         await bot.sendMessage(chatId, `Понял. Есть ли у вас уже готовый дизайн или референсы (примеры)?`, {
            reply_markup: {
               keyboard: [[{ text: 'Есть фирменный стиль' }, { text: 'Нужен дизайн' }]],
               resize_keyboard: true, one_time_keyboard: true
            }
         });
         return res.status(200).send('OK');
      }

      if (state.step === 2) {
         state.data.designStatus = text;
         state.step = 3;

         await bot.sendMessage(chatId, `Отлично. Какой примерный бюджет вы планируете на этот проект? (в $ или сомах)`, { reply_markup: { remove_keyboard: true }});
         return res.status(200).send('OK');
      }

      if (state.step === 3) {
         state.data.budget = text;
         state.step = 4;

         await bot.sendMessage(chatId, `И последний вопрос: когда планируете запуск (сроки)?`);
         return res.status(200).send('OK');
      }

      if (state.step === 4) {
         state.data.timeline = text;
         state.step = 5;

         await bot.sendMessage(
           chatId, 
           `Спасибо за ответы! Наш менеджер скоро свяжется с вами лично для обсуждения деталей. 🚀`
         );

         const username = msg.from.username ? `@${msg.from.username}` : 'Скрыт';
         const leadSummary = `🔔 <b>Новая заявка с сайта!</b>\n\n👤 <b>Имя:</b> ${state.data.name}\n🔖 <b>Username:</b> ${username}\n🆔 <b>ID клиента:</b> <code>${chatId}</code>\n\n💻 <b>Тип проекта:</b> ${state.data.projectType}\n🎨 <b>Дизайн:</b> ${state.data.designStatus}\n💰 <b>Бюджет:</b> ${state.data.budget}\n⏳ <b>Сроки:</b> ${state.data.timeline}\n\n<i>Нажмите на Username, чтобы написать.</i>`;

         try {
           await bot.sendMessage(ADMIN_CHAT_ID, leadSummary, { parse_mode: 'HTML' });
         } catch (e) { console.error('Failed to notify admin', e); }

         // Optional: Clean up memory
         userStates.delete(chatId);
         return res.status(200).send('OK');
      }

      if (state.step === 5) {
         await bot.sendMessage(chatId, 'Ваша заявка уже передана! Нажмите /start для новой.');
         return res.status(200).send('OK');
      }

      return res.status(200).send('OK');
    } catch (error) {
      console.error(error);
      return res.status(500).send('Server Error');
    }
  }

  return res.status(405).send('Method Not Allowed');
}
