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
  window.SilverStripe = window.SilverStripe || { 'settings': {}, 'behaviors': {}, 'themes': {}, 'locale': {} };
  window.SilverStripe.settings.baseUrl='$BaseHref';
  window.SilverStripe.settings.baseRelUrl='$baseURL';
  window.SilverStripe.settings.pageUrl='$Link';
  window.SilverStripe.behaviors = {
    attachBehaviors:function (context) {
      if (typeof context == 'undefined') {
        context = window;
      }
      for(var behavior in this) {
        if (typeof this[behavior].attach == 'function') {
          this[behavior].attach.call(this[behavior], context, window.SilverStripe.settings);
        }
      }
    }
  }
  document.addEventListener('DOMContentLoaded', window.SilverStripe.behaviors.attachBehaviors.call(window.SilverStripe.behaviors));
</script>