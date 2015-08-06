<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <meta name="keywords" content="" />
    <meta name="description" content="" />
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
            <h2>Готовые отзывы для вашего интренет магазина</h2>
            <p>Виджет отзывов для вашего интернет магазина.</p>
        </article>
<#@ /inc/signup #>
    </section>
<#@ /inc/footer #>
<#@ /inc/counter #>
</body>
</html>