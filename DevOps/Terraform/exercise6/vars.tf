variable "REGION" {
  default = "us-east-1"
}

variable "ZONE1" {
  default = "us-east-1a"
}
variable "ZONE2" {
  default = "us-east-1b"
}

variable "ZONE3" {
  default = "us-east-1c"
}

variable "ZONE4" {
  default = "us-east-1d"
}

variable "AMIS" {
  type = map(any)
  default = {
    us-east-1 = "ami-0c101f26f147fa7fd"
    us-east-2 = "ami-019f9b3318b7155c5"
  }
}

variable "USER" {
  default = "ec2-user"
}

variable "PUB_KEY" {
  default = "terra_key.pub"
}

variable "PRIV_KEY" {
  default = "terra_key.rsa"
}

variable "MYIP" {
  default = "149.224.195.247/32"
}
