variable "REGION" {
  default = "us-east-1"
}

variable "ZONE1" {
  default = "us-east-1a"
}

variable "AMIS" {
  type = map(any)
  default = {
    us-east-1 = "ami-0c101f26f147fa7fd"
    us-east-2 = "ami-019f9b3318b7155c5"
  }
}

variable USER {
    default = "ec2-user"
}