<% if $IsDev %>
  <script src="{$ThemeDir}/javascript/build/bundle.js"></script>
<% else %>

  <script>
    window.SilverStripe.loadScript(["{$ThemeDir}/javascript/live/scripts.min.js", "{$ThemeDir}/css/layout.min.css"], function() {
      window.SilverStripe.behaviors.init();
    } )
  </script>
<% end_if %>
