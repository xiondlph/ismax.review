        <header class="b-header" <# if(this.data.user){#> auth="<#= this.data.user.email #>"<# } #>>
            <nav class="b-nav">
                <a href="/" class="b-nav__logo">
                    sh<span class="b-nav__logo__ismax icon-ismax"></span>review
                </a>
                <# if(this.data.user){#>
                <div class="b-menu">
                    <ul class="b-menu__sub">
                        <li class="b-menu__sub__item"><a href="/profile#profile" class="b-menu__sub__item__link icon-profile">Профиль</a></li>
                        <li class="b-menu__sub__item"><a href="/profile#settings" class="b-menu__sub__item__link icon-settings">Настройки</a></li>
                        <li class="b-menu__sub__item"><a href="/profile#payment" class="b-menu__sub__item__link icon-credit-card">Оплата</a></li>
                        <li class="b-menu__sub__item"><a href="/user/signout" class="b-menu__sub__item__link icon-exit">Выход</a></li>
                    </ul>
                    <span class="b-menu__label"><span class="b-menu__label__border b-menu__label__border_dropdownd icon-arrow-down"><#= this.data.user.email #></span></span>
                </div>
                <# } else { #>
                <a href="/user" class="b-nav__item b-nav__item_right"><span class="b-nav__item__border">Вход</span></a>
                <# } #>
                <a href="/demo" class="b-nav__item b-nav__item_right">Демо</a>
                <a href="/about" class="b-nav__item b-nav__item_right">Описание</a>
<#
/*
                <div class="b-menu">
                    <ul class="b-menu__sub">
                        <li class="b-menu__sub__item"><a href="/about" class="b-menu__sub__item__link icon-page">Описание</a></li>
                        <li class="b-menu__sub__item"><a href="/destiny" class="b-menu__sub__item__link icon-page">Возможности</a></li>
                        <li class="b-menu__sub__item"><a href="/terms" class="b-menu__sub__item__link icon-page">Условия</a></li>
                    </ul>
                    <span class="b-menu__label">О сервисе</span>
                </div>
*/
#>
            </nav>
        </header>