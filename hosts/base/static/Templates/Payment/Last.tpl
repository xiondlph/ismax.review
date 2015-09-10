<h3 class="b-last-payment__title">Последний платеж</h3>
<table cellpadding="0" cellspacing="0" class="b-grid">
    <tr class="b-grid__row">
        <th class="b-grid__head b-grid__head_col4 b-grid__head_center">Дата</th>
        <th class="b-grid__head b-grid__head_col4 b-grid__head_center">Сумма</th>
        <th class="b-grid__head b-grid__head_col4 b-grid__head_center">Период</th>
        <th class="b-grid__head b-grid__head_col4 b-grid__head_center">Статус</th>
    </tr>
    <tr class="b-grid__row">
        <td class="b-grid__cell b-grid__cell_col4 b-grid__cell_center b-grid__cell_item"><%= datetime %></td>
        <td class="b-grid__cell b-grid__cell_col4 b-grid__cell_center b-grid__cell_item"><%= withdraw_amount %> руб.</td>
        <td class="b-grid__cell b-grid__cell_col4 b-grid__cell_center b-grid__cell_item"><%= period %></td>
        <td class="b-grid__cell b-grid__cell_col4 b-grid__cell_center b-grid__cell_item">
<% if (period) { %>
            <img src="/images/success.svg" alt="Платеж успешно выполнен" title="Платеж успешно выполнен"/>
<% } else { %>
            <img src="/images/error.svg" alt="Платеж не выполнен" title="Платеж не выполнен"/>
<% } %>
        </td>
    </tr>
    <tr class="b-grid__row">
        <td colspan="4" align="right" class="b-grid__cell"><a href="#history" class="b-grid__cell__action icon-move-down">Все операций</a></td>
    </tr>
</table>