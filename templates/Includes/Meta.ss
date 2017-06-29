<% base_tag %>
<title><% if $MetaTitle %>$MetaTitle<% else %>$Title<% end_if %> &raquo; $SiteConfig.Title</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
$MetaTags(false)
<% require themedCSS('layout') %>
<!--[if lt IE 9]>
<script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->
<link rel="shortcut icon" href="$ThemeDir/images/favicon.png" />
<script type="text/javascript">
  window.SilverStripe = window.SilverStripe || { 'settings': {}, 'behaviors': {}, 'themes': {}, 'locale': {} };
  window.SilverStripe.settings.baseUrl='$BaseHref';
  window.SilverStripe.settings.baseRelUrl='$baseURL';
  window.SilverStripe.settings.pageUrl='$Link';
  window.SilverStripe.settings.themeDir = '{$ThemeDir}';
  window.SilverStripe.loadScript = function(files, after) {
    var _this=this;
    _this.files = files;
    _this.js = [];
    _this.head = document.getElementsByTagName("head")[0];
    _this.after = after || function(){};
    _this.loadStyle = function(file) {
      var link = document.createElement("link");
      link.rel = "stylesheet";
      link.type = "text/css";
      link.href = file;
      _this.head.appendChild(link);
    };
    _this.loadScript = function(i) {
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = _this.js[i];
      var loadNextScript = function() {
        if (++i < _this.js.length) _this.loadScript(i);
        else _this.after();
      };
      script.onload = function() { loadNextScript() };
      _this.head.appendChild(script);
    }
    for (var i=0;i<_this.files.length;i++) {
      if (/.js$|.js?/.test(_this.files[i])) _this.js.push(_this.files[i])
      if (/.css$|.css?/.test(_this.files[i])) _this.loadStyle(_this.files[i])
    }
    if (_this.js.length>0) _this.loadScript(0);
    else _this.after();
  }
  window.SilverStripe.behaviors = {
    attached:{},
    attachAll:function (context) {
      if (typeof context == 'undefined') {
        context = window;
      }
      for(var behavior in this) {
        if (typeof this[behavior].attach == 'function' && !this.attached[behavior]) {
          this[behavior].attach.call(this[behavior], context, SilverStripe.settings)
          this.attached[behavior] = true;
        }
      }
    },
    dettachAll:function (context) {
      if (typeof context == 'undefined') {
        context = window;
      }
      for(var behavior in this) {
        if (typeof this[behavior].attach == 'function' && this.attached[behavior]) {
          this[behavior].dettach.call(this[behavior], context, SilverStripe.settings)
          this.attached[behavior] = false;
        }
      }
    }
  }
  document.addEventListener('DOMContentLoaded', window.SilverStripe.behaviors.attachAll.call(window.SilverStripe.behaviors));

</script>