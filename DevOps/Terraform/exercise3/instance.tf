resource "aws_key_pair" "terra-key" {
    key_name = "terrakey"
    public_key = file("terrakey.pub")    
}

resource "aws_instance" "terra-instance" {
    ami = var.AMIS[var.REGION]
    instance_type = "t2.micro"
    availability_zone = var.ZONE1
    key_name = aws_key_pair.terra-key.key_name
    vpc_security_group_ids = ["sg-0786b62af327a15cc"]
    tags = {
    Name    = "Terra_Instance"
    project = "Terra"
  }

  provisoner "file" {
    source = "web.sh"
    destination = "/tmp/web.sh"
  }
  
  provisoner "remoter-exec"{
    inline = [
        "chomd u+x /tmp/web.sh",
        "sudo /tmp/web.sh"
    ]
  }

  connection {
    user = var.USER
    private_key = file("terrakey")
    host = var.public_ip
  }
}