terraform {
  backend "s3" {
    bucket = "terra-state-dove202"
    key    = "terraform/backend_exercises6"
    region = "us-east-1"
  }
}