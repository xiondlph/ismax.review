<!DOCTYPE HTML>
<html>
<head>
	<meta http-equiv="content-type" content="text/html; charset=utf-8" />
<# if(this.data.modelId){#>
  <link href="/css/smoothness/jquery-ui-1.10.4.custom.min.css" rel="stylesheet" type="text/css" />
  <link href="/css/review.css" rel="stylesheet" type="text/css" />
  <script data-main="/js/Review" src="/js/lib/require.js"></script>
<# } #>
	<title>Отзывы<# if(this.data.modelId){#> - <#= this.data.text #><# } #></title>
</head>
<body id="ismax" <# if(this.data.modelId){#> _modelId="<#= this.data.modelId #>" _hash="<#= this.data.hash #>" _text="<#= this.data.text #>"<# } #>>

</body>
</html>