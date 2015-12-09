<!DOCTYPE html>
<!--[if !IE]><!-->
<html lang="$ContentLocale">
<!--<![endif]-->
<!--[if IE 6 ]><html lang="$ContentLocale" class="ie ie6"><![endif]-->
<!--[if IE 7 ]><html lang="$ContentLocale" class="ie ie7"><![endif]-->
<!--[if IE 8 ]><html lang="$ContentLocale" class="ie ie8"><![endif]-->
<head>
	<% base_tag %>
	<title><% if $MetaTitle %>$MetaTitle<% else %>$Title<% end_if %> &raquo; $SiteConfig.Title</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	$MetaTags(false)
  <% require themedCSS('layout') %>
	<!--[if lt IE 9]>
	<script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
	<link rel="shortcut icon" href="$ThemeDir/images/favicon.ico" />
  <script type="text/javascript">
    window.SilverStripe = {
      baseUrl:'$BaseHref',
      baseRelUrl:'$baseURL',
      pageUrl:'$Link'
    }
  </script>
</head>
<body class="$ClassName">
<% include Header %>
<div class="main wrapper" role="main">
	<div class="inner typography line">
		$Layout
	</div>
</div>
<% include Footer %>



</body>
</html>
