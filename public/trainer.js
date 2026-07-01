const trainerConfig = {
  ui: {
    label: "UI Auto",
    tasks: [
      {
        id: "ui-login-happy",
        level: "Junior",
        title: "Логин с успешным редиректом",
        description: "Напиши UI автотест на Playwright или Selenium для формы логина интернет-магазина.",
        points: [
          "Открой страницу логина",
          "Заполни email и password",
          "Нажми кнопку входа",
          "Проверь редирект на dashboard или личный кабинет",
          "Добавь хотя бы одно явное ожидание",
        ],
        placeholder: "test('successful login', async ({ page }) => { ... });",
        solution: `import { test, expect } from '@playwright/test';

test('successful login redirects user to dashboard', async ({ page }) => {
  await page.goto('https://example.com/login');
  await page.getByLabel('Email').fill('qa.auto@example.com');
  await page.getByLabel('Password').fill('StrongPassword123');
  await page.getByRole('button', { name: 'Sign in' }).click();

  await expect(page).toHaveURL(/dashboard/);
  await expect(page.getByRole('heading', { name: /dashboard/i })).toBeVisible();
});`,
        checks: [
          { label: "Открыта страница логина", test: (value) => /goto|navigate|get\b/i.test(value) },
          { label: "Заполняются email и password", test: (value) => /email/i.test(value) && /password/i.test(value) && /fill|sendkeys|type/i.test(value) },
          { label: "Есть действие входа", test: (value) => /click|submit/i.test(value) && /sign in|login|log in/i.test(value) },
          { label: "Есть проверка результата", test: (value) => /expect|assert|should/i.test(value) && /dashboard|url|visible|contain/i.test(value) },
          { label: "Добавлено ожидание или проверка стабильности", test: (value) => /wait|tobevisible|tohaveurl|until|explicitwait/i.test(value) },
        ],
      },
      {
        id: "ui-invalid-login",
        level: "Junior",
        title: "Невалидный логин и текст ошибки",
        description: "Проверь негативный сценарий: пользователь вводит неверный пароль и видит сообщение об ошибке.",
        points: [
          "Открой форму логина",
          "Заполни невалидный пароль",
          "Нажми кнопку входа",
          "Проверь текст ошибки",
          "Убедись, что редирект не произошел",
        ],
        placeholder: "test('invalid login shows error', async ({ page }) => { ... });",
        solution: `test('invalid login shows an error and stays on login page', async ({ page }) => {
  await page.goto('https://example.com/login');
  await page.getByLabel('Email').fill('qa.auto@example.com');
  await page.getByLabel('Password').fill('WrongPassword');
  await page.getByRole('button', { name: 'Sign in' }).click();

  await expect(page.getByText(/invalid credentials/i)).toBeVisible();
  await expect(page).toHaveURL(/login/);
});`,
        checks: [
          { label: "Есть негативный пароль или невалидные данные", test: (value) => /wrong|invalid|incorrect|bad/i.test(value) },
          { label: "Проверяется текст ошибки", test: (value) => /error|invalid credentials|message|toast|alert/i.test(value) && /expect|assert|should/i.test(value) },
          { label: "Есть клик по входу", test: (value) => /click|submit/i.test(value) },
          { label: "Проверяется отсутствие редиректа или сохранение URL", test: (value) => /url|login|not\.tohaveurl|tohaveurl|stay/i.test(value) },
          { label: "Есть ожидание видимости ошибки", test: (value) => /visible|wait|tobevisible/i.test(value) },
        ],
      },
      {
        id: "ui-filter-results",
        level: "Middle",
        title: "Фильтрация каталога товаров",
        description: "Проверь, что фильтр по категории или цене сужает список товаров и не показывает лишние карточки.",
        points: [
          "Открой каталог",
          "Примени фильтр",
          "Проверь обновление списка результатов",
          "Убедись, что хотя бы один элемент соответствует фильтру",
          "Убедись, что неподходящие элементы не отображаются",
        ],
        placeholder: "test('catalog filters products', async ({ page }) => { ... });",
        solution: `test('price filter updates catalog results', async ({ page }) => {
  await page.goto('https://example.com/catalog');
  await page.getByLabel('Max price').fill('100');
  await page.getByRole('button', { name: 'Apply filters' }).click();

  const cards = page.locator('[data-testid=\"product-card\"]');
  await expect(cards.first()).toBeVisible();
  await expect(cards).toHaveCount(4);
});`,
        checks: [
          { label: "Открывается страница каталога", test: (value) => /catalog|products|page\.goto|navigate/i.test(value) },
          { label: "Есть действие с фильтром", test: (value) => /filter|category|max price|min price|apply/i.test(value) },
          { label: "Проверяется изменение списка", test: (value) => /count|length|cards|results|items/i.test(value) },
          { label: "Есть позитивная проверка результата", test: (value) => /visible|contain|tohavecount|expect|assert/i.test(value) },
          { label: "Учитывается отсутствие лишних элементов", test: (value) => /not|exclude|hidden|count/i.test(value) },
        ],
      },
      {
        id: "ui-checkout",
        level: "Middle",
        title: "Checkout после добавления товара в корзину",
        description: "Смоделируй пользовательский путь от карточки товара до подтверждения оформления заказа.",
        points: [
          "Открой страницу товара",
          "Добавь товар в корзину",
          "Перейди в checkout",
          "Заполни обязательные поля",
          "Проверь успешное подтверждение заказа",
        ],
        placeholder: "test('user can place an order', async ({ page }) => { ... });",
        solution: `test('user can checkout successfully', async ({ page }) => {
  await page.goto('https://example.com/products/42');
  await page.getByRole('button', { name: 'Add to cart' }).click();
  await page.getByRole('link', { name: 'Cart' }).click();
  await page.getByRole('button', { name: 'Checkout' }).click();

  await page.getByLabel('Address').fill('Main street 1');
  await page.getByLabel('Phone').fill('+380001112233');
  await page.getByRole('button', { name: 'Place order' }).click();

  await expect(page.getByText(/thank you for your order/i)).toBeVisible();
});`,
        checks: [
          { label: "Есть добавление в корзину", test: (value) => /add to cart|cart|basket/i.test(value) },
          { label: "Есть переход в checkout", test: (value) => /checkout|place order|order/i.test(value) },
          { label: "Заполняются обязательные поля", test: (value) => /fill|type|address|phone|name/i.test(value) },
          { label: "Есть проверка финального сообщения", test: (value) => /thank you|success|confirmation|order placed/i.test(value) },
          { label: "Сценарий покрывает end-to-end путь", test: (value) => /click/gi.test(value) && (value.match(/click/gi) || []).length >= 3 },
        ],
      },
      {
        id: "ui-flaky-loader",
        level: "Senior",
        title: "Нестабильный loader перед таблицей результатов",
        description: "Напиши надежный тест для страницы, где после поиска показывается loader, а затем таблица результатов.",
        points: [
          "Выполни поиск",
          "Дождись исчезновения loader",
          "Проверь, что таблица результатов доступна",
          "Избеги статических sleep",
          "Добавь проверку хотя бы одной строки результата",
        ],
        placeholder: "test('search results wait for loader correctly', async ({ page }) => { ... });",
        solution: `test('search waits for loader and renders stable table', async ({ page }) => {
  await page.goto('https://example.com/search');
  await page.getByLabel('Search').fill('playwright');
  await page.getByRole('button', { name: 'Search' }).click();

  const loader = page.getByTestId('results-loader');
  await expect(loader).toBeHidden();
  await expect(page.getByRole('table', { name: 'Results' })).toBeVisible();
  await expect(page.getByRole('row').nth(1)).toContainText('playwright');
});`,
        checks: [
          { label: "Есть поиск и запуск запроса", test: (value) => /search|find|lookup/i.test(value) && /click|press/i.test(value) },
          { label: "Есть ожидание исчезновения loader", test: (value) => /loader|spinner/i.test(value) && /hidden|not\.tobevisible|wait/i.test(value) },
          { label: "Проверяется таблица результатов", test: (value) => /table|row|results/i.test(value) },
          { label: "Нет reliance только на sleep", test: (value) => !/sleep|waitfortimeout|thread\.sleep/i.test(value) },
          { label: "Есть проверка контента строки", test: (value) => /containtext|text|row/i.test(value) },
        ],
      },
    ],
  },
  api: {
    label: "API Auto",
    tasks: [
      {
        id: "api-create-user",
        level: "Junior",
        title: "POST /users создает нового пользователя",
        description: "Проверь happy path создания пользователя через API.",
        points: [
          "Отправь POST-запрос с телом пользователя",
          "Проверь статус-код",
          "Проверь тело ответа",
          "Убедись, что вернулся id",
          "Проверь совпадение полей из payload",
        ],
        placeholder: "const response = await request.post('/users', { data: payload });",
        solution: `const response = await request.post('/users', {
  data: { name: 'Olena QA', email: 'olena.qa@example.com' }
});

expect(response.status()).toBe(201);

const body = await response.json();
expect(body.id).toBeTruthy();
expect(body.email).toBe('olena.qa@example.com');`,
        checks: [
          { label: "Используется POST-запрос", test: (value) => /\bpost\b/i.test(value) },
          { label: "Есть проверка статуса", test: (value) => /status|statuscode/i.test(value) && /201|200/.test(value) },
          { label: "Проверяется JSON/body", test: (value) => /json|body|response\.data|responseBody/i.test(value) },
          { label: "Проверяется id", test: (value) => /\bid\b|uuid|identifier/i.test(value) },
          { label: "Есть сравнение данных payload и response", test: (value) => /email|name/i.test(value) && /expect|assert|should/i.test(value) },
        ],
      },
      {
        id: "api-validation",
        level: "Junior",
        title: "POST /users возвращает ошибку валидации",
        description: "Проверь негативный кейс, когда обязательное поле не передано.",
        points: [
          "Отправь запрос без обязательного поля",
          "Проверь код ошибки",
          "Проверь тело ошибки",
          "Проверь текст ошибки или код ошибки в теле",
          "Убедись, что пользователь не создан",
        ],
        placeholder: "expect(response.status()).toBe(400);",
        solution: `const response = await request.post('/users', {
  data: { name: 'Broken User' }
});

expect(response.status()).toBe(400);
const body = await response.json();
expect(body.error).toContain('email');`,
        checks: [
          { label: "Есть запрос с невалидным payload", test: (value) => /post/i.test(value) && /missing|required|invalid|broken/i.test(value) },
          { label: "Есть код ошибки", test: (value) => /400|422|409/.test(value) },
          { label: "Проверяется error message", test: (value) => /error|message|detail/i.test(value) },
          { label: "Есть ожидание/assertion", test: (value) => /expect|assert|should/i.test(value) },
          { label: "Упоминается отсутствие создания ресурса", test: (value) => /not created|no user|empty|false|null|undefined|length/i.test(value) },
        ],
      },
      {
        id: "api-auth-profile",
        level: "Middle",
        title: "GET /profile требует авторизацию",
        description: "Опиши тест, который проверяет доступ с валидным и невалидным токеном.",
        points: [
          "Подготовь токен или заголовок Authorization",
          "Проверь успешный ответ для валидного токена",
          "Проверь ошибку для невалидного токена",
          "Сравни ожидаемую структуру ответа",
          "Покрой оба сценария в одном наборе тестов",
        ],
        placeholder: "await request.get('/profile', { headers: { Authorization: ... } });",
        solution: `const authorized = await request.get('/profile', {
  headers: { Authorization: 'Bearer valid-token' }
});
expect(authorized.status()).toBe(200);

const unauthorized = await request.get('/profile', {
  headers: { Authorization: 'Bearer invalid-token' }
});
expect(unauthorized.status()).toBe(401);`,
        checks: [
          { label: "Используется Authorization header или token", test: (value) => /authorization|bearer|token/i.test(value) },
          { label: "Есть позитивный и негативный сценарий", test: (value) => /200/.test(value) && /401|403/.test(value) },
          { label: "Используется GET /profile или похожий endpoint", test: (value) => /get|profile/i.test(value) },
          { label: "Проверяется тело или структура ответа", test: (value) => /json|body|schema|fields|email|id/i.test(value) },
          { label: "Есть минимум два отдельных вызова или два кейса", test: (value) => (value.match(/request\./gi) || []).length >= 2 || (value.match(/test\(/gi) || []).length >= 2 },
        ],
      },
      {
        id: "api-pagination",
        level: "Middle",
        title: "Пагинация списка заказов",
        description: "Проверь API списка заказов с параметрами page и limit.",
        points: [
          "Отправь запрос со значениями page и limit",
          "Проверь статус",
          "Проверь число элементов в массиве",
          "Проверь метаданные пагинации",
          "Проверь, что элементы соответствуют ожидаемой странице",
        ],
        placeholder: "await request.get('/orders?page=2&limit=10');",
        solution: `const response = await request.get('/orders?page=2&limit=10');
expect(response.status()).toBe(200);

const body = await response.json();
expect(body.items).toHaveLength(10);
expect(body.page).toBe(2);
expect(body.limit).toBe(10);`,
        checks: [
          { label: "Есть page и limit", test: (value) => /page|limit/i.test(value) },
          { label: "Проверяется массив элементов", test: (value) => /items|data|length|count/i.test(value) },
          { label: "Проверяются метаданные пагинации", test: (value) => /page|pages|total|limit/i.test(value) },
          { label: "Есть код успешного ответа", test: (value) => /200/.test(value) && /status|expect|assert/i.test(value) },
          { label: "Учитывается корректность выбранной страницы", test: (value) => /page\s*[:=]\s*2|toBe\(2\)|second page/i.test(value) },
        ],
      },
      {
        id: "api-idempotency",
        level: "Senior",
        title: "Идемпотентность повторного POST-запроса",
        description: "Проверь API оплаты или создания ресурса с idempotency key, чтобы дублирующий запрос не создал сущность повторно.",
        points: [
          "Отправь два одинаковых POST-запроса",
          "Передай одинаковый idempotency key",
          "Проверь одинаковый результат или защиту от дубля",
          "Проверь, что ресурс не создан дважды",
          "Опиши, какие риски это покрывает",
        ],
        placeholder: "headers: { 'Idempotency-Key': 'payment-123' }",
        solution: `const headers = { 'Idempotency-Key': 'payment-123' };

const first = await request.post('/payments', { data: payload, headers });
const second = await request.post('/payments', { data: payload, headers });

expect(first.status()).toBe(201);
expect(second.status()).toBe(200);

const firstBody = await first.json();
const secondBody = await second.json();
expect(secondBody.id).toBe(firstBody.id);`,
        checks: [
          { label: "Есть два одинаковых POST-запроса", test: (value) => (value.match(/\bpost\b/gi) || []).length >= 2 },
          { label: "Используется idempotency key", test: (value) => /idempotency/i.test(value) },
          { label: "Проверяется отсутствие дубля", test: (value) => /same id|not create|duplicate|once|single/i.test(value) || /\bid\b/i.test(value) },
          { label: "Есть проверки по статусам ответов", test: (value) => /200|201|409/.test(value) && /status|expect|assert/i.test(value) },
          { label: "Упомянут риск повторной обработки", test: (value) => /retry|duplicate|double charge|network/i.test(value) },
        ],
      },
    ],
  },
  db: {
    label: "SQL / DB",
    tasks: [
      {
        id: "db-orders-last-30-days",
        level: "Junior",
        title: "Заказы пользователя за последние 30 дней",
        description: "Напиши SQL-запрос для выборки заказов пользователя user_id = 15 за последние 30 дней.",
        points: [
          "Используй SELECT из orders",
          "Отфильтруй по user_id = 15",
          "Добавь фильтр по дате за последние 30 дней",
          "Отсортируй по created_at DESC",
          "По желанию выбери конкретные колонки",
        ],
        placeholder: "SELECT * FROM orders WHERE ...",
        solution: `SELECT
  id,
  user_id,
  total_amount,
  created_at
FROM orders
WHERE user_id = 15
  AND created_at >= CURRENT_DATE - INTERVAL '30 days'
ORDER BY created_at DESC;`,
        checks: [
          { label: "Есть SELECT из orders", test: (value) => /select/i.test(value) && /from\s+orders/i.test(value) },
          { label: "Есть фильтр по user_id = 15", test: (value) => /user_id\s*=\s*15/i.test(value) },
          { label: "Есть ограничение по последним 30 дням", test: (value) => /30\s*day|interval\s*'30\s*days'|dateadd|current_date|now\(\)|getdate\(\)/i.test(value) },
          { label: "Есть сортировка по created_at DESC", test: (value) => /order\s+by\s+created_at\s+desc/i.test(value) },
          { label: "Запрос выглядит завершенным", test: (value) => value.trim().length > 40 },
        ],
      },
      {
        id: "db-users-without-orders",
        level: "Junior",
        title: "Пользователи без заказов",
        description: "Найди пользователей, у которых нет ни одного заказа.",
        points: [
          "Используй таблицы users и orders",
          "Сделай LEFT JOIN или NOT EXISTS",
          "Отфильтруй пользователей без связанных заказов",
          "Верни id и email пользователя",
          "Сделай запрос читаемым",
        ],
        placeholder: "SELECT u.id, u.email FROM users u LEFT JOIN orders o ...",
        solution: `SELECT
  u.id,
  u.email
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
WHERE o.id IS NULL;`,
        checks: [
          { label: "Есть users и orders", test: (value) => /users/i.test(value) && /orders/i.test(value) },
          { label: "Используется LEFT JOIN или NOT EXISTS", test: (value) => /left join|not exists/i.test(value) },
          { label: "Есть условие отсутствия заказа", test: (value) => /is null|not exists/i.test(value) },
          { label: "Выбираются поля пользователя", test: (value) => /email|u\.id|users\.id/i.test(value) },
          { label: "Запрос содержит SELECT", test: (value) => /select/i.test(value) },
        ],
      },
      {
        id: "db-total-revenue",
        level: "Middle",
        title: "Сумма оплаченных заказов за месяц",
        description: "Посчитай суммарную выручку по оплаченных заказам за текущий месяц.",
        points: [
          "Используй SUM",
          "Фильтруй по статусу paid",
          "Ограничь текущим месяцем",
          "Верни итоговую сумму",
          "По желанию дай алиас колонке",
        ],
        placeholder: "SELECT SUM(total_amount) AS revenue FROM orders WHERE ...",
        solution: `SELECT
  SUM(total_amount) AS revenue
FROM orders
WHERE status = 'paid'
  AND created_at >= date_trunc('month', CURRENT_DATE);`,
        checks: [
          { label: "Используется SUM", test: (value) => /sum\s*\(/i.test(value) },
          { label: "Есть фильтр paid", test: (value) => /paid|status\s*=\s*'paid'/i.test(value) },
          { label: "Есть ограничение текущего месяца", test: (value) => /date_trunc|current_date|month|first_day/i.test(value) },
          { label: "Есть источник orders", test: (value) => /from\s+orders/i.test(value) },
          { label: "Есть alias или итоговое поле", test: (value) => /as\s+revenue|revenue/i.test(value) },
        ],
      },
      {
        id: "db-duplicate-emails",
        level: "Middle",
        title: "Поиск дублирующихся email",
        description: "Найди email, которые встречаются в таблице users больше одного раза.",
        points: [
          "Сделай группировку по email",
          "Посчитай количество",
          "Отфильтруй count > 1",
          "Верни email и количество дублей",
          "По желанию отсортируй по count DESC",
        ],
        placeholder: "SELECT email, COUNT(*) FROM users GROUP BY email HAVING COUNT(*) > 1;",
        solution: `SELECT
  email,
  COUNT(*) AS duplicates_count
FROM users
GROUP BY email
HAVING COUNT(*) > 1
ORDER BY duplicates_count DESC;`,
        checks: [
          { label: "Есть GROUP BY email", test: (value) => /group\s+by\s+email/i.test(value) },
          { label: "Есть COUNT", test: (value) => /count\s*\(/i.test(value) },
          { label: "Есть HAVING COUNT > 1", test: (value) => /having/i.test(value) && />\s*1/.test(value) },
          { label: "Работа идет по users", test: (value) => /from\s+users/i.test(value) },
          { label: "Возвращается email", test: (value) => /select[\s\S]*email/i.test(value) },
        ],
      },
      {
        id: "db-latest-order-per-user",
        level: "Senior",
        title: "Последний заказ для каждого пользователя",
        description: "Верни по одному последнему заказу на каждого пользователя. Можно использовать window functions или подзапрос.",
        points: [
          "Нужно оставить только самый новый заказ для каждого user_id",
          "Используй ROW_NUMBER, MAX с join или эквивалент",
          "Верни хотя бы id заказа, user_id и created_at",
          "Сохрани читаемость запроса",
          "По желанию обработай пользователей с одинаковой датой заказа",
        ],
        placeholder: "WITH ranked_orders AS (...) SELECT ...",
        solution: `WITH ranked_orders AS (
  SELECT
    id,
    user_id,
    created_at,
    ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at DESC) AS rn
  FROM orders
)
SELECT
  id,
  user_id,
  created_at
FROM ranked_orders
WHERE rn = 1;`,
        checks: [
          { label: "Есть partition/group per user", test: (value) => /partition\s+by\s+user_id|max\s*\(|group\s+by\s+user_id/i.test(value) },
          { label: "Есть выбор последней даты", test: (value) => /order\s+by\s+created_at\s+desc|max\s*\(\s*created_at/i.test(value) },
          { label: "Используется подзапрос, CTE или window function", test: (value) => /with\s+|row_number|dense_rank|subquery|join/i.test(value) },
          { label: "Возвращаются поля заказа", test: (value) => /id|user_id|created_at/i.test(value) },
          { label: "Есть фильтр на одну запись на пользователя", test: (value) => /rn\s*=\s*1|where\s+.*max/i.test(value) },
        ],
      },
    ],
  },
};

const completionRate = document.getElementById("completionRate");
const tabButtons = document.querySelectorAll(".tab-button");
const panels = document.querySelectorAll(".trainer-panel");
const state = {};

function getAnswerKey(taskId) {
  return `qa-auto-answer-${taskId}`;
}

function getInitialState(scope, config) {
  const firstLevel = "All";
  return {
    activeTaskId: config.tasks[0].id,
    levelFilter: firstLevel,
  };
}

function setActiveTab(target) {
  tabButtons.forEach((button) => {
    const active = button.dataset.target === target;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });

  panels.forEach((panel) => {
    panel.classList.toggle("active", panel.id === target);
  });
}

function renderFeedback(scope, text) {
  const feedback = document.getElementById(`${scope}Feedback`);
  feedback.classList.remove("empty");
  feedback.innerHTML = text;
}

function getVisibleTasks(scope) {
  const { tasks } = trainerConfig[scope];
  const activeLevel = state[scope].levelFilter;
  if (activeLevel === "All") {
    return tasks;
  }
  return tasks.filter((task) => task.level === activeLevel);
}

function getActiveTask(scope) {
  const config = trainerConfig[scope];
  return config.tasks.find((task) => task.id === state[scope].activeTaskId) || config.tasks[0];
}

function loadAnswer(taskId) {
  return localStorage.getItem(getAnswerKey(taskId)) || "";
}

function saveAnswer(taskId, value) {
  localStorage.setItem(getAnswerKey(taskId), value);
}

function updateTaskContent(scope) {
  const task = getActiveTask(scope);
  const input = document.getElementById(`${scope}Answer`);
  const solutionBox = document.getElementById(`${scope}Solution`);
  const feedback = document.getElementById(`${scope}Feedback`);

  document.getElementById(`${scope}TaskLevel`).textContent = task.level;
  document.getElementById(`${scope}TaskTitle`).textContent = task.title;
  document.getElementById(`${scope}TaskDescription`).textContent = task.description;
  document.getElementById(`${scope}TaskPoints`).innerHTML = task.points.map((point) => `<li>${point}</li>`).join("");
  input.placeholder = task.placeholder;
  input.value = loadAnswer(task.id);
  solutionBox.textContent = task.solution;
  solutionBox.classList.add("hidden");
  feedback.classList.add("empty");
  feedback.innerHTML = "";
}

function renderLevelFilter(scope) {
  const filterHost = document.getElementById(`${scope}LevelFilter`);
  const levels = ["All", "Junior", "Middle", "Senior"];
  filterHost.innerHTML = levels
    .map((level) => `<button class="level-chip ${state[scope].levelFilter === level ? "active" : ""}" data-scope="${scope}" data-level="${level}">${level}</button>`)
    .join("");
}

function renderTaskList(scope) {
  const host = document.getElementById(`${scope}TaskList`);
  const tasks = getVisibleTasks(scope);
  const config = trainerConfig[scope];

  if (!tasks.some((task) => task.id === state[scope].activeTaskId)) {
    state[scope].activeTaskId = tasks[0].id;
  }

  host.innerHTML = tasks
    .map((task, index) => {
      const isActive = task.id === state[scope].activeTaskId;
      const isDone = loadAnswer(task.id).trim().length > 0;
      return `<button class="task-chip ${isActive ? "active" : ""} ${isDone ? "done" : ""}" data-scope="${scope}" data-task-id="${task.id}">${index + 1}. ${task.title}</button>`;
    })
    .join("");

  document.getElementById(`${scope}TaskCount`).textContent = `${config.tasks.length} задач`;
}

function getTrackProgress(scope) {
  const total = trainerConfig[scope].tasks.length;
  const completed = trainerConfig[scope].tasks.filter((task) => loadAnswer(task.id).trim().length > 0).length;
  return Math.round((completed / total) * 100);
}

function updateProgress() {
  const allTasks = Object.values(trainerConfig).flatMap((config) => config.tasks);
  const completed = allTasks.filter((task) => loadAnswer(task.id).trim().length > 0).length;
  const percent = Math.round((completed / allTasks.length) * 100);
  completionRate.textContent = `${percent}%`;

  Object.keys(trainerConfig).forEach((scope) => {
    document.getElementById(`${scope}TrackProgress`).textContent = `${getTrackProgress(scope)}% заполнено`;
    renderTaskList(scope);
  });
}

function evaluateAnswer(scope) {
  const task = getActiveTask(scope);
  const input = document.getElementById(`${scope}Answer`);
  const answer = input.value.trim();

  saveAnswer(task.id, answer);

  if (!answer) {
    renderFeedback(scope, "<strong>Пока пусто.</strong> Добавь решение, и я проверю его по ключевым критериям.");
    updateProgress();
    return;
  }

  const results = task.checks.map((check) => ({
    label: check.label,
    passed: check.test(answer),
  }));

  const passedCount = results.filter((item) => item.passed).length;
  const summary = passedCount === results.length
    ? "Сильное решение: базовые критерии покрыты."
    : `Покрыто ${passedCount} из ${results.length} критериев.`;

  const checklist = results
    .map((item) => `<li>${item.passed ? "OK" : "Нужно усилить"}: ${item.label}</li>`)
    .join("");

  renderFeedback(scope, `<strong>${summary}</strong><ul>${checklist}</ul>`);
  updateProgress();
}

function toggleSolution(scope) {
  const task = getActiveTask(scope);
  const solutionBox = document.getElementById(`${scope}Solution`);
  const isHidden = solutionBox.classList.contains("hidden");

  solutionBox.textContent = task.solution;
  solutionBox.classList.toggle("hidden", !isHidden);
}

function selectTask(scope, taskId) {
  const input = document.getElementById(`${scope}Answer`);
  saveAnswer(getActiveTask(scope).id, input.value);
  state[scope].activeTaskId = taskId;
  renderTaskList(scope);
  updateTaskContent(scope);
}

function nextTask(scope) {
  const visibleTasks = getVisibleTasks(scope);
  const currentIndex = visibleTasks.findIndex((task) => task.id === state[scope].activeTaskId);
  const nextIndex = (currentIndex + 1) % visibleTasks.length;
  selectTask(scope, visibleTasks[nextIndex].id);
}

function bindInteractions() {
  tabButtons.forEach((button) => {
    button.addEventListener("click", () => setActiveTab(button.dataset.target));
  });

  document.querySelectorAll(".evaluate-button").forEach((button) => {
    button.addEventListener("click", () => evaluateAnswer(button.dataset.scope));
  });

  document.querySelectorAll(".solution-button").forEach((button) => {
    button.addEventListener("click", () => toggleSolution(button.dataset.scope));
  });

  document.querySelectorAll(".next-task-button").forEach((button) => {
    button.addEventListener("click", () => nextTask(button.dataset.scope));
  });

  document.addEventListener("click", (event) => {
    const levelButton = event.target.closest(".level-chip");
    if (levelButton) {
      const { scope, level } = levelButton.dataset;
      state[scope].levelFilter = level;
      renderLevelFilter(scope);
      renderTaskList(scope);
      updateTaskContent(scope);
    }

    const taskButton = event.target.closest(".task-chip");
    if (taskButton) {
      selectTask(taskButton.dataset.scope, taskButton.dataset.taskId);
    }
  });

  Object.keys(trainerConfig).forEach((scope) => {
    document.getElementById(`${scope}Answer`).addEventListener("input", (event) => {
      saveAnswer(getActiveTask(scope).id, event.target.value);
      updateProgress();
    });
  });
}

function initialize() {
  Object.entries(trainerConfig).forEach(([scope, config]) => {
    state[scope] = getInitialState(scope, config);
    renderLevelFilter(scope);
    renderTaskList(scope);
    updateTaskContent(scope);
    document.getElementById(`${scope}Feedback`).classList.add("empty");
  });

  bindInteractions();
  updateProgress();
}

initialize();
