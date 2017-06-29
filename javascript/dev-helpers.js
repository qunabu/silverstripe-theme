SilverStripe.behaviors.Helpers = {
  cols:12,
  colClass:"col-xs-1 col-sm-1 col-md-1",
  colStyle: [
    'background:rgba(255,0,0,0.1); height:100%;',
    'background:rgba(0,0,255,0.1); height:100%;',
    '1px solid rgba(0,0,0,0.2)'
  ],
  onStage:false,
  attach:function() {
    var self = this;
    window.addEventListener('keydown', function(e) {
      if (e.key=='g') {
        self.toggleGrid()
      }
    })
  },
  toggleGrid: function() {
    if (this.onStage) {
      document.querySelector('.grid-helper').parentNode.removeChild(document.querySelector('.grid-helper'));
    } else {
      var html = "<div class='grid-helper' style='z-index: 999; width:100%; height: 100%; position:fixed; left:0; top:0;'>";
      html += "<div class='container' style='height:100%;'>";
      html += "<div class='row' style='height:100%;'>"
      for (var i = 1; i <= this.cols; i++) {
        var border_style = i == 1 ?  'border-right:' + this.colStyle[2] + ';border-left:' + this.colStyle[2] : 'border-right:' + this.colStyle[2];
        html += "<div class='" + this.colClass + "' style=' " + border_style + " '><div class='column' style='" + ( this.colStyle[i % 2]) + "'></div></div>";
      }
      html += "</div></div></div>";
      document.body.insertAdjacentHTML('beforeend', html);
    }
    this.onStage = !this.onStage;
  }
}

SilverStripe.behaviors.attachAll();