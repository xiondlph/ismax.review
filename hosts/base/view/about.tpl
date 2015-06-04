<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <meta name="keywords" content="api, yandex, market, апи, яндекс маркет, парсер, доступ, отзывы, товары, магазины, цены, скачать, битрикс, 1с" />
    <meta name="description" content="ICSYSTEM - альтернативный доступ к контентному API Яндекс.Маркет без ключа доступа." />
<# if (process.env.NODE_ENV !== 'prod') { #>
    <link href="/css/common.css" rel="stylesheet" type="text/css" />
    <link href="/css/simple.css" rel="stylesheet" type="text/css" />
    <script data-main="/js/Simple" src="/lib/requirejs/require.js"></script>
<# } else { #>
    <link href="/build/simple.css" rel="stylesheet" type="text/css" />
    <script src="/build/simple.js"></script>
<# } #>
    <title>Открытый доступ к API Яндекс.Маркет</title>
</head>
<body>
<#@ /inc/header #>
    <section class="b-section">
        <h1>Открытый доступ к API Яндекс.Маркет</h1>
        <article class="b-section__article">
            <h2>Альтернативный интерфейс</h2>
            <p>ICSYSTEM это технологическое решение работающее в режиме онлайн сервиса. Данный сервис представляет собой альтернативный и открытый интерфейс взаимодействия с <a href="/ymapi">контентным API Яндекс.Маркет.</a></p>
            <p>Под альтернативным интерфейсом взаимодействия подразумевается набор URL адресов предоставляемых сервисом ICSYSTEM для выполнения GET запросов к ресурсам контентного API Яндекс.Маркет.</p>
        </article>
        <article class="b-section__article">
            <h2>Преимущество сервиса ICSYSTEM</h2>
            <p>Преимущественное отличие альтернативного интерфейса в том, что при выполнении GET запросов к API через сервис ICSYSTEM, для получения данных, <strong>нет необходимости указывать ключ доступа в заголовке запроса.</strong></p>
            <p>Сервис предоставляет полноценный открытый доступ к контентному API Яндекс.Маркет. И процесс взаимодействия с API, через данный сервис, полностью соответствует правилам описанным в официальной <a href="http://api.yandex.ru/market/content/doc/dg/concepts/about.xml" target="_blank" rel="nofollow me">документации</a> к API Яндекс.Маркет.</p>
        </article>
        <article class="b-section__article">
            <h2>Использование сервиса ICSYSTEM</h2>
            <p>Основное отличие альтернативных URL адресов от исходных это конечно же доменное имя. Для доступа к API через сервис ICSYSTEM, следует в исходных URL заменять доменное имя api.content.market.yandex.ru на market.icsystem.ru.</p>
            <p>Так же запросы к API через альтернативные URL адреса производятся по протоколу HTTP, в отличии от исходных, которые используют протокол HTTPS. </p>
            <p>Соответственно формат запроса через сервис ICSYSTEM должен быть таким:</p>
            <div class="codeblock">
<pre><code>&lt;тип_метода&gt; http://market.icsystem.ru/v&lt;версия_API&gt;/&lt;ресурс&gt;.&lt;формат_ответа&gt;?&lt;параметры&gt;</code></pre>  
            </div>
            <p><i>Следует заметить, что в целях безопасности доступ к API через сервис ICSYSTEM осуществляется исключительно с IP адреса, привязанного к Вашему аккаунту в системе. Следовательно, для использования сервиса необходимо зарегистрироваться в системе и в личном кабинете выполнить привязку к Вашему аккаунту того IP адреса, с которого предполагается осуществлять запросы.</i></p>
        </article>
<#@ /inc/signup #>
    </section>
<#@ /inc/footer #>
<#@ /inc/counter #>
</body>
</html>