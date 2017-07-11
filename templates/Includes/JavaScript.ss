<% if $IsDev %>
  <% loop JavaScriptLibFiles %>
    <script src="{$ThemeDir}/javascript/lib/{$File}"></script>
  <% end_loop %>
  <script src="//localhost:35729/livereload.js" async defer></script>
<% else %>
  <script>
    window.SilverStripe.loadScript(["{$ThemeDir}/javascript/live/scripts.min.js", "{$ThemeDir}/css/layout.min.css"], function() {
      window.SilverStripe.behaviors.init();
    } )
  </script>
<% end_if %>

