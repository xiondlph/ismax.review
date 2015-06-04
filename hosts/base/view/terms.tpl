<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <meta name="keywords" content="api, yandex, market, апи, яндекс маркет, парсер, доступ, отзывы, товары, магазины, цены, скачать, битрикс, 1с" />
    <meta name="description" content="парсер яндекс маркета, который позволяет свободно использовать контентный API Яндекс.Маркет без необходимости получения ключа доступа." />
<# if (process.env.NODE_ENV !== 'prod') { #>
    <link href="/css/common.css" rel="stylesheet" type="text/css" />
    <link href="/css/simple.css" rel="stylesheet" type="text/css" />
    <script data-main="/js/Simple" src="/lib/requirejs/require.js"></script>
<# } else { #>
    <link href="/build/simple.css" rel="stylesheet" type="text/css" />
    <script src="/build/simple.js"></script>
<# } #>
    <title>Условия использования</title>
</head>
<body>
<#@ /inc/header #>
    <section class="b-section">
        <h1>Условия использования</h1>
        <article class="b-section__article">
            <h2>Варианты доступа</h2>
            <p>На данный момент сервис ICSYSTEM осуществляет предоставление доступа к контентному API Яндекс.Маркет в двух вариантах – базовый и безлимитный.</p>
        </article>
        <article class="b-section__article">
            <h2>Базовый вариант</h2>
            <p>Базовый вариант доступа является бесплатным и предоставляется всем пользователям сервиса сразу же после регистрации. Однако данный вариант доступа действует в режиме ограничения в виде лимита на количество запросов к ресурсам API в определенный промежуток времени с одного IP адреса.</p>
            <p>На данный момент в базовом варианте доступа действует следующий ограничительный лимит:
            <br />
            <center><strong>1 запрос в 5 секунд.</strong></center></p>
        </article>
        <article class="b-section__article">
            <h2>Безлимитный вариант</h2>
            <p>Безлимитный вариант доступа в отличии от базового предполагает осуществление запросов к API без ограничительного лимита.</p>
            <p>Безлимитный вариант доступа является платным.  Оплата безлимитного доступа производится путем покупки запросов, на которые не распространяется ограничительный лимит. Покупка данного вида запросов осуществляется по тарифу:
            <br />
            <center><strong>1 руб. за 100 запросов.</strong></center></p>
        </article>
<#@ /inc/signup #>
    </section>
<#@ /inc/footer #>
<#@ /inc/counter #>
</body>
</html>