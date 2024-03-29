terraform {
  backend "s3" {
    bucket = "terra-state-dove202"
    key    = "terraform/backend"
    region = "us-east-1"
  }
}