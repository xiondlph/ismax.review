App.Secure.Templates.Login = {
  Form: [
    '<form>',
    '  <fieldset>',
    '    <legend>Авторизация</legend>',
    '    <table>',
    '      <tr>',
    '        <td>',
    '          <input type="text" placeholder="Email" name="email" info="Укажите Email" class="invalid" />',
    '        </td>',
    '      </tr>',
    '      <tr>',
    '        <td>',
    '          <input type="password" placeholder="Пароль" name="password" info="Укажите пароль" class="invalid" />',
    '        </td>',
    '      </tr>',
    '      <tr>',
    '        <td>',
    '          <input type="submit" value="Вход" disabled="disabled" />',
    '        </td>',
    '      </tr>',
    '      <tr>',
    '        <td>',
    '          <a href="#forgot" id="login_forgot_link">Забыли пароль?</a>',
    '        </td>',
    '      </tr>',
    '    </table>',
    '  </fieldset>',
    '</form>'
  ].join("\n"),

  Forgot: [
    '<form>',
    '  <fieldset>',
    '    <legend>Востановление доступа</legend>',
    '    <table>',
    '      <tr>',
    '        <td>',
    '          <input type="text" placeholder="Email" name="email" info="Укажите Email" class="invalid" />',
    '        </td>',
    '      </tr>',
    '      <tr>',
    '        <td>',
    '          <input type="submit" value="Отправить" disabled="disabled" />',
    '        </td>',
    '      </tr>',
    '    </table>',
    '  </fieldset>',
    '</form>'
  ].join("\n")
}