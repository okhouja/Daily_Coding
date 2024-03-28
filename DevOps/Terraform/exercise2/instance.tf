resource "aws_instance" "Terra-inst" {
  ami                    = var.AMIS[var.REGION]
  instance_type          = "t2.micro"
  availability_zone      = var.ZONE1
  key_name               = "terra-key"
  vpc_security_group_ids = ["sg-0786b62af327a15cc"]
  tags = {
    Name    = "Terra_Instance"
    project = "Terra"
  }
}