<% for(var i=0; i <= payments.length -1; i++) { %>
    <tr class="b-grid__row">
        <td class="b-grid__cell b-grid__cell_col4 b-grid__cell_center b-grid__cell_item"><%= payments[i].datetime %></td>
        <td class="b-grid__cell b-grid__cell_col4 b-grid__cell_center b-grid__cell_item"><%= payments[i].withdraw_amount %> руб.</td>
        <td class="b-grid__cell b-grid__cell_col4 b-grid__cell_center b-grid__cell_item"><%= payments[i].newPeriod %></td>
        <td class="b-grid__cell b-grid__cell_col4 b-grid__cell_center b-grid__cell_item">
<%  if (payments[i].newPeriod) { %>
            <img src="/images/success.svg" alt="Платеж успешно выполнен" title="Платеж успешно выполнен"/>
<%  } else { %>
            <img src="/images/icons/error.svg" alt="Платеж не выполнен" title="Платеж не выполнен"/>
<%  } %>
        </td>
    </tr>
<% } %>