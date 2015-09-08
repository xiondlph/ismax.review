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
<# if (this.data.hasOwnProperty('text') && text){ #>
    <script src="/widget?text=<#= text #>"></script>
<# } #>
</body>
</html>