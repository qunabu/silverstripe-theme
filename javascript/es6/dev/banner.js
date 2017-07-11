export default class Banner {
  constructor() {
    /** variable initation */
    this.el = $('section.banner');
    this.container =  this.el.find('>ul');
    this.slides = this.container.find('>li');
    this.lenght = this.slides.length;
    this.el.find('button.left').click(this.onLeftClick.bind(this));
    this.el.find('button.right').click(this.onRightClick.bind(this));
    this.el.click(this.onCanvasClick.bind(this));
    this.currentIndex = 0;
    this.interval = 0;
    this.isHidden = false;
    this.isMobile = false;
    this.cssproc =  50;
    this.animate = false;

    $(window).on('scroll', this.onScroll.bind(this));
    this.showSlide(0);
    this.startInterval();

    requestAnimationFrame(this.onEnterFrame.bind(this));
  }
  get hidden() {
    return this.isHidden;
  }
  get mobile() {
    return this.isMobile;
  }
  get size() {
    return this.lenght;
  }
  get index() {
    return this.currentIndex;
  }
  set index(i) {
    //this.currentIndex = i;
    this.showSlide(i);
  }
  onScroll(e) {
    var proc = $(window).scrollTop() / $(window).height();
    if (proc > 1 && !this.isHidden) {
      this.hide();
    } else if (proc <= 1 && this.isHidden) {
      this.show();
    }
    if (proc <= 1) {
      var cssproc = 50 + (50*proc);
      this.animate = cssproc != this.cssproc;
      if (this.animate) {
        this.cssproc = cssproc;
      }
    }
  }
  onEnterFrame() {
    if (this.animate) {
      this.slides.css('background-position-y',  this.cssproc + '%');
    }
    requestAnimationFrame(this.onEnterFrame.bind(this));
  }
  show() {
    if (this.isHidden) {
      this.isHidden = false;
      this.startInterval();
      //this.showSlide(0);
    }
  }
  hide () {
    if (!this.isHidden) {
      this.isHidden = true;
      this.stopInterval();
    }
  }
  startInterval () {
    this.interval = setInterval(this.nextSlide.bind(this), 15000);
  }
  stopInterval () {
    clearInterval(this.interval);
  }
  onCanvasClick (e) {
    this.stopInterval();
  }
  onLeftClick (e=null) {
    this.currentIndex = this.currentIndex == this.lenght - 1 ? 0 : this.currentIndex + 1;
    this.showSlide();
    return false
  }
  onRightClick (e=null) {
    this.currentIndex = this.currentIndex == 0 ? this.lenght - 1: this.currentIndex - 1;
    this.showSlide();
    return false
  }
  nextSlide () {
    this.onRightClick();
  }
  showSlide(i) {
    i = typeof i == 'number' ? i : this.currentIndex;
    if (i > this.lenght - 1 || i < 0) {
      throw new Error('index out of range');
    }
    var newSlide =  this.slides.eq(i)
    this.slides.not(newSlide).removeClass('active');
    newSlide.addClass('active');
    this.currentIndex = i;
    this.container.css({
      '-webkit-transform': 'translate3d('+(-i*100)+'%,0,0)', /* Safari */
      'transform': 'translate3d('+(-i*100)+'%,0,0)'
    })
  }
}