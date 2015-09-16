<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <meta name="keywords" content="" />
    <meta name="description" content="" />
<# if (process.env.NODE_ENV !== 'prod') { #>
    <link href="/css/common.css" rel="stylesheet" type="text/css" />
    <link href="/css/index.css" rel="stylesheet" type="text/css" />
    <script data-main="/js/Index" src="/lib/requirejs/require.js"></script>
<# } else { #>
    <link href="/build/index.css" rel="stylesheet" type="text/css" />
    <script src="/build/index.js"></script>
<# } #>
    <title>Готовые отзывы для вашего интернет магазина</title>
</head>
<body>
<#@ /inc/header #>
    <section class="b-section">
        <h1 class="b-home__header">Готовые отзывы о товарах для<br />интернет магазина</h1>
        <p class="b-home__text">Shareview это надежный источник пользовательских отзывов о товарах для вашего интернет-магазина.<br />Мы собираем миллионы отзывов для десятков тысяч товаров, чтобы вы за пару минут могли опубликовать их на своем сайте. Для этого вам достаточно только зарегистрироватся.</p>
    </section>
<#@ /inc/footer #>
<#@ /inc/counter #>
</body>
</html>