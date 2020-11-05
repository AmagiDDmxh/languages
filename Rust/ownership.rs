fn main() {
  // ----- Move ------
  // let s1 = String::from("Hello World");
  // let s2 = s1;

  // println!("String literal: s1 - {}", s1)

  // ----- Scalar Types ------
  // let s1 = "Hello ";
  // let s2 = s1;

  // println!("Copy sclar type of s1: {} -> s2: {}", s1, s2);


  // ----- Give ownership or so called `move`? ------
  let s = String::from("Hello");
  takes_ownership(s);
  // println!("Use s here produces an error {}", s)
  
  let x = 123;
  makes_copy(x);
  println!("Doesn't produces error because is simple scaler value - {}", x);

  // ----- Ownership in return -----
  let s1 = gives_ownership("Any string".to_string());
  println!("Take values s1 -> {}", s1);

  let s2 = takes_and_gives_back(s1);
  // Same as moving, produce error
  // println!("After takes and gives back s1: {}", s1);
  println!("s2 now takes the ownership of s1, s2: {}", s2);

  tediously_make_use_ownership();
}  // After completion, every things goes out of scope and is dropped


// ----- Take functions ------
fn takes_ownership(some_string: String) {
  println!("Take str: \"{}\"", some_string);
}  
// After some_string is taken, dropped here, now the reference of some_string no longer exists

fn makes_copy(some_integer: i32) { // some_integer comes into scope
  println!("{}", some_integer);
} // Here, some_integer goes out of scope. Nothing special happens.

// ----- Return functions ------
fn gives_ownership(chars: String) -> String {
  let string = String::from(chars);
  string  // Moves string to anywhere gives_ownership call
}

fn takes_and_gives_back(string: String) -> String {
  string  // string was taken and moves out function in return
}


// ----- Tediously making use of ownership ------
fn tediously_make_use_ownership() {
  let s1 = String::from("Hello I'm going to move");
  println!("Calling s1 without error {}", s1);
  let (s2, len) = calculate_length(s1);
  println!("The length of '{}' is '{}'", s2, len);
  // println!("Calling s1 back, and produce error {}", s1);
}

fn calculate_length(s: String) -> (String, usize) {
  let length = s.len();
  (s, length)
}
