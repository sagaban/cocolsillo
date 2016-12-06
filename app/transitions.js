export default function() {

  this.transition(
    this.fromRoute('index'),
    this.toRoute('register'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  // Login
  this.transition(
    this.fromRoute('index'),
    this.toRoute('main'),
    this.use('fade')
  );
  // Navbar
  this.transition(
    this.hasClass('navbar'),
    this.toValue(true),
    this.use('wait', 1500, { then: 'toDown' }),
    this.reverse('toUp')
  );

  this.transition(
    this.fromRoute('main.index'),
    this.toRoute('main.account'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.hasClass('buttonContainer'),
    this.use('crossFade')
  );
}
