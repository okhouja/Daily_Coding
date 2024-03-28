provider "aws" {
  region = "us-east-1"
  #   access_key = ""
  #    secret_key = ""
}

resource "aws_instance" "intro" {
  ami                    = "ami-0c101f26f147fa7fd"
  instance_type          = "t2.micro"
  availability_zone      = "us-east-1a"
  key_name               = "terra-key"
  vpc_security_group_ids = ["sg-0786b62af327a15cc"]
  tags = {
    Name    = "Terra_Instance"
    project = "Terra"
  }
}