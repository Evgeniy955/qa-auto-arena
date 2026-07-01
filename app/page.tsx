import Script from "next/script";

const uiTaskTitles = [
  "Логин с успешным редиректом",
  "Невалидный логин и текст ошибки",
  "Фильтрация каталога товаров",
  "Checkout после добавления товара в корзину",
  "Нестабильный loader перед таблицей результатов",
];

const apiTaskTitles = [
  "POST /users создает нового пользователя",
  "POST /users возвращает ошибку валидации",
  "GET /profile требует авторизацию",
  "Пагинация списка заказов",
  "Идемпотентность повторного POST-запроса",
];

const dbTaskTitles = [
  "Заказы пользователя за последние 30 дней",
  "Пользователи без заказов",
  "Сумма оплаченных заказов за месяц",
  "Поиск дублирующихся email",
  "Последний заказ для каждого пользователя",
];

function TaskPreview({
  titles,
  prefix,
}: {
  titles: string[];
  prefix: string;
}) {
  return (
    <>
      {titles.map((title, index) => (
        <button key={title} className={`task-chip ${index === 0 ? "active" : ""}`}>
          {index + 1}. {prefix}
          {title}
        </button>
      ))}
    </>
  );
}

export default function Home() {
  return (
    <>
      <div className="page-shell">
        <header className="hero">
          <nav className="topbar">
            <div className="brand">
              <span className="brand-mark">QA</span>
              <div>
                <p>QA Auto Arena</p>
                <span>Практика для собеседований</span>
              </div>
            </div>
            <a className="topbar-link" href="#trainers">
              Перейти к тренажерам
            </a>
          </nav>

          <div className="hero-grid">
            <section className="hero-copy">
              <p className="eyebrow">Interview-ready practice</p>
              <h1>
                Тренируй UI, API и SQL-навыки так, как будто собеседование уже
                завтра
              </h1>
              <p className="hero-text">
                Площадка для QA Automation инженеров с задачами на написание
                автотестов, быстрым само-чеком и примерами сильных решений.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#trainers">
                  Начать практику
                </a>
                <a className="button button-secondary" href="#roadmap">
                  Что внутри
                </a>
              </div>
            </section>

            <aside className="hero-panel">
              <div className="panel-card accent-card">
                <span className="card-kicker">Фокус подготовки</span>
                <ul className="panel-list">
                  <li>UI автотесты: локаторы, ожидания, негативные проверки</li>
                  <li>API автотесты: статусы, схемы, авторизация, edge cases</li>
                  <li>
                    Базы данных: SQL-запросы, join&apos;ы, фильтрация и проверки
                    данных
                  </li>
                </ul>
              </div>
              <div className="panel-card stat-card">
                <span className="stat-value" id="completionRate">
                  0%
                </span>
                <span className="stat-label">
                  прогресса по текущим тренажерам
                </span>
              </div>
            </aside>
          </div>
        </header>

        <main>
          <section className="overview" id="roadmap">
            <div className="section-heading">
              <p className="eyebrow">Roadmap</p>
              <h2>Что дает этот сайт для подготовки QA Auto</h2>
            </div>
            <div className="feature-grid">
              <article className="feature-card">
                <h3>Практика вместо теории</h3>
                <p>
                  Каждый блок построен вокруг задач, похожих на те, которые
                  часто дают на интервью и тестовых заданиях.
                </p>
              </article>
              <article className="feature-card">
                <h3>Быстрая самооценка</h3>
                <p>
                  После ввода решения можно сразу проверить, покрыты ли ключевые
                  критерии хорошего ответа.
                </p>
              </article>
              <article className="feature-card">
                <h3>Эталонные примеры</h3>
                <p>
                  Для каждого тренажера есть пример сильного решения, чтобы
                  сравнить подход, структуру и полноту проверки.
                </p>
              </article>
            </div>

            <div className="track-grid">
              <article className="track-card">
                <span className="track-count">5 UI</span>
                <h3>Тренировка browser automation</h3>
                <p>
                  Логин, фильтрация, checkout, flaky-ожидания и форма с
                  валидацией на уровне Junior, Middle и Senior.
                </p>
              </article>
              <article className="track-card">
                <span className="track-count">5 API</span>
                <h3>Практика API design checks</h3>
                <p>
                  CRUD, авторизация, контрактные проверки, пагинация и
                  идемпотентность с акцентом на реальные риски.
                </p>
              </article>
              <article className="track-card">
                <span className="track-count">5 DB</span>
                <h3>SQL для тестирования данных</h3>
                <p>
                  Фильтрация, агрегации, join&apos;ы, дедупликация и поиск проблем
                  в данных, которые любят на техсобесах.
                </p>
              </article>
            </div>
          </section>

          <section className="trainers" id="trainers">
            <div className="section-heading">
              <p className="eyebrow">Hands-on lab</p>
              <h2>Тренажеры для подготовки к собеседованиям</h2>
            </div>

            <div
              className="trainer-tabs"
              role="tablist"
              aria-label="Выбор тренажера"
            >
              <button
                className="tab-button active"
                data-target="ui"
                role="tab"
                aria-selected="true"
              >
                UI Auto
              </button>
              <button
                className="tab-button"
                data-target="api"
                role="tab"
                aria-selected="false"
              >
                API Auto
              </button>
              <button
                className="tab-button"
                data-target="db"
                role="tab"
                aria-selected="false"
              >
                SQL / DB
              </button>
            </div>

            <div className="trainer-panels">
              <article className="trainer-panel active" id="ui" role="tabpanel">
                <div className="trainer-layout">
                  <div className="challenge-card">
                    <div className="trainer-meta">
                      <span className="challenge-label">UI Track</span>
                      <div className="trainer-stats">
                        <span id="uiTaskCount">5 задач</span>
                        <span id="uiTrackProgress">0% заполнено</span>
                      </div>
                    </div>
                    <div className="level-filter" id="uiLevelFilter">
                      <button className="level-chip active">All</button>
                      <button className="level-chip">Junior</button>
                      <button className="level-chip">Middle</button>
                      <button className="level-chip">Senior</button>
                    </div>
                    <div className="task-list" id="uiTaskList">
                      <TaskPreview titles={uiTaskTitles} prefix="" />
                    </div>
                  </div>

                  <div className="workspace-card">
                    <div className="workspace-header">
                      <div>
                        <p className="workspace-kicker" id="uiTaskLevel">
                          Junior
                        </p>
                        <h3 id="uiTaskTitle">{uiTaskTitles[0]}</h3>
                      </div>
                      <button
                        className="button button-secondary next-task-button"
                        data-scope="ui"
                      >
                        Следующая задача
                      </button>
                    </div>
                    <p className="workspace-description" id="uiTaskDescription">
                      Напиши UI автотест на Playwright или Selenium для формы
                      логина интернет-магазина.
                    </p>
                    <ul className="challenge-points" id="uiTaskPoints">
                      <li>Открой страницу логина</li>
                      <li>Заполни email и password</li>
                      <li>Нажми кнопку входа</li>
                      <li>Проверь редирект на dashboard или личный кабинет</li>
                      <li>Добавь хотя бы одно явное ожидание</li>
                    </ul>
                    <label className="editor-label" htmlFor="uiAnswer">
                      Твое решение
                    </label>
                    <textarea id="uiAnswer" className="code-editor" spellCheck="false" />
                    <div className="workspace-actions">
                      <button
                        className="button button-primary evaluate-button"
                        data-scope="ui"
                      >
                        Проверить решение
                      </button>
                      <button
                        className="button button-secondary solution-button"
                        data-scope="ui"
                      >
                        Показать пример
                      </button>
                    </div>
                    <div className="feedback" id="uiFeedback" />
                    <pre className="solution-box hidden" id="uiSolution" />
                  </div>
                </div>
              </article>

              <article className="trainer-panel" id="api" role="tabpanel">
                <div className="trainer-layout">
                  <div className="challenge-card">
                    <div className="trainer-meta">
                      <span className="challenge-label">API Track</span>
                      <div className="trainer-stats">
                        <span id="apiTaskCount">5 задач</span>
                        <span id="apiTrackProgress">0% заполнено</span>
                      </div>
                    </div>
                    <div className="level-filter" id="apiLevelFilter">
                      <button className="level-chip active">All</button>
                      <button className="level-chip">Junior</button>
                      <button className="level-chip">Middle</button>
                      <button className="level-chip">Senior</button>
                    </div>
                    <div className="task-list" id="apiTaskList">
                      <TaskPreview titles={apiTaskTitles} prefix="" />
                    </div>
                  </div>

                  <div className="workspace-card">
                    <div className="workspace-header">
                      <div>
                        <p className="workspace-kicker" id="apiTaskLevel">
                          Junior
                        </p>
                        <h3 id="apiTaskTitle">{apiTaskTitles[0]}</h3>
                      </div>
                      <button
                        className="button button-secondary next-task-button"
                        data-scope="api"
                      >
                        Следующая задача
                      </button>
                    </div>
                    <p className="workspace-description" id="apiTaskDescription">
                      Проверь happy path создания пользователя через API.
                    </p>
                    <ul className="challenge-points" id="apiTaskPoints">
                      <li>Отправь POST-запрос с телом пользователя</li>
                      <li>Проверь статус-код</li>
                      <li>Проверь тело ответа</li>
                      <li>Убедись, что вернулся id</li>
                      <li>Проверь совпадение полей из payload</li>
                    </ul>
                    <label className="editor-label" htmlFor="apiAnswer">
                      Твое решение
                    </label>
                    <textarea id="apiAnswer" className="code-editor" spellCheck="false" />
                    <div className="workspace-actions">
                      <button
                        className="button button-primary evaluate-button"
                        data-scope="api"
                      >
                        Проверить решение
                      </button>
                      <button
                        className="button button-secondary solution-button"
                        data-scope="api"
                      >
                        Показать пример
                      </button>
                    </div>
                    <div className="feedback" id="apiFeedback" />
                    <pre className="solution-box hidden" id="apiSolution" />
                  </div>
                </div>
              </article>

              <article className="trainer-panel" id="db" role="tabpanel">
                <div className="trainer-layout">
                  <div className="challenge-card">
                    <div className="trainer-meta">
                      <span className="challenge-label">DB Track</span>
                      <div className="trainer-stats">
                        <span id="dbTaskCount">5 задач</span>
                        <span id="dbTrackProgress">0% заполнено</span>
                      </div>
                    </div>
                    <div className="level-filter" id="dbLevelFilter">
                      <button className="level-chip active">All</button>
                      <button className="level-chip">Junior</button>
                      <button className="level-chip">Middle</button>
                      <button className="level-chip">Senior</button>
                    </div>
                    <div className="task-list" id="dbTaskList">
                      <TaskPreview titles={dbTaskTitles} prefix="" />
                    </div>
                  </div>

                  <div className="workspace-card">
                    <div className="workspace-header">
                      <div>
                        <p className="workspace-kicker" id="dbTaskLevel">
                          Junior
                        </p>
                        <h3 id="dbTaskTitle">{dbTaskTitles[0]}</h3>
                      </div>
                      <button
                        className="button button-secondary next-task-button"
                        data-scope="db"
                      >
                        Следующая задача
                      </button>
                    </div>
                    <p className="workspace-description" id="dbTaskDescription">
                      Напиши SQL-запрос для выборки заказов пользователя
                      user_id = 15 за последние 30 дней.
                    </p>
                    <ul className="challenge-points" id="dbTaskPoints">
                      <li>Используй SELECT из orders</li>
                      <li>Отфильтруй по user_id = 15</li>
                      <li>Добавь фильтр по дате за последние 30 дней</li>
                      <li>Отсортируй по created_at DESC</li>
                      <li>По желанию выбери конкретные колонки</li>
                    </ul>
                    <label className="editor-label" htmlFor="dbAnswer">
                      Твое решение
                    </label>
                    <textarea id="dbAnswer" className="code-editor" spellCheck="false" />
                    <div className="workspace-actions">
                      <button
                        className="button button-primary evaluate-button"
                        data-scope="db"
                      >
                        Проверить решение
                      </button>
                      <button
                        className="button button-secondary solution-button"
                        data-scope="db"
                      >
                        Показать пример
                      </button>
                    </div>
                    <div className="feedback" id="dbFeedback" />
                    <pre className="solution-box hidden" id="dbSolution" />
                  </div>
                </div>
              </article>
            </div>
          </section>

          <section className="interview-section">
            <div className="section-heading">
              <p className="eyebrow">Interview tips</p>
              <h2>Что особенно ценят интервьюеры</h2>
            </div>
            <div className="tips-grid">
              <article className="tip-card">
                <h3>Структура мысли</h3>
                <p>
                  Важно не только написать код, но и показать, что ты понимаешь
                  цель теста, риски и критерии надежной проверки.
                </p>
              </article>
              <article className="tip-card">
                <h3>Негативные сценарии</h3>
                <p>
                  Сильные кандидаты почти всегда думают о невалидных данных,
                  статусах ошибок и пограничных условиях.
                </p>
              </article>
              <article className="tip-card">
                <h3>Читаемость и поддерживаемость</h3>
                <p>
                  Даже короткое тестовое задание выигрывает, если в нем есть
                  понятные названия, ожидания и логичная последовательность
                  шагов.
                </p>
              </article>
            </div>
          </section>
        </main>
      </div>

      <Script src="/trainer.js" strategy="afterInteractive" />
    </>
  );
}
