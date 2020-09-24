use rand::Rng;
use std::cmp::Ordering;


fn main() {
  let n = rand::thread_rng().gen_range(0, 100);
  let a = 20;
  println!("{}", n);

  // why is cmp need to borrowing, and why is stack value are borrowable
  match n.cmp(&a) {
    Ordering::Less => println!("Too small!"),
    Ordering::Greater => println!("Too big!"),
    Ordering::Equal => {
        println!("You win!");
    }
  }
}
