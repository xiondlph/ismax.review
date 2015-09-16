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
    <title>Описание сервиса</title>
</head>
<body>
<#@ /inc/header #>
    <section class="b-section">
        <h1>Описание сервиса</h1>
        <article class="b-section__article">
            <h2>Система отзывов</h2>
            <p>Shareview это уникальный проект, представляющий собой систему отзывов о товарах для интернет-магазина, сочетающую в себе простоту интеграции и управления, а также инновационный подход к процессу сбора отзывов от покупателей.</p>
        </article>
        <article class="b-section__article">
            <h2>Виджет для интернет-магазина</h2>
            <p>Проект Shareview реализован в виде сервиса, которая позволяет владельцам интернет-магазинов устанавливать на карточки товаров своего сайта специальный виджет, отображающий отзывы о товарах из нашей обширной базы отзывов.</p>
        </article>
        <article class="b-section__article">
            <h2>Идея проекта</h2>
            <p>Идея, которую реализует наш проект, очень простая и в тоже время крайне действенная. Проект, является своего рода агрегатором отзывов о товарах, источником контента, для которого, являются сами пользователи сервиса, то есть интернет-магазины, использующие нашу систему отзывов , а также участвующих в нашей партнерской сети.</p>
        </article>
<#@ /inc/signup #>
    </section>
<#@ /inc/footer #>
<#@ /inc/counter #>
</body>
</html>