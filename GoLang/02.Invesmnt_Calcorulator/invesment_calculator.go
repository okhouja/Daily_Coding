package main

import (
	"fmt"
	"math"
)

func main() {
	var invesmentAmount = 1000
	var expectingReturnRate = 5.5
	var years = 10

	var futureValue = float64(invesmentAmount) * math.Pow(1 + expectingReturnRate/100, float64(years)) 
	fmt.Print(futureValue)
}