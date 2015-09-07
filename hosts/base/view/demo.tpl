<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
<# if (process.env.NODE_ENV !== 'prod') { #>
    <link href="/css/common.css" rel="stylesheet" type="text/css" />
    <link href="/css/demo.css" rel="stylesheet" type="text/css" />
    <script data-main="/js/Demo" src="/lib/requirejs/require.js"></script>
<# } else { #>
    <link href="/build/demo.css" rel="stylesheet" type="text/css" />
    <script src="/build/demo.js"></script>
<# } #>
    <title>Виджет отзывов - демо</title>
</head>
<body>
<#@ /inc/header #>
    <section class="b-section">
        <form class="b-form b-switch b-switch_animate" action="http://www.<#= process.env.HOST #>.ru/demo" method="get">
            <div class="b-table b-table_wide b-form__table">
                <div class="b-table__tr">
                    <div class="b-table__tr__td b-form__table_head b-form__table_head_active">
                        <div class="b-form__title">Демо виджета</div>
                    </div>
                </div>
                <div class="b-table__tr">
                    <div class="b-table__tr__td">
                        <div class="b-form__field">
<# if (this.data.hasOwnProperty('text') && text) { #>
                            <input type="text" name="text" class="b-form__field__input j-form__field__input" id="text" value="<#= text #>">
<# } else { #>
                            <input type="text" name="text" class="b-form__field__input j-form__field__input" id="text" value="Rowenta CF 9320">
<# } #>
                            <label class="b-form__field__label" for="text">Название товара<span class="b-form__field__label__invalid"></span></label>
                        </div>
                    </div>
                </div>
                <div class="b-table__tr">
                    <div class="b-table__tr__td">
<# if (this.data.hasOwnProperty('text') && text) { #>
                        <script id="ismaxCode" src="/code?text=<#= text #>" type="text/javascript"></script>
<# } else { #>
                        <script id="ismaxCode" src="/code?text=Rowenta%20CF%209320" type="text/javascript"></script>
<# } #>
                    </div>
                </div>
            </div>
        </form>
    </section>
<#@ /inc/footer #>
<#@ /inc/counter #>
</body>
</html>