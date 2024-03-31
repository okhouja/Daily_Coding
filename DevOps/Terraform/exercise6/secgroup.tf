resource "aws_security_group" "terra_stack_sg" {
  vpc_id      = aws_vpc.terra.id
  name        = "terra-stack-sg"
  description = "SecGroup for Terra ssh"

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [var.MYIP]
  }

  tags = {
    Name = "allow_ssh"
  }
}