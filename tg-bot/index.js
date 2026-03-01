require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

// Provided by user in previous messages
const TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8731974947:AAFeXWhKCYD25pmS1Ir2hlZZc9M43vkFmj8';
const ADMIN_CHAT_ID = process.env.ADMIN_CHAT_ID || '1319315093';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(TOKEN, { polling: true });

// In-memory state store (Map: chatId -> stateObject)
// For a production system without container restarts, this works fine. 
// Otherwise, use Redis/SQLite.
const userStates = new Map();

/*
  State Machine Logic:
  0 - Greeted, expecting Name
  1 - Expecting Project Type (Landing, E-commerce, Corp, Other)
  2 - Expecting Design Status
  3 - Expecting Budget
  4 - Expecting Timeline
  5 - Finished (Lead sent)
*/

// Listen for any kind of message.
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text || '';

  // Handle /start (even with deep linking like /start site)
  if (text.startsWith('/start')) {
     userStates.set(chatId, { step: 0, data: {} });
     
     await bot.sendMessage(
       chatId, 
       `Здравствуйте! 👋 Спасибо за обращение в PixelCode.\nЯ помогу вам рассчитать стоимость проекта.\n\nКак вас зовут?`
     );
     return;
  }

  // Get current user state
  const state = userStates.get(chatId);
  
  // If user hasn't /start-ed, ignore or prompt
  if (!state) {
     await bot.sendMessage(chatId, 'Напишите /start, чтобы начать диалог.');
     return;
  }

  // Step 0: Name -> Project Type
  if (state.step === 0) {
     state.data.name = text;
     state.step = 1;
     
     const opts = {
        reply_markup: {
           keyboard: [
             [{ text: 'Landing / Лендинг' }, { text: 'Интернет-магазин' }],
             [{ text: 'Корпоративный сайт' }, { text: 'Другое' }]
           ],
           resize_keyboard: true,
           one_time_keyboard: true
        }
     };

     await bot.sendMessage(chatId, `Приятно познакомиться, ${text}! Какой тип сайта вам нужен?`, opts);
     return;
  }

  // Step 1: Project Type -> Design
  if (state.step === 1) {
     state.data.projectType = text;
     state.step = 2;

     const opts = {
        reply_markup: {
           keyboard: [
             [{ text: 'Есть фирменный стиль' }, { text: 'Пока нет, нужен дизайн' }]
           ],
           resize_keyboard: true,
           one_time_keyboard: true
        }
     };

     await bot.sendMessage(chatId, `Понял. Есть ли у вас уже готовый дизайн или референсы (примеры)?`, opts);
     return;
  }

  // Step 2: Design -> Budget
  if (state.step === 2) {
     state.data.designStatus = text;
     state.step = 3;

     // Remove keyboard for open text or provide ranges
     const opts = {
        reply_markup: { remove_keyboard: true }
     };

     await bot.sendMessage(chatId, `Отлично. Какой примерный бюджет вы планируете на этот проект? (в $ или сомах)`, opts);
     return;
  }

  // Step 3: Budget -> Timeline
  if (state.step === 3) {
     state.data.budget = text;
     state.step = 4;

     await bot.sendMessage(chatId, `И последний технический вопрос: когда планируете запуск или к какой дате нужен сайт?`);
     return;
  }

  // Step 4: Timeline -> Finish
  if (state.step === 4) {
     state.data.timeline = text;
     state.step = 5;

     // Acknowledge user
     await bot.sendMessage(
       chatId, 
       `Спасибо за ответы! Наш специалист (Азамат или менеджер) скоро свяжется с вами лично для обсуждения деталей. 🚀`
     );

     // Compile lead data for Admin
     const username = msg.from.username ? `@${msg.from.username}` : 'Скрыт';
     const leadSummary = 
`🔔 <b>Новая заявка с бота!</b>

👤 <b>Имя:</b> ${state.data.name}
🔖 <b>Username:</b> ${username}
🆔 <b>ID клиента:</b> <code>${chatId}</code>

💻 <b>Тип проекта:</b> ${state.data.projectType}
🎨 <b>Дизайн:</b> ${state.data.designStatus}
💰 <b>Бюджет:</b> ${state.data.budget}
⏳ <b>Сроки:</b> ${state.data.timeline}

<i>Чтобы написать клиенту, нажмите на Username или скопируйте ID.</i>`;

     // Send to Admin
     try {
       await bot.sendMessage(ADMIN_CHAT_ID, leadSummary, { parse_mode: 'HTML' });
     } catch (err) {
       console.error("Failed to send lead to Admin. Chat not found or blocked:", err);
     }

     return;
  }

  // Step 5: Finished mode, intercept standard chat if needed
  if (state.step === 5) {
     await bot.sendMessage(chatId, 'Ваша заявка уже передана! Если хотите отменить и начать заново, нажмите /start.');
  }

});

console.log("🚀 PixelCode Telegram Bot is up and running in polling mode...");
