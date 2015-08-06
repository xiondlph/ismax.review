<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
<#     if (process.env.NODE_ENV !== 'prod') { #>

<#     } else { #>

<#     } #>
    <title>Widget</title>
</head>
<body>
<# if (this.data.hasOwnProperty('search') && search){ #>
    <script src="/widget?text=<#= search #>"></script>
<# } #>
</body>
</html>