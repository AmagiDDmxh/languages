package main

import (
	. "fmt"
	"math"
)

type Circle struct {
	radius float64
}

type Rectangle struct {
	width, height float64
}

func (r Circle) area() float64 {
	return math.Pi * r.radius * r.radius
}

func (r Rectangle) area() float64 {
	return r.width * r.height
}

func main() {
	rectangle := Rectangle{12, 2}
	circle := Circle{9}

	Println("Area of rectangle is: ", rectangle.area())
	Println("Area of circle is: ", circle.area())
}
