resource "aws_key_pair" "terra-key" {
  key_name   = "terra_key.rsa"
  public_key = file("terra_key.pub")
}

resource "aws_instance" "terra-instance" {
  ami                    = var.AMIS[var.REGION]
  instance_type          = "t2.micro"
  availability_zone      = var.ZONE1
  key_name               = aws_key_pair.terra-key.key_name
  vpc_security_group_ids = ["sg-0786b62af327a15cc"]
  tags = {
    Name    = "Terra_Instance"
    project = "Terra"
  }

  provisioner "file" {
    source      = "web.sh"
    destination = "/tmp/web.sh"
  }

  provisioner "remote-exec" {
    inline = [
      "chmod +x /tmp/web.sh",
      "sudo /tmp/web.sh"
    ]
  }

  connection {
    user        = var.USER
    private_key = file("terra_key.rsa")
    host        = self.public_ip
  }
}

output "PublicIP" {
  value = aws_instance.terra-instance.public_ip
}

output "PrivateIP" {
  value = aws_instance.terra-instance.private_ip
}