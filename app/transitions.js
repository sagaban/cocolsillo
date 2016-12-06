export default function() {
  this.transition(
    this.fromRoute('index'),
    this.toRoute('register'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
}
