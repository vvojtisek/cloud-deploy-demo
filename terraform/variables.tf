variable "aws_region" {
  type    = string
  default = "eu-central-1"
}

variable "app_name" {
  type    = string
  default = "cloud-deploy-demo"
}

variable "github_repo" {
  type        = string
  description = "Format: <owner>/<repo>"
}
