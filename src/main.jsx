import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const APP_LINKS = {
  "App Store": "https://apps.apple.com/us/app/levita/id6744159330",
  "Google Play": "https://play.google.com/store/apps/details?id=listok.levita",
  AppGallery: "https://appgallery.huawei.com/#/app/C113866449",
};

const WEBSITE_URL = "https://an9908.listok.online";

const changes = [
  {
    title: "План именно для вас",
    text: "После анкеты перед пробным занятием мы за 1–2 дня подготовим индивидуальный план. Он появится в приложении.",
  },
  {
    title: "Камерный формат",
    text: "Занятия проходят в маленьких группах, а тренер видит особенности и прогресс каждой участницы.",
  },
  {
    title: "Жизнь клуба",
    text: "Мероприятия, мастер-классы, клубные чаты, онлайн-тренировки, гостевые визиты и подарки партнёров.",
  },
  {
    title: "Без банков и рассрочек",
    text: "Никаких кредитных договоров. Вы оплачиваете понятный период и пользуетесь клубом.",
  },
];

const tariffs = [
  { id: "8", pace: "2 раза в неделю", visits: "8 занятий", price: "4 390 ₽", per: "549 ₽ / занятие" },
  { id: "12", pace: "3 раза в неделю", visits: "12 занятий", price: "6 270 ₽", per: "523 ₽ / занятие", featured: true },
  { id: "16", pace: "4 раза в неделю", visits: "16 занятий", price: "7 990 ₽", per: "499 ₽ / занятие" },
];

const terms = [
  {
    title: "3 месяца",
    label: "Лёгкий старт",
    items: ["1 гостевой визит", "Клубные чаты", "Онлайн-тренировки", "Мероприятия и мастер-классы"],
  },
  {
    title: "6 месяцев",
    label: "Оптимальный баланс",
    items: ["5 гостевых визитов", "2 заморозки по 7 дней", "Сертификат от партнёра", "Все возможности клуба"],
    featured: true,
  },
  {
    title: "12 месяцев",
    label: "Максимум возможностей",
    items: ["10 гостевых визитов", "4 заморозки по 7 дней", "Сертификаты партнёров", "Библиотека домашних тренировок"],
  },
];

const rules = [
  "Тариф продлевается автоматически каждые 28 дней.",
  "После оплаты в приложении появляется новый блок занятий.",
  "Отменить продление можно до даты следующего списания.",
  "Неиспользованные занятия не переносятся на следующий период.",
  "Заморозка сохраняет дни и занятия, если она предусмотрена выбранным сроком.",
  "Тариф можно активировать в течение ближайших 10 дней.",
  "Срок участия и тариф можно изменить — сообщите администратору.",
  "При отмене и повторном вступлении членский взнос оплачивается заново.",
];

const steps = [
  { title: "Выберите город", text: "Краснодар", image: "/assets/app/city.png", alt: "Выбор города Краснодар в приложении LEVITA" },
  { title: "Выберите филиал", text: "Мачуги, 4", image: "/assets/app/branch.png", alt: "Выбор филиала Мачуги, 4" },
  { title: "Нажмите «Войти»", text: "Авторизуйтесь по номеру телефона и коду из SMS.", image: "/assets/app/login.png", alt: "Кнопка входа в приложении LEVITA" },
  { title: "Откройте тарифы", text: "После входа выберите раздел «Абонементы».", image: "/assets/app/plans.png", alt: "Раздел Абонементы в приложении LEVITA" },
  { title: "Выберите тариф", text: "Нажмите «Купить по подписке» у подходящего тарифа.", image: "/assets/app/choose.png", alt: "Выбор тарифа в приложении LEVITA" },
  { title: "Введите e-mail", text: "На него придёт электронный чек.", image: "/assets/app/email.png", alt: "Поле e-mail для электронного чека" },
  { title: "Нажмите «Оплатить»", text: "Проверьте сумму и подтвердите действие.", image: "/assets/app/pay.png", alt: "Кнопка оплаты тарифа в приложении LEVITA" },
  { title: "Перейдите к оплате", text: "Приложение откроет защищённую страницу оплаты. Дальше следуйте подсказкам на экране." },
];

const websiteSteps = [
  {
    title: "Нажмите «Войти»",
    text: "Откройте сайт и нажмите «Войти» в правом верхнем углу.",
    image: "/assets/website/step-01-login.png",
    alt: "Кнопка Войти на сайте LEVITA",
  },
  {
    title: "Авторизуйтесь",
    text: "Введите номер телефона и пароль. Если пароля ещё нет, выберите «Получить пароль».",
    image: "/assets/website/step-02-auth.png",
    alt: "Окно авторизации на сайте LEVITA",
  },
  {
    title: "Откройте абонементы",
    text: "После входа выберите в верхнем меню пункт «Купить абонемент».",
    image: "/assets/website/step-03-menu.png",
    alt: "Пункт Купить абонемент в меню сайта",
  },
  {
    title: "Выберите подходящий тариф",
    text: "Найдите нужное количество занятий и срок участия, затем нажмите «Купить».",
    image: "/assets/website/step-04-tariffs.png",
    alt: "Список тарифов на сайте LEVITA",
  },
  {
    title: "Проверьте условия и введите e-mail",
    text: "Проверьте название тарифа, стоимость и членский взнос. Укажите e-mail для электронного чека.",
    image: "/assets/website/step-05-email.png",
    alt: "Оформление абонемента и поле электронной почты",
  },
  {
    title: "Подтвердите покупку",
    text: "Проверьте итоговую сумму и условия подписки, затем нажмите «Купить». Сайт переведёт вас к оплате.",
    image: "/assets/website/step-06-buy.png",
    alt: "Итоговая сумма и кнопка Купить",
  },
];

function ArrowIcon({ direction = "right" }) {
  return (
    <svg className={`icon-arrow icon-arrow--${direction}`} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M14 7l5 5-5 5" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="icon-check" viewBox="0 0 18 18" aria-hidden="true">
      <path d="m3.5 9 3.2 3.2 7.8-7.4" />
    </svg>
  );
}

function Brand() {
  return (
    <span className="brand" aria-label="LEVITA">
      <span>L E V I T A</span>
    </span>
  );
}

function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="brand-link" href="#top" aria-label="В начало страницы"><Brand /></a>
        <nav className="header-nav" aria-label="Основная навигация">
          <a href="#changes">Что изменилось</a>
          <a href="#tariffs">Тарифы</a>
          <a href="#app">В приложении</a>
        </nav>
        <a className="button button--small" href="#tariffs"><span className="cta-full">Смотреть тарифы</span><span className="cta-short">Тарифы</span></a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-orb hero-orb--left" />
      <div className="hero-orb hero-orb--right" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <h1>LEVITA — теперь больше, чем студия</h1>
          <p>Женский клуб, где тренировки складываются в персональный путь, а забота не заканчивается дверями зала.</p>
          <div className="hero-actions">
            <a className="button" href="#changes">Узнать, что изменилось <ArrowIcon /></a>
            <a className="text-link" href="#tariffs">Перейти к тарифам</a>
          </div>
          <p className="hero-note"><strong>Пробное занятие — бесплатно.</strong> Познакомьтесь с клубом и тренером без оплаты.</p>
        </div>
        <div className="phone-scene" aria-label="Приложение LEVITA">
          <div className="phone">
            <div className="phone-speaker" />
            <img src="/assets/app/hero.png" alt="Главный экран приложения LEVITA" />
          </div>
          <span className="scene-label scene-label--one">Индивидуальный план</span>
          <span className="scene-label scene-label--two">Маленькие группы</span>
          <span className="scene-label scene-label--three">События и забота</span>
        </div>
      </div>
    </section>
  );
}

function Changes() {
  return (
    <section className="section section--ice" id="changes">
      <div className="container">
        <div className="section-heading split-heading">
          <h2>Из студии —<br />в женский клуб</h2>
          <p>Мы сохранили любимые тренировки и добавили всё, что помогает двигаться к результату с удовольствием.</p>
        </div>
        <div className="change-list">
          {changes.map((item, index) => (
            <article className="change-item" key={item.title}>
              <span className="number">{String(index + 1).padStart(2, "0")}</span>
              <div><h3>{item.title}</h3><p>{item.text}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PaymentModel() {
  return (
    <section className="section payment-model" id="model">
      <div className="container payment-grid">
        <div className="payment-intro">
          <h2>Простой ежемесячный тариф</h2>
          <p>По принципу мобильной связи: оплатили период — пользуетесь клубом.</p>
        </div>
        <div className="period-card">
          <strong>28</strong>
          <div><h3>дней — один оплаченный период</h3><p>В дату окончания оплата списывается автоматически, а в приложении появляется новый блок тренировок.</p></div>
        </div>
        <div className="model-notes">
          <article><h3>3 / 6 / 12 месяцев</h3><p>Вы выбираете срок участия в клубе. Это не кредит и не обязательство перед банком, а личный горизонт и набор возможностей.</p></article>
          <article><h3>Можно остановить</h3><p>Если решите не продолжать, сообщите об этом до даты следующего списания.</p></article>
        </div>
        <aside className="membership">
          <div><h3>Членский взнос — 4 400 ₽</h3><p>Единоразовая плата за вступление и пользование инфраструктурой клуба. Она навсегда фиксирует за вами стоимость тарифа.</p></div>
          <p className="membership-special">Специальное предложение по стоимости вступления и сумме членского взноса уточните у администратора.</p>
        </aside>
      </div>
    </section>
  );
}

function Tariffs() {
  const [selected, setSelected] = useState("12");
  return (
    <section className="section" id="tariffs">
      <div className="container">
        <div className="section-heading">
          <h2>Выберите комфортный ритм</h2>
          <p>Сумма списывается один раз в 28 дней. Нажмите на вариант, чтобы сравнить.</p>
        </div>
        <div className="tariff-grid" role="radiogroup" aria-label="Выбор тарифа">
          {tariffs.map((tariff) => {
            const active = selected === tariff.id;
            return (
              <button className={`tariff-card ${active ? "is-selected" : ""}`} type="button" role="radio" aria-checked={active} onClick={() => setSelected(tariff.id)} key={tariff.id}>
                {tariff.featured ? <span className="popular">Самый популярный</span> : null}
                <span className="tariff-pace">{tariff.pace}</span>
                <span className="tariff-visits">{tariff.visits}</span>
                <strong>{tariff.price}</strong>
                <span className="tariff-per">{tariff.per}</span>
              </button>
            );
          })}
        </div>
        <div className="tariff-selection" aria-live="polite">Выбран ритм: <strong>{tariffs.find((tariff) => tariff.id === selected)?.pace}</strong></div>
        <div className="trial-banner"><div><h3>Пробное занятие — бесплатно</h3><p>Познакомьтесь с клубом и тренером без оплаты.</p></div><a className="text-link" href="#app">Как оформить тариф <ArrowIcon /></a></div>
      </div>
    </section>
  );
}

function Terms() {
  return (
    <section className="section section--ice" id="terms">
      <div className="container">
        <div className="section-heading">
          <h2>Выберите срок участия</h2>
          <p>Чем дольше выбранный путь, тем больше возможностей включено в клуб.</p>
        </div>
        <div className="term-grid">
          {terms.map((term) => (
            <article className={`term-card ${term.featured ? "term-card--featured" : ""}`} key={term.title}>
              <div className="term-head"><h3>{term.title}</h3><span>{term.label}</span></div>
              <ul>{term.items.map((item) => <li key={item}><CheckIcon />{item}</li>)}</ul>
            </article>
          ))}
        </div>
        <p className="term-note">По окончании выбранного срока участие продлевается автоматически. Срок или тариф можно изменить — обратитесь к администратору.</p>
      </div>
    </section>
  );
}

function Rules() {
  return (
    <section className="section rules-section" id="rules">
      <div className="container rules-wrap">
        <div className="rules-copy"><h2>Главное о вашем тарифе</h2><p>Все важные условия — коротко и без мелкого шрифта.</p></div>
        <ol className="rules-list" aria-label="Важные правила тарифа">
          {rules.map((rule, index) => <li key={rule}><span>{String(index + 1).padStart(2, "0")}</span><p>{rule}</p></li>)}
        </ol>
      </div>
    </section>
  );
}

function StoreCard({ store, href }) {
  const fileName = store === "App Store" ? "qr_app_store.png" : store === "Google Play" ? "qr_google_play.png" : "qr_appgallery.png";
  return (
    <a className="store-card" href={href} target="_blank" rel="noreferrer">
      <img src={`/assets/app/${fileName}`} alt={`QR-код для ${store}`} />
      <span><strong>{store}</strong><small>Нажмите или отсканируйте</small></span>
      <ArrowIcon />
    </a>
  );
}

function WebsiteCard({ onOpen }) {
  return (
    <button className="store-card store-card--website" type="button" onClick={onOpen}>
      <img src="/assets/website/qr_website.png" alt="QR-код для оформления на сайте" />
      <span><strong>Оформить на сайте</strong><small>Открыть пошаговую инструкцию</small></span>
      <ArrowIcon />
    </button>
  );
}

function CloseIcon() {
  return (
    <svg className="icon-close" viewBox="0 0 24 24" aria-hidden="true">
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

function WebsiteGuideModal({ onClose }) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="website-modal" role="dialog" aria-modal="true" aria-labelledby="website-guide-title" onMouseDown={(event) => event.stopPropagation()}>
        <header className="website-modal__header">
          <div>
            <span className="modal-kicker">Оформление через сайт</span>
            <h2 id="website-guide-title">Подписка — шаг за шагом</h2>
          </div>
          <button className="modal-close" type="button" onClick={onClose} aria-label="Закрыть инструкцию"><CloseIcon /></button>
        </header>

        <div className="website-modal__body">
          <div className="website-modal__intro">
            <p>Весь процесс займёт несколько минут. Откройте сайт LEVITA и двигайтесь по шагам ниже.</p>
            <a className="button" href={WEBSITE_URL} target="_blank" rel="noreferrer">Открыть сайт <ArrowIcon /></a>
          </div>

          <div className="website-steps">
            {websiteSteps.map((item, index) => (
              <article className="website-step" key={item.title}>
                <div className="website-step__copy">
                  <span className="number">{String(index + 1).padStart(2, "0")}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <a href={item.image} target="_blank" rel="noreferrer">Увеличить скриншот</a>
                </div>
                <a className="website-step__visual" href={item.image} target="_blank" rel="noreferrer" aria-label={`Увеличить скриншот: ${item.title}`}>
                  <img src={item.image} alt={item.alt} loading="lazy" />
                </a>
              </article>
            ))}
          </div>

          <div className="website-modal__finish">
            <div><h3>Можно оформлять</h3><p>После нажатия «Купить» следуйте подсказкам на защищённой странице оплаты.</p></div>
            <a className="button" href={WEBSITE_URL} target="_blank" rel="noreferrer">Перейти к оформлению <ArrowIcon /></a>
          </div>
        </div>
      </section>
    </div>
  );
}

function AppGuide() {
  const [activeStep, setActiveStep] = useState(0);
  const [websiteGuideOpen, setWebsiteGuideOpen] = useState(false);
  const step = steps[activeStep];
  const go = (next) => setActiveStep((current) => (current + next + steps.length) % steps.length);
  return (
    <section className="section app-section" id="app">
      <div className="container">
        <div className="app-intro">
          <div><h2>Твоя студия теперь в телефоне</h2><p>Расписание, личный кабинет, индивидуальный план и оформление тарифа — в приложении LEVITA.</p></div>
          <div className="store-list">
            {Object.entries(APP_LINKS).map(([store, href]) => <StoreCard store={store} href={href} key={store} />)}
            <WebsiteCard onOpen={() => setWebsiteGuideOpen(true)} />
          </div>
        </div>

        <div className="guide-heading"><div><h2>Оформление — всего несколько шагов</h2><p>Сначала выберите Краснодар и филиал «Мачуги, 4».</p></div><span>Шаг {activeStep + 1} из {steps.length}</span></div>
        <div className="step-picker" role="tablist" aria-label="Шаги оформления">
          {steps.map((item, index) => <button type="button" role="tab" aria-selected={index === activeStep} onClick={() => setActiveStep(index)} key={item.title}>{index + 1}</button>)}
        </div>
        <div className={`step-stage ${step.image ? "" : "step-stage--finish"}`}>
          <div className="step-copy">
            <span className="number">{String(activeStep + 1).padStart(2, "0")}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
            <div className="step-controls">
              <button type="button" className="circle-button" aria-label="Предыдущий шаг" onClick={() => go(-1)}><ArrowIcon direction="left" /></button>
              <button type="button" className="button" onClick={() => go(1)}>{activeStep === steps.length - 1 ? "Сначала" : "Следующий шаг"}<ArrowIcon /></button>
            </div>
          </div>
          <div className="step-media">
            {step.image ? <img src={step.image} alt={step.alt} /> : <div className="finish-mark"><ArrowIcon /><strong>Готово!</strong><span>Вы окажетесь на странице оплаты</span></div>}
          </div>
        </div>
      </div>
      {websiteGuideOpen ? <WebsiteGuideModal onClose={() => setWebsiteGuideOpen(false)} /> : null}
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner"><Brand /><p>Новый формат клуба — с заботой о вашем пути.</p><a className="button" href="#tariffs">Смотреть тарифы <ArrowIcon /></a></div>
    </footer>
  );
}

function App() {
  return <><Header /><main><Hero /><Changes /><PaymentModel /><Tariffs /><Terms /><Rules /><AppGuide /></main><Footer /></>;
}

createRoot(document.getElementById("root")).render(<App />);
