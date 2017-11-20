<% if $IsDev %>
  <% loop JavaScriptLibFiles %>
    <script src="{$Top.ThemeDir}/javascript/lib/{$File}"></script>
  <% end_loop %>
  <script>
    (function() {
      var _href = window.location.href;
      var _test = _href.indexOf('.dev') != -1 ||  _href.indexOf('.loc') != -1 ||  _href.indexOf('localhost') != -1
      if (_test) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = '//localhost:35729/livereload.js';
        script.defer = 'defer';
        script.async = 'async';
        document.getElementsByTagName('body')[0].appendChild(script);
      }
    })()
  </script>
<% else %>
  <script>
    window.SilverStripe.loadScript(["{$ThemeDir}/javascript/live/scripts.min.js", "{$ThemeDir}/css/layout.min.css"], function() {
      window.SilverStripe.behaviors.init();
    } )
  </script>
<% end_if %>
